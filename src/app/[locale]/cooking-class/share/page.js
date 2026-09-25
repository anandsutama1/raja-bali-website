import ShareHero from "@/components/share/Hero";
import ShareButtons from "@/components/share/ShareButtons";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";
import { SITE_URL } from "@/lib/site";

// Raja Bali Cooking Class has its own Google Business Profile and
// Tripadvisor listing, separate from the Main Restaurant's (confirmed by
// the client 2026-09-25). Every review link on this page points there,
// never at LOCATIONS[0]'s (the site-wide /share page's default), or a
// guest's review would land on the wrong listing.
const GOOGLE_REVIEW_URL = "https://share.google/NX3XV1jlZjiEimL0K";
const TRIPADVISOR_URL =
  "https://www.tripadvisor.co.id/Attraction_Review-g297698-d34700458-Reviews-Raja_Bali_Cooking_Class-Nusa_Dua_Benoa_South_Kuta_Badung_Regency_Bali.html";

// Reached the same way as the site-wide /share page (a QR code, here most
// likely handed to guests as they leave the class, e.g. on the printed
// certificate), so it gets the same treatment: not a landing page,
// excluded from search, no PageSchema/JSON-LD.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { cookingClassShare } = await getDictionary(locale, "metadata");
  return {
    title: cookingClassShare.title,
    description: cookingClassShare.description,
    alternates: localeAlternates(locale, "/cooking-class/share"),
    robots: { index: false, follow: true },
  };
}

export default async function CookingClassSharePage({ params }) {
  const { locale } = await params;
  const share = await getDictionary(locale, "content-cooking-class-share");

  return (
    <main>
      <ShareHero
        content={share.hero}
        image="/images/cooking-class/CookingClass-Hero.jpg"
        imageAlt="Guests cooking together at Raja Bali's Balinese cooking class"
      />
      <ShareButtons
        content={share.shareButtons}
        shareUrl={`${SITE_URL}/${locale}/cooking-class?utm_source=guest-share&utm_medium=social`}
        shareTitle="Raja Bali Cooking Class"
        googleReviewUrl={GOOGLE_REVIEW_URL}
        tripadvisorUrl={TRIPADVISOR_URL}
        viewLinkHref="/cooking-class"
        viewLinkLabel={share.shareButtons.viewMenu}
      />
    </main>
  );
}
