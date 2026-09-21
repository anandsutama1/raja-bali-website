import { NextResponse } from "next/server";
import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";
import { checkRateLimit } from "@/lib/paypal/rateLimit";
import { PAYPAL_CHECKOUT_ENABLED } from "@/lib/paypal/config";
import { verifyDepositLink } from "@/lib/deposit/link";

// The amount is never taken on trust from the browser: the client sends the
// signed pay-link parameters back, and only an untampered, unexpired link
// (verifyDepositLink) is allowed to become a PayPal order — for exactly the
// USD figure inside the signature.
export async function POST(request) {
  // PayPal checkout is switched off (see lib/paypal/config.js) - refuse to
  // start one instead of hitting PayPal with a restricted merchant account.
  if (!PAYPAL_CHECKOUT_ENABLED) {
    return NextResponse.json({ error: "Online payment is currently unavailable." }, { status: 503 });
  }

  const limited = checkRateLimit(request, "deposit-create-order");
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const link = verifyDepositLink(body ?? {});
  if (!link.valid) {
    return NextResponse.json(
      { error: link.reason === "expired" ? "This payment link has expired." : "This payment link is not valid." },
      { status: 400 }
    );
  }

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
            description: `Raja Bali group reservation deposit ${link.ref}`,
            // Read back by lib/deposit/record.js (browser path and webhook
            // path alike) to know which reference this payment belongs to
            // and what amount it must equal. PayPal caps custom_id at 127
            // characters; this is about 55.
            custom_id: JSON.stringify({ type: "deposit", ref: link.ref, usd: link.usd }),
            amount: { currency_code: "USD", value: link.usd.toFixed(2) },
          },
        ],
        application_context: { shipping_preference: "NO_SHIPPING" },
      }),
      cache: "no-store",
    });

    const order = await res.json();
    if (!res.ok) {
      console.error("[deposit] create-order failed:", order);
      return NextResponse.json({ error: "Could not start PayPal checkout." }, { status: 502 });
    }
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("[deposit] create-order error:", err);
    return NextResponse.json({ error: "Could not start PayPal checkout." }, { status: 502 });
  }
}
