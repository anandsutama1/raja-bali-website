import { NextResponse } from "next/server";
import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";
import { checkRateLimit } from "@/lib/paypal/rateLimit";

function extractCaptureFields(order) {
  const capturePayment = order.purchase_units?.[0]?.payments?.captures?.[0];
  return {
    status: order.status,
    orderId: order.id,
    captureId: capturePayment?.id,
    amount: capturePayment?.amount,
    payerEmail: order.payer?.email_address,
    customId: order.purchase_units?.[0]?.custom_id,
  };
}

// A retry (network hiccup, guest double-clicking, browser back/forward
// after approval) can send the same orderID to capture twice. PayPal's own
// capture endpoint rejects the second attempt with 422
// ORDER_ALREADY_CAPTURED — rather than surface that as a payment failure
// (which would be wrong: the guest WAS charged, only once), fetch the
// order's current state and return it as a normal success. This is what
// makes capture-order idempotent/safe to retry.
async function handleAlreadyCaptured(orderID, accessToken) {
  const res = await fetch(paypalApiUrl(`/v2/checkout/orders/${orderID}`), {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const order = await res.json();
  if (!res.ok || order.status !== "COMPLETED") return null;
  return NextResponse.json(extractCaptureFields(order));
}

export async function POST(request) {
  const limited = checkRateLimit(request, "capture-order");
  if (limited) return limited;

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
      const issue = capture.details?.[0]?.issue;
      if (issue === "ORDER_ALREADY_CAPTURED") {
        const already = await handleAlreadyCaptured(orderID, accessToken);
        if (already) return already;
      }
      console.error("[paypal] capture-order failed:", capture);
      // PayPal itself answered with an error (declined card, order not
      // approved, and so on), so nothing was charged. Only then may the
      // client offer "pay at the venue" instead. The catch below is
      // different: a network failure leaves the outcome unknown.
      return NextResponse.json(
        { error: "Payment could not be completed.", notCharged: issue !== "ORDER_ALREADY_CAPTURED" },
        { status: 502 }
      );
    }

    return NextResponse.json(extractCaptureFields(capture));
  } catch (err) {
    console.error("[paypal] capture-order error:", err);
    return NextResponse.json({ error: "Payment could not be completed." }, { status: 502 });
  }
}
