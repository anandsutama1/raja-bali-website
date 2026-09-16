// Sandbox by default — PAYPAL_MODE must be explicitly set to "live" before
// any real money moves. Never flip this without the business owner's
// explicit confirmation that they're ready for production.
const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

export function paypalApiUrl(path) {
  return `${PAYPAL_API_BASE}${path}`;
}

// Client Credentials grant — short-lived token, fetched fresh per request
// rather than cached, since order create/capture calls are infrequent
// enough that the extra round trip isn't worth the complexity of caching
// and refreshing a token correctly.
export async function getPayPalAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(paypalApiUrl("/v1/oauth2/token"), {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error_description || "Failed to authenticate with PayPal.");
  }
  return data.access_token;
}
