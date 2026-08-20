import SmartImage from "@/components/SmartImage";
import BuffetCategory from "@/components/menu/BuffetCategory";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd } from "@/lib/menuSchema";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { menuBalineseBuffet } = await getDictionary(locale, "metadata");
  return {
    title: menuBalineseBuffet.title,
    description: menuBalineseBuffet.description,
    alternates: localeAlternates(locale, "/menu/balinese-buffet"),
  };
}

export default async function BalineseBuffetPage({ params }) {
  const { locale } = await params;
  const [meta, menuDict, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "menu"),
    getDictionary(locale, "common"),
  ]);
  const { title, description } = meta.menuBalineseBuffet;
  const buffet = menuDict.balineseBuffet;
  const { starters, mainCourses } = buffet;

  // Single source for both the visible BuffetCategory list below and the
  // structured data — each option maps to a MenuItem with no price of its
  // own, since the whole spread is covered by the one per-person Offer.
  const menuJsonLd = buildMenuJsonLd({
    url: `${SITE_URL}/menu/balinese-buffet`,
    name: "Raja Bali Balinese Buffet Menu",
    description,
    offers: {
      "@type": "Offer",
      price: "300000",
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
        path="/menu/balinese-buffet"
        locale={locale}
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Balinese Buffet Menu" }]}
        mainEntityId={`${SITE_URL}/menu/balinese-buffet#menu`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/balinese-buffet-hero.jpg" alt="Raja Bali Balinese group dinner buffet spread" priority sizes="100vw" />
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
