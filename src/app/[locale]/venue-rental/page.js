import VenueRentalHero from "@/components/venue-rental/Hero";
import Garden from "@/components/venue-rental/Garden";
import PrivateRoom from "@/components/venue-rental/PrivateRoom";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/venue-rental/ReservationForm"));

// Distinct from /private-events on purpose: private-events is the restaurant
// hosting an event FOR the guest (weddings, corporate dinners, catered
// celebrations); this page is the reverse — an outside party renting the
// empty garden or private room to run their OWN class, shoot, or event.
// Keywords below are deliberately different from private-events/metadata.json
// so the two pages don't compete for the same search terms.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { venueRental } = await getDictionary(locale, "metadata");
  return {
    title: venueRental.title,
    description: venueRental.description,
    keywords: [
      "garden venue rental Nusa Dua",
      "meeting room rental Bali",
      "event space rental Bali",
      "yoga studio rental Nusa Dua",
      "photoshoot venue Bali",
      "co-working space Nusa Dua",
      "workshop venue rental Bali",
    ],
    alternates: localeAlternates(locale, "/venue-rental"),
  };
}

export default async function VenueRentalPage({ params }) {
  const { locale } = await params;
  const [meta, forms, common, vr] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "forms"),
    getDictionary(locale, "common"),
    getDictionary(locale, "content-venue-rental"),
  ]);

  return (
    <main>
      <PageSchema
        path="/venue-rental"
        locale={locale}
        name={meta.venueRental.title}
        description={meta.venueRental.description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Venue Rental" }]}
      />
      <VenueRentalHero content={vr.hero} />
      <Garden content={vr.garden} />
      <PrivateRoom content={vr.privateRoom} />
      <ReservationForm dict={forms.venueRental} common={forms.common} />
      <StickyReserveButton href="#reservation" label={common.stickyReserve.venueRental} />
    </main>
  );
}
