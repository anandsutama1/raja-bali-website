import PrivateEventsHero from "@/components/private-events/Hero";
import Intro from "@/components/private-events/Intro";
import WhatsIncluded from "@/components/private-events/WhatsIncluded";
import EventSpaces from "@/components/private-events/EventSpaces";
import GalleryExperience from "@/components/private-events/GalleryExperience";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/private-events/ReservationForm"));

const title = "Private Events & Venue Rental";
const description =
  "Celebrate life's special moments at Raja Bali in Bali's Nusa Dua area, with private event spaces, venue rental, and personalized event planning for weddings, corporate dinners, and celebrations.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/private-events" },
};

export default async function PrivateEventsPage({ params }) {
  const { locale } = await params;
  const [forms, pe, common] = await Promise.all([
    getDictionary(locale, "forms"),
    getDictionary(locale, "content-private-events"),
    getDictionary(locale, "common"),
  ]);

  return (
    <main>
      <PageSchema
        path="/private-events"
        locale={locale}
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Private Events & Venue Rental" }]}
      />
      <PrivateEventsHero content={pe.hero} />
      <Intro content={pe.intro} />
      <WhatsIncluded content={pe.whatsIncluded} />
      <EventSpaces content={pe.eventSpaces} />
      <GalleryExperience content={pe.gallery} />
      <ReservationForm dict={forms.privateEvents} common={forms.common} />
      <StickyReserveButton href="#reservation" label={common.stickyReserve.privateEvent} />
    </main>
  );
}