import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Recognition from "@/components/Recognition";
import Menus from "@/components/Menus";
import Activities from "@/components/Activities";
import Testimonials from "@/components/Testimonials";
import HotelTransfer from "@/components/HotelTransfer";
import VenueRental from "@/components/VenueRental";
import InstagramGrid from "@/components/InstagramGrid";
import FAQ from "@/components/FAQ";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Recognition />
      <Menus />
      <Activities />
      <HotelTransfer />
      <VenueRental />
      <InstagramGrid />
      <Testimonials />
      <FAQ />
    </main>
  );
}