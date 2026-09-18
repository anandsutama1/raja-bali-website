import { NextResponse } from "next/server";

// In-memory sliding window — resets on cold start and isn't shared across
// serverless instances, so this is a "slow down abuse" speed bump, not a
// hard distributed guarantee. On Vercel Hobby that's an acceptable
// trade-off for these two low-traffic payment endpoints: it stops a naive
// script from hammering create-order/capture-order from a single client
// without needing an external store (e.g. Redis/Upstash).
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

const hits = new Map(); // key -> array of request timestamps (ms)

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

// Returns a 429 NextResponse if the caller has exceeded the limit for this
// endpoint, or null if the request may proceed. Called first thing in a
// route handler: `const limited = checkRateLimit(request, "create-order");
// if (limited) return limited;`
export function checkRateLimit(request, endpoint) {
  const key = `${endpoint}:${getClientIp(request)}`;
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Bound the map's size — without this, a distributed low-and-slow
  // attacker (many distinct IPs, few requests each) could grow `hits`
  // unbounded for the lifetime of the serverless instance.
  if (hits.size > 5000) {
    const oldestKey = hits.keys().next().value;
    hits.delete(oldestKey);
  }

  return null;
}
