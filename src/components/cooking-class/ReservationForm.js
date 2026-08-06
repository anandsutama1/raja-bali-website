"use client";

import { useState } from "react";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits, EMAIL_ERROR, PHONE_ERROR } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import PhoneField from "@/components/PhoneField";
import ChildrenField from "@/components/ChildrenField";
import SubmitButton from "@/components/SubmitButton";

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

export default function ReservationForm() {
  const today = new Date().toISOString().split("T")[0];
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "cooking-class",
    branch: "general",
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.checked }));

  const validate = () => {
    const errors = {};
    if (!isValidEmail(fields.email)) errors.email = EMAIL_ERROR;
    if (!isValidPhoneDigits(fields.whatsappNumber)) errors.whatsapp = PHONE_ERROR;
    if (fields.pickupNeeded && Number(fields.guests) < 2) {
      errors.pickup = "Complimentary pickup requires a minimum of 2 adults.";
    }
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
    };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
    }
  };

  return (
    <section id="reservation" className="border-t border-gray-200 py-24 px-6 max-w-2xl mx-auto bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">Reservation</h2>
      <p className="text-center text-gray-600 mb-14">
        Begin your journey into the heart of Balinese cuisine with a hands-on cooking class.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <fieldset disabled={status === "submitting"} className="m-0 min-w-0 space-y-4 border-0 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select value={fields.title} onChange={update("title")} className="border p-3 text-gray-700">
              <option value="">Title</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input placeholder="First Name" required value={fields.firstName} onChange={update("firstName")} className="border p-3" />
            <input placeholder="Last Name" required value={fields.lastName} onChange={update("lastName")} className="border p-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="date" min={today} required value={fields.date} onChange={update("date")} className="border p-3 w-full" />
            <select
              required
              value={fields.time}
              onChange={update("time")}
              className="border p-3 text-gray-700"
            >
              <option value="" disabled>
                Select a time
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="number" min="1" placeholder="Number of Adults" required value={fields.guests} onChange={update("guests")} className="border p-3" />
            <ChildrenField value={fields.children} onChange={update("children")} className="border p-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
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
              I&apos;d like complimentary pickup around Nusa Dua (minimum 2 adults)
            </label>
            {fieldErrors.pickup && <p className="mt-1 text-xs text-red-600">{fieldErrors.pickup}</p>}
            {fields.pickupNeeded && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="Hotel Name"
                  required
                  value={fields.hotelName}
                  onChange={update("hotelName")}
                  className="border p-3"
                />
                <input
                  placeholder="Room Number"
                  required
                  value={fields.roomNumber}
                  onChange={update("roomNumber")}
                  className="border p-3"
                />
              </div>
            )}
          </div>
          <textarea placeholder="Any dietary requirements or special requests?" required value={fields.message} onChange={update("message")} className="border p-3 w-full h-24"></textarea>
          <SubmitButton status={status} label="Reserve Now" submittingMessage={submittingMessage} />
        </fieldset>
        {status === "success" && (
          <p className="text-center text-sm text-emerald-600">
            Thank you! Your reservation request has been sent. We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-600">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
