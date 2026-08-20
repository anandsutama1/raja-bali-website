import { NextResponse, after } from "next/server";
import { Resend } from "resend";
import { LOCATIONS, SITE_URL } from "@/lib/site";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

const resend = new Resend(process.env.RESEND_API_KEY);

const BRANCH_EMAILS = {
  main: process.env.EMAIL_MAIN_RESTAURANT,
  nusadua: process.env.EMAIL_NUSA_DUA,
  general: process.env.EMAIL_MAIN_RESTAURANT,
};

const BRANCH_NAMES = {
  main: "Raja Bali Nusa Dua (Main Restaurant)",
  nusadua: "Raja Bali Nusa Dua (Dine-in Restaurant)",
  general: "Raja Bali",
};

// Which outlet's WhatsApp number and address appear in the guest
// confirmation footer. Only the Nusa Dua reservation branch routes to that
// outlet directly — every other branch (main restaurant dine-in, plus every
// activity: cooking/bar classes, private events, group bookings) routes to
// the main restaurant's WhatsApp number.
const BRANCH_LOCATION_ID = {
  main: "main-restaurant",
  nusadua: "nusa-dua",
  general: "main-restaurant",
};

const FORM_LABELS = {
  contact: "Contact Us",
  "reservation-main": "Main Restaurant Reservation",
  "reservation-nusadua": "Nusa Dua Reservation",
  "cooking-class": "Cooking Class Reservation",
  "bar-class": "Bar Class Reservation",
  "private-events": "Private Events Enquiry",
  "group-reservation": "Group Reservation Enquiry",
};

// Maps a form's `formType` (hyphenated, matches THANK_YOU_LINKS/Sheets
// column naming) to its key in dictionaries/*/email.json (camelCase, a
// valid JS identifier).
const EMAIL_DICT_KEYS = {
  "reservation-main": "reservationMain",
  "reservation-nusadua": "reservationNusadua",
  "cooking-class": "cookingClass",
  "bar-class": "barClass",
  "private-events": "privateEvents",
  "group-reservation": "groupReservation",
  contact: "contact",
};

// Forms with a date/time/guests reservation shape vs. a plain enquiry (contact).
const RESERVATION_FORM_TYPES = new Set([
  "reservation-main",
  "reservation-nusadua",
  "cooking-class",
  "bar-class",
  "private-events",
  "group-reservation",
]);

// Plain table reservations at either outlet are auto-confirmed on submit —
// seating isn't capacity-constrained the way a class session or private
// event is, so there's no reason to make the guest wait on a human reply.
// Everything else in RESERVATION_FORM_TYPES still says "received", not
// "confirmed": nothing is confirmed until the team follows up, so claiming
// otherwise there would overpromise.
const TABLE_RESERVATION_TYPES = new Set(["reservation-main", "reservation-nusadua"]);

// The only form types that ever present the Nusa Dua pickup checkbox to the
// guest. Private events and group reservations never offer it, so their ops
// emails shouldn't claim a pickup status either way.
const PICKUP_ELIGIBLE_TYPES = new Set([
  "reservation-main",
  "reservation-nusadua",
  "cooking-class",
  "bar-class",
]);

// Display names for the guest email only.
const EMAIL_LOCATION_NAMES = {
  "main-restaurant": "Raja Bali Nusa Dua (Main Restaurant)",
  "nusa-dua": "Raja Bali Nusa Dua (Dine-in Restaurant)",
};

// Staff sometimes hit "Reply" on this notification instead of messaging the
// guest directly, which silently goes nowhere (this inbox isn't monitored)
// and the guest never hears back. Placed after the heading and pickup
// status — title first, then pickup, then this — while staying above the
// data table so it's still seen before any reply, not buried under a later
// "show quoted text" fold once this thread has a few messages in it.
const NO_REPLY_BANNER_HTML =
  '<p style="margin:0 0 16px;padding:12px 14px;background:#fdecea;border-left:4px solid #A31C1C;color:#7a1f1f;font-size:14px;font-weight:700;">⚠️ Do not reply to this email.<br />Replying will NOT reach the guest.<br />To contact the guest, use their email or WhatsApp number below.</p>';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// A public, unauthenticated endpoint can receive any string in fields.locale
