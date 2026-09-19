"use client";

import { useState } from "react";

const PASSWORD_KEY = "staff-deposit-password";

const emptyForm = {
  guestName: "",
  contact: "",
  eventDate: "",
  groupSize: "",
  currency: "IDR",
  amount: "",
  locale: "en",
  notes: "",
};

const inputClass = "w-full border p-3";
const labelClass = "mb-1 block text-xs text-gray-500";

// The amount is kept as a plain string of digits (plus one "." for USD
// cents) and only *displayed* with thousands separators, so what the
// server receives is always a clean number. IDR groups with "." as
// Indonesians write it (5.000.000), USD with "," (5,000.00). Showing the
// grouping while typing is the point: 50.000, 500.000 and 5.000.000 can't
// be mistaken for each other at a glance.
function cleanAmount(raw, currency) {
  if (currency === "IDR") return raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  const stripped = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = stripped.split(".");
  const intPart = whole.replace(/^0+(?=\d)/, "");
  return rest.length ? `${intPart}.${rest.join("").slice(0, 2)}` : intPart;
}

function displayAmount(clean, currency) {
  const [whole, cents] = clean.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, currency === "IDR" ? "." : ",");
  return cents === undefined ? grouped : `${grouped}.${cents}`;
}

function readSavedPassword() {
  try {
    return sessionStorage.getItem(PASSWORD_KEY) || "";
  } catch {
    return "";
  }
}

export default function StaffDepositForm() {
  const [password, setPassword] = useState(readSavedPassword);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setAmount = (e) => setForm((f) => ({ ...f, amount: cleanAmount(e.target.value, f.currency) }));
  // A figure typed as IDR would be nonsense as USD (and vice versa), so
  // switching currency starts the amount over instead of reinterpreting it.
  const setCurrency = (e) => setForm((f) => ({ ...f, currency: e.target.value, amount: "" }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    setCopied(false);
    try {
      const res = await fetch("/api/staff/deposit-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      try {
        sessionStorage.setItem(PASSWORD_KEY, password);
      } catch {
        // Session storage blocked: the password just has to be retyped.
      }
      setResult({ ...data, guestName: form.guestName, contact: form.contact });
    } catch (err) {
      setError(err.message);
    } finally {
      setStatus("idle");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.link);
      setCopied(true);
    } catch {
      setError("Couldn't copy automatically. Select the link and copy it by hand.");
    }
  };

  const reset = () => {
    setResult(null);
    setForm(emptyForm);
    setError("");
  };

  if (result) {
    const message = `Hello ${result.guestName}, here is the secure link to pay your deposit for your group reservation at Raja Bali (reference ${result.ref}): ${result.link}`;
    const digits = result.contact.replace(/\D/g, "");
    const isEmail = result.contact.includes("@");
    const whatsappHref =
      !isEmail && digits.length >= 8
        ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`;
    const emailHref = `mailto:${isEmail ? result.contact : ""}?subject=${encodeURIComponent(
      `Your Raja Bali deposit link (${result.ref})`
    )}&body=${encodeURIComponent(message)}`;

    return (
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-6 text-3xl font-serif">Deposit link ready</h1>

        <div className="mb-4 space-y-1 rounded-lg border border-gray-200 p-4 text-sm">
          <p>
            <span className="text-gray-500">Reference:</span>{" "}
            <span className="font-mono font-semibold">{result.ref}</span>
          </p>
          <p>
            <span className="text-gray-500">Guest will be charged:</span>{" "}
            <span className="font-semibold text-raja-red">USD {result.usd.toFixed(2)}</span>
            <span className="text-gray-500">
              {" "}
              (≈ IDR {result.idr.toLocaleString("id-ID")} at 1 IDR = USD {result.rate})
            </span>
          </p>
          <p className="text-xs text-gray-400">
            The USD amount is locked into this link, so it won&apos;t change if the exchange rate moves before the guest pays. The link is valid for 30 days.
          </p>
        </div>

        {!result.recorded && (
          <p className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            The link works, but it was NOT saved to the Google Sheet (the deposits sheet isn&apos;t connected or didn&apos;t respond). Please add this reference to the sheet by hand.
          </p>
        )}

        <label className={labelClass} htmlFor="deposit-link">
          Payment link
        </label>
        <input id="deposit-link" readOnly value={result.link} onFocus={(e) => e.target.select()} className={`${inputClass} mb-4 font-mono text-xs`} />

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button type="button" onClick={handleCopy} className="bg-raja-black px-4 py-3 text-sm text-white transition hover:bg-raja-red">
            {copied ? "Copied!" : "Copy link"}
          </button>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="border border-raja-black px-4 py-3 text-center text-sm transition hover:border-raja-red hover:text-raja-red">
            Share via WhatsApp
          </a>
          <a href={emailHref} className="border border-raja-black px-4 py-3 text-center text-sm transition hover:border-raja-red hover:text-raja-red">
            Send by email
          </a>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button type="button" onClick={reset} className="text-sm text-gray-500 underline hover:text-raja-red">
          Create another link
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-serif">Group deposit link</h1>
      <p className="mb-8 text-sm text-gray-600">
        Enter the deposit you agreed with the guest. We&apos;ll create a secure payment link you can send them, and log it in the deposits Google Sheet.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass} htmlFor="staff-password">Staff password</label>
          <input id="staff-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="guest-name">Guest / group name</label>
            <input id="guest-name" required value={form.guestName} onChange={set("guestName")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="guest-contact">WhatsApp number or email</label>
            <input id="guest-contact" required value={form.contact} onChange={set("contact")} placeholder="+62… or name@email.com" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="event-date">Reservation date</label>
            <input id="event-date" type="date" value={form.eventDate} onChange={set("eventDate")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="group-size">Group size</label>
            <input id="group-size" inputMode="numeric" value={form.groupSize} onChange={set("groupSize")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass} htmlFor="deposit-currency">Currency</label>
            <select id="deposit-currency" value={form.currency} onChange={setCurrency} className={inputClass}>
              <option value="IDR">IDR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelClass} htmlFor="deposit-amount">Deposit amount</label>
            <input
              id="deposit-amount"
              required
              type="text"
              inputMode={form.currency === "USD" ? "decimal" : "numeric"}
              autoComplete="off"
              placeholder={form.currency === "IDR" ? "5.000.000" : "300.00"}
              value={displayAmount(form.amount, form.currency)}
              onChange={setAmount}
              className={inputClass}
            />
          </div>
        </div>
        <p className="-mt-2 text-xs text-gray-500">
          Guests are always charged in USD by PayPal. If you enter IDR, it&apos;s converted at today&apos;s rate and the USD amount is locked into the link.
        </p>

        <div>
          <label className={labelClass} htmlFor="guest-language">Guest&apos;s language (the pay page will be shown in it)</label>
          <select id="guest-language" value={form.locale} onChange={set("locale")} className={inputClass}>
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="deposit-notes">Notes (optional, saved to the sheet)</label>
          <textarea id="deposit-notes" value={form.notes} onChange={set("notes")} className={`${inputClass} h-24`} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={status === "submitting"} className="w-full bg-raja-black px-6 py-3 text-white transition hover:bg-raja-red disabled:cursor-not-allowed disabled:opacity-60">
          {status === "submitting" ? "Creating link…" : "Create payment link"}
        </button>
      </form>
    </section>
  );
}
