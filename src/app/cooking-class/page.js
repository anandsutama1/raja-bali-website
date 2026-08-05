import CookingClassHero from "@/components/cooking-class/Hero";
import Intro from "@/components/cooking-class/Intro";
import FeatureRows from "@/components/cooking-class/FeatureRows";
import DailySessions from "@/components/cooking-class/DailySessions";
import WhatsIncluded from "@/components/cooking-class/WhatsIncluded";
import MenuSection from "@/components/cooking-class/MenuSection";
import GalleryExperience from "@/components/cooking-class/GalleryExperience";
import Pricing from "@/components/cooking-class/Pricing";
import ReservationForm from "@/components/cooking-class/ReservationForm";
import StickyReserveButton from "@/components/StickyReserveButton";
import { SITE_NAME } from "@/lib/site";

const title = "Balinese Cooking Class";
const description =
  "Discover the secrets of authentic Balinese cuisine in a hands-on cooking class with Raja Bali's experienced local chefs, from traditional spices to timeless family recipes.";

// This page gets its own share image (the cooking class hero photo) instead
// of the site-wide default. Next.js doesn't merge openGraph/twitter objects
// between layout.js and page.js, a page-level one fully replaces the root's,
// so every field needed for a full share card is repeated here rather than
// just the image.
export const metadata = {
  title,
  description,
  alternates: { canonical: "/cooking-class" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [
      {
        url: "/images/shared/og-cooking-class.jpg",
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
    images: ["/images/shared/og-cooking-class.jpg"],
  },
};

export default function CookingClassPage() {
  return (
    <main>
      <CookingClassHero />
      <Intro />
      <FeatureRows />
      <DailySessions />
      <WhatsIncluded />
      <MenuSection />
      <GalleryExperience />
      <Pricing />
      <ReservationForm />
      <StickyReserveButton href="#reservation" label="RESERVE COOKING CLASS" />
    </main>
  );
}