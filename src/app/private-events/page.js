import PrivateEventsHero from "@/components/private-events/Hero";
import Intro from "@/components/private-events/Intro";
import WhatsIncluded from "@/components/private-events/WhatsIncluded";
import EventSpaces from "@/components/private-events/EventSpaces";
import GalleryExperience from "@/components/private-events/GalleryExperience";
import ReservationForm from "@/components/private-events/ReservationForm";

export const metadata = {
  title: "Private Events & Venue Rental",
  description:
    "Celebrate life's special moments at Raja Bali — private event spaces, venue rental, and personalized event planning for weddings, corporate dinners, and celebrations.",
  alternates: { canonical: "/private-events" },
};

export default function PrivateEventsPage() {
  return (
    <main>
      <PrivateEventsHero />
      <Intro />
      <WhatsIncluded />
      <EventSpaces />
      <GalleryExperience />
      <ReservationForm />
    </main>
  );
}