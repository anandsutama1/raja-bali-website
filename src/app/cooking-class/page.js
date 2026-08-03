import CookingClassHero from "@/components/cooking-class/Hero";
import Intro from "@/components/cooking-class/Intro";
import FeatureRows from "@/components/cooking-class/FeatureRows";
import DailySessions from "@/components/cooking-class/DailySessions";
import WhatsIncluded from "@/components/cooking-class/WhatsIncluded";
import MenuSection from "@/components/cooking-class/MenuSection";
import GalleryExperience from "@/components/cooking-class/GalleryExperience";
import Pricing from "@/components/cooking-class/Pricing";
import ReservationForm from "@/components/cooking-class/ReservationForm";

export const metadata = {
  title: "Balinese Cooking Class",
  description:
    "Discover the secrets of authentic Balinese cuisine in a hands-on cooking class with Raja Bali's experienced local chefs, from traditional spices to timeless family recipes.",
  alternates: { canonical: "/cooking-class" },
};

export default function CookingClassPage() {
  return (
    <main>
      <CookingClassHero />
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