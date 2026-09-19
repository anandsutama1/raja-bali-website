import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";
import { getIdrToUsdRate } from "@/lib/paypal/exchangeRate";
import { checkRateLimit } from "@/lib/paypal/rateLimit";
import {
  LINK_TTL_MS,
  buildPayUrl,
  generateReference,
  isStaffPasswordValid,
} from "@/lib/deposit/link";
import { postToDepositSheet } from "@/lib/deposit/sheets";

// Sanity bounds on the USD amount that will actually be charged — a typo
// guard (an extra zero on an IDR amount), not a business rule.
const MIN_USD = 1;
const MAX_USD = 10000;

const text = (value, max) => String(value ?? "").trim().slice(0, max);

export async function POST(request) {
  const limited = checkRateLimit(request, "staff-deposit-link");
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isStaffPasswordValid(body?.password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const guestName = text(body.guestName, 120);
  const contact = text(body.contact, 160);
  if (!guestName || !contact) {
    return NextResponse.json({ error: "Guest name and contact are required." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0 || !["IDR", "USD"].includes(body.currency)) {
    return NextResponse.json({ error: "Enter a valid amount and currency." }, { status: 400 });
  }

  const rate = await getIdrToUsdRate();
  // USD is what PayPal charges, so it is the locked figure. When staff
  // quote in IDR, the USD is computed once here (with the exact rate they
  // see in the response) and frozen into the signed link, so it can't
  // drift between sending the link and the guest paying.
  const usd = body.currency === "USD" ? Number(amount.toFixed(2)) : Number((amount * rate).toFixed(2));
  const idr = body.currency === "IDR" ? Math.round(amount) : Math.round(amount / rate);
  if (usd < MIN_USD || usd > MAX_USD) {
    return NextResponse.json(
      { error: `That works out to USD ${usd.toFixed(2)}. Deposits must be between USD ${MIN_USD} and USD ${MAX_USD}.` },
      { status: 400 }
    );
  }

  const locale = LOCALES.includes(body.locale) ? body.locale : DEFAULT_LOCALE;
  const ref = generateReference();
  const exp = Date.now() + LINK_TTL_MS;
  const link = buildPayUrl({ locale, ref, usd, idr, exp, baseUrl: SITE_URL });

  const sheet = await postToDepositSheet({
    action: "create",
    ref,
    guestName,
    contact,
    eventDate: text(body.eventDate, 40),
    groupSize: text(body.groupSize, 20),
    notes: text(body.notes, 500),
    depositIdr: idr,
    depositUsd: usd,
    link,
  });

  return NextResponse.json({ ref, link, usd, idr, rate, recorded: sheet.ok });
}
