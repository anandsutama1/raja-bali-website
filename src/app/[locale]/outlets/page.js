import OutletsHero from "@/components/outlets/Hero";
import Destinations from "@/components/outlets/Destinations";
import Location from "@/components/outlets/Location";
import FAQ from "@/components/outlets/FAQ";
import ContactCTA from "@/components/outlets/ContactCTA";
import PageSchema from "@/components/PageSchema";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { outlets } = await getDictionary(locale, "metadata");
  return {
    title: outlets.title,
    description: outlets.description,
    alternates: localeAlternates(locale, "/outlets"),
  };
}

export default async function OutletsPage({ params }) {
  const { locale } = await params;
  const [meta, faqs, common, outlets] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
    getDictionary(locale, "content-outlets"),
  ]);

  return (
    <main>
      <PageSchema
        path="/outlets"
        locale={locale}
        name={meta.outlets.title}
        description={meta.outlets.description}
        type="CollectionPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Our Locations" }]}
      />
      <OutletsHero content={outlets.hero} />
      <Destinations content={outlets.destinations} />
      <Location content={outlets.location} />
      <FAQ faqs={faqs.outlets} heading={common.faqHeading} subheading={common.outletsFaqSubheading} />
      <ContactCTA content={outlets.contactCTA} />
    </main>
  );
}