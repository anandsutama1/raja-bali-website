"use client";

/**
 * Fallback shown under the PayPal button only once PayPal has failed to
 * start a checkout (see PayPalCheckoutButton's onUnavailable) - lets the
 * guest still hold their spot and settle at the cashier instead of losing
 * the booking. Copy lives in forms.json "common" (payAtVenue*), so it
 * follows the guest's locale like everything else on the form.
 */
export default function PayAtVenueOption({ dict, onConfirm, disabled }) {
  return (
    <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-semibold">{dict.payAtVenueTitle}</p>
      <p className="mt-1 text-xs leading-relaxed">{dict.payAtVenueBody}</p>
      <button
        type="button"
        onClick={onConfirm}
        disabled={disabled}
        className="mt-3 w-full rounded bg-raja-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {dict.payAtVenueButton}
      </button>
    </div>
  );
}
