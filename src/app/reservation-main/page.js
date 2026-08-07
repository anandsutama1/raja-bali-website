import ReservationMainHero from "@/components/reservation-main/Hero";
import ReservationForm from "@/components/reservation-main/ReservationForm";
import GalleryExperience from "@/components/reservation-main/GalleryExperience";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeMain from "@/components/TripadvisorBadgeMain";
import { SITE_URL } from "@/lib/site";

const title = "Reservation | Main Restaurant Tanjung Benoa";
const description =
  "Book a table at Raja Bali Main Restaurant in Tanjung Benoa for authentic Balinese cuisine, our complimentary Balinese Dance Performance every Thursday, and hands-on cooking and cocktail classes.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/reservation-main" },
};

export default function ReservationMainPage() {
  return (
    <main>
      <PageSchema
        path="/reservation-main"
        name={title}
        description={description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/outlets" },
          { name: "Main Restaurant Reservation" },
        ]}
        mainEntityId={`${SITE_URL}/#main-restaurant`}
      />
      <ReservationMainHero />
      <div className="flex justify-center px-6 py-8">
        <TripadvisorBadgeMain />
      </div>
      <GalleryExperience />
      <ReservationForm />
    </main>
  );
}