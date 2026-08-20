import AboutHero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import FeatureRows from "@/components/about/FeatureRows";
import QuoteBlock from "@/components/about/QuoteBlock";
import ClosingCTA from "@/components/about/ClosingCTA";
import PageSchema from "@/components/PageSchema";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

const title = "About Us";
const description =
  "The story behind Raja Bali, a restaurant rooted in Balinese tradition, authentic recipes, fresh local ingredients, and warm island hospitality in Nusa Dua.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const about = await getDictionary(locale, "content-about");

  return (
    <main>
      <PageSchema
        path="/about"
        locale={locale}
        name={title}
        description={description}
        type="AboutPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us" }]}
      />
      <AboutHero content={about.hero} />
      <OurStory content={about.ourStory} />
      <FeatureRows content={about.featureRows} />
      <QuoteBlock content={about.quoteBlock} />
      <ClosingCTA content={about.closingCTA} />
    </main>
  );
}
