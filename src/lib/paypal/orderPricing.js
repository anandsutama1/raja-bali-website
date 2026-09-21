import { resolveBasePrice, calculateTotalWithTax, TAX_RATE } from "@/lib/paypal/pricing";
import { getIdrToUsdRate } from "@/lib/paypal/exchangeRate";

// Single source of truth for "what does this booking cost, in both
// currencies" — used by BOTH /api/paypal/price-preview (what the order
// summary shows before a guest ever clicks Pay Now) and
// /api/paypal/create-order (the actual PayPal charge). Two independently
// written versions of this math is exactly how a guest ends up seeing one
// USD figure on the page and a different one at PayPal's checkout — so
// this function is the only place either of those routes is allowed to
// compute it.
export async function computeOrderPricing(formType, guestCount) {
  const basePrice = resolveBasePrice(formType, guestCount);
  const { subtotal, tax, total: totalIdr } = calculateTotalWithTax(basePrice, guestCount);
  const rate = await getIdrToUsdRate();
  // PayPal requires exactly 2 decimal places for USD — the only rounding
  // step in this whole calculation, done here once so both callers round
  // identically.
  // TEMPORARY live-payment smoke test: while PAYPAL_TEST_TOTAL_USD is set and
  // PAYPAL_TEST_UNTIL (an ISO time) is still in the future, bar-class alone
  // is charged that flat USD amount. Once the time passes the override
  // switches itself off, so a forgotten env var can never leave the price low.
  const testUsd = Number(process.env.PAYPAL_TEST_TOTAL_USD);
  const testUntil = Date.parse(process.env.PAYPAL_TEST_UNTIL ?? "");
  const testActive = formType === "bar-class" && testUsd > 0 && Number.isFinite(testUntil) && Date.now() < testUntil;

  const totalUsd = testActive ? Number(testUsd.toFixed(2)) : Number((totalIdr * rate).toFixed(2));
  const subtotalUsd = testActive ? Number((totalUsd / (1 + TAX_RATE)).toFixed(2)) : Number((subtotal * rate).toFixed(2));
  // Derived as the remainder rather than independently rounded, so
  // subtotalUsd + taxUsd always sums to exactly totalUsd to the cent —
  // two separately-rounded figures can be a cent off from their own total.
  const taxUsd = Number((totalUsd - subtotalUsd).toFixed(2));
  return { basePrice, subtotal, tax, totalIdr, totalUsd, subtotalUsd, taxUsd, rate };
}
