import { getDictionary } from "@/lib/i18n/getDictionary";
import { verifyDepositLink } from "@/lib/deposit/link";
import DepositPay from "@/components/deposit/DepositPay";

const first = (value) => (Array.isArray(value) ? value[0] : value);

function readLink(ref, query) {
  return verifyDepositLink({
    ref,
    usd: first(query.usd),
    idr: first(query.idr),
    exp: first(query.exp),
    sig: first(query.sig),
  });
}

// This is what WhatsApp/iMessage/social apps show when a staff member
// shares the link, so it has to say "deposit payment" — not inherit the
// site-wide restaurant description and dance photo from the root layout.
// Page-level openGraph/twitter replace the root's wholesale (Next doesn't
// merge them), so every field is spelled out here. The logo is the preview
// image: a square mark reads correctly in a chat bubble, whereas the
// restaurant photo would make a payment request look like an advert.
export async function generateMetadata({ params, searchParams }) {
  const { locale, ref } = await params;
  const query = await searchParams;
  const dict = await getDictionary(locale, "deposit");
  const link = readLink(ref, query);

  const description = link.valid
    ? dict.metaDescriptionFull.replace("{ref}", ref).replace("{usd}", link.usd.toFixed(2))
    : dict.metaDescription;
  const image = "/images/shared/RajaBali_Navbar.png";

  return {
    title: dict.metaTitle,
    description,
    // A payment link is private to one guest and pointless to index.
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: "Raja Bali",
      title: `${dict.metaTitle} | Raja Bali`,
      description,
      images: [{ url: image, width: 500, height: 500, alt: "Raja Bali" }],
    },
    twitter: {
      card: "summary",
      title: `${dict.metaTitle} | Raja Bali`,
      description,
      images: [image],
    },
  };
}

export default async function DepositPayPage({ params, searchParams }) {
  const { locale, ref } = await params;
  const query = await searchParams;
  const [dict, forms] = await Promise.all([
    getDictionary(locale, "deposit"),
    getDictionary(locale, "forms"),
  ]);

  const link = readLink(ref, query);

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
