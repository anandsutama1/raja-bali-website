import GroupReservationHero from "@/components/group-reservation/Hero";
import Intro from "@/components/group-reservation/Intro";
import BuffetPackages from "@/components/group-reservation/BuffetPackages";
import GalleryExperience from "@/components/group-reservation/GalleryExperience";
import ReservationForm from "@/components/group-reservation/ReservationForm";
import ContactCTA from "@/components/group-reservation/ContactCTA";
import StickyReserveButton from "@/components/StickyReserveButton";

export const metadata = {
  title: "Group Reservation & Buffet Packages",
  description:
    "Curated buffet packages for every occasion at Raja Bali, featuring authentic Balinese and Western & Asian buffet menus for group celebrations and events.",
  alternates: { canonical: "/group-reservation" },
};

export default function GroupReservationPage() {
  return (
    <main>
      <GroupReservationHero />
      <Intro />
      <BuffetPackages />
      <GalleryExperience />
      <ReservationForm />
      <ContactCTA />
      <StickyReserveButton href="#reservation" label="RESERVE FOR GROUP" />
    </main>
  );
}