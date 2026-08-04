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

// Only the two dine-in branches map to a physical address — cooking/bar
// classes, private events, and group bookings are all "general" and get a
// central contact line instead in the guest confirmation footer.
const BRANCH_LOCATION_ID = {
  main: "main-restaurant",
  nusadua: "nusa-dua",
};

const FORM_LABELS = {
  contact: "Contact Us",
  "reservation-main": "Reservation — Main Restaurant",
  "reservation-nusadua": "Reservation — Nusa Dua",
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

// Guest email copy per experience — deliberately says "received", not
// "confirmed": nothing is confirmed until the team follows up, so claiming
// otherwise here would overpromise. Written separately per type rather than
// one generic "reservation" voice, since a cooking class booking and a
// private event enquiry aren't the same thing to the guest reading this.
const BOOKING_COPY = {
  "reservation-main": {
    eyebrow: "Booking Received",
    headline: "Your Booking Has Been Received",
    intro: (locationName) =>
      `Thank you for placing a table reservation with <strong>${escapeHtml(locationName)}</strong>. We&rsquo;ve received your request, and our team will get back to you shortly to confirm every detail.`,
  },
  "reservation-nusadua": {
    eyebrow: "Booking Received",
    headline: "Your Booking Has Been Received",
    intro: (locationName) =>
      `Thank you for placing a table reservation with <strong>${escapeHtml(locationName)}</strong>. We&rsquo;ve received your request, and our team will get back to you shortly to confirm every detail.`,
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
    ["Message", fields.message],
  ].filter(([, value]) => value);

  const rowsHtml = rows
    .map(
      ([rowLabel, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#141414;white-space:nowrap;">${rowLabel}</td><td style="padding:6px 12px;color:#333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#A31C1C;margin-bottom:16px;">New ${label} Submission</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rowsHtml}</table>
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent automatically from the Raja Bali website.</p>
    </div>
  `;
}

function buildGuestConfirmationHtml(formType, branch, fields) {
  const locationName = BRANCH_NAMES[branch] || BRANCH_NAMES.general;
  const guestName =
    [fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Guest";
  const isReservation = RESERVATION_FORM_TYPES.has(formType);
  const location = LOCATIONS.find((l) => l.id === BRANCH_LOCATION_ID[branch]);
  const logoUrl = `${SITE_URL}/images/shared/RajaBali_Navbar.png`;

  const summaryRows = isReservation
    ? [
        ["Date", fields.date],
        ["Time", fields.time],
        ["Number of Adults", fields.guests],
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

  const closing = isReservation
    ? "We&rsquo;re looking forward to the opportunity to welcome you, and will follow up shortly to confirm every detail."
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

  const contactHtml = location
    ? `
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#A31C1C;">Visit Us</p>
      <p style="margin:0;font-size:13px;line-height:1.7;color:#6b6355;">
        <strong style="color:#2b2620;">${escapeHtml(EMAIL_LOCATION_NAMES[location.id] || location.name)}</strong><br />
        ${escapeHtml(location.streetAddress)}, ${escapeHtml(location.addressLocality)}<br />
        ${escapeHtml(location.telephone)}
      </p>
    `
    : `
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#A31C1C;">Reach Us</p>
      <p style="margin:0;font-size:13px;line-height:1.7;color:#6b6355;">
        Main Restaurant: ${escapeHtml(LOCATIONS[0].telephone)}<br />
        Second Outlet: ${escapeHtml(LOCATIONS[1].telephone)}
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
                <p style="margin:24px 0 0;font-size:11px;color:#a39c8c;">This is an automated notice — for urgent enquiries, please contact us directly.</p>
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
    subject: `New ${label} submission — Raja Bali`,
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
  const subject = isReservation
    ? `We've Received Your Booking — ${locationName}`
    : `We've Received Your Message — ${locationName}`;

  const { error } = await resend.emails.send({
    from: "Raja Bali <noreply@rajabalirestaurant.co>",
    to: fields.email,
    subject,
    html: buildGuestConfirmationHtml(formType, branch, fields),
  });

  if (error) throw new Error(error.message || "Resend failed to send the guest confirmation.");
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

  const [sheetsResult, emailResult] = await Promise.allSettled([
    submitToGoogleSheets({ formType, branch, ...fields }),
    sendNotificationEmail({ formType, targetEmail, fields }),
  ]);

  const sheetsOk = sheetsResult.status === "fulfilled";
  const emailOk = emailResult.status === "fulfilled";

  if (!sheetsOk) console.error("Google Sheets submission failed:", sheetsResult.reason);
  if (!emailOk) console.error("Resend email failed:", emailResult.reason);

  // Guest confirmation is best-effort only and never affects whether the
  // request is considered successful, so it doesn't need to hold up the
  // response — it was previously awaited alongside Sheets/notification and
  // was often the slowest of the three, adding a couple of seconds of pure
  // wait with nothing for the guest to show for it. `after()` runs it once
  // the response is already on its way back to the browser.
  after(() =>
    sendGuestConfirmationEmail({ formType, branch, fields }).catch((err) =>
      console.error("Guest confirmation email failed:", err)
    )
  );

  if (!sheetsOk && !emailOk) {
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't process your request right now. Please try again or contact us directly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, sheetsOk, emailOk });
}
