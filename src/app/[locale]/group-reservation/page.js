import GroupReservationHero from "@/components/group-reservation/Hero";
import Intro from "@/components/group-reservation/Intro";
import CorporateEvents from "@/components/group-reservation/CorporateEvents";
import BuffetPackages from "@/components/group-reservation/BuffetPackages";
import GalleryExperience from "@/components/group-reservation/GalleryExperience";
import FAQ from "@/components/group-reservation/FAQ";
import ContactCTA from "@/components/group-reservation/ContactCTA";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/group-reservation/ReservationForm"));

const title = "Corporate & Group Dining in Bali";
const description =
  "Host corporate dinners, company gatherings, and group celebrations at Raja Bali in Bali's Nusa Dua area. Reserve your group dining experience today.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/group-reservation" },
};

export default async function GroupReservationPage({ params }) {
  const { locale } = await params;
  const [forms, faqs, common, gr] = await Promise.all([
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
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Corporate & Group Dining" }]}
      />
      <GroupReservationHero content={gr.hero} />
      <Intro content={gr.intro} />
      <CorporateEvents content={gr.corporateEvents} />
      <BuffetPackages content={gr.buffetPackages} />
      <GalleryExperience content={gr.gallery} />
      <FAQ faqs={faqs.groupReservation} heading={common.faqHeading} subheading={common.faqSubheading} />
      <ReservationForm dict={forms.groupReservation} common={forms.common} />
      <ContactCTA content={gr.contactCTA} />
      <StickyReserveButton href="#reservation" label="RESERVE FOR GROUP" />
    </main>
  );
}