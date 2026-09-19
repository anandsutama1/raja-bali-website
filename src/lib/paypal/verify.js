import { getPayPalAccessToken, paypalApiUrl } from "@/lib/paypal/client";

// submit-form is a public, unauthenticated endpoint — a request claiming
// paymentStatus: "Paid" with some paypalOrderId is just a string a client
// sent us, not proof anything was actually charged. Before submit-form
// treats a cooking-class/bar-class booking as paid (shows the "PAID"
// banner, generates/attaches the invoice PDF, records the order ID as
// authoritative), it re-fetches the order directly from PayPal and only
// trusts what PayPal itself reports.
export async function verifyPayPalOrder(orderId) {
  if (!orderId) return null;

  try {
    const accessToken = await getPayPalAccessToken();
    const res = await fetch(paypalApiUrl(`/v2/checkout/orders/${orderId}`), {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const order = await res.json();
    if (!res.ok || order.status !== "COMPLETED") return null;

    const purchaseUnit = order.purchase_units?.[0];
    const capturePayment = purchaseUnit?.payments?.captures?.[0];
    if (!capturePayment) return null;

    let customId = null;
    try {
      customId = purchaseUnit.custom_id ? JSON.parse(purchaseUnit.custom_id) : null;
    } catch {
      customId = null;
    }

    return {
      orderId: order.id,
      captureId: capturePayment.id,
      amount: capturePayment.amount, // { currency_code, value } — the real USD charge
      payerEmail: order.payer?.email_address,
      formType: customId?.formType,
      guestCount: customId?.guestCount,
      plan: customId?.plan,
      // Whole parsed custom_id, for order kinds that aren't a class booking
      // (group-reservation deposits carry { type: "deposit", ref, usd }).
      custom: customId,
    };
  } catch (err) {
    console.error("[paypal] verifyPayPalOrder failed:", err);
    return null;
  }
}
