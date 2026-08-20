"use client";

import { useEffect, useState } from "react";

/**
 * Shared submit wiring for every form on the site. Each form keeps its own
 * field state (shapes differ too much to share) — this just owns the
 * request lifecycle so "idle/submitting/success/error" isn't reimplemented
 * seven times. `messages` (cycled while submitting) and `errorFallback`
 * come from the calling form's forms.json "common" slice, so this hook has
 * no hardcoded English of its own.
 */
export function useFormSubmit({ formType, branch, messages, errorFallback }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (status !== "submitting") return undefined;
    setMessageIndex(0);
    const id = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, messages.length - 1));
    }, 1800);
    return () => clearInterval(id);
  }, [status, messages.length]);

  // A guest bailing out mid-submit (thinking it's frozen) is exactly the
  // failure mode this is all for — this catches it on desktop at least,
  // where the browser shows a native "leave site?" confirmation.
  useEffect(() => {
    if (status !== "submitting") return undefined;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [status]);

  async function submitForm(fields) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, branch, ...fields }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || errorFallback);
      }

      setStatus("success");
      return true;
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : errorFallback);
      return false;
    }
  }

  return {
    status,
    errorMessage,
    submitForm,
    submittingMessage: messages[messageIndex],
  };
}
