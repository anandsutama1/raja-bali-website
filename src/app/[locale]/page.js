import Hero from "@/components/Hero";
import PromoTicker from "@/components/PromoTicker";
import Welcome from "@/components/Welcome";
import Recognition from "@/components/Recognition";
import Menus from "@/components/Menus";
import Activities from "@/components/Activities";
import Testimonials from "@/components/Testimonials";
import HotelTransfer from "@/components/HotelTransfer";
import VenueRental from "@/components/VenueRental";
import InstagramGrid from "@/components/InstagramGrid";
import FAQ from "@/components/FAQ";
import StickyReserveButton from "@/components/StickyReserveButton";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "/") };
}

export default async function Home({ params }) {
  const { locale } = await params;
  const [faqs, common] = await Promise.all([
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
  ]);

  return (
    <main>
      <Hero />
      <PromoTicker className="mt-10 md:mt-14" />
      <Welcome />
      <Recognition />
      <Menus />
      <Activities />
      <HotelTransfer />
      <VenueRental />
      <InstagramGrid />
      <Testimonials />
      <FAQ faqs={faqs.home} heading={common.homeFaqHeading} subheading={common.faqSubheading} />
      <StickyReserveButton />
    </main>
  );
}