import ReservationNusaDuaHero from "@/components/reservation-nusadua/Hero";
import ReservationForm from "@/components/reservation-nusadua/ReservationForm";
import GalleryExperience from "@/components/reservation-nusadua/GalleryExperience";
import { SITE_NAME } from "@/lib/site";

const title = "Reservation | Nusa Dua";
const description =
  "Book a table at Raja Bali Nusa Dua for authentic Balinese cuisine in a refined setting, perfect for romantic dinners, family gatherings, and memorable celebrations.";

// This page gets its own share image (the Nusa Dua outlet's hero photo)
// instead of the site-wide default. Next.js doesn't merge openGraph/twitter
// objects between layout.js and page.js, a page-level one fully replaces
// the root's, so every field needed for a full share card is repeated here
// rather than just the image.
export const metadata = {
  title,
  description,
  alternates: { canonical: "/reservation-nusadua" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [
      {
        url: "/images/shared/og-reservation-nusadua.jpg",
        width: 1200,
        height: 630,
        alt: "Raja Bali Nusa Dua",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/images/shared/og-reservation-nusadua.jpg"],
  },
};

export default function ReservationNusaDuaPage() {
  return (
    <main>
      <ReservationNusaDuaHero />
      <GalleryExperience />
      <ReservationForm />
    </main>
  );
}
