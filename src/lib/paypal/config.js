// Master switch for taking payments through PayPal. Closed by default -
// set PAYPAL_CHECKOUT_ENABLED=true (and redeploy) to reopen it; no code
// change needed. While closed, cooking/bar class bookings go straight
// through as "pay at the restaurant" reservations (see PayAtVenueOption /
// submit-form's pay-at-venue path), the two create-order routes refuse to
// start a checkout, and the deposit pay page shows an "unavailable" notice.
//
// Only checkout-START is gated. Capture, the webhook and submit-form's
// payment verification stay live on purpose, so a payment that was already
// in flight when the switch was flipped is still recorded correctly.
export const PAYPAL_CHECKOUT_ENABLED = process.env.PAYPAL_CHECKOUT_ENABLED === "true";
