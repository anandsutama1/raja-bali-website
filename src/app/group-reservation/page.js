import GroupReservationHero from "@/components/group-reservation/Hero";
import Intro from "@/components/group-reservation/Intro";
import BuffetPackages from "@/components/group-reservation/BuffetPackages";
import GalleryExperience from "@/components/group-reservation/GalleryExperience";
import ContactCTA from "@/components/group-reservation/ContactCTA";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/group-reservation/ReservationForm"));

const title = "Group Reservation & Buffet Packages";
const description =
  "Curated buffet packages for every occasion at Raja Bali, featuring authentic Balinese and Western & Asian buffet menus for group celebrations and events.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/group-reservation" },
};

export default function GroupReservationPage() {
  return (
    <main>
      <PageSchema
        path="/group-reservation"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Group Reservation & Buffet Packages" }]}
      />
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