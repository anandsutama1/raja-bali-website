import SmartImage from "@/components/SmartImage";
import LocalizedLink from "@/components/LocalizedLink";
import MenuSection from "@/components/menu/MenuSection";
import SetMenuCard from "@/components/menu/SetMenuCard";
import StickyReserveButton from "@/components/StickyReserveButton";
import StickyMenuCrossLink from "@/components/StickyMenuCrossLink";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd } from "@/lib/menuSchema";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { menuFood } = await getDictionary(locale, "metadata");
  return {
    title: menuFood.title,
    description: menuFood.description,
    alternates: localeAlternates(locale, "/menu/food"),
  };
}

export default async function FoodMenuPage({ params }) {
  const { locale } = await params;
  const [meta, menuDict, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "menu"),
    getDictionary(locale, "common"),
  ]);
  const { title, description } = meta.menuFood;
  const food = menuDict.food;
  const { appetizer, soup, vegetarian, riceNoodles, mainCourse, betutu, kidsMenu, dessert } = food.sections;
  const setMenus = food.setMenus;
  const t = food.sectionTitles;

  const menuJsonLd = buildMenuJsonLd({
    url: `${SITE_URL}/menu/food`,
    name: "Raja Bali Food Menu",
    description,
    sections: [
      { title: t.appetizer, items: appetizer },
      { title: t.soup, items: soup },
      { title: t.vegetarian, items: vegetarian },
      { title: t.riceNoodles, items: riceNoodles },
      { title: t.mainCourse, items: mainCourse },
      { title: t.betutu, items: betutu },
      { title: t.kidsMenu, items: kidsMenu },
      { title: t.dessert, items: dessert },
      {
        title: food.setMenuHeadingAccent,
        // Each set menu is a fixed multi-course meal sold at one price, so it
        // maps to a single MenuItem whose description lists everything
        // included rather than one MenuItem per dish.
        items: setMenus.map((set) => ({
          name: set.name,
          desc: set.sections.map((s) => `${s.label}: ${s.items.join(", ")}`).join(" | "),
          price: set.price,
        })),
      },
    ],
  });

  return (
    <main>
      <PageSchema
        path="/menu/food"
        locale={locale}
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Food Menu" }]}
        mainEntityId={`${SITE_URL}/menu/food#menu`}
      />
      <script
        type="application/ld+json"
        // Data is built from the dictionary above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/food-hero.jpg" alt="Raja Bali food menu: appetizers, soups, main courses, and betutu" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-serif mb-2">{food.heroTitle}</h1>
          <p className="text-sm text-gray-300">{food.priceNote}</p>
          <LocalizedLink
            href="/menu/beverage"
            className="u-press mt-6 inline-block border border-white/40 px-8 py-3 text-sm tracking-widest hover:border-white hover:bg-white/10"
          >
            {food.crossLinkLabel}
          </LocalizedLink>
        </div>
      </section>

      <div className="max-w-5xl mx-auto border-t border-gray-200 py-16 px-6">
        <h2 className="text-3xl font-serif text-center mb-10">
          {food.setMenuHeadingPrefix}
          <span className="text-raja-red">{food.setMenuHeadingAccent}</span>
          {food.setMenuHeadingSuffix}
        </h2>
        {setMenus.map((set) => (
          <SetMenuCard
            key={set.id}
            id={set.id}
            name={set.name}
            price={set.price}
            image={set.image}
            imageAlt={set.imageAlt}
            description={set.description}
            sections={set.sections}
          />
        ))}

        <div className="mt-16">
          <MenuSection title={t.appetizer} items={appetizer} />
          <MenuSection title={t.soup} items={soup} />
          <MenuSection title={t.vegetarian} items={vegetarian} />
          <MenuSection title={t.riceNoodles} items={riceNoodles} />
          <MenuSection title={t.mainCourse} items={mainCourse} />
          <MenuSection title={t.betutu} items={betutu} />
          <MenuSection title={t.kidsMenu} items={kidsMenu} />
          <MenuSection title={t.dessert} items={dessert} />
        </div>
      </div>

      <StickyMenuCrossLink href="/menu/beverage" label={food.crossLinkLabel} />
      <StickyReserveButton href="/outlets" label={common.stickyReserve.table} />
    </main>
  );
}
