// PayPal's Orders API doesn't accept IDR as a currency_code (confirmed
// against PayPal's supported-currencies reference — not in the list), so
// every charge has to go through in USD even though the site prices
// everything in IDR. This is the one place that converts between the two.
//
// Static safety net if the live rate fetch ever fails — sanity-check this
// occasionally against a real rate; being off by a little is a rounding
// nuisance, being off by a lot is a real pricing bug. Set 2026-09-16.
const FALLBACK_IDR_TO_USD_RATE = 1 / 17500;

// open.er-api.com is a free, keyless exchange-rate API that itself only
// refreshes once every 24 hours — so `next: { revalidate: 86400 }` doesn't
// throw away any real freshness, it just stops us from re-fetching data
// that hasn't changed. Next's Data Cache persists this across requests
// (not just within one warm serverless instance), so a checkout at 3am
// doesn't depend on this endpoint being up at that exact moment nearly as
// often as a plain in-memory cache would.
export async function getIdrToUsdRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/IDR", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`exchange rate API responded ${res.status}`);

    const data = await res.json();
    const rate = data?.rates?.USD;
    if (typeof rate !== "number" || rate <= 0) {
      throw new Error("USD rate missing or invalid in exchange rate API response");
    }
    return rate;
  } catch (err) {
    console.error("[paypal] Exchange rate fetch failed, using fallback rate:", err.message);
    return FALLBACK_IDR_TO_USD_RATE;
  }
}
