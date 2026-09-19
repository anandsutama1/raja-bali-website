// Deposits live in their own Google Sheet with their own Apps Script web
// app (see apps-script/deposit-sheet.gs), separate from the reservation
// form's GOOGLE_SHEETS_URL — that script's row layout belongs to the
// enquiry forms, and deposits need to be looked up and updated by
// reference code, which is a different job.
//
// Never throws: a Sheets outage must not stop a guest's payment from
// being recorded elsewhere (the staff email in record.js is the fallback),
// or stop staff from generating a link.
export async function postToDepositSheet(payload) {
  const url = process.env.DEPOSITS_SHEETS_URL;
  const secret = process.env.DEPOSITS_SHEETS_SECRET;
  if (!url || !secret) {
    console.warn("[deposit] DEPOSITS_SHEETS_URL/DEPOSITS_SHEETS_SECRET not set, skipping Sheet write", {
      action: payload.action,
    });
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret }),
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) {
      console.error("[deposit] Sheet write rejected", { action: payload.action, status: res.status, data });
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[deposit] Sheet write failed", { action: payload.action, error: err.message });
    return { ok: false };
  }
}
