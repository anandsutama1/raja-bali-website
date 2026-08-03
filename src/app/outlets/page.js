import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OutletsHero from "@/components/outlets/Hero";
import Destinations from "@/components/outlets/Destinations";
import Location from "@/components/outlets/Location";
import ContactCTA from "@/components/outlets/ContactCTA";

export const metadata = {
  title: "Our Locations",
  description:
    "Discover Raja Bali's two destinations — the flagship Main Restaurant in Tanjung Benoa and Raja Bali Nusa Dua — with maps, hours, and booking links for each.",
  alternates: { canonical: "/outlets" },
};

export default function OutletsPage() {
  return (
    <main>
      <Navbar />
      <OutletsHero />
      <Destinations />
      <Location />
      <ContactCTA />
      <Footer />
    </main>
  );
}