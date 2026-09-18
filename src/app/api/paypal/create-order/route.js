import { NextResponse } from "next/server";
import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";
import {
  EXPERIENCE_PRICING,
  EXPERIENCE_LABELS,
  calculateTotalWithTax,
  resolveBasePrice,
  resolvePlanFromGuestCount,
} from "@/lib/paypal/pricing";
import { getIdrToUsdRate } from "@/lib/paypal/exchangeRate";
import { checkRateLimit } from "@/lib/paypal/rateLimit";

// The client sends formType/guests — never a plan or a price. Cooking
// class's Shared/Individual plan is derived from guestCount here, the same
// rule the order-summary label uses client-side (see
// resolvePlanFromGuestCount) — a guest can't pay the cheaper Individual
// rate for 2+ people by sending a tampered "plan" value, because there's
// no "plan" input to tamper with anymore. This is the only place the
// actual charge amount is decided, from our own price table.
export async function POST(request) {
  const limited = checkRateLimit(request, "create-order");
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { formType, guests } = body ?? {};
  const guestCount = parseInt(guests, 10);

  if (!EXPERIENCE_PRICING[formType]) {
    return NextResponse.json({ error: "Unknown experience type." }, { status: 400 });
  }
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    return NextResponse.json({ error: "Invalid guest count." }, { status: 400 });
  }

  const plan = formType === "cooking-class" ? resolvePlanFromGuestCount(guestCount) : undefined;
  const basePrice = resolveBasePrice(formType, guestCount);
  const { total: totalIdr } = calculateTotalWithTax(basePrice, guestCount);
  const rate = await getIdrToUsdRate();
  // PayPal requires exactly 2 decimal places for USD.
  const totalUsd = (totalIdr * rate).toFixed(2);

  try {
    const accessToken = await getPayPalAccessToken();
    const res = await fetch(paypalApiUrl("/v2/checkout/orders"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: `${EXPERIENCE_LABELS[formType] || formType} — ${guestCount} guest(s)`,
            // Echoed back on the capture response — lets capture-order and
            // the webhook handler reconstruct what was actually purchased
            // (for the PDF invoice and reconciliation) without re-trusting
            // anything the client says at capture time.
            custom_id: JSON.stringify({ formType, guestCount, plan }),
            amount: { currency_code: "USD", value: totalUsd },
          },
        ],
        // A cooking/bar class is an experience, not a physical product —
        // without this, PayPal's checkout defaults to asking for (or
        // pulling from the buyer's PayPal profile) a shipping address,
        // which makes no sense for something nothing gets shipped to.
        application_context: { shipping_preference: "NO_SHIPPING" },
      }),
      cache: "no-store",
    });

    const order = await res.json();
    if (!res.ok) {
      console.error("[paypal] create-order failed:", order);
      return NextResponse.json({ error: "Could not start PayPal checkout." }, { status: 502 });
    }

    // totalIdr/totalUsd/rate are returned for display only (the order
    // summary shown next to the button) — PayPal already has the real
    // charge amount from the order it just created.
    return NextResponse.json({
      id: order.id,
      totalIdr,
      totalUsd: Number(totalUsd),
      rate,
    });
  } catch (err) {
    console.error("[paypal] create-order error:", err);
    return NextResponse.json({ error: "Could not start PayPal checkout." }, { status: 502 });
  }
}
