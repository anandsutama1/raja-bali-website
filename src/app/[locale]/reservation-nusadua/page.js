import dynamic from "next/dynamic";
import ReservationNusaDuaHero from "@/components/reservation-nusadua/Hero";
import GalleryExperience from "@/components/reservation-nusadua/GalleryExperience";
import LocationContext from "@/components/reservation-nusadua/LocationContext";
import FAQ from "@/components/reservation-nusadua/FAQ";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeNusaDua from "@/components/TripadvisorBadgeNusaDua";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/reservation-nusadua/ReservationForm"));

// This page gets its own share image (the Nusa Dua outlet's hero photo)
// instead of the site-wide default. Next.js doesn't merge openGraph/twitter
// objects between layout.js and page.js, a page-level one fully replaces
// the root's, so every field needed for a full share card is repeated here
// rather than just the image.
//
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
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { reservationNusadua } = await getDictionary(locale, "metadata");
  return {
    // title.absolute bypasses the root layout's "%s | Raja Bali" template —
    // the brand name is already in this title, so appending it again would
    // just duplicate it (matches the pattern on reservation-main/page.js).
    title: { absolute: reservationNusadua.title },
    description: reservationNusadua.description,
    alternates: localeAlternates(locale, "/reservation-nusadua"),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: reservationNusadua.title,
      description: reservationNusadua.description,
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
      title: reservationNusadua.title,
      description: reservationNusadua.description,
      images: ["/images/shared/og-reservation-nusadua.jpg"],
    },
  };
}

export default async function ReservationNusaDuaPage({ params }) {
  const { locale } = await params;
  const [meta, forms, faqs, common, rn] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "forms"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
    getDictionary(locale, "content-reservation-nusadua"),
  ]);

  return (
    <main>
      <PageSchema
        path="/reservation-nusadua"
        locale={locale}
        name={meta.reservationNusadua.title}
        description={meta.reservationNusadua.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/outlets" },
          { name: "Nusa Dua Reservation" },
        ]}
        mainEntityId={`${SITE_URL}/#nusa-dua`}
      />
      <ReservationNusaDuaHero content={rn.hero} />
      <GalleryExperience content={rn.gallery} />
      {/* Placed directly above the form (not up by the hero) so the
          rating is the last thing a guest sees before deciding to book —
          moved here 2026-08-21 for exactly that reason. */}
      <div className="flex justify-center py-8">
        <TripadvisorBadgeNusaDua />
      </div>
      <ReservationForm dict={forms.reservationNusadua} common={forms.common} />
      <FAQ faqs={faqs.reservationNusadua} heading={common.faqHeading} subheading={common.faqSubheading} />
      <LocationContext content={rn.locationContext} />
    </main>
  );
}
