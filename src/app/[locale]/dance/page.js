import DanceHero from "@/components/dance/Hero";
import Intro from "@/components/dance/Intro";
import Schedule from "@/components/dance/Schedule";
import DanceRepertoire from "@/components/dance/DanceRepertoire";
import DanceGallery from "@/components/dance/Gallery";
import FAQ from "@/components/dance/FAQ";
import ClosingCTA from "@/components/dance/ClosingCTA";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import DanceStructuredData from "@/components/dance/StructuredData";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

// This page gets its own share image (the dance hero photo) instead of the
// site-wide default. Next.js doesn't merge openGraph/twitter objects between
// layout.js and page.js, a page-level one fully replaces the root's, so
// every field needed for a full share card is repeated here rather than
// just the image.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { dance } = await getDictionary(locale, "metadata");
  return {
    title: dance.title,
    description: dance.description,
    alternates: localeAlternates(locale, "/dance"),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${dance.title} | ${SITE_NAME}`,
      description: dance.description,
      images: [
        {
          url: "/images/shared/og-dance.jpg",
          width: 1200,
          height: 630,
          alt: dance.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dance.title} | ${SITE_NAME}`,
      description: dance.description,
      images: ["/images/shared/og-dance.jpg"],
    },
  };
}

export default async function DancePage({ params }) {
  const { locale } = await params;
  const [meta, faqs, common, dance] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "common"),
    getDictionary(locale, "content-dance"),
  ]);

  return (
    <main>
      <PageSchema
        path="/dance"
        locale={locale}
        name={meta.dance.title}
        description={meta.dance.description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Balinese Dance Performance" }]}
        mainEntityId={`${SITE_URL}/dance#event`}
      />
      <DanceStructuredData />
      <DanceHero content={dance.hero} />
      <Intro content={dance.intro} />
      <Schedule content={dance.schedule} />
      <DanceRepertoire content={dance.repertoire} />
      <DanceGallery content={dance.gallery} />
      <FAQ faqs={faqs.dance} heading={common.faqHeading} subheading={common.faqSubheading} />
      <ClosingCTA content={dance.closingCTA} />
      <StickyReserveButton href="/reservation-main" label={common.stickyReserve.table} />
    </main>
  );
}