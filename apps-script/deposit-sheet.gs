/**
 * Raja Bali group-deposit sheet (Google Apps Script, bound to the Sheet).
 *
 * Setup (once):
 *  1. Create a new Google Sheet for deposits, then Extensions > Apps Script.
 *  2. Paste this whole file, save.
 *  3. Project Settings > Script properties > add SHARED_SECRET with a long
 *     random value. The same value goes in the website's
 *     DEPOSITS_SHEETS_SECRET environment variable.
 *  4. Deploy > New deployment > type "Web app", Execute as: Me, Who has
 *     access: Anyone. Copy the /exec URL into DEPOSITS_SHEETS_URL.
 *     (The secret, not the URL, is what protects the sheet.)
 *  5. Run setupSheet() once from the editor (authorize when asked) to create
 *     the headers and the Status dropdown.
 *  After changing this code later: Deploy > Manage deployments > edit >
 *  New version, otherwise the live URL keeps running the old code.
 */

const SHEET_NAME = "Deposits";

const HEADERS = [
  "Reference",
  "Created",
  "Guest / group",
  "Contact",
  "Reservation date",
  "Group size",
  "Status",
  "Deposit requested (IDR)",
  "Deposit requested (USD, locked)",
  "Deposit paid (USD)",
  "PayPal order ID(s)",
  "Paid at",
  "Payer email",
  "Notes",
  "Payment link",
];

// Staff can change Status from the dropdown at any time. Payments only ever
// move a row from "Awaiting Deposit" to "Deposit Paid", never overriding a
// status staff already set (e.g. Confirmed, Refunded).
const STATUSES = ["Awaiting Deposit", "Deposit Paid", "Confirmed", "Completed", "Cancelled", "Refunded"];

const COL = {};
HEADERS.forEach(function (name, i) {
  COL[name] = i + 1;
});

function setupSheet() {
  getSheet_();
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.getRange(2, COL["Created"], 999, 1).setNumberFormat("yyyy-mm-dd hh:mm");
    sheet.getRange(2, COL["Paid at"], 999, 1).setNumberFormat("yyyy-mm-dd hh:mm");
    sheet.getRange(2, COL["Deposit requested (IDR)"], 999, 1).setNumberFormat("#,##0");
    sheet.getRange(2, COL["Deposit requested (USD, locked)"], 999, 1).setNumberFormat("0.00");
    sheet.getRange(2, COL["Deposit paid (USD)"], 999, 1).setNumberFormat("0.00");
  }

  const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build();
  sheet.getRange(2, COL["Status"], 999, 1).setDataValidation(rule);
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || data.secret !== secret) return json_({ ok: false, error: "unauthorized" });

    const sheet = getSheet_();
    if (data.action === "create") return json_(createRow_(sheet, data));
    if (data.action === "paid") return json_(markPaid_(sheet, data));
    return json_({ ok: false, error: "unknown action" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// A cell starting with = + - @ is evaluated as a formula, and guest name and
// notes are typed by people we don't control.
function safe_(value) {
  const s = String(value == null ? "" : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function findRow_(sheet, ref) {
  const last = sheet.getLastRow();
  if (last < 2) return -1;
  const refs = sheet.getRange(2, COL["Reference"], last - 1, 1).getValues();
  for (let i = 0; i < refs.length; i++) {
    if (refs[i][0] === ref) return i + 2;
  }
  return -1;
}

function createRow_(sheet, d) {
  // Refuse rather than silently reuse: two guests sharing one reference
  // would have their payments land on the same row.
  if (findRow_(sheet, d.ref) !== -1) return { ok: false, error: "duplicate reference" };
  const row = new Array(HEADERS.length).fill("");
  row[COL["Reference"] - 1] = d.ref;
  row[COL["Created"] - 1] = new Date();
  row[COL["Guest / group"] - 1] = safe_(d.guestName);
  row[COL["Contact"] - 1] = safe_(d.contact);
  row[COL["Reservation date"] - 1] = safe_(d.eventDate);
  row[COL["Group size"] - 1] = safe_(d.groupSize);
  row[COL["Status"] - 1] = "Awaiting Deposit";
  row[COL["Deposit requested (IDR)"] - 1] = Number(d.depositIdr);
  row[COL["Deposit requested (USD, locked)"] - 1] = Number(d.depositUsd);
  row[COL["Notes"] - 1] = safe_(d.notes);
  row[COL["Payment link"] - 1] = d.link;
  sheet.appendRow(row);
  return { ok: true };
}

function markPaid_(sheet, d) {
  let rowIndex = findRow_(sheet, d.ref);
  if (rowIndex === -1) {
    // Paid, but no link record exists (e.g. the sheet write at link time
    // failed). Still record the payment rather than lose it.
    const row = new Array(HEADERS.length).fill("");
    row[COL["Reference"] - 1] = d.ref;
    row[COL["Created"] - 1] = new Date();
    row[COL["Status"] - 1] = "Awaiting Deposit";
    row[COL["Notes"] - 1] = "Row created by the payment itself: no link record was found.";
    sheet.appendRow(row);
    rowIndex = sheet.getLastRow();
  }

  const ordersCell = sheet.getRange(rowIndex, COL["PayPal order ID(s)"]);
  const existing = String(ordersCell.getValue() || "");
  // Browser callback and PayPal webhook can both report the same payment.
  if (existing.indexOf(d.orderId) !== -1) return { ok: true, duplicate: true };

  const paidCell = sheet.getRange(rowIndex, COL["Deposit paid (USD)"]);
  paidCell.setValue(Number((Number(paidCell.getValue() || 0) + Number(d.paidUsd)).toFixed(2)));
  ordersCell.setValue(existing ? existing + ", " + d.orderId : d.orderId);
  sheet.getRange(rowIndex, COL["Paid at"]).setValue(new Date(d.paidAt));
  sheet.getRange(rowIndex, COL["Payer email"]).setValue(safe_(d.payerEmail));

  const statusCell = sheet.getRange(rowIndex, COL["Status"]);
  if (statusCell.getValue() === "Awaiting Deposit" || statusCell.getValue() === "") {
    statusCell.setValue("Deposit Paid");
  }
  return { ok: true };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
