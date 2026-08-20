import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Confirmation page reached only after a successful private-events form
// submission (see components/private-events/ReservationForm.js).
// Deliberately not wired into PageSchema/sitemap/navigation — transient
// per-guest confirmation, not indexable marketing content.
const description = "Thank you for your private event enquiry at Raja Bali.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.privateEvents.heading,
    description,
    alternates: localeAlternates(locale, "/private-events/thank-you"),
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
      heading={content.privateEvents.heading}
      body={content.privateEvents.body}
      links={getThankYouLinks(common.thankYouLinks)["private-events"]}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
