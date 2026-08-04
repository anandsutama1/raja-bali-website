"use client";

import { useState } from "react";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits, EMAIL_ERROR, PHONE_ERROR } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { OPENING_HOUR_SLOTS } from "@/lib/timeSlots";
import PhoneField from "@/components/PhoneField";
import SubmitButton from "@/components/SubmitButton";

const initialFields = {
  title: "",
  firstName: "",
  lastName: "",
  date: "",
  time: "",
  guests: "",
  email: "",
  whatsappCountry: DEFAULT_COUNTRY_CODE,
  whatsappNumber: "",
  message: "",
};

export default function ReservationForm() {
  const today = new Date().toISOString().split("T")[0];
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "group-reservation",
    branch: "general",
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errors = {};
    if (!isValidEmail(fields.email)) errors.email = EMAIL_ERROR;
    if (!isValidPhoneDigits(fields.whatsappNumber)) errors.whatsapp = PHONE_ERROR;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { whatsappCountry, whatsappNumber, ...rest } = fields;
    const payload = { ...rest, whatsapp: `${whatsappCountry} ${whatsappNumber}` };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
    }
  };

  return (
    <section id="reservation" className="border-t border-gray-200 py-20 px-6 max-w-2xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">Reserve Your Buffet</h2>
      <p className="text-center text-gray-600 mb-10">
        Tell us about your group and preferred buffet package, and our events team will confirm availability.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <fieldset disabled={status === "submitting"} className="m-0 min-w-0 space-y-4 border-0 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select value={fields.title} onChange={update("title")} className="border p-3 rounded text-gray-700">
              <option value="">Title</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input placeholder="First Name" required value={fields.firstName} onChange={update("firstName")} className="border p-3 rounded" />
            <input placeholder="Last Name" required value={fields.lastName} onChange={update("lastName")} className="border p-3 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="date" min={today} required value={fields.date} onChange={update("date")} className="border p-3 rounded" />
            <select required value={fields.time} onChange={update("time")} className="border p-3 rounded text-gray-700">
              <option value="" disabled>
                Select a time
              </option>
              {OPENING_HOUR_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input type="number" min="1" placeholder="Number of Adults" required value={fields.guests} onChange={update("guests")} className="border p-3 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
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
              className="border p-3 rounded"
            />
          </div>
          <textarea placeholder="Preferred buffet package, dietary requirements, or special requests?" value={fields.message} onChange={update("message")} className="border p-3 rounded w-full h-24"></textarea>
          <SubmitButton status={status} label="Submit Request" submittingMessage={submittingMessage} />
        </fieldset>
        {status === "success" && (
          <p className="text-center text-sm text-emerald-600">
            Thank you! Your request has been sent — we&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-600">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
