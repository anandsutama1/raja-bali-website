import OutletsHero from "@/components/outlets/Hero";
import Destinations from "@/components/outlets/Destinations";
import Location from "@/components/outlets/Location";
import FAQ from "@/components/outlets/FAQ";
import ContactCTA from "@/components/outlets/ContactCTA";
import PageSchema from "@/components/PageSchema";
import { getDictionary } from "@/lib/i18n/getDictionary";

const title = "Our Locations";
const description =
  "Discover Raja Bali's two destinations in Nusa Dua, Raja Bali Nusa Dua (Main Restaurant) and Raja Bali Nusa Dua (Dine-in Restaurant), with maps, hours, and booking links for each.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/outlets" },
};

export default async function OutletsPage({ params }) {
  const { locale } = await params;
  const [faqs, common] = await Promise.all([
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
  ]);

  return (
    <main>
      <PageSchema
        path="/outlets"
        locale={locale}
        name={title}
        description={description}
        type="CollectionPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Our Locations" }]}
      />
      <OutletsHero />
      <Destinations />
      <Location />
      <FAQ faqs={faqs.outlets} heading={common.faqHeading} subheading={common.outletsFaqSubheading} />
      <ContactCTA />
    </main>
  );
}