import { NextResponse } from "next/server";
import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { orderID } = body ?? {};
  if (!orderID) {
    return NextResponse.json({ error: "Missing orderID." }, { status: 400 });
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const res = await fetch(paypalApiUrl(`/v2/checkout/orders/${orderID}/capture`), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const capture = await res.json();
    if (!res.ok) {
      console.error("[paypal] capture-order failed:", capture);
      return NextResponse.json({ error: "Payment could not be completed." }, { status: 502 });
    }

    const capturePayment = capture.purchase_units?.[0]?.payments?.captures?.[0];

    return NextResponse.json({
      status: capture.status,
      orderId: capture.id,
      captureId: capturePayment?.id,
      amount: capturePayment?.amount,
      payerEmail: capture.payer?.email_address,
    });
  } catch (err) {
    console.error("[paypal] capture-order error:", err);
    return NextResponse.json({ error: "Payment could not be completed." }, { status: 502 });
  }
}
