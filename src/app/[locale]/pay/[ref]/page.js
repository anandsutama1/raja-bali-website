import { getDictionary } from "@/lib/i18n/getDictionary";
import { verifyDepositLink } from "@/lib/deposit/link";
import DepositPay from "@/components/deposit/DepositPay";

// A payment link is private to one guest and pointless to index.
export const metadata = { robots: { index: false, follow: false } };

const first = (value) => (Array.isArray(value) ? value[0] : value);

export default async function DepositPayPage({ params, searchParams }) {
  const { locale, ref } = await params;
  const query = await searchParams;
  const [dict, forms] = await Promise.all([
    getDictionary(locale, "deposit"),
    getDictionary(locale, "forms"),
  ]);

  const link = verifyDepositLink({
    ref,
    usd: first(query.usd),
    idr: first(query.idr),
    exp: first(query.exp),
    sig: first(query.sig),
  });

  if (!link.valid) {
    const expired = link.reason === "expired";
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="mb-3 text-3xl font-serif">{expired ? dict.expiredHeading : dict.invalidHeading}</h1>
        <p className="text-gray-600">{expired ? dict.expiredBody : dict.invalidBody}</p>
      </main>
    );
  }

  return (
    <main>
      <DepositPay
        dict={dict}
        common={forms.common}
        paypalClientId={process.env.PAYPAL_CLIENT_ID}
        // Sent back verbatim to /api/deposit/create-order, which re-verifies
        // the signature — the client never gets to choose the amount.
        signed={{
          ref,
          usd: first(query.usd),
          idr: first(query.idr),
          exp: first(query.exp),
          sig: first(query.sig),
        }}
        usd={link.usd}
        idr={link.idr}
      />
    </main>
  );
}
