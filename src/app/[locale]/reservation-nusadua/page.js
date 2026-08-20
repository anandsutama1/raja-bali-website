import dynamic from "next/dynamic";
import ReservationNusaDuaHero from "@/components/reservation-nusadua/Hero";
import GalleryExperience from "@/components/reservation-nusadua/GalleryExperience";
import LocationContext from "@/components/reservation-nusadua/LocationContext";
import FAQ from "@/components/reservation-nusadua/FAQ";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeNusaDua from "@/components/TripadvisorBadgeNusaDua";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/reservation-nusadua/ReservationForm"));

// Previously "Nusa Dua Restaurant Reservation" — a transactional title that
// didn't say what kind of restaurant this is. GSC shows this page earning
// 316 impressions but only 9 clicks (~2.9% CTR, well under the site's ~7.9%
// average), the largest non-homepage CTR gap on the site, so the title/
// description are worth strengthening. Deliberately distinct from
// reservation-main's "Authentic Balinese Restaurant in Nusa Dua | Raja Bali
// Nusa Dua (Main Restaurant)" (that page's differentiator is the cooking/bar
// class + dance experiences) so the two location pages don't compete for
// the identical phrase — this one leans on its own real differentiator, the
// elegant dining setting, per Destinations.js on /outlets. Entity name
// matches src/lib/site.js's LOCATIONS[1].name exactly — see the naming note
// on that entry for why both outlets now share the "Raja Bali Nusa Dua"
// base name.
const title = "Balinese Restaurant in Nusa Dua | Raja Bali Nusa Dua (Dine-in Restaurant)";
const description =
  "Reserve a table at Raja Bali Nusa Dua (Dine-in Restaurant) for authentic Balinese cuisine in an elegant setting, perfect for romantic dinners and memorable evenings in Nusa Dua.";

// This page gets its own share image (the Nusa Dua outlet's hero photo)
// instead of the site-wide default. Next.js doesn't merge openGraph/twitter
// objects between layout.js and page.js, a page-level one fully replaces
// the root's, so every field needed for a full share card is repeated here
// rather than just the image.
export const metadata = {
  // title.absolute bypasses the root layout's "%s | Raja Bali" template —
  // the brand name is already in this title, so appending it again would
  // just duplicate it (matches the pattern on reservation-main/page.js).
  title: { absolute: title },
  description,
  alternates: { canonical: "/reservation-nusadua" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    images: [
      {
        url: "/images/shared/og-reservation-nusadua.jpg",
        width: 1200,
        height: 630,
        alt: "Raja Bali Nusa Dua (Dine-in Restaurant)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/shared/og-reservation-nusadua.jpg"],
  },
};

export default async function ReservationNusaDuaPage({ params }) {
  const { locale } = await params;
  const forms = await getDictionary(locale, "forms");

  return (
    <main>
      <PageSchema
        path="/reservation-nusadua"
        locale={locale}
        name={title}
        description={description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/outlets" },
          { name: "Nusa Dua Reservation" },
        ]}
        mainEntityId={`${SITE_URL}/#nusa-dua`}
      />
      <ReservationNusaDuaHero />
      <div className="flex justify-center py-8">
        <TripadvisorBadgeNusaDua />
      </div>
      <GalleryExperience />
      <ReservationForm dict={forms.reservationNusadua} common={forms.common} />
      <FAQ />
      <LocationContext />
    </main>
  );
}
