// Base prices in IDR, per person — the actual prices shown on each
// experience's own page (see content-cooking-class.json's pricing.plans and
// content-bar-class.json's pricing). Kept here as the single source of
// truth for payment calculations so the charged amount can never drift from
// what a page displays without both being updated together.
export const EXPERIENCE_PRICING = {
  "cooking-class": {
    shared: 550000,
    individual: 600000,
  },
  "bar-class": {
    standard: 250000,
  },
};

// Government tax & service charge, applied on top of every base price
// before a guest is ever charged. Matches the "Prices are subject to an
// 11% government tax" footnote already shown on both pricing sections.
export const TAX_RATE = 0.11;

// Single source of truth for "base price x guests, plus tax" — used both
// server-side (the actual charge, in /api/paypal/create-order) and
// client-side (the order summary shown before a guest pays), so the two
// can never disagree.
export function calculateTotalWithTax(basePrice, guestCount) {
  const subtotal = basePrice * guestCount;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

// Resolves which per-person base price applies for a given experience —
// cooking-class has two plans (shared/individual), bar-class has one.
// Returns null for an unrecognized formType so callers can reject the
// request instead of silently charging a wrong/default price.
export function resolveBasePrice(formType, plan) {
  const pricing = EXPERIENCE_PRICING[formType];
  if (!pricing) return null;
  if (formType === "cooking-class") {
    return plan === "individual" ? pricing.individual : pricing.shared;
  }
  return pricing.standard;
}
