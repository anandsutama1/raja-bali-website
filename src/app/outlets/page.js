import OutletsHero from "@/components/outlets/Hero";
import Destinations from "@/components/outlets/Destinations";
import Location from "@/components/outlets/Location";
import FAQ from "@/components/outlets/FAQ";
import ContactCTA from "@/components/outlets/ContactCTA";
import PageSchema from "@/components/PageSchema";

const title = "Our Locations";
const description =
  "Discover Raja Bali's two destinations in Nusa Dua, the flagship Main Restaurant and Raja Bali Nusa Dua, with maps, hours, and booking links for each.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/outlets" },
};

export default function OutletsPage() {
  return (
    <main>
      <PageSchema
        path="/outlets"
        name={title}
        description={description}
        type="CollectionPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Our Locations" }]}
      />
      <OutletsHero />
      <Destinations />
      <Location />
      <FAQ />
      <ContactCTA />
    </main>
  );
}