import AboutHero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import FeatureRows from "@/components/about/FeatureRows";
import QuoteBlock from "@/components/about/QuoteBlock";
import ClosingCTA from "@/components/about/ClosingCTA";
import PageSchema from "@/components/PageSchema";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { about } = await getDictionary(locale, "metadata");
  return {
    title: about.title,
    description: about.description,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const [meta, about] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "content-about"),
  ]);

  return (
    <main>
      <PageSchema
        path="/about"
        locale={locale}
        name={meta.about.title}
        description={meta.about.description}
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