// (or none at all), so this is the one place that decides what "the guest's
// language" actually means — falls back to English for anything not in
// LOCALES rather than letting a bad value reach getDictionary().
function resolveLocale(value) {
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

// Fills `{token}` placeholders in an email.json template string — used for
// the handful of strings that need a runtime value spliced in (locationName,
// guestName, a pre-built WhatsApp <a> tag). Callers escape any user-facing
// HTML-unsafe value (guestName, locationName) before passing it in here.
function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));
}

// Single source of truth for "this booking needs pickup" — computed once
// from the raw fields and reused everywhere (table row filtering, the
// warning banner, and logging) so there's no way for the banner to
// disagree with whether hotel/room data actually made it into the email.
function needsPickup(fields) {
  return Boolean(fields.hotelName) || Boolean(fields.roomNumber);
}

// Staff notification email stays hardcoded English on purpose — internal
// tool, not guest-facing, so it doesn't need to track the guest's locale.
function buildEmailHtml(formType, fields) {
  const label = FORM_LABELS[formType] || formType;
  const hasPickup = needsPickup(fields);
  const isPickupEligible = PICKUP_ELIGIBLE_TYPES.has(formType);

  const rows = [
    ["Name", [fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ")],
    ["Email", fields.email],
    ["WhatsApp", fields.whatsapp],
    ["Date", fields.date],
    ["Time", fields.time],
    ["Adults", fields.guests],
    ["Children", fields.children],
    ["Hotel Name", fields.hotelName],
    ["Room Number", fields.roomNumber],
    ["Message", fields.message],
    ["Language", fields.locale === "zh" ? "Chinese (zh)" : "English (en)"],
  ].filter(([, value]) => value);

  const rowsHtml = rows
    .map(
      ([rowLabel, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#141414;white-space:nowrap;">${rowLabel}</td><td style="padding:6px 12px;color:#333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  // Hotel Name / Room Number are easy to miss as a "this guest needs pickup"
  // signal if you're just skimming the table, so it's spelled out here too —
  // placed ABOVE the table (not below), since a long guest message can push
  // anything after the table out of view on mobile or below an email
  // client's clipping point. Deliberately tied to the same `hasPickup` flag
  // as the table rows above — never re-derive this separately, or the two
  // can drift out of sync.
  //
  // Shown either way (needed or not) for every pickup-eligible form type,
  // not just when pickup is requested — staff should never have to wonder
  // whether "no warning" means "no pickup" or "the note didn't render".
  const pickupNoteHtml = !isPickupEligible
    ? ""
    : hasPickup
      ? `<p style="margin:0 0 16px;padding:12px 14px;background:#fff4e5;border-left:3px solid #d97706;color:#7a4a00;font-size:14px;font-weight:700;">⚠ GUEST NEEDS PICKUP &mdash; see Hotel Name / Room Number below.</p>`
      : `<p style="margin:0 0 16px;padding:12px 14px;background:#f0f7f0;border-left:3px solid #4a8f4a;color:#2f5c2f;font-size:14px;font-weight:700;">✓ No pickup needed for this booking.</p>`;

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#A31C1C;margin-bottom:16px;">New ${label} Submission</h2>
      ${pickupNoteHtml}
      ${NO_REPLY_BANNER_HTML}
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rowsHtml}</table>
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent automatically from the Raja Bali website.</p>
    </div>
  `;
}

// Small "what to do next" block appended to the guest confirmation email —
// the email counterpart of the thank-you page's "You May Also Like" links
// (both read from the same getThankYouLinks(labels) + common.json labels,
// so the two surfaces never disagree on what's suggested for a given
// formType or how it's worded in the guest's language).
function buildSuggestedLinksHtml(formType, emailDict, thankYouLabels) {
  const links = getThankYouLinks(thankYouLabels)[formType];
  if (!links || !links.length) return "";

  // Chip-style buttons (not the page's image cards — email clients block
  // remote images by default often enough that leading with a photo would
  // just as often show a broken icon). Same brand colors as the rest of
  // this template (#faf7f1/#e8e0d0 from notesHtml, #A31C1C accent),
  // fixed min-width so a short label like "Contact Us" and a long one like
  // "Balinese Cooking Class" still read as the same size button.
  const itemsHtml = links
    .map(
      (link) =>
        `<a href="${SITE_URL}${link.path}" style="display:inline-block;min-width:140px;margin:0 8px 8px 0;padding:12px 18px;border:1px solid #e8e0d0;border-radius:6px;background:#faf7f1;color:#141414;font-size:12px;font-weight:700;letter-spacing:0.4px;text-decoration:none;text-align:center;">${escapeHtml(link.label)}</a>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td>
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#A31C1C;">${escapeHtml(emailDict.common.planningVisit)}</p>
          ${itemsHtml}
        </td>
      </tr>
    </table>
  `;
}

// `emailDict` is dictionaries/*/email.json for the guest's own locale (see
// resolveLocale/sendGuestConfirmationEmail) — every guest-facing string in
// this email comes from there, nothing is hardcoded English here anymore.
function buildGuestConfirmationHtml(formType, branch, fields, emailDict, thankYouLabels) {
  const locationName = BRANCH_NAMES[branch] || BRANCH_NAMES.general;
  const guestName =
    [fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Guest";
  const isReservation = RESERVATION_FORM_TYPES.has(formType);
  // Every branch now maps to an outlet (general -> main restaurant), so this
  // always resolves — the fallback only guards a formType/branch pairing
  // that isn't wired up above.
  const location =
    LOCATIONS.find((l) => l.id === BRANCH_LOCATION_ID[branch]) ||
    LOCATIONS.find((l) => l.id === "main-restaurant");
  const whatsappHref = `https://wa.me/${location.telephone.replace(/\D/g, "")}`;
  const logoUrl = `${SITE_URL}/images/shared/RajaBali_Navbar.png`;
  const common = emailDict.common;

  const summaryRows = isReservation
    ? [
        ["Date", fields.date],
        ["Time", fields.time],
        ["Number of Adults", fields.guests],
        ["Number of Children", fields.children],
        ["Hotel Name", fields.hotelName],
        ["Room Number", fields.roomNumber],
      ].filter(([, value]) => value)
    : [];

  const summaryHtml = summaryRows.length
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:28px 0;">
        ${summaryRows
          .map(
            ([rowLabel, value]) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e8e0d0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#A31C1C;white-space:nowrap;vertical-align:top;">${rowLabel}</td>
                <td style="padding:12px 0;border-bottom:1px solid #e8e0d0;font-size:15px;color:#2b2620;text-align:right;">${escapeHtml(value)}</td>
              </tr>`
          )
          .join("")}
      </table>
    `
    : "";

  const booking = emailDict[EMAIL_DICT_KEYS[formType]];
  const eyebrow = booking.eyebrow;
  const headline = booking.headline;
  const intro = interpolate(booking.intro, { locationName: escapeHtml(locationName) });

  const whatsappLink = `<a href="${whatsappHref}" style="color:#A31C1C;text-decoration:none;">${escapeHtml(common.whatsapp)}</a>`;
  const closing = interpolate(booking.closing, { whatsappLink });

  const suggestedLinksHtml = buildSuggestedLinksHtml(formType, emailDict, thankYouLabels);

  const notes = isReservation
    ? [booking.note, TABLE_RESERVATION_TYPES.has(formType) ? common.noShowNote : null, common.pickupNote].filter(Boolean)
    : [];
  const notesHtml = notes.length
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background:#faf7f1;border-left:3px solid #A31C1C;">
        <tr>
          <td style="padding:14px 18px;">
            ${notes
              .map(
                (n, i) =>
                  `<p style="margin:${i === 0 ? "0" : "8px 0 0"};font-size:13px;line-height:1.6;color:#6b6355;">${escapeHtml(n)}</p>`
              )
              .join("")}
          </td>
        </tr>
      </table>
    `
    : "";

  const contactHtml = `
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#A31C1C;">${escapeHtml(common.visitUs)}</p>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#6b6355;">
      <strong style="color:#2b2620;">${escapeHtml(EMAIL_LOCATION_NAMES[location.id] || location.name)}</strong><br />
      ${escapeHtml(location.streetAddress)}, ${escapeHtml(location.addressLocality)}<br />
      ${escapeHtml(common.whatsapp)}: <a href="${whatsappHref}" style="color:#A31C1C;text-decoration:none;">${escapeHtml(location.telephone)}</a>
    </p>
  `;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0e6;font-family:Georgia,'Times New Roman',serif;">
      <tr>
        <td align="center" style="padding:48px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e8e0d0;border-top:3px solid #A31C1C;">
            <tr>
              <td style="padding:44px 40px 0;text-align:center;">
                <img src="${logoUrl}" width="120" alt="Raja Bali" style="display:block;margin:0 auto 24px;width:120px;max-width:120px;" />
                <p style="margin:0 0 14px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#A31C1C;">${escapeHtml(eyebrow)}</p>
                <h1 style="margin:0 0 28px;font-size:25px;font-weight:400;color:#141414;line-height:1.35;">${escapeHtml(headline)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#2b2620;">${interpolate(common.dearGuest, { guestName: escapeHtml(guestName) })}</p>
                <p style="margin:0;font-size:15px;line-height:1.75;color:#2b2620;">${intro}</p>

                ${summaryHtml}

                ${suggestedLinksHtml}

                ${notesHtml}

                ${
                  fields.message
                    ? `<p style="margin:24px 0 0;font-size:14px;line-height:1.75;color:#2b2620;"><em>${escapeHtml(common.yourNote)}</em> &ldquo;${escapeHtml(fields.message)}&rdquo;</p>`
                    : ""
                }

                <p style="margin:24px 0 0;font-size:15px;line-height:1.75;color:#2b2620;">${closing}</p>

                <p style="margin:32px 0 0;font-size:15px;line-height:1.75;color:#2b2620;">${escapeHtml(common.signOff)}<br /><strong>${escapeHtml(common.teamName)}</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px 40px;">
                <hr style="border:none;border-top:1px solid #e8e0d0;margin:0 0 24px;" />
                ${contactHtml}
                <p style="margin:24px 0 0;font-size:11px;color:#a39c8c;">${escapeHtml(common.automatedNotice)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

async function submitToGoogleSheets(payload) {
  const url = process.env.GOOGLE_SHEETS_URL;
  if (!url) throw new Error("GOOGLE_SHEETS_URL is not configured.");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  });

  if (!res.ok) {
    throw new Error(`Google Sheets responded with ${res.status}`);
  }
}

async function sendNotificationEmail({ formType, targetEmail, fields }) {
  if (!targetEmail) throw new Error("No destination email configured for this branch.");

  const label = FORM_LABELS[formType] || formType;
  const hasPickup = needsPickup(fields);

  // Logged unconditionally (not just on pickup) so a Vercel log search for
  // "pickup check" always shows exactly what the server computed for any
  // given submission — the fastest way to confirm or rule out a mismatch
  // if a guest ever reports the warning banner missing again.
  console.log("[submit-form] pickup check", {
    formType,
    hasHotelName: Boolean(fields.hotelName),
    hasRoomNumber: Boolean(fields.roomNumber),
    willShowPickupNote: hasPickup,
  });

  // Also flagged in the subject line, not just the email body — visible in
  // the inbox list without even opening the email, so it can't be missed
  // regardless of how the body renders or where it gets scrolled/clipped.
  const subject = hasPickup
    ? `🚗 PICKUP NEEDED: New ${label} Submission | Raja Bali`
    : `New ${label} Submission | Raja Bali`;

  const { error } = await resend.emails.send({
    from: "Raja Bali Website <noreply@rajabalirestaurant.co>",
    to: targetEmail,
    subject,
    html: buildEmailHtml(formType, fields),
  });

  if (error) throw new Error(error.message || "Resend failed to send the email.");
}

// Confirmation email to the guest themselves — kept fully independent from
// the restaurant notification above (Promise.allSettled in POST) so a
// failure here never blocks the restaurant from getting the booking.
// Renders in the guest's own locale (fields.locale, defaulting to English —
// see resolveLocale).
async function sendGuestConfirmationEmail({ formType, branch, fields }) {
  if (!fields.email) throw new Error("No guest email address provided.");

  const locale = resolveLocale(fields.locale);
  const [emailDict, common] = await Promise.all([
    getDictionary(locale, "email"),
    getDictionary(locale, "common"),
  ]);

  const locationName = BRANCH_NAMES[branch] || BRANCH_NAMES.general;
  const isReservation = RESERVATION_FORM_TYPES.has(formType);
  const subject = interpolate(
    TABLE_RESERVATION_TYPES.has(formType)
      ? emailDict.common.subjectReservationConfirmed
      : isReservation
        ? emailDict.common.subjectBookingReceived
        : emailDict.common.subjectMessageReceived,
    { locationName }
  );

  const { error } = await resend.emails.send({
    from: "Raja Bali <noreply@rajabalirestaurant.co>",
    to: fields.email,
    subject,
    html: buildGuestConfirmationHtml(formType, branch, fields, emailDict, common.thankYouLinks),
  });

  if (error) throw new Error(error.message || "Resend failed to send the guest confirmation.");
}

// Logs the failure (with a label) but re-throws, so this can wrap a promise
// passed into Promise.any() without masking which branch actually failed.
function withLogging(promise, label) {
  return promise.catch((err) => {
    console.error(`${label} failed:`, err);
    throw err;
  });
}

// TODO: WhatsApp notification (not implemented yet). Once a provider is
// chosen (e.g. Twilio, WhatsApp Cloud API), send a message here using the
// same `fields` payload as the email above, then call it from POST alongside
// the Sheets/email calls below.
// async function sendWhatsAppNotification({ formType, branch, fields }) {}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { formType, branch, ...fields } = body ?? {};

  if (!formType) {
    return NextResponse.json({ ok: false, error: "Missing formType." }, { status: 400 });
  }

  const targetEmail = BRANCH_EMAILS[branch] || BRANCH_EMAILS.general;

  // Guest confirmation is best-effort only and never affects whether the
  // request is considered successful, so it doesn't need to hold up the
  // response. `after()` runs it once the response is already on its way
  // back to the browser.
  after(() =>
    sendGuestConfirmationEmail({ formType, branch, fields }).catch((err) =>
      console.error("Guest confirmation email failed:", err)
    )
  );

  // Sheets and the restaurant notification email both count as "the booking
  // got through" — whichever succeeds FIRST is enough to tell the guest so,
  // instead of always waiting for both. This matters because Google Apps
  // Script (Sheets) can take several seconds and used to dominate the whole
  // request; Resend's email API is typically much faster. Only if BOTH fail
  // do we tell the guest something went wrong. Sheets keeps running via
  // after() even once the notification email alone has settled it.
  const sheetsPromise = withLogging(
    submitToGoogleSheets({ formType, branch, ...fields }),
    "Google Sheets submission"
  );
  const emailPromise = withLogging(
    sendNotificationEmail({ formType, targetEmail, fields }),
    "Resend notification email"
  );
  after(() => Promise.allSettled([sheetsPromise, emailPromise]));

  try {
    await Promise.any([sheetsPromise, emailPromise]);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't process your request right now. Please try again or contact us directly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
