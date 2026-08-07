import ReservationMainHero from "@/components/reservation-main/Hero";
import Experiences from "@/components/reservation-main/Experiences";
import ReservationForm from "@/components/reservation-main/ReservationForm";
import GalleryExperience from "@/components/reservation-main/GalleryExperience";
import FAQ from "@/components/reservation-main/FAQ";
import LocationContext from "@/components/reservation-main/LocationContext";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeMain from "@/components/TripadvisorBadgeMain";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Authentic Balinese Restaurant in Nusa Dua | Raja Bali Main Restaurant";
// Landmark names are real, well-known fixtures of the compact ITDC Nusa Dua
// tourism enclave — a verified geographic fact, not an unverifiable
// distance/time claim (per Google Search Essentials, no specific "X km" or
// "X minutes" figures are used here). Geography is precise here: this
// location is in Tanjung Benoa, just north of Nusa Dua proper — see the
// comment on this location's entry in src/lib/site.js.
const description =
  "Experience authentic Balinese cuisine in Tanjung Benoa, within the Nusa Dua area. Raja Bali Main Restaurant is conveniently located near Bali Collection, The Westin Resort Nusa Dua, Museum Pasifika, and other leading attractions. Enjoy traditional dining, Balinese Cooking Class, cultural performances, private events, and group dining experiences.";

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
