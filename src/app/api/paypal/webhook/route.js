import { NextResponse } from "next/server";
import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";

// Reconciliation safety net, independent of the direct capture-order HTTP
// response: if a guest's browser loses connectivity right after PayPal
// actually captures a payment (so our capture-order response never makes
// it back), this webhook is PayPal telling us about it a second, separate
// way. It doesn't drive the booking flow (Sheets/emails/invoice all still
// happen off the direct capture-order response, verified again in
// submit-form — see lib/paypal/verify.js) — it only exists so a payment
// that "went through on PayPal's side but our server never heard back
// about it" still shows up somewhere (Vercel's function logs) instead of
// only being discoverable when a guest complains or a card statement is
// checked.
//
// Requires PAYPAL_WEBHOOK_ID to be set (create the webhook in the PayPal
// Developer Dashboard -> Apps & Credentials -> your app -> Webhooks,
// pointing at this route's deployed URL, subscribed to at least
// PAYMENT.CAPTURE.COMPLETED and CHECKOUT.ORDER.APPROVED) before this check
// can do anything meaningful; until then requests are accepted but logged
// as unverified.
async function verifyWebhookSignature(request, rawBody) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return { verified: false, reason: "PAYPAL_WEBHOOK_ID not configured" };

  const accessToken = await getPayPalAccessToken();
  const res = await fetch(paypalApiUrl("/v1/notifications/verify-webhook-signature"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: request.headers.get("paypal-auth-algo"),
      cert_url: request.headers.get("paypal-cert-url"),
      transmission_id: request.headers.get("paypal-transmission-id"),
      transmission_sig: request.headers.get("paypal-transmission-sig"),
      transmission_time: request.headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBody),
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return { verified: res.ok && data.verification_status === "SUCCESS", reason: data.verification_status };
}

export async function POST(request) {
  const rawBody = await request.text();
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  let verification;
  try {
    verification = await verifyWebhookSignature(request, rawBody);
  } catch (err) {
    console.error("[paypal] webhook signature verification error:", err);
    verification = { verified: false, reason: "verification request failed" };
  }

  if (!verification.verified) {
    console.warn("[paypal] webhook received but NOT verified — ignoring", {
      reason: verification.reason,
      eventType: event.event_type,
    });
    // Still 200 — an unverified/misconfigured webhook shouldn't make PayPal
    // retry forever, but it also isn't trusted for anything.
    return NextResponse.json({ ok: true, verified: false });
  }

  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED" || event.event_type === "CHECKOUT.ORDER.APPROVED") {
    const resource = event.resource || {};
    console.log("[paypal] webhook reconciliation:", {
      eventType: event.event_type,
      captureId: resource.id,
      orderId: resource.supplementary_data?.related_ids?.order_id,
      status: resource.status,
      amount: resource.amount,
      createTime: event.create_time,
    });
  }

  return NextResponse.json({ ok: true, verified: true });
}
