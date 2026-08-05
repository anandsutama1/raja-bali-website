import AboutHero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import FeatureRows from "@/components/about/FeatureRows";
import QuoteBlock from "@/components/about/QuoteBlock";
import ClosingCTA from "@/components/about/ClosingCTA";

export const metadata = {
  title: "About Us",
  description:
    "The story behind Raja Bali, a restaurant rooted in Balinese tradition, authentic recipes, fresh local ingredients, and warm island hospitality across Tanjung Benoa and Nusa Dua.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <FeatureRows />
      <QuoteBlock />
      <ClosingCTA />
    </main>
  );
}