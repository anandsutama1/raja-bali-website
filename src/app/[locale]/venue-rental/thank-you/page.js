import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Confirmation page reached only after a successful venue-rental form
// submission (see components/venue-rental/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
const description = "Thank you for your venue rental enquiry at Raja Bali.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.venueRental.heading,
    description,
    alternates: localeAlternates(locale, "/venue-rental/thank-you"),
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({ params }) {
  const { locale } = await params;
  const [content, common] = await Promise.all([
    getDictionary(locale, "content-thank-you"),
    getDictionary(locale, "common"),
  ]);

  return (
    <ThankYou
      heading={content.venueRental.heading}
      body={content.venueRental.body}
      links={getThankYouLinks(common.thankYouLinks)["venue-rental"]}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
