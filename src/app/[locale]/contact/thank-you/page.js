import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Confirmation page reached only after a successful Contact Us form
// submission (see components/contact/MessageForm.js). Deliberately not
// wired into PageSchema/sitemap/navigation — transient per-guest
// confirmation, not indexable marketing content.
const description = "Your message to Raja Bali has been sent.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content-thank-you");
  return {
    title: content.contact.heading,
    description,
    alternates: localeAlternates(locale, "/contact/thank-you"),
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
      heading={content.contact.heading}
      body={content.contact.body}
      links={getThankYouLinks(common.thankYouLinks).contact}
      mayAlsoLikeLabel={common.thankYouMayAlsoLike}
    />
  );
}
