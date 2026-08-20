import CookingClassHero from "@/components/cooking-class/Hero";
import Intro from "@/components/cooking-class/Intro";
import FeatureRows from "@/components/cooking-class/FeatureRows";
import DailySessions from "@/components/cooking-class/DailySessions";
import WhatsIncluded from "@/components/cooking-class/WhatsIncluded";
import MenuSection from "@/components/cooking-class/MenuSection";
import GalleryExperience from "@/components/cooking-class/GalleryExperience";
import Pricing from "@/components/cooking-class/Pricing";
import StickyReserveButton from "@/components/StickyReserveButton";
import CookingClassStructuredData from "@/components/cooking-class/StructuredData";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/cooking-class/ReservationForm"));

// This page gets its own share image (the cooking class hero photo) instead
// of the site-wide default. Next.js doesn't merge openGraph/twitter objects
// between layout.js and page.js, a page-level one fully replaces the root's,
// so every field needed for a full share card is repeated here rather than
// just the image.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { cookingClass } = await getDictionary(locale, "metadata");
  return {
    title: cookingClass.title,
    description: cookingClass.description,
    keywords: [
      "Balinese cooking class",
      "cooking class Bali",
      "cooking class Nusa Dua",
      "learn Balinese cooking",
      "Bali culinary experience",
    ],
    alternates: localeAlternates(locale, "/cooking-class"),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${cookingClass.title} | ${SITE_NAME}`,
      description: cookingClass.description,
      images: [
        {
          url: "/images/shared/og-cooking-class.jpg",
          width: 1200,
          height: 630,
          alt: cookingClass.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cookingClass.title} | ${SITE_NAME}`,
      description: cookingClass.description,
      images: ["/images/shared/og-cooking-class.jpg"],
    },
  };
}

export default async function CookingClassPage({ params }) {
  const { locale } = await params;
  const [meta, forms, cc, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "forms"),
    getDictionary(locale, "content-cooking-class"),
    getDictionary(locale, "common"),
  ]);

  return (
    <main>
      <PageSchema
        path="/cooking-class"
        locale={locale}
        name={meta.cookingClass.title}
        description={meta.cookingClass.description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Balinese Cooking Class" }]}
        mainEntityId={`${SITE_URL}/cooking-class#course`}
      />
      <CookingClassStructuredData />
      <CookingClassHero content={cc.hero} />
      <Intro content={cc.intro} />
      <FeatureRows content={cc.featureRows} />
      <DailySessions content={cc.dailySessions} />
      <WhatsIncluded content={cc.whatsIncluded} />
      <MenuSection content={cc.menuSection} />
      <GalleryExperience content={cc.gallery} />
      <Pricing content={cc.pricing} />
      <ReservationForm dict={forms.cookingClass} common={forms.common} />
      <StickyReserveButton href="#reservation" label={common.stickyReserve.cookingClass} />
    </main>
  );
}