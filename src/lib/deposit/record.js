import { Resend } from "resend";
import { verifyPayPalOrder } from "@/lib/paypal/verify";
import { postToDepositSheet } from "@/lib/deposit/sheets";

// Two independent paths call this for the same payment — the guest's
// browser right after capture (/api/deposit/complete) and PayPal's own
// PAYMENT.CAPTURE.COMPLETED webhook — so a dropped connection after a
// successful charge still gets recorded. It's safe to run twice: the
// Sheet script ignores an order ID it has already logged.
//
// Everything is re-derived from PayPal itself (verifyPayPalOrder), never
// from what the caller sends, so neither path can be used to mark a
// reference as paid without a real, completed, matching charge.
export async function recordDepositPayment(orderId) {
  const verified = await verifyPayPalOrder(orderId);
  const custom = verified?.custom;
  if (!verified || custom?.type !== "deposit" || !custom.ref) {
    return { ok: false, error: "not_a_verified_deposit" };
  }

  const paidUsd = Number(verified.amount?.value);
  const expectedUsd = Number(custom.usd);
  if (
    verified.amount?.currency_code !== "USD" ||
    !Number.isFinite(paidUsd) ||
    Math.abs(paidUsd - expectedUsd) > 0.005
  ) {
    console.error("[deposit] captured amount does not match the locked amount", {
      orderId,
      paidUsd,
      expectedUsd,
    });
    return { ok: false, error: "amount_mismatch" };
  }

  const sheet = await postToDepositSheet({
    action: "paid",
    ref: custom.ref,
    paidUsd,
    orderId: verified.orderId,
    captureId: verified.captureId,
    payerEmail: verified.payerEmail || "",
    paidAt: new Date().toISOString(),
  });

  // Doubles as the fallback record: if the Sheet write failed, this email
  // has everything staff need to update the row by hand.
  try {
    const to = process.env.EMAIL_MAIN_RESTAURANT;
    if (to) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Raja Bali Website <noreply@rajabalirestaurant.co>",
        to,
        subject: `Deposit received: ${custom.ref} (USD ${paidUsd.toFixed(2)})`,
        html: `<div style="font-family:Arial,sans-serif;max-width:520px;">
          <h2 style="color:#A31C1C;">Group deposit received</h2>
          <p><strong>Reference:</strong> ${custom.ref}<br />
          <strong>Amount:</strong> USD ${paidUsd.toFixed(2)}<br />
          <strong>PayPal Order ID:</strong> ${verified.orderId}<br />
          <strong>Payer email:</strong> ${verified.payerEmail || "n/a"}</p>
          ${
            sheet.ok
              ? '<p style="color:#2f5c2f;">The Google Sheet row was updated automatically.</p>'
              : '<p style="color:#7a1f1f;font-weight:700;">The Google Sheet could NOT be updated automatically. Please set this reference to "Deposit Paid" by hand.</p>'
          }
        </div>`,
      });
    }
  } catch (err) {
    console.error("[deposit] staff notification email failed", err);
  }

  return { ok: true, ref: custom.ref, paidUsd, recorded: sheet.ok };
}
