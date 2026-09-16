import { NextResponse } from "next/server";
import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";
import { EXPERIENCE_PRICING, calculateTotalWithTax, resolveBasePrice } from "@/lib/paypal/pricing";
import { getIdrToUsdRate } from "@/lib/paypal/exchangeRate";

const EXPERIENCE_LABELS = {
  "cooking-class": "Balinese Cooking Class",
  "bar-class": "Balinese Cocktail Class",
};

// The client sends formType/plan/guests — never a price. This is the only
// place the actual charge amount is decided, from our own price table, so
// a guest can never pay less (or more) than the real price by tampering
// with a client-side value.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { formType, plan, guests } = body ?? {};
  const guestCount = parseInt(guests, 10);

  if (!EXPERIENCE_PRICING[formType]) {
    return NextResponse.json({ error: "Unknown experience type." }, { status: 400 });
  }
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    return NextResponse.json({ error: "Invalid guest count." }, { status: 400 });
  }

  const basePrice = resolveBasePrice(formType, plan);
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
            amount: { currency_code: "USD", value: totalUsd },
          },
        ],
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
