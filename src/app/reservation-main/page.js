import dynamic from "next/dynamic";
import ReservationMainHero from "@/components/reservation-main/Hero";
import Experiences from "@/components/reservation-main/Experiences";
import GalleryExperience from "@/components/reservation-main/GalleryExperience";
import FAQ from "@/components/reservation-main/FAQ";
import LocationContext from "@/components/reservation-main/LocationContext";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeMain from "@/components/TripadvisorBadgeMain";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/reservation-main/ReservationForm"));

const title = "Authentic Balinese Restaurant in Nusa Dua | Raja Bali Main Restaurant";
// Kept short (under ~160 chars) so it doesn't get truncated in search
// results — the fuller landmark-name framing (Bali Collection, Westin,
// Museum Pasifika) still lives in the Restaurant description in
// src/lib/site.js (read by the site-wide JSON-LD), which is where this
// component's own docs say that detail belongs; see LocationContext.js.
// Geography is precise here: this location is in Tanjung Benoa, just north
// of Nusa Dua proper — see the comment on this location's entry in
// src/lib/site.js.
const description =
  "Reserve a table at Raja Bali Main Restaurant in Tanjung Benoa, Nusa Dua. Authentic Balinese dining, cooking classes, and cultural performances await.";

// This page gets its own share image (the Main Restaurant's hero photo)
// instead of the site-wide default. Next.js doesn't merge openGraph/twitter
// objects between layout.js and page.js, a page-level one fully replaces
// the root's, so every field needed for a full share card is repeated here
// rather than just the image.
export const metadata = {
  // title.absolute bypasses the root layout's "%s | Raja Bali" template —
  // the brand name is already in this title, so appending it again would
  // just duplicate it.
  title: { absolute: title },
  description,
  alternates: { canonical: "/reservation-main" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    images: [
      {
        url: "/images/reservation-main/Hero.jpg",
        width: 1200,
        height: 630,
        alt: "Raja Bali Main Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/reservation-main/Hero.jpg"],
  },
};

export default function ReservationMainPage() {
  return (
    <main>
      <PageSchema
        path="/reservation-main"
        name={title}
        description={description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/outlets" },
          { name: "Main Restaurant Reservation" },
        ]}
        mainEntityId={`${SITE_URL}/#main-restaurant`}
      />
      <ReservationMainHero />
      <div className="flex justify-center px-6 py-8">
        <TripadvisorBadgeMain />
      </div>
      <GalleryExperience />
      <ReservationForm />
      <Experiences />
      <FAQ />
      <LocationContext />
    </main>
  );
}
