import PrivateEventsHero from "@/components/private-events/Hero";
import Intro from "@/components/private-events/Intro";
import WhatsIncluded from "@/components/private-events/WhatsIncluded";
import EventSpaces from "@/components/private-events/EventSpaces";
import GalleryExperience from "@/components/private-events/GalleryExperience";
import ReservationForm from "@/components/private-events/ReservationForm";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";

const title = "Private Events & Venue Rental";
const description =
  "Celebrate life's special moments at Raja Bali with private event spaces, venue rental, and personalized event planning for weddings, corporate dinners, and celebrations.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/private-events" },
};

export default function PrivateEventsPage() {
  return (
    <main>
      <PageSchema
        path="/private-events"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Private Events & Venue Rental" }]}
      />
      <PrivateEventsHero />
      <Intro />
      <WhatsIncluded />
      <EventSpaces />
      <GalleryExperience />
      <ReservationForm />
      <StickyReserveButton href="#reservation" label="RESERVE PRIVATE EVENT" />
    </main>
  );
}