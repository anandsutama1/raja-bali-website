"use client";

import { useEffect, useRef, useState } from "react";

// Module-level, shared across every mount on the page — the PayPal SDK
// script only needs loading once, and re-injecting it on every mount would
// throw ("paypal" already defined) rather than just being wasteful.
let sdkLoadingPromise = null;

function loadPayPalSdk(clientId) {
  if (typeof window !== "undefined" && window.paypal) return Promise.resolve(window.paypal);
  if (sdkLoadingPromise) return sdkLoadingPromise;

  sdkLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => {
      sdkLoadingPromise = null;
      reject(new Error("Failed to load the PayPal SDK."));
    };
    document.body.appendChild(script);
  });
  return sdkLoadingPromise;
}

/**
 * Renders PayPal's standard Smart Payment Buttons — not Advanced Checkout /
 * CardFields. We checked: a live eligibility test against this business's
 * own sandbox credentials (paypal.CardFields({...}).isEligible()) came back
 * false, which matches PayPal's Advanced Checkout country list not
 * including Indonesia. Buttons still lets a guest pay by card without a
 * PayPal account — just through PayPal's own hosted card form during
 * approval, not one embedded directly on this page.
 *
 * `guests` is passed straight through to /api/paypal/create-order on every
 * click — that route derives the plan (for cooking-class) from guests and
 * recomputes the real price from its own table server-side, this component
 * never sends a plan or an amount (a client-supplied plan/amount could be
 * tampered with to under-pay).
 */
export default function PayPalCheckoutButton({ clientId, formType, guests, onSuccess, dict }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    loadPayPalSdk(clientId)
      .then((paypal) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        paypal
          .Buttons({
            style: { layout: "vertical", color: "black", label: "pay" },
            createOrder: async () => {
              const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formType, guests }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || dict.paymentError);
              return data.id;
            },
            onApprove: async (data) => {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              });
              const capture = await res.json();
              if (!res.ok || capture.status !== "COMPLETED") {
                setStatus("error");
                setErrorMessage(dict.paymentError);
                return;
              }
              onSuccess(capture);
            },
            onError: (err) => {
              console.error("[paypal] Buttons error:", err);
              setStatus("error");
              setErrorMessage(dict.paymentError);
            },
          })
          .render(containerRef.current);

        if (!cancelled) setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(dict.paymentError);
        }
      });

    return () => {
      cancelled = true;
    };
    // formType never actually changes at runtime (fixed per page); guests
    // driving a full re-render+re-mount of Buttons is deliberate, so a
    // guest's latest form values are always what a click actually charges.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, formType, guests]);

  return (
    // isolation:isolate opens a new local stacking context for whatever
    // z-index the PayPal SDK sets on its own iframe/overlay internals —
    // without it, an extreme SDK-set z-index escapes this component and
    // competes directly with the page's Navbar (z-50) at the root stacking
    // level, rendering the button on top of a sticky nav it should sit
    // under. Contained here instead of raised on Navbar itself so a
    // legitimate PayPal overlay (e.g. a 3-D Secure challenge) can still
    // render above everything else on the page when it needs to.
    <div className="isolate">
      <div ref={containerRef} />
      {status === "loading" && <p className="text-center text-sm text-gray-500">{dict.paymentLoading}</p>}
      {status === "error" && <p className="mt-2 text-center text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}
