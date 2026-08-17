import Hero from "@/components/Hero";
import PromoTicker from "@/components/PromoTicker";
import Welcome from "@/components/Welcome";
import Recognition from "@/components/Recognition";
import Menus from "@/components/Menus";
import Activities from "@/components/Activities";
import Testimonials from "@/components/Testimonials";
import HotelTransfer from "@/components/HotelTransfer";
import VenueRental from "@/components/VenueRental";
import InstagramGrid from "@/components/InstagramGrid";
import FAQ from "@/components/FAQ";
import StickyReserveButton from "@/components/StickyReserveButton";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <PromoTicker />
      <Welcome />
      <Recognition />
      <Menus />
      <Activities />
      <HotelTransfer />
      <VenueRental />
      <InstagramGrid />
      <Testimonials />
      <FAQ />
      <StickyReserveButton />
    </main>
  );
}