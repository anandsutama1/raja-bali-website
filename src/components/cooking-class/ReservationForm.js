"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { todayLocalDate } from "@/lib/timeSlots";
import { calculateTotalWithTax, resolveBasePrice } from "@/lib/paypal/pricing";
import PhoneField from "@/components/PhoneField";
import GuestCountField from "@/components/GuestCountField";
import SubmitButton from "@/components/SubmitButton";
import PayPalCheckoutButton from "@/components/PayPalCheckoutButton";

const timeSlots = ["11:00 AM", "2:00 PM", "5:00 PM"];

const initialFields = {
  title: "",
  firstName: "",
  lastName: "",
  date: "",
  time: "",
  plan: "shared",
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

export default function ReservationForm({ dict, common, paypalClientId }) {
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
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (capture) => {
    const { whatsappCountry, whatsappNumber, pickupNeeded, hotelName, roomNumber, ...rest } = fields;
    const payload = {
      ...rest,
      whatsapp: `${whatsappCountry} ${whatsappNumber}`,
      ...(pickupNeeded ? { hotelName, roomNumber } : {}),
      locale,
      paymentStatus: "Paid",
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

  const guestCount = parseInt(fields.guests, 10);
  const basePrice = resolveBasePrice("cooking-class", fields.plan);
  const { total: totalIdr } = Number.isInteger(guestCount) && guestCount > 0
    ? calculateTotalWithTax(basePrice, guestCount)
    : { total: 0 };

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
          <div>
            <label htmlFor="reservation-plan" className="mb-1 block text-xs text-gray-500">{dict.planLabel}</label>
            <select id="reservation-plan" required value={fields.plan} onChange={update("plan")} className="border p-3 text-gray-700 w-full">
              <option value="shared">{dict.planShared}</option>
              <option value="individual">{dict.planIndividual}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GuestCountField value={fields.guests} onChange={update("guests")} placeholder={common.adultsPlaceholder} required className="border p-3" useListLabel={common.useList} otherManualLabel={common.otherManual} />
            <GuestCountField value={fields.children} onChange={update("children")} options={[0, 1, 2, 3, 4, 5]} placeholder={common.childrenPlaceholder} className="border p-3" useListLabel={common.useList} otherManualLabel={common.otherManual} />
          </div>
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
          <SubmitButton status="idle" label={dict.submitLabel} submittingMessage="" />
        </form>
      ) : (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">{common.orderSummaryHeading}</h3>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{fields.plan === "individual" ? dict.planIndividual : dict.planShared} × {guestCount || 0}</span>
            </div>
            <div className="flex justify-between text-lg font-serif border-t border-gray-200 mt-2 pt-2">
              <span>{common.totalLabel}</span>
              <span>IDR {totalIdr.toLocaleString("id-ID")}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{common.taxIncludedNote}</p>
          </div>

          {status === "submitting" ? (
            // Payment already succeeded at this point — this is just the
            // reservation being saved to Sheets/email before the redirect,
            // so the guest sees progress instead of a frozen page right
            // after paying.
            <p className="text-center text-sm text-gray-500">{submittingMessage}</p>
          ) : (
            <PayPalCheckoutButton
              clientId={paypalClientId}
              formType="cooking-class"
              plan={fields.plan}
              guests={fields.guests}
              onSuccess={handlePaymentSuccess}
              dict={common}
            />
          )}

          <p className="text-center text-xs text-gray-500">{common.cancellationPolicy}</p>

          {status !== "submitting" && (
            <button
              type="button"
              onClick={() => setShowPayment(false)}
              className="u-link block mx-auto text-sm text-gray-500 hover:text-raja-red"
            >
              {common.editDetails}
            </button>
          )}
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
