import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Confirmation page reached only after a successful Cooking Class form
// submission (see components/cooking-class/ReservationForm.js). Deliberately
// not wired into PageSchema/sitemap/navigation — transient per-guest
// confirmation, not indexable marketing content.
const description = "Thank you for booking a place in our Balinese Cooking Class at Raja Bali.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.cookingClass.heading,
    description,
    alternates: localeAlternates(locale, "/cooking-class/thank-you"),
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
      heading={content.cookingClass.heading}
      body={content.cookingClass.body}
      links={getThankYouLinks(common.thankYouLinks)["cooking-class"]}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
