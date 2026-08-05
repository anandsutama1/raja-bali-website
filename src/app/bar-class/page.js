import BarClassHero from "@/components/bar-class/Hero";
import Intro from "@/components/bar-class/Intro";
import FeatureRows from "@/components/bar-class/FeatureRows";
import DailySessions from "@/components/bar-class/DailySessions";
import WhatsIncluded from "@/components/bar-class/WhatsIncluded";
import MenuSection from "@/components/bar-class/MenuSection";
import GalleryExperience from "@/components/bar-class/GalleryExperience";
import Pricing from "@/components/bar-class/Pricing";
import ReservationForm from "@/components/bar-class/ReservationForm";

export const metadata = {
  title: "Balinese Cocktail Class",
  description:
    "Master the art of mixology with Raja Bali's hands-on Balinese cocktail class. Learn from expert bartenders, taste authentic Balinese Arak, and craft your own signature drink.",
  alternates: { canonical: "/bar-class" },
};

export default function BarClassPage() {
  return (
    <main>
      <BarClassHero />
      <Intro />
      <FeatureRows />
      <DailySessions />
      <WhatsIncluded />
      <MenuSection />
      <GalleryExperience />
      <Pricing />
      <ReservationForm />
    </main>
  );
}