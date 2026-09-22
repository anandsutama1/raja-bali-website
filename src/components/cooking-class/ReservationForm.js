"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { todayLocalDate } from "@/lib/timeSlots";
import { resolvePlanFromGuestCount, TAX_RATE } from "@/lib/paypal/pricing";
import PhoneField from "@/components/PhoneField";
import GuestCountField from "@/components/GuestCountField";
import SubmitButton from "@/components/SubmitButton";
import PayPalCheckoutButton from "@/components/PayPalCheckoutButton";
import PayAtVenueOption from "@/components/PayAtVenueOption";
import TripadvisorBadgeMain from "@/components/TripadvisorBadgeMain";
import SmartImage from "@/components/SmartImage";
import { LockIcon, CalendarIcon, UsersIcon, MapPinIcon, UserIcon, CheckIcon, ChevronRightIcon } from "@/components/ReservationIcons";

const timeSlots = ["11:00 AM", "2:00 PM", "5:00 PM"];

const initialFields = {
  title: "",
  firstName: "",
  lastName: "",
  date: "",
  time: "",
  guests: "",
  children: "",
  email: "",
  whatsappCountry: DEFAULT_COUNTRY_CODE,
  whatsappNumber: "",
  message: "",
  pickupNeeded: false,
  hotelName: "",
  roomNumber: "",
};

export default function ReservationForm({ dict, common, paypalClientId, paypalEnabled = true, experienceTitle }) {
  const router = useRouter();
  const { locale } = useParams();
  const today = todayLocalDate();
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  // Fixed-price payment is required before the reservation itself is
  // submitted (see handlePaymentSuccess) — this just switches the form
  // between "editing details" and "ready to pay", it doesn't touch
  // useFormSubmit's own idle/submitting/success/error status.
  const [showPayment, setShowPayment] = useState(false);
  // The page itself is statically prerendered (ISR, ~1 day), so a USD
  // estimate computed at page-render time can silently drift from what
  // create-order (a per-request dynamic route) charges. livePricing is
  // fetched fresh from /api/paypal/price-preview — the exact same
  // computeOrderPricing() function create-order uses — the moment a guest
  // reaches this step, so the number they see here and the number PayPal
  // actually charges seconds later come from the same live calculation.
  const [livePricing, setLivePricing] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // Flips true only when PayPal itself can't start a checkout - unlocks the
  // "secure my spot, pay at the restaurant" fallback below the button.
  const [paypalUnavailable, setPaypalUnavailable] = useState(false);
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "cooking-class",
    branch: "general",
    messages: common.submittingMessages,
    errorFallback: common.errorFallback,
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.checked }));

  const validate = () => {
    const errors = {};
    if (!isValidEmail(fields.email)) errors.email = common.emailError;
    if (!isValidPhoneDigits(fields.whatsappNumber)) errors.whatsapp = common.phoneError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reveals the payment step instead of submitting anything yet — the
  // reservation itself is only sent to /api/submit-form once PayPal
  // confirms the charge went through (see handlePaymentSuccess below).
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // PayPal closed: no payment step at all - the booking is submitted
    // right here as a pay-at-the-restaurant reservation.
    if (!paypalEnabled) {
      handlePayAtVenue();
      return;
    }
    setAgreedToTerms(false);
    setShowPayment(true);
  };

  // Fetches the live USD figure the instant the payment step appears — see
  // the livePricing comment above for why this can't just reuse a value
  // computed when the page itself was last statically rendered.
  useEffect(() => {
    if (!showPayment) return undefined;
    let cancelled = false;
    setPriceLoading(true);
    setLivePricing(null);
    fetch("/api/paypal/price-preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "cooking-class", guests: fields.guests, children: fields.children }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.totalUsd === "number") setLivePricing(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setPriceLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // fields.guests can't change while showPayment is true (the guest count
    // field only exists in the editing step) — showPayment alone is the
    // correct re-fetch trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPayment]);

  const handlePaymentSuccess = async (capture) => {
    const { whatsappCountry, whatsappNumber, pickupNeeded, hotelName, roomNumber, ...rest } = fields;
    const payload = {
      ...rest,
      whatsapp: `${whatsappCountry} ${whatsappNumber}`,
      ...(pickupNeeded ? { hotelName, roomNumber } : {}),
      locale,
      // Purely informational — submit-form re-verifies the real payment
      // status directly against PayPal (see resolveVerifiedPayment) and
      // never trusts this client-sent value, so it can't be spoofed into a
      // false "Paid" record by tampering with the request.
      paymentStatus: "Paid via PayPal",
      paypalOrderId: capture.orderId,
      paypalCaptureId: capture.captureId,
      paymentAmount: capture.amount ? `${capture.amount.value} ${capture.amount.currency_code}` : undefined,
    };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      setShowPayment(false);
      // Only reached once the API has confirmed the booking actually went
      // through (see useFormSubmit: `ok` is true only when res.ok &&
      // data.ok). Validation/API failures never reach here — the guest has
      // already paid at this point, so a failure here doesn't mean they
      // need to pay again, just that staff won't see it in Sheets/email
      // automatically and should be followed up with directly.
      router.push(`/${locale}/cooking-class/thank-you`);
    }
  };

  // Fallback for when PayPal can't start a checkout (see
  // PayPalCheckoutButton's onUnavailable): holds the spot with no payment
  // taken, to be settled at the cashier. submit-form recomputes the amount
  // due itself and flags the booking as unpaid for staff - nothing here
  // marks it paid.
  const handlePayAtVenue = async () => {
    const { whatsappCountry, whatsappNumber, pickupNeeded, hotelName, roomNumber, ...rest } = fields;
    const ok = await submitForm({
      ...rest,
      whatsapp: `${whatsappCountry} ${whatsappNumber}`,
      ...(pickupNeeded ? { hotelName, roomNumber } : {}),
      locale,
      paymentMethod: "pay-at-venue",
    });
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      setShowPayment(false);
      setPaypalUnavailable(false);
      router.push(`/${locale}/cooking-class/thank-you`);
    }
  };

  const guestCount = parseInt(fields.guests, 10);
  const hasValidGuestCount = Number.isInteger(guestCount) && guestCount > 0;
  // Children are charged too (see lib/paypal/pricing.js's CHILD_PRICING).
  // This is display-only, just like guestCount above; the actual charge is
  // computed the same way, server-side, in create-order.
  const childCount = parseInt(fields.children, 10);
  const hasChildren = Number.isInteger(childCount) && childCount > 0;
  // Shared vs Individual is derived from the adult count, never a manual
  // choice — 1 adult can only ever be Individual, 2+ can only ever be
  // Shared. This is display-only; the actual charge is recomputed
  // identically (and authoritatively) server-side in create-order.
  const plan = hasValidGuestCount ? resolvePlanFromGuestCount(guestCount) : "shared";
  // IDR is deliberately not shown at checkout anymore — PayPal only ever
  // charges in USD (see lib/paypal/exchangeRate.js), and a guest comparing
  // an IDR figure we compute against whatever their bank/PayPal shows them
  // in their own local-currency estimate (a different, unrelated
  // conversion) was a source of "these don't match" confusion. USD here is
  // always the live-fetched figure (see livePricing above) — the exact
  // same number create-order is about to charge, never a locally-guessed
  // one.
  const totalUsd = livePricing ? livePricing.totalUsd.toFixed(2) : null;
  const subtotalUsd = livePricing ? livePricing.subtotalUsd.toFixed(2) : null;
  const taxUsd = livePricing ? livePricing.taxUsd.toFixed(2) : null;
  // dict.planShared/planIndividual carry an "(IDR ... / person)" suffix for
  // the details step's read-only note (still useful there, while a guest
  // is choosing a date/time and thinking in local pricing) — stripped here
  // for the checkout summary specifically, since that step now shows USD
  // only (see the comment above).
  const planLabelForCheckout = (plan === "individual" ? dict.planIndividual : dict.planShared).replace(/\s*\([^)]*\)\s*$/, "");

  return (
    <section id="reservation" className="border-t border-gray-200 py-24 px-6 max-w-2xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">{dict.heading}</h2>
      <p className="text-center text-gray-600 mb-14">{dict.subheading}</p>

      {!showPayment ? (
        <form className="space-y-4" onSubmit={handleContinueToPayment}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select required value={fields.title} onChange={update("title")} aria-label={common.titlePlaceholder} className="border p-3 text-gray-700">
              <option value="">{common.titlePlaceholder}</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input placeholder={common.firstNamePlaceholder} aria-label={common.firstNamePlaceholder} required value={fields.firstName} onChange={update("firstName")} className="border p-3" />
            <input placeholder={common.lastNamePlaceholder} aria-label={common.lastNamePlaceholder} required value={fields.lastName} onChange={update("lastName")} className="border p-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reservation-date" className="mb-1 block text-xs text-gray-500">{common.dateLabel}</label>
              <input id="reservation-date" type="date" min={today} required value={fields.date} onChange={update("date")} className="border p-3 w-full" />
            </div>
            <div>
              <label htmlFor="reservation-time" className="mb-1 block text-xs text-gray-500">{common.timeLabel}</label>
              <select
                id="reservation-time"
                required
                value={fields.time}
                onChange={update("time")}
                className="border p-3 text-gray-700 w-full"
              >
                <option value="" disabled>
                  {common.selectTime}
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GuestCountField value={fields.guests} onChange={update("guests")} placeholder={common.adultsPlaceholder} required className="border p-3" useListLabel={common.useList} otherManualLabel={common.otherManual} />
            <GuestCountField value={fields.children} onChange={update("children")} options={[0, 1, 2, 3, 4, 5]} placeholder={common.childrenPlaceholder} className="border p-3" useListLabel={common.useList} otherManualLabel={common.otherManual} />
          </div>
          {hasValidGuestCount && (
            // Read-only — Shared vs Individual is derived from the adult
            // count above, never a manual choice (1 adult = Individual, 2+
            // = Shared), so there's nothing here for the guest to select.
            <p className="text-xs text-gray-500">
              {dict.planLabel}: {plan === "individual" ? dict.planIndividual : dict.planShared}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                placeholder={common.emailPlaceholder}
                aria-label={common.emailPlaceholder}
                required
                value={fields.email}
                onChange={update("email")}
                className="border p-3 w-full"
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
            </div>
            <PhoneField
              countryCode={fields.whatsappCountry}
              onCountryCodeChange={update("whatsappCountry")}
              number={fields.whatsappNumber}
              onNumberChange={update("whatsappNumber")}
              error={fieldErrors.whatsapp}
              dict={common}
              className="border p-3"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={fields.pickupNeeded}
                onChange={toggle("pickupNeeded")}
                className="h-4 w-4 border-gray-300"
              />
              {common.pickupLabel}
            </label>
            {fields.pickupNeeded && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder={common.hotelNamePlaceholder}
                  aria-label={common.hotelNamePlaceholder}
                  required
                  value={fields.hotelName}
                  onChange={update("hotelName")}
                  className="border p-3"
                />
                <input
                  placeholder={common.roomNumberPlaceholder}
                  aria-label={common.roomNumberPlaceholder}
                  required
                  value={fields.roomNumber}
                  onChange={update("roomNumber")}
                  className="border p-3"
                />
              </div>
            )}
          </div>
          <textarea placeholder={common.dietaryPlaceholder} aria-label={common.dietaryPlaceholder} required value={fields.message} onChange={update("message")} className="border p-3 w-full h-24"></textarea>
          {paypalEnabled ? (
            <>
              <SubmitButton status="idle" label={dict.submitLabel} submittingMessage="" />
              {/* eslint-disable-next-line @next/next/no-img-element -- small
                  trust badge below the fold; sizes to its own aspect ratio
                  and hides itself if the file has not been dropped in yet
                  (see Footer.js for the card-brand/award badges, which now
                  live there instead of on this form). */}
              <img
                src="/images/shared/powered-by-paypal.png"
                alt={common.poweredByPaypal}
                className="mx-auto block h-5 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </>
          ) : (
            <>
              <SubmitButton status={status} label={common.payAtVenueSubmitLabel} submittingMessage={submittingMessage} />
            </>
          )}
        </form>
      ) : (
        <div>
          {/* Step indicator — "Details" is already behind us the moment
              this renders, "Pay" is the only step left. */}
          <div className="flex items-center justify-center gap-2 mb-8 text-sm">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">1</span>
              {common.stepDetailsLabel}
            </span>
            <ChevronRightIcon className="h-4 w-4 text-gray-300" />
            <span className="flex items-center gap-1.5 font-semibold text-raja-black">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-raja-black text-xs font-semibold text-white">2</span>
              {common.stepPayLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Payment column */}
            <div className="order-2 lg:order-1 space-y-4">
              <div>
                <h3 className="text-lg font-serif mb-1">{common.selectPaymentMethodLabel}</h3>
                <p className="flex items-center gap-1.5 text-xs text-emerald-700 mb-2">
                  <LockIcon className="h-3.5 w-3.5" />
                  {common.securePaymentNote}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 space-y-2">
                <p>{common.cancellationPolicy}</p>
                <p>{common.fullyBookedPolicy}</p>
                <p>{common.noShowPolicy}</p>
              </div>

              {status !== "submitting" && (
                <label className="flex items-start gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 border-gray-300"
                  />
                  {common.agreeToTermsLabel}
                </label>
              )}

              {status === "submitting" ? (
                // Payment already succeeded at this point — this is just the
                // reservation being saved to Sheets/email before the redirect,
                // so the guest sees progress instead of a frozen page right
                // after paying.
                <p className="text-center text-sm text-gray-500">{submittingMessage}</p>
              ) : agreedToTerms && !priceLoading && livePricing ? (
                <PayPalCheckoutButton
                  clientId={paypalClientId}
                  formType="cooking-class"
                  guests={fields.guests}
                  createOrderBody={{ formType: "cooking-class", guests: fields.guests, children: fields.children }}
                  onSuccess={handlePaymentSuccess}
                  onUnavailable={() => setPaypalUnavailable(true)}
                  dict={common}
                />
              ) : (
                // Same footprint as the real PayPal Buttons so the layout
                // doesn't jump once they're swapped in — greyed out until the
                // live price has loaded and the guest has agreed to the terms
                // above, since PayPal's own SDK buttons can't be disabled via
                // a prop once mounted.
                <div
                  aria-disabled="true"
                  className="flex h-11 w-full items-center justify-center rounded bg-gray-200 text-sm font-medium text-gray-400"
                >
                  {priceLoading ? common.priceLoadingLabel : common.agreeToTermsPrompt}
                </div>
              )}

              {paypalUnavailable && agreedToTerms && (
                <PayAtVenueOption dict={common} onConfirm={handlePayAtVenue} disabled={status === "submitting"} />
              )}
            </div>

            {/* Order summary card */}
            <div className="order-1 lg:order-2 rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
              <div className="flex gap-3 p-4 border-b border-gray-100">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <SmartImage src="/images/cooking-class/Rectangle 12.jpg" alt="" sizes="64px" />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPinIcon className="h-3 w-3" />
                    {common.experienceLocationLabel}
                  </p>
                  <p className="font-semibold text-sm leading-snug text-raja-black">{experienceTitle || dict.heading}</p>
                </div>
              </div>

              <div className="px-4 pt-3 pb-1 border-b border-gray-100">
                <TripadvisorBadgeMain />
              </div>

              <dl className="p-4 space-y-2 text-sm text-gray-700 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                  <span>{fields.date || "—"} · {fields.time || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-gray-400 shrink-0" />
                  <span>{guestCount || 0} × {planLabelForCheckout}</span>
                </div>
                {hasChildren && (
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span>
                      {childCount} × {common.childrenPriceLabel}
                      {livePricing?.childPrice ? ` (IDR ${Math.round(livePricing.childPrice).toLocaleString("en-US")}/person)` : ""}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <dt className="sr-only">{common.pickupStatusLabel}</dt>
                  <MapPinIcon className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                  <dd>
                    {common.pickupStatusLabel}: {fields.pickupNeeded
                      ? `${common.pickupRequestedLabel}${fields.hotelName ? ` — ${fields.hotelName}` : ""}`
                      : common.pickupNotRequestedLabel}
                  </dd>
                </div>
              </dl>

              <div className="flex items-start justify-between gap-3 p-4 border-b border-gray-100">
                <div className="flex items-start gap-2 min-w-0">
                  <UserIcon className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 text-sm text-gray-700">
                    <p className="font-medium text-raja-black truncate">
                      {[fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ") || "—"}
                    </p>
                    <p className="text-gray-500 truncate">{fields.email}</p>
                    <p className="text-gray-500">{fields.whatsappCountry} {fields.whatsappNumber}</p>
                  </div>
                </div>
                {status !== "submitting" && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowPayment(false);
                      setAgreedToTerms(false);
                      setPaypalUnavailable(false);
                    }}
                    className="shrink-0 text-xs font-semibold text-raja-red hover:underline"
                  >
                    {common.editLabel}
                  </button>
                )}
              </div>

              <div className="p-4 space-y-1">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{common.subtotalLabel}</span>
                  <span>{subtotalUsd ? `USD ${subtotalUsd}` : common.priceLoadingLabel}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{common.taxLabel} ({Math.round(TAX_RATE * 100)}%)</span>
                  <span>{taxUsd ? `USD ${taxUsd}` : common.priceLoadingLabel}</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-gray-200 mt-2 pt-2 text-raja-red">
                  <span>{common.totalLabel}</span>
                  <span>{totalUsd ? `USD ${totalUsd}` : common.priceLoadingLabel}</span>
                </div>
                <p className="flex items-center gap-1 text-xs text-emerald-700 pt-1">
                  <CheckIcon className="h-3.5 w-3.5" />
                  {common.taxesIncludedNote}
                </p>
                <p className="text-xs text-gray-400 pt-1">{common.exchangeRateNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "success" && (
        <p className="text-center text-sm text-emerald-600 mt-4">
          {dict.successMessage}
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-600 mt-4">{errorMessage}</p>
      )}
    </section>
  );
}
