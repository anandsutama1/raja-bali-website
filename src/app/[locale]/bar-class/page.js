import BarClassHero from "@/components/bar-class/Hero";
import Intro from "@/components/bar-class/Intro";
import FeatureRows from "@/components/bar-class/FeatureRows";
import DailySessions from "@/components/bar-class/DailySessions";
import WhatsIncluded from "@/components/bar-class/WhatsIncluded";
import MenuSection from "@/components/bar-class/MenuSection";
import GalleryExperience from "@/components/bar-class/GalleryExperience";
import Pricing from "@/components/bar-class/Pricing";
import FAQ from "@/components/bar-class/FAQ";
import StickyReserveButton from "@/components/StickyReserveButton";
import BarClassStructuredData from "@/components/bar-class/StructuredData";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/bar-class/ReservationForm"));

const title = "Balinese Cocktail Class";
const description =
  "Join Raja Bali's Balinese cocktail class every Thursday at 3 PM in Nusa Dua, then stay for the complimentary Balinese dance from 7 PM. One Thursday, two experiences.";

// This page gets its own share image (the cocktail class hero photo)
// instead of the site-wide default. Next.js doesn't merge openGraph/twitter
// objects between layout.js and page.js, a page-level one fully replaces
// the root's, so every field needed for a full share card is repeated here
// rather than just the image.
export const metadata = {
  title,
  description,
  keywords: [
    "Balinese cocktail class",
    "cocktail class Bali",
    "Thursday cocktail class Bali",
    "bar class Bali",
    "Balinese dance performance",
    "free Balinese dance Thursday",
    "complimentary Balinese dance Main Restaurant",
    "Raja Bali Nusa Dua Main Restaurant",
  ],
  alternates: { canonical: "/bar-class" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [
      {
        url: "/images/shared/og-bar-class.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/images/shared/og-bar-class.jpg"],
  },
};

export default async function BarClassPage({ params }) {
  const { locale } = await params;
  const [forms, faqs, common] = await Promise.all([
    getDictionary(locale, "forms"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
  ]);

  return (
    <main>
      <PageSchema
        path="/bar-class"
        locale={locale}
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Balinese Cocktail Class" }]}
        mainEntityId={`${SITE_URL}/bar-class#course`}
      />
      <BarClassStructuredData />
      <BarClassHero />
      <Intro />
      <FeatureRows />
      <DailySessions />
      <WhatsIncluded />
      <MenuSection />
      <GalleryExperience />
      <Pricing />
      <FAQ faqs={faqs.barClass} heading={common.faqHeading} subheading={common.faqSubheading} />
      <ReservationForm dict={forms.barClass} common={forms.common} />
      <StickyReserveButton href="#reservation" label="RESERVE COCKTAIL & HEALTHY DRINK CLASS" />
    </main>
  );
}