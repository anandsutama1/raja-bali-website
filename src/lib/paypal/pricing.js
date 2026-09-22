// Base prices in IDR, per person — the actual prices shown on each
// experience's own page (see content-cooking-class.json's pricing.plans and
// content-bar-class.json's pricing). Kept here as the single source of
// truth for payment calculations so the charged amount can never drift from
// what a page displays without both being updated together.
//
// If these ever change, grep the whole repo for the OLD digits first: the
// same numbers are duplicated as display text in content-cooking-class.json,
// content-bar-class.json, faqs.json, forms.json, metadata.json, and
// StructuredData.js (all three locales), none of which read from this file.
export const EXPERIENCE_PRICING = {
  "cooking-class": {
    shared: 550000,
    individual: 600000,
  },
  "bar-class": {
    standard: 250000,
  },
};

// Per-child price, IDR, before tax, cooking-class only. Every other
// experience (bar-class included) still treats children as free, since
// only cooking-class was asked to start charging for them; resolveChildPrice
// falls back to 0 for anything not listed here.
export const CHILD_PRICING = {
  "cooking-class": 275000,
};

// Shared display names — used in the PayPal order description, the guest
// invoice PDF, and anywhere else an experience needs a human-readable name
// instead of its formType slug.
export const EXPERIENCE_LABELS = {
  "cooking-class": "Balinese Cooking Class",
  "bar-class": "Balinese Cocktail Class",
};

// Government tax & service charge, applied on top of every base price
// before a guest is ever charged. Matches the "Prices are subject to an
// 11% government tax" footnote already shown on both pricing sections.
export const TAX_RATE = 0.11;

// Single source of truth for "base price x guests, plus children, plus
// tax", used both server-side (the actual charge, in
// /api/paypal/create-order) and client-side (the order summary shown
// before a guest pays), so the two can never disagree. childCount/
// childPrice default to 0, so a caller that never mentions children (every
// experience except cooking-class, for now) behaves exactly as before.
export function calculateTotalWithTax(basePrice, guestCount, childCount = 0, childPrice = 0) {
  const adultSubtotal = basePrice * guestCount;
  const childSubtotal = childPrice * childCount;
  const subtotal = adultSubtotal + childSubtotal;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { adultSubtotal, childSubtotal, subtotal, tax, total };
}

// Cooking class's Shared/Individual plan is derived from the adult count,
// never taken as a client-supplied value — 1 adult can only ever be the
// Individual plan, 2+ can only ever be Shared. This runs identically on the
// client (for the order-summary label) and the server (for the actual
// charge in /api/paypal/create-order), but only the server's result is
// ever trusted for money: a guest could set `plan` to anything in a raw
// API request, but they can't make guestCount say something other than
// what they're actually being charged per person for.
export function resolvePlanFromGuestCount(guestCount) {
  return guestCount === 1 ? "individual" : "shared";
}

// Resolves which per-person base price applies for a given experience —
// cooking-class has two plans (derived from guest count, see above),
// bar-class has one. Returns null for an unrecognized formType so callers
// can reject the request instead of silently charging a wrong/default
// price.
export function resolveBasePrice(formType, guestCount) {
  const pricing = EXPERIENCE_PRICING[formType];
  if (!pricing) return null;
  if (formType === "cooking-class") {
    return resolvePlanFromGuestCount(guestCount) === "individual" ? pricing.individual : pricing.shared;
  }
  return pricing.standard;
}

// Per-child price for a given experience, IDR before tax. 0 for anything
// not listed in CHILD_PRICING, so an experience that hasn't been asked to
// charge for children just doesn't.
export function resolveChildPrice(formType) {
  return CHILD_PRICING[formType] ?? 0;
}
