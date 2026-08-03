"use client";

import { useState } from "react";

/**
 * Shared submit wiring for every form on the site. Each form keeps its own
 * field state (shapes differ too much to share) — this just owns the
 * request lifecycle so "idle/submitting/success/error" isn't reimplemented
 * seven times.
 */
export function useFormSubmit({ formType, branch }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      return true;
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      return false;
    }
  }

  return { status, errorMessage, submitForm };
}
