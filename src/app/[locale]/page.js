import Hero from "@/components/Hero";
import PromoTicker from "@/components/PromoTicker";
import ReelsShowcase from "@/components/ReelsShowcase";
import Welcome from "@/components/Welcome";
import SignatureDish from "@/components/SignatureDish";
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
  const [faqs, common, home] = await Promise.all([
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
    getDictionary(locale, "content-home"),
  ]);

  return (
    <main>
      <Hero content={home.hero} />
      <PromoTicker items={home.promoTicker} className="mt-10 md:mt-14" />
      <ReelsShowcase content={home.reels} />
      <Welcome content={home.welcome} />
      <SignatureDish content={home.signatureDish} />
      <Recognition content={home.recognition} />
      <Menus content={home.menus} />
      <Activities content={home.activities} />
      <HotelTransfer content={home.hotelTransfer} />
      <VenueRental content={home.venueRental} />
      <InstagramGrid content={home.instagram} />
      <Testimonials content={home.testimonials} />
      <FAQ faqs={faqs.home} heading={common.homeFaqHeading} subheading={common.faqSubheading} />
      <StickyReserveButton label={common.stickyReserve.table} />
    </main>
  );
}