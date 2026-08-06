import ReservationMainHero from "@/components/reservation-main/Hero";
import ReservationForm from "@/components/reservation-main/ReservationForm";
import GalleryExperience from "@/components/reservation-main/GalleryExperience";

export const metadata = {
  title: "Reservation | Main Restaurant Tanjung Benoa",
  description:
    "Book a table at Raja Bali Main Restaurant in Tanjung Benoa for authentic Balinese cuisine, our complimentary Balinese Dance Performance every Thursday, and hands-on cooking and cocktail classes.",
  alternates: { canonical: "/reservation-main" },
};

export default function ReservationMainPage() {
  return (
    <main>
      <ReservationMainHero />
      <GalleryExperience />
      <ReservationForm />
    </main>
  );
}