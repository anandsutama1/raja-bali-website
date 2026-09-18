import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { EXPERIENCE_LABELS, TAX_RATE } from "@/lib/paypal/pricing";

const RED = rgb(0.64, 0.11, 0.11); // matches --raja-red (#A31C1C)
const DARK = rgb(0.08, 0.08, 0.08);
const GRAY = rgb(0.45, 0.45, 0.45);

// Kept alongside this module (not read from public/) so Vercel's build-time
// file tracing bundles it into the serverless function — files under
// public/ are shipped to static hosting, not into the function's own
// filesystem, so reading from there would 404 at runtime in production.
// Resolved via import.meta.url rather than process.cwd() so it doesn't
// depend on the working directory a given Vercel runtime happens to use.
const LOGO_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), "assets", "RajaBali_Logo.png");

function formatIdr(amount) {
  return `IDR ${Math.round(amount).toLocaleString("id-ID")}`;
}

/**
 * Builds a simple one-page invoice PDF for a paid cooking-class/bar-class
 * booking — pdf-lib only (no headless browser), so this stays well within
 * a Vercel Hobby function's time/memory budget. Complements, not replaces,
 * PayPal's own automatic payer receipt: this one carries Raja Bali branding
 * and the per-person price breakdown, and prints the PayPal order ID
 * prominently so it can be matched against the PayPal dashboard directly.
 *
 * All amounts (basePrice/subtotal/tax/total) are computed server-side from
 * lib/paypal/pricing.js — never taken from client input — so the PDF can
 * never show a price that disagrees with what was actually charged.
 */
export async function generateInvoicePdf({
  guestName,
  formType,
  guestCount,
  plan,
  date,
  time,
  basePrice,
  subtotal,
  tax,
  total,
  paypalOrderId,
  captureId,
  chargedAmount, // { currency_code, value } — the real PayPal charge, in USD
  invoiceDate,
}) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logoImage = await doc.embedPng(fs.readFileSync(LOGO_PATH));

  const { width, height } = page.getSize();
  const marginX = 50;
  let y = height - 60;

  const draw = (text, { x = marginX, size = 11, f = font, color = DARK, dy = 18 } = {}) => {
    page.drawText(text, { x, y, size, font: f, color });
    y -= dy;
  };

  // Logo image instead of a text wordmark — same file used in the guest
  // confirmation email's <img> tag (RajaBali_Navbar.png), so branding stays
  // consistent between the email and its PDF attachment.
  const logoSize = 46;
  const logoTop = y;
  page.drawImage(logoImage, { x: marginX, y: logoTop - logoSize, width: logoSize, height: logoSize });
  page.drawText("Balinese Restaurant & Culinary Experiences", {
    x: marginX + logoSize + 14,
    y: logoTop - logoSize / 2 - 4,
    size: 10,
    font,
    color: GRAY,
  });
  y = logoTop - logoSize - 14;

  draw("INVOICE", { size: 16, f: bold, dy: 22 });
  draw(`Date: ${invoiceDate}`, { size: 10, color: GRAY, dy: 16 });
  draw(`Guest: ${guestName}`, { size: 10, color: GRAY, dy: 16 });
  if (date) draw(`Reservation date: ${date}${time ? ` at ${time}` : ""}`, { size: 10, color: GRAY, dy: 16 });
  y -= 10;

  // PayPal Order ID — printed prominently (own bordered box) per the
  // traceability requirement: staff or the guest should be able to match
  // this against the PayPal dashboard without hunting through the page.
  page.drawRectangle({
    x: marginX,
    y: y - 34,
    width: width - marginX * 2,
    height: 44,
    borderColor: RED,
    borderWidth: 1,
  });
  draw("PayPal Order ID", { x: marginX + 12, size: 9, color: GRAY, dy: 16 });
  draw(paypalOrderId || "N/A", { x: marginX + 12, size: 13, f: bold, dy: 30 });
  y -= 10;

  const label = EXPERIENCE_LABELS[formType] || formType;
  const planLabel = plan === "individual" ? "Individual Experience" : plan === "shared" ? "Shared Experience" : null;

  // Line-items table header
  draw("Description", { size: 10, f: bold, dy: 16 });
  page.drawLine({
    start: { x: marginX, y: y + 6 },
    end: { x: width - marginX, y: y + 6 },
    thickness: 0.5,
    color: GRAY,
  });
  y -= 6;

  const rightAlignedText = (text, size, f) => {
    const textWidth = f.widthOfTextAtSize(text, size);
    return width - marginX - textWidth;
  };

  const moneyLine = (desc, amount, opts = {}) => {
    const size = opts.size || 11;
    const f = opts.f || font;
    page.drawText(desc, { x: marginX, y, size, font: f, color: opts.color || DARK });
    if (amount != null) {
      const amtText = formatIdr(amount);
      page.drawText(amtText, { x: rightAlignedText(amtText, size, f), y, size, font: f, color: opts.color || DARK });
    }
    y -= opts.dy || 18;
  };

  moneyLine(`${label}${planLabel ? ` — ${planLabel}` : ""} x ${guestCount}`, subtotal);
  moneyLine(`Per person: ${formatIdr(basePrice)}`, null, { size: 9, color: GRAY, dy: 16 });
  y -= 4;
  page.drawLine({ start: { x: marginX, y: y + 10 }, end: { x: width - marginX, y: y + 10 }, thickness: 0.5, color: GRAY });
  moneyLine(`Tax & service (${Math.round(TAX_RATE * 100)}%)`, tax);
  y -= 4;
  page.drawLine({ start: { x: marginX, y: y + 10 }, end: { x: width - marginX, y: y + 10 }, thickness: 1, color: DARK });
  moneyLine("Total Paid", total, { size: 13, f: bold, dy: 20 });

  // PayPal doesn't support charging in IDR (see lib/paypal/exchangeRate.js),
  // so every guest is actually charged in USD — shown directly under the
  // IDR total, not buried as a small footnote, so the two amounts a guest
  // sees (the IDR price they booked at vs. the USD PayPal actually charged)
  // are never more than one line apart.
  if (chargedAmount?.value) {
    draw(`= USD ${chargedAmount.value} charged via PayPal`, {
      size: 11,
      f: bold,
      color: RED,
      dy: 20,
    });
  }
  if (captureId) {
    draw(`PayPal Capture ID: ${captureId}`, { size: 9, color: GRAY, dy: 16 });
  }

  y -= 20;
  draw("This invoice is issued by Raja Bali for your records and complements", { size: 9, color: GRAY, dy: 13 });
  draw("PayPal's own payment receipt, which was sent separately to your PayPal", { size: 9, color: GRAY, dy: 13 });
  draw("account email at the time of checkout.", { size: 9, color: GRAY, dy: 13 });

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
