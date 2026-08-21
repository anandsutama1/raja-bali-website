import GroupReservationHero from "@/components/group-reservation/Hero";
import Intro from "@/components/group-reservation/Intro";
import CorporateEvents from "@/components/group-reservation/CorporateEvents";
import BuffetPackages from "@/components/group-reservation/BuffetPackages";
import GalleryExperience from "@/components/group-reservation/GalleryExperience";
import FAQ from "@/components/group-reservation/FAQ";
import ContactCTA from "@/components/group-reservation/ContactCTA";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import TripadvisorBadgeMain from "@/components/TripadvisorBadgeMain";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/group-reservation/ReservationForm"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { groupReservation } = await getDictionary(locale, "metadata");
  return {
    title: groupReservation.title,
    description: groupReservation.description,
    alternates: localeAlternates(locale, "/group-reservation"),
  };
}

export default async function GroupReservationPage({ params }) {
  const { locale } = await params;
  const [meta, forms, faqs, common, gr] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "forms"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
    getDictionary(locale, "content-group-reservation"),
  ]);

  return (
    <main>
      <PageSchema
        path="/group-reservation"
        locale={locale}
        name={meta.groupReservation.title}
        description={meta.groupReservation.description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Corporate & Group Dining" }]}
      />
      <GroupReservationHero content={gr.hero} />
      <Intro content={gr.intro} />
      <CorporateEvents content={gr.corporateEvents} />
      <BuffetPackages content={gr.buffetPackages} />
      <GalleryExperience content={gr.gallery} />
      <FAQ faqs={faqs.groupReservation} heading={common.faqHeading} subheading={common.faqSubheading} />
      {/* Real Tripadvisor rating for the Main Restaurant, where group
          bookings are hosted — right above the form. */}
      <div className="flex justify-center px-6 py-8">
        <TripadvisorBadgeMain />
      </div>
      <ReservationForm dict={forms.groupReservation} common={forms.common} />
      <ContactCTA content={gr.contactCTA} />
      <StickyReserveButton href="#reservation" label={common.stickyReserve.groupBooking} />
    </main>
  );
}