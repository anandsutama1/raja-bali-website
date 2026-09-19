"use client";

import { useState } from "react";
import PayPalCheckoutButton from "@/components/PayPalCheckoutButton";
import { LockIcon } from "@/components/ReservationIcons";

const fill = (template, ref) => template.replace("{ref}", ref);

export default function DepositPay({ dict, common, paypalClientId, signed, usd, idr }) {
  // pay -> confirming (capture succeeded, recording it) -> done | unconfirmed
  const [phase, setPhase] = useState("pay");

  // PayPal has already captured the money by the time this runs. A failure
  // here only means OUR bookkeeping call failed, not that the guest wasn't
  // charged — so it must never look like a payment failure (they'd pay
  // twice). The webhook records the payment independently either way.
  const handleSuccess = async (capture) => {
    setPhase("confirming");
    try {
      const res = await fetch("/api/deposit/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: capture.orderId }),
      });
      setPhase(res.ok ? "done" : "unconfirmed");
    } catch {
      setPhase("unconfirmed");
    }
  };

  if (phase === "done" || phase === "unconfirmed") {
    const done = phase === "done";
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="mb-3 text-3xl font-serif">{done ? dict.successHeading : dict.unconfirmedHeading}</h1>
        <p className="text-gray-600">{fill(done ? dict.successBody : dict.unconfirmedBody, signed.ref)}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <h1 className="mb-2 text-center text-3xl font-serif">{dict.heading}</h1>
      <p className="mb-10 text-center text-gray-600">{dict.subheading}</p>

      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 p-4 text-sm">
          <span className="text-gray-500">{dict.referenceLabel}</span>
          <span className="font-mono font-semibold tracking-wide text-raja-black">{signed.ref}</span>
        </div>
        <div className="space-y-1 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">{dict.amountLabel}</span>
            <span className="text-2xl font-serif font-semibold text-raja-red">USD {usd.toFixed(2)}</span>
          </div>
          <p className="text-right text-xs text-gray-500">
            {dict.estimateLabel}: IDR {idr.toLocaleString("id-ID")}
          </p>
          <p className="pt-2 text-xs text-gray-400">{common.exchangeRateNote}</p>
        </div>
      </div>

      <p className="mb-3 flex items-center gap-1.5 text-xs text-emerald-700">
        <LockIcon className="h-3.5 w-3.5" />
        {common.securePaymentNote}
      </p>

      {phase === "confirming" ? (
        <p className="text-center text-sm text-gray-500">{dict.confirmingLabel}</p>
      ) : (
        <PayPalCheckoutButton
          clientId={paypalClientId}
          onSuccess={handleSuccess}
          dict={common}
          createOrderUrl="/api/deposit/create-order"
          createOrderBody={signed}
        />
      )}
    </section>
  );
}
