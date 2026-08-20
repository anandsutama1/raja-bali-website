import SmartImage from "@/components/SmartImage";
import BuffetCategory from "@/components/menu/BuffetCategory";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd } from "@/lib/menuSchema";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

const title = "Western & Asian Buffet Menu";
const description =
  "Raja Bali's group dinner buffet menu featuring Western & Asian favorites, starting from IDR 350K per person, ideal for groups with different preferences.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/menu/western-asian-buffet"),
  };
}

export default async function WesternAsianBuffetPage({ params }) {
  const { locale } = await params;
  const [menuDict, common] = await Promise.all([
    getDictionary(locale, "menu"),
    getDictionary(locale, "common"),
  ]);
  const buffet = menuDict.westernAsianBuffet;
  const { starters, mainCourses } = buffet;

  // Single source for both the visible BuffetCategory list below and the
  // structured data — each option maps to a MenuItem with no price of its
  // own, since the whole spread is covered by the one per-person Offer.
  const menuJsonLd = buildMenuJsonLd({
    url: `${SITE_URL}/menu/western-asian-buffet`,
    name: "Raja Bali Western & Asian Buffet Menu",
    description,
    offers: {
      "@type": "Offer",
      price: "350000",
      priceCurrency: "IDR",
      unitText: "per person",
    },
    sections: [...starters, ...mainCourses].map((category) => ({
      title: category.title,
      note: category.instruction,
      items: category.options.map((name) => ({ name })),
    })),
  });

  return (
    <main>
      <PageSchema
        path="/menu/western-asian-buffet"
        locale={locale}
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Western & Asian Buffet Menu" }]}
        mainEntityId={`${SITE_URL}/menu/western-asian-buffet#menu`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/western-asian-buffet-hero.jpg" alt="Raja Bali Western and Asian group dinner buffet spread" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-serif mb-2">{buffet.heroTitle}</h1>
          <p className="text-sm text-gray-300">{buffet.priceLine}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto border-t border-gray-200 py-16 px-6">
        {starters.map((category) => (
          <BuffetCategory key={category.title} {...category} />
        ))}

        <h2 className="text-2xl font-serif text-red-700 mb-6 border-b pb-2">{buffet.mainCoursesHeading}</h2>

        {mainCourses.map((category) => (
          <BuffetCategory key={category.title} {...category} />
        ))}
      </div>

      <StickyReserveButton href="/group-reservation#reservation" label={common.stickyReserve.groupBooking} />
    </main>
  );
}
