import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/paypal/rateLimit";
import { recordDepositPayment } from "@/lib/deposit/record";

// Called by the pay page right after PayPal's capture succeeds. Only the
// order ID comes from the browser — recordDepositPayment re-verifies it
// against PayPal, so this can't be used to mark a reference paid without a
// real matching charge.
export async function POST(request) {
  const limited = checkRateLimit(request, "deposit-complete");
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderID = typeof body?.orderID === "string" ? body.orderID : "";
  if (!orderID) return NextResponse.json({ error: "Missing orderID." }, { status: 400 });

  const result = await recordDepositPayment(orderID);
  if (!result.ok) {
    return NextResponse.json({ error: "Could not confirm this payment." }, { status: 400 });
  }
  return NextResponse.json({ ok: true, ref: result.ref, paidUsd: result.paidUsd });
}
