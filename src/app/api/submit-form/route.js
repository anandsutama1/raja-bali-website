import { NextResponse, after } from "next/server";
import { Resend } from "resend";
import { LOCATIONS, SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

const BRANCH_EMAILS = {
  main: process.env.EMAIL_MAIN_RESTAURANT,
  nusadua: process.env.EMAIL_NUSA_DUA,
  general: process.env.EMAIL_MAIN_RESTAURANT,
};

const BRANCH_NAMES = {
  main: "Raja Bali Main Restaurant",
  nusadua: "Raja Bali Second Outlet",
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
// otherwise there would overpromise. Written separately per type rather
// than one generic "reservation" voice, since a cooking class booking and
// a private event enquiry aren't the same thing to the guest reading this.
const TABLE_RESERVATION_TYPES = new Set(["reservation-main", "reservation-nusadua"]);
const BOOKING_COPY = {
  "reservation-main": {
    eyebrow: "Reservation Confirmed",
    headline: "Your Table Is Confirmed",
    intro: (locationName) =>
      `Thank you for reserving a table with <strong>${escapeHtml(locationName)}</strong>. Your reservation is confirmed, and we&rsquo;re looking forward to welcoming you.`,
    closing: (whatsappLink) =>
      `If your plans change or you have any special requests, please reach out to us on ${whatsappLink} &mdash; this inbox is unattended, so replying here won&rsquo;t reach us. We&rsquo;re happy to help.`,
  },
  "reservation-nusadua": {
    eyebrow: "Reservation Confirmed",
    headline: "Your Table Is Confirmed",
    intro: (locationName) =>
      `Thank you for reserving a table with <strong>${escapeHtml(locationName)}</strong>. Your reservation is confirmed, and we&rsquo;re looking forward to welcoming you.`,
    closing: (whatsappLink) =>
      `If your plans change or you have any special requests, please reach out to us on ${whatsappLink} &mdash; this inbox is unattended, so replying here won&rsquo;t reach us. We&rsquo;re happy to help.`,
  },
  "cooking-class": {
    eyebrow: "Booking Received",
    headline: "Your Cooking Class Booking Has Been Received",
    intro: () =>
      `Thank you for booking a place in our Balinese Cooking Class. We&rsquo;ve received your request, and our team will get back to you shortly to confirm your session.`,
  },
  "bar-class": {
    eyebrow: "Booking Received",
    headline: "Your Cocktail Class Booking Has Been Received",
    intro: () =>
      `Thank you for booking a place in our Balinese Cocktail Class. We&rsquo;ve received your request, and our team will get back to you shortly to confirm your session.`,
    note: "This experience runs exclusively on Thursdays at 3:00 PM. If the date you requested isn't a Thursday, our team will reach out to reschedule.",
  },
  "private-events": {
    eyebrow: "Enquiry Received",
    headline: "Your Private Event Enquiry Has Been Received",
    intro: () =>
      `Thank you for reaching out about hosting your event with us. We&rsquo;ve received your enquiry, and our events team will get back to you shortly to discuss the details.`,
  },
  "group-reservation": {
    eyebrow: "Request Received",
    headline: "Your Group Reservation Request Has Been Received",
    intro: () =>
      `Thank you for your group reservation request. We&rsquo;ve received your details, and our team will get back to you shortly to confirm availability and your buffet package.`,
  },
};

// Where the "view details" button in the guest email points — keyed by
// formType, only for actual bookings (contact enquiries don't get one).
const EXPERIENCE_CTA = {
  "reservation-main": { path: "/reservation-main", label: "View Restaurant Details" },
  "reservation-nusadua": { path: "/reservation-nusadua", label: "View Restaurant Details" },
  "cooking-class": { path: "/cooking-class", label: "View Cooking Class Details" },
  "bar-class": { path: "/bar-class", label: "View Cocktail Class Details" },
  "private-events": { path: "/private-events", label: "View Private Events" },
  "group-reservation": { path: "/group-reservation", label: "View Group Packages" },
};

// Display names for the guest email only — the rest of the site still says
// "Tanjung Benoa" / "Nusa Dua" (outlets page, schema.org, footer nav, etc.);
// this is scoped narrowly to guest-facing email copy per request.
const EMAIL_LOCATION_NAMES = {
  "main-restaurant": "Raja Bali Main Restaurant",
  "nusa-dua": "Raja Bali Second Outlet",
};

// Shown on every booking-type confirmation, not just Nusa Dua reservations —
// guests staying in the Nusa Dua area may be headed to either outlet.
const PICKUP_NOTE =
  "Complimentary pickup service for guests staying around the Nusa Dua area is available, subject to availability.";

// Table reservations only — a cooking/bar class or private event session
// isn't "released" the same way a table is, so this doesn't apply there.
const NO_SHOW_NOTE =
  "Please note: your table will be held for 30 minutes past the reservation time. If you haven't arrived by then, the booking may be released and treated as cancelled.";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildEmailHtml(formType, fields) {
  const label = FORM_LABELS[formType] || formType;

  const rows = [
    ["Name", [fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ")],
    ["Email", fields.email],
    ["WhatsApp", fields.whatsapp],
    ["Date", fields.date],
    ["Time", fields.time],
    ["Guests", fields.guests],
    ["Hotel Name", fields.hotelName],
    ["Room Number", fields.roomNumber],
    ["Message", fields.message],
  ].filter(([, value]) => value);

  const rowsHtml = rows
    .map(
      ([rowLabel, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#141414;white-space:nowrap;">${rowLabel}</td><td style="padding:6px 12px;color:#333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  // Hotel Name / Room Number are easy to miss as a "this guest needs pickup"
  // signal if you're just skimming the table, so it's spelled out here too.
  const pickupNoteHtml =
    fields.hotelName || fields.roomNumber
      ? `<p style="margin:16px 0 0;padding:10px 14px;background:#fff4e5;border-left:3px solid #d97706;color:#7a4a00;font-size:13px;font-weight:600;">⚠ Guest needs pickup &mdash; see hotel/room details above.</p>`
      : "";

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#A31C1C;margin-bottom:16px;">New ${label} Submission</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rowsHtml}</table>
      ${pickupNoteHtml}
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent automatically from the Raja Bali website.</p>
    </div>
  `;
}

function buildGuestConfirmationHtml(formType, branch, fields) {
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

  const summaryRows = isReservation
    ? [
        ["Date", fields.date],
        ["Time", fields.time],
        ["Number of Adults", fields.guests],
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

  const booking = BOOKING_COPY[formType];
  const eyebrow = isReservation ? booking.eyebrow : "Message Received";
  const headline = isReservation ? booking.headline : "Thank You for Writing to Us";

  const intro = isReservation
    ? booking.intro(locationName)
    : `Thank you for writing to <strong>${escapeHtml(locationName)}</strong>. Your message has reached us safely, and a member of our team will respond to you personally very soon.`;

  const whatsappLink = `<a href="${whatsappHref}" style="color:#A31C1C;text-decoration:none;">WhatsApp</a>`;
  const closing = isReservation
    ? (typeof booking.closing === "function" ? booking.closing(whatsappLink) : booking.closing) ||
      "We&rsquo;re looking forward to the opportunity to welcome you, and will follow up shortly to confirm every detail."
    : "We are grateful for your interest in Raja Bali, and look forward to the opportunity of welcoming you soon.";

  const cta = EXPERIENCE_CTA[formType];
  const ctaHtml = cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
        <tr>
          <td style="background:#141414;">
            <a href="${SITE_URL}${cta.path}" style="display:inline-block;padding:13px 30px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;text-decoration:none;">${cta.label}</a>
          </td>
        </tr>
      </table>
    `
    : "";

  const notes = isReservation
    ? [booking.note, TABLE_RESERVATION_TYPES.has(formType) ? NO_SHOW_NOTE : null, PICKUP_NOTE].filter(Boolean)
    : [];
  const notesHtml = notes.length
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background:#faf7f1;border-left:3px solid #A31C1C;">
        <tr>
          <td style="padding:14px 18px;">
            ${notes
              .map(
                (n, i) =>
                  `<p style="margin:${i === 0 ? "0" : "8px 0 0"};font-size:13px;line-height:1.6;color:#6b6355;">${n}</p>`
              )
              .join("")}
          </td>
        </tr>
      </table>
    `
    : "";

  const contactHtml = `
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#A31C1C;">Visit Us</p>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#6b6355;">
      <strong style="color:#2b2620;">${escapeHtml(EMAIL_LOCATION_NAMES[location.id] || location.name)}</strong><br />
      ${escapeHtml(location.streetAddress)}, ${escapeHtml(location.addressLocality)}<br />
      WhatsApp: <a href="${whatsappHref}" style="color:#A31C1C;text-decoration:none;">${escapeHtml(location.telephone)}</a>
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
                <p style="margin:0 0 14px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#A31C1C;">${eyebrow}</p>
                <h1 style="margin:0 0 28px;font-size:25px;font-weight:400;color:#141414;line-height:1.35;">${headline}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#2b2620;">Dear ${escapeHtml(guestName)},</p>
                <p style="margin:0;font-size:15px;line-height:1.75;color:#2b2620;">${intro}</p>

                ${summaryHtml}

                ${ctaHtml}

                ${notesHtml}

                ${
                  fields.message
                    ? `<p style="margin:24px 0 0;font-size:14px;line-height:1.75;color:#2b2620;"><em>Your note to us:</em> &ldquo;${escapeHtml(fields.message)}&rdquo;</p>`
                    : ""
                }

                <p style="margin:24px 0 0;font-size:15px;line-height:1.75;color:#2b2620;">${closing}</p>

                <p style="margin:32px 0 0;font-size:15px;line-height:1.75;color:#2b2620;">Warmly,<br /><strong>The Raja Bali Team</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px 40px;">
                <hr style="border:none;border-top:1px solid #e8e0d0;margin:0 0 24px;" />
                ${contactHtml}
                <p style="margin:24px 0 0;font-size:11px;color:#a39c8c;">This is an automated notice. For urgent enquiries, please contact us directly.</p>
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

  const { error } = await resend.emails.send({
    from: "Raja Bali Website <noreply@rajabalirestaurant.co>",
    to: targetEmail,
    subject: `New ${label} Submission | Raja Bali`,
    html: buildEmailHtml(formType, fields),
  });

  if (error) throw new Error(error.message || "Resend failed to send the email.");
}

// Confirmation email to the guest themselves — kept fully independent from
// the restaurant notification above (Promise.allSettled in POST) so a
// failure here never blocks the restaurant from getting the booking.
async function sendGuestConfirmationEmail({ formType, branch, fields }) {
  if (!fields.email) throw new Error("No guest email address provided.");

  const locationName = BRANCH_NAMES[branch] || BRANCH_NAMES.general;
  const isReservation = RESERVATION_FORM_TYPES.has(formType);
  const subject = TABLE_RESERVATION_TYPES.has(formType)
    ? `Your Reservation Is Confirmed (${locationName})`
    : isReservation
      ? `We've Received Your Booking (${locationName})`
      : `We've Received Your Message (${locationName})`;

  const { error } = await resend.emails.send({
    from: "Raja Bali <noreply@rajabalirestaurant.co>",
    to: fields.email,
    subject,
    html: buildGuestConfirmationHtml(formType, branch, fields),
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
