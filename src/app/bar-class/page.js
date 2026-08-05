import BarClassHero from "@/components/bar-class/Hero";
import Intro from "@/components/bar-class/Intro";
import FeatureRows from "@/components/bar-class/FeatureRows";
import DailySessions from "@/components/bar-class/DailySessions";
import WhatsIncluded from "@/components/bar-class/WhatsIncluded";
import MenuSection from "@/components/bar-class/MenuSection";
import GalleryExperience from "@/components/bar-class/GalleryExperience";
import Pricing from "@/components/bar-class/Pricing";
import ReservationForm from "@/components/bar-class/ReservationForm";
import { SITE_NAME } from "@/lib/site";

const title = "Balinese Cocktail Class";
const description =
  "Master the art of mixology with Raja Bali's hands-on Balinese cocktail class. Learn from expert bartenders, taste authentic Balinese Arak, and craft your own signature drink.";

// This page gets its own share image (the cocktail class hero photo)
// instead of the site-wide default. Next.js doesn't merge openGraph/twitter
// objects between layout.js and page.js, a page-level one fully replaces
// the root's, so every field needed for a full share card is repeated here
// rather than just the image.
export const metadata = {
  title,
  description,
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

export default function BarClassPage() {
  return (
    <main>
      <BarClassHero />
      <Intro />
      <FeatureRows />
      <DailySessions />
      <WhatsIncluded />
      <MenuSection />
      <GalleryExperience />
      <Pricing />
      <ReservationForm />
    </main>
  );
}