import AboutHero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import FeatureRows from "@/components/about/FeatureRows";
import QuoteBlock from "@/components/about/QuoteBlock";
import ClosingCTA from "@/components/about/ClosingCTA";
import PageSchema from "@/components/PageSchema";

const title = "About Us";
const description =
  "The story behind Raja Bali, a restaurant rooted in Balinese tradition, authentic recipes, fresh local ingredients, and warm island hospitality in Nusa Dua.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageSchema
        path="/about"
        name={title}
        description={description}
        type="AboutPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us" }]}
      />
      <AboutHero />
      <OurStory />
      <FeatureRows />
      <QuoteBlock />
      <ClosingCTA />
    </main>
  );
}