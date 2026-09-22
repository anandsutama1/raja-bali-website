import { resolveBasePrice, resolveChildPrice, calculateTotalWithTax } from "@/lib/paypal/pricing";
import { getIdrToUsdRate } from "@/lib/paypal/exchangeRate";

// Single source of truth for "what does this booking cost, in both
// currencies" — used by BOTH /api/paypal/price-preview (what the order
// summary shows before a guest ever clicks Pay Now) and
// /api/paypal/create-order (the actual PayPal charge). Two independently
// written versions of this math is exactly how a guest ends up seeing one
// USD figure on the page and a different one at PayPal's checkout — so
// this function is the only place either of those routes is allowed to
// compute it. childCount defaults to 0, so a caller that never mentions
// children (bar-class, group-reservation, etc.) behaves exactly as before.
export async function computeOrderPricing(formType, guestCount, childCount = 0) {
  const basePrice = resolveBasePrice(formType, guestCount);
  const childPrice = resolveChildPrice(formType);
  const { adultSubtotal, childSubtotal, subtotal, tax, total: totalIdr } = calculateTotalWithTax(
    basePrice,
    guestCount,
    childCount,
    childPrice
  );
  const rate = await getIdrToUsdRate();
  // PayPal requires exactly 2 decimal places for USD — the only rounding
  // step in this whole calculation, done here once so both callers round
  // identically.
  const totalUsd = Number((totalIdr * rate).toFixed(2));
  const subtotalUsd = Number((subtotal * rate).toFixed(2));
  const adultSubtotalUsd = Number((adultSubtotal * rate).toFixed(2));
  // Both derived as remainders rather than independently rounded, so the
  // line items always sum to exactly subtotalUsd/totalUsd to the cent:
  // separately-rounded figures can be a cent off from their own total.
  const childSubtotalUsd = Number((subtotalUsd - adultSubtotalUsd).toFixed(2));
  const taxUsd = Number((totalUsd - subtotalUsd).toFixed(2));
  return {
    basePrice,
    childPrice,
    adultSubtotal,
    childSubtotal,
    subtotal,
    tax,
    totalIdr,
    totalUsd,
    subtotalUsd,
    adultSubtotalUsd,
    childSubtotalUsd,
    taxUsd,
    rate,
  };
}
