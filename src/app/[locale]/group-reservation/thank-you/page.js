import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Confirmation page reached only after a successful group-reservation form
// submission (see components/group-reservation/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
const description = "Thank you for your group reservation request at Raja Bali.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.groupReservation.heading,
    description,
    alternates: localeAlternates(locale, "/group-reservation/thank-you"),
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
      heading={content.groupReservation.heading}
      body={content.groupReservation.body}
      links={getThankYouLinks(common.thankYouLinks)["group-reservation"]}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
