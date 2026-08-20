"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { OPENING_HOUR_SLOTS, todayLocalDate } from "@/lib/timeSlots";
import PhoneField from "@/components/PhoneField";
import GuestCountField from "@/components/GuestCountField";
import SubmitButton from "@/components/SubmitButton";

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
};

export default function ReservationForm({ dict, common }) {
  const router = useRouter();
  const { locale } = useParams();
  const today = todayLocalDate();
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "group-reservation",
    branch: "general",
    messages: common.submittingMessages,
    errorFallback: common.errorFallback,
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errors = {};
    if (!isValidEmail(fields.email)) errors.email = common.emailError;
    if (!isValidPhoneDigits(fields.whatsappNumber)) errors.whatsapp = common.phoneError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { whatsappCountry, whatsappNumber, ...rest } = fields;
    const payload = { ...rest, whatsapp: `${whatsappCountry} ${whatsappNumber}`, locale };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      // Only reached once the API has confirmed the booking actually went
      // through (see useFormSubmit: `ok` is true only when res.ok &&
      // data.ok). Validation/API failures never reach here.
      router.push(`/${locale}/group-reservation/thank-you`);
    }
  };

  return (
    <section id="reservation" className="border-t border-gray-200 py-20 px-6 max-w-2xl mx-auto bg-white">
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
            </div>
            <div>
              <label htmlFor="reservation-time" className="mb-1 block text-xs text-gray-500">{common.timeLabel}</label>
              <select id="reservation-time" required value={fields.time} onChange={update("time")} className="border p-3 rounded text-gray-700 w-full">
                <option value="" disabled>
                  {common.selectTime}
                </option>
                {OPENING_HOUR_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
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
          <textarea placeholder={dict.messagePlaceholder} aria-label={dict.messagePlaceholder} required value={fields.message} onChange={update("message")} className="border p-3 rounded w-full h-24"></textarea>
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
