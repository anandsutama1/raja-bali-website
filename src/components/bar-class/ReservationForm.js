"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { todayLocalDate } from "@/lib/timeSlots";
import PhoneField from "@/components/PhoneField";
import GuestCountField from "@/components/GuestCountField";
import SubmitButton from "@/components/SubmitButton";

// Single fixed session — Thursdays at 3:00 PM only (previously three
// sessions across the day; the schedule has since changed to just this one).
const SESSION_TIME = "3:00 PM";

const initialFields = {
  title: "",
  firstName: "",
  lastName: "",
  date: "",
  time: SESSION_TIME,
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

function isThursday(dateStr) {
  if (!dateStr) return true;
  return new Date(`${dateStr}T00:00:00`).getDay() === 4;
}

export default function ReservationForm({ dict, common }) {
  const router = useRouter();
  const { locale } = useParams();
  const today = todayLocalDate();
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "bar-class",
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
    if (!isThursday(fields.date)) errors.date = dict.dateError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { whatsappCountry, whatsappNumber, pickupNeeded, hotelName, roomNumber, ...rest } = fields;
    const payload = {
      ...rest,
      whatsapp: `${whatsappCountry} ${whatsappNumber}`,
      ...(pickupNeeded ? { hotelName, roomNumber } : {}),
      locale,
    };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      // Only reached once the API has confirmed the booking actually went
      // through (see useFormSubmit: `ok` is true only when res.ok &&
      // data.ok). Validation/API failures never reach here.
      router.push(`/${locale}/bar-class/thank-you`);
    }
  };

  return (
    <section id="reservation" className="border-t border-gray-200 py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif text-center mb-2">{dict.heading}</h2>
      <p className="text-center text-gray-600 mb-10">{dict.subheading}</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <fieldset disabled={status === "submitting"} className="m-0 min-w-0 space-y-4 border-0 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select value={fields.title} onChange={update("title")} aria-label={common.titlePlaceholder} className="border p-3 rounded text-gray-700">
              <option value="">{common.titlePlaceholder}</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input placeholder={common.firstNamePlaceholder} aria-label={common.firstNamePlaceholder} required value={fields.firstName} onChange={update("firstName")} className="border p-3 rounded" />
            <input placeholder={common.lastNamePlaceholder} aria-label={common.lastNamePlaceholder} required value={fields.lastName} onChange={update("lastName")} className="border p-3 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reservation-date" className="mb-1 block text-xs text-gray-500">{common.dateLabel}</label>
              <input id="reservation-date" type="date" min={today} required value={fields.date} onChange={update("date")} className="border p-3 rounded w-full" />
              {fieldErrors.date && <p className="mt-1 text-xs text-red-600">{fieldErrors.date}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">{common.timeLabel}</label>
              <div className="flex items-center border p-3 rounded text-gray-700 bg-gray-50">
                {SESSION_TIME} <span className="ml-1 text-xs text-gray-400">{dict.thursdayOnlyNote}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GuestCountField value={fields.guests} onChange={update("guests")} placeholder={common.adultsPlaceholder} required className="border p-3 rounded" useListLabel={common.useList} otherManualLabel={common.otherManual} />
            <GuestCountField value={fields.children} onChange={update("children")} options={[0, 1, 2, 3, 4, 5]} placeholder={common.childrenPlaceholder} className="border p-3 rounded" useListLabel={common.useList} otherManualLabel={common.otherManual} />
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
                className="border p-3 rounded w-full"
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
              className="border p-3 rounded"
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
                  className="border p-3 rounded"
                />
                <input
                  placeholder={common.roomNumberPlaceholder}
                  aria-label={common.roomNumberPlaceholder}
                  required
                  value={fields.roomNumber}
                  onChange={update("roomNumber")}
                  className="border p-3 rounded"
                />
              </div>
            )}
          </div>
          <textarea placeholder={common.dietaryPlaceholder} aria-label={common.dietaryPlaceholder} required value={fields.message} onChange={update("message")} className="border p-3 rounded w-full h-24"></textarea>
          <SubmitButton status={status} label={dict.submitLabel} submittingMessage={submittingMessage} />
        </fieldset>
        {status === "success" && (
          <p className="text-center text-sm text-emerald-600">
            {dict.successMessage}
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-600">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
