import ReservationNusaDuaHero from "@/components/reservation-nusadua/Hero";
import ReservationForm from "@/components/reservation-nusadua/ReservationForm";
import GalleryExperience from "@/components/reservation-nusadua/GalleryExperience";

export const metadata = {
  title: "Reservation — Nusa Dua",
  description:
    "Book a table at Raja Bali Nusa Dua — authentic Balinese cuisine in a refined setting, perfect for romantic dinners, family gatherings, and memorable celebrations.",
  alternates: { canonical: "/reservation-nusadua" },
};

export default function ReservationNusaDuaPage() {
  return (
    <main>
      <ReservationNusaDuaHero />
      <ReservationForm />
      <GalleryExperience />
    </main>
  );
}