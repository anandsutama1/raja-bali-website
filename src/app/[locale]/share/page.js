import ShareHero from "@/components/share/Hero";
import ShareButtons from "@/components/share/ShareButtons";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Reached via a QR code on the guest's bill (word-of-mouth prompt at
// checkout) and by direct link — not a marketing landing page, so it's
// deliberately kept out of search entirely rather than competing with the
// site's real content pages. No PageSchema/JSON-LD either, same reasoning
// as the thank-you pages.
const title = "Share Raja Bali";
const description = "Share your Raja Bali experience with friends and family.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/share"),
    robots: { index: false, follow: true },
  };
}

export default async function SharePage({ params }) {
  const { locale } = await params;
  const share = await getDictionary(locale, "content-share");

  return (
    <main>
      <ShareHero content={share.hero} />
      <ShareButtons content={share.shareButtons} />
    </main>
  );
}
