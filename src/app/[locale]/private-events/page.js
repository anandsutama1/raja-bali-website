import PrivateEventsHero from "@/components/private-events/Hero";
import Intro from "@/components/private-events/Intro";
import WhatsIncluded from "@/components/private-events/WhatsIncluded";
import EventSpaces from "@/components/private-events/EventSpaces";
import GalleryExperience from "@/components/private-events/GalleryExperience";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeMain from "@/components/TripadvisorBadgeMain";
import LocalizedLink from "@/components/LocalizedLink";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/private-events/ReservationForm"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { privateEvents } = await getDictionary(locale, "metadata");
  return {
    title: privateEvents.title,
    description: privateEvents.description,
    alternates: localeAlternates(locale, "/private-events"),
  };
}

export default async function PrivateEventsPage({ params }) {
  const { locale } = await params;
  const [meta, forms, pe, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "forms"),
    getDictionary(locale, "content-private-events"),
    getDictionary(locale, "common"),
  ]);

  return (
    <main>
      <PageSchema
        path="/private-events"
        locale={locale}
        name={meta.privateEvents.title}
        description={meta.privateEvents.description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Private Events" }]}
      />
      <PrivateEventsHero content={pe.hero} />
      <Intro content={pe.intro} />
      <WhatsIncluded content={pe.whatsIncluded} />
      <EventSpaces content={pe.eventSpaces} />
      <GalleryExperience content={pe.gallery} />
      {/* This page is the restaurant hosting an event FOR the guest — for
          the reverse (renting the empty space to run their own event), a
          small pointer to /venue-rental so that guest isn't stuck here. */}
      <p className="px-6 pt-8 text-center text-sm text-gray-500">
        {pe.venueRentalCrossLink.prefix}
        <LocalizedLink href="/venue-rental" className="u-link text-raja-red">
          {pe.venueRentalCrossLink.linkLabel}
        </LocalizedLink>
        {pe.venueRentalCrossLink.suffix}
      </p>
      {/* Real Tripadvisor rating for the Main Restaurant, where private
          events are hosted — right above the form. */}
      <div className="flex justify-center px-6 py-8">
        <TripadvisorBadgeMain />
      </div>
      <ReservationForm dict={forms.privateEvents} common={forms.common} />
      <StickyReserveButton href="#reservation" label={common.stickyReserve.privateEvent} />
    </main>
  );
}