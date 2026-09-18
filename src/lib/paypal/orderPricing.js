import { resolveBasePrice, calculateTotalWithTax } from "@/lib/paypal/pricing";
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
  const totalUsd = Number((totalIdr * rate).toFixed(2));
  return { basePrice, subtotal, tax, totalIdr, totalUsd, rate };
}
