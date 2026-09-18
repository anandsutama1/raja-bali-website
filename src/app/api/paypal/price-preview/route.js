import { NextResponse } from "next/server";
import { EXPERIENCE_PRICING } from "@/lib/paypal/pricing";
import { computeOrderPricing } from "@/lib/paypal/orderPricing";
import { checkRateLimit } from "@/lib/paypal/rateLimit";

// Cooking-class/bar-class pages are statically prerendered with a 1-day
// ISR revalidate window (inherited from getIdrToUsdRate's fetch cache) —
// meaning a USD estimate baked into the page's HTML at build/regeneration
// time can silently drift from what create-order (a per-request dynamic
// route) computes fresh, for up to ~24h after a cache boundary. Rather
// than display that stale figure, ReservationForm calls this endpoint the
// moment a guest reaches the payment step, getting the same
// computeOrderPricing() result create-order will use moments later —
// collapsing the staleness window from "up to a day" down to "the few
// seconds between this call and clicking Pay Now", both reads landing on
// the same shared Next.js Data Cache entry.
//
// Deliberately does NOT call PayPal at all (no OAuth, no order creation) —
// just the free, cached exchange-rate lookup — so checking a price is
// free of PayPal API load and safe to call on every visit to the payment
// step, including repeated guest-count edits.
export async function POST(request) {
  const limited = checkRateLimit(request, "price-preview");
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { formType, guests } = body ?? {};
  const guestCount = parseInt(guests, 10);

  if (!EXPERIENCE_PRICING[formType]) {
    return NextResponse.json({ error: "Unknown experience type." }, { status: 400 });
  }
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    return NextResponse.json({ error: "Invalid guest count." }, { status: 400 });
  }

  const { totalIdr, totalUsd, rate } = await computeOrderPricing(formType, guestCount);
  return NextResponse.json({ totalIdr, totalUsd, rate });
}
