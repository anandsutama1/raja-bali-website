import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BRANCH_EMAILS = {
  main: process.env.EMAIL_MAIN_RESTAURANT,
  nusadua: process.env.EMAIL_NUSA_DUA,
  general: process.env.EMAIL_MAIN_RESTAURANT,
};

const BRANCH_NAMES = {
  main: "Raja Bali Main Restaurant, Tanjung Benoa",
  nusadua: "Raja Bali Nusa Dua",
  general: "Raja Bali",
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

  const summaryRows = isReservation
    ? [
        ["Date", fields.date],
        ["Time", fields.time],
        ["Party Size", fields.guests],
      ].filter(([, value]) => value)
    : [];

  const summaryHtml = summaryRows.length
    ? `
      <table style="width:100%;border-collapse:collapse;margin:28px 0;">
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

  const intro = isReservation
    ? `It is our pleasure to confirm that your reservation request with <strong>${escapeHtml(locationName)}</strong> has been received. Our team is preparing to welcome you, and will be in touch shortly to finalize every detail of your visit.`
    : `Thank you for writing to <strong>${escapeHtml(locationName)}</strong>. Your message has been received with the greatest care, and a member of our team will respond to you shortly.`;

  const closing = isReservation
    ? "We look forward to welcoming you into the warmth of Balinese hospitality, and to sharing an experience of authentic flavor and gracious service you will long remember."
    : "We are grateful for your interest in Raja Bali, and look forward to the opportunity to welcome you soon.";

  return `
    <div style="background:#f4f0e6;padding:40px 16px;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;padding:48px 40px;border:1px solid #e8e0d0;">
        <div style="text-align:center;margin-bottom:32px;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A31C1C;">Raja Bali</p>
          <h1 style="margin:0;font-size:26px;font-weight:400;color:#141414;">Your Reservation, Confirmed with Care</h1>
        </div>

        <p style="font-size:15px;line-height:1.75;color:#2b2620;">Dear ${escapeHtml(guestName)},</p>
        <p style="font-size:15px;line-height:1.75;color:#2b2620;">${intro}</p>

        ${summaryHtml}

        ${
          fields.message
            ? `<p style="font-size:14px;line-height:1.75;color:#2b2620;"><em>Your note to us:</em> &ldquo;${escapeHtml(fields.message)}&rdquo;</p>`
            : ""
        }

        <p style="font-size:15px;line-height:1.75;color:#2b2620;margin-top:24px;">${closing}</p>

        <p style="font-size:15px;line-height:1.75;color:#2b2620;margin-top:32px;">With warmest regards,<br /><strong>Raja Bali</strong></p>

        <hr style="border:none;border-top:1px solid #e8e0d0;margin:36px 0 16px;" />
        <p style="font-size:11px;color:#a39c8c;text-align:center;margin:0;">This is an automated confirmation — for urgent enquiries, please contact us directly.</p>
      </div>
    </div>
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
    from: "Raja Bali Website <onboarding@resend.dev>",
    to: targetEmail,
    subject: `New ${label} submission — Raja Bali`,
    html: buildEmailHtml(formType, fields),
  });

  if (error) throw new Error(error.message || "Resend failed to send the email.");
}

// Confirmation email to the guest themselves — kept fully independent from
// the restaurant notification above (Promise.allSettled in POST) so a
// failure here (e.g. Resend's sandbox mode rejecting non-owner addresses
// until a sending domain is verified) never blocks the restaurant from
// getting the booking.
async function sendGuestConfirmationEmail({ formType, branch, fields }) {
  if (!fields.email) throw new Error("No guest email address provided.");

  const locationName = BRANCH_NAMES[branch] || BRANCH_NAMES.general;

  const { error } = await resend.emails.send({
    from: "Raja Bali <onboarding@resend.dev>",
    to: fields.email,
    subject: `Your Reservation, Confirmed — ${locationName}`,
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

  const [sheetsResult, emailResult, guestEmailResult] = await Promise.allSettled([
    submitToGoogleSheets({ formType, branch, ...fields }),
    sendNotificationEmail({ formType, targetEmail, fields }),
    sendGuestConfirmationEmail({ formType, branch, fields }),
  ]);

  const sheetsOk = sheetsResult.status === "fulfilled";
  const emailOk = emailResult.status === "fulfilled";
  const guestEmailOk = guestEmailResult.status === "fulfilled";

  if (!sheetsOk) console.error("Google Sheets submission failed:", sheetsResult.reason);
  if (!emailOk) console.error("Resend email failed:", emailResult.reason);
  if (!guestEmailOk) console.error("Guest confirmation email failed:", guestEmailResult.reason);

  // Guest confirmation is best-effort only — it never affects whether the
  // request is considered successful.
  if (!sheetsOk && !emailOk) {
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't process your request right now. Please try again or contact us directly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, sheetsOk, emailOk, guestEmailOk });
}
