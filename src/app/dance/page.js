import DanceHero from "@/components/dance/Hero";
import Intro from "@/components/dance/Intro";
import Schedule from "@/components/dance/Schedule";
import DanceRepertoire from "@/components/dance/DanceRepertoire";
import DanceGallery from "@/components/dance/Gallery";
import FAQ from "@/components/dance/FAQ";
import ClosingCTA from "@/components/dance/ClosingCTA";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import DanceStructuredData from "@/components/dance/StructuredData";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Balinese Dance Performance";
const description =
  "Watch a complimentary Balinese Dance performance every Thursday evening at Raja Bali Main Restaurant in Nusa Dua's Tanjung Benoa area, free for dining guests.";

// This page gets its own share image (the dance hero photo) instead of the
// site-wide default. Next.js doesn't merge openGraph/twitter objects between
// layout.js and page.js, a page-level one fully replaces the root's, so
// every field needed for a full share card is repeated here rather than
// just the image.
export const metadata = {
  title,
  description,
  alternates: { canonical: "/dance" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [
      {
        url: "/images/shared/og-dance.jpg",
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
    images: ["/images/shared/og-dance.jpg"],
  },
};

export default function DancePage() {
  return (
    <main>
      <PageSchema
        path="/dance"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Balinese Dance Performance" }]}
        mainEntityId={`${SITE_URL}/dance#event`}
      />
      <DanceStructuredData />
      <DanceHero />
      <Intro />
      <Schedule />
      <DanceRepertoire />
      <DanceGallery />
      <FAQ />
      <ClosingCTA />
      <StickyReserveButton href="/reservation-main" label="RESERVE TABLE" />
    </main>
  );
}