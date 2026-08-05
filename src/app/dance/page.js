import DanceHero from "@/components/dance/Hero";
import Intro from "@/components/dance/Intro";
import Schedule from "@/components/dance/Schedule";
import DanceRepertoire from "@/components/dance/DanceRepertoire";
import DanceGallery from "@/components/dance/Gallery";
import ClosingCTA from "@/components/dance/ClosingCTA";
import StickyReserveButton from "@/components/StickyReserveButton";
import { SITE_NAME } from "@/lib/site";

const title = "Balinese Dance Performance";
const description =
  "Experience a timeless Balinese dance performance at Raja Bali every Thursday evening, featuring live music, traditional costumes, and a rotating repertoire of sacred stories.";

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
      <DanceHero />
      <Intro />
      <Schedule />
      <DanceRepertoire />
      <DanceGallery />
      <ClosingCTA />
      <StickyReserveButton href="/outlets" label="RESERVE TABLE" />
    </main>
  );
}