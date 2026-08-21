import SmartImage from "@/components/SmartImage";
import LocalizedLink from "@/components/LocalizedLink";
import MenuSection from "@/components/menu/MenuSection";
import WineTable from "@/components/menu/WineTable";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd, buildWineMenuSection } from "@/lib/menuSchema";
import { SITE_URL } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { menuBeverage } = await getDictionary(locale, "metadata");
  return {
    title: menuBeverage.title,
    description: menuBeverage.description,
    alternates: localeAlternates(locale, "/menu/beverage"),
  };
}

export default async function BeverageMenuPage({ params }) {
  const { locale } = await params;
  const [meta, menuDict, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "menu"),
    getDictionary(locale, "common"),
  ]);
  const { title, description } = meta.menuBeverage;
  const bev = menuDict.beverage;
  const {
    signatureCocktails, balineseCocktails, classicCocktails, refreshing, wellness,
    juice, beers, teaCoffee, softDrinks, milkshakes, premiumSpirit, localSpirit,
    whiskeyPremium, whiskeyLocal,
  } = bev.sections;
  const {
    localWhiteWine, localRedWine, localRoseWine, localSparklingWine,
    importedWhiteWine, importedRedWine, importedRoseWine, importedSparklingWine,
  } = bev.wine;
  const t = bev.sectionTitles;
  const n = bev.notes;

  const wineItems = [
    ...localWhiteWine, ...localRedWine, ...localRoseWine, ...localSparklingWine,
    ...importedWhiteWine, ...importedRedWine, ...importedRoseWine, ...importedSparklingWine,
  ];

  const menuJsonLd = buildMenuJsonLd({
    url: `${SITE_URL}/menu/beverage`,
    name: "Raja Bali Beverage Menu",
    description,
    sections: [
      { title: t.signature, note: n.premiumLocalSpirit, items: signatureCocktails },
      { title: t.balineseCocktail, note: n.allPrice80K, items: balineseCocktails },
      { title: t.classicCocktail, note: n.premiumLocalSpirit, items: classicCocktails },
      { title: t.refreshing, items: refreshing },
      { title: t.wellness, items: wellness },
      { title: t.juice, items: juice },
      { title: t.beer, items: beers },
      { title: t.teaCoffee, items: teaCoffee },
      { title: t.softDrinks, items: softDrinks },
      { title: t.milkshakes, items: milkshakes },
      { title: t.premiumSpirit, note: n.premiumSpiritShot, items: premiumSpirit },
      { title: t.localSpirit, note: n.localSpiritShot, items: localSpirit },
      { title: t.whiskeyPremium, note: n.whiskeyPremiumShot, items: whiskeyPremium },
      { title: t.whiskeyLocal, note: n.whiskeyLocalShot, items: whiskeyLocal },
    ],
  });

  // Wine items price by glass and/or bottle rather than a single figure, so
  // they go through buildWineMenuSection (multiple named Offers per item)
  // instead of the sections array above, which assumes one price per item.
  menuJsonLd.hasMenuSection.push(
    buildWineMenuSection({
      title: bev.wineListHeading,
      note: bev.wineListNote,
      items: wineItems,
    })
  );

  return (
    <main>
      <PageSchema
        path="/menu/beverage"
        locale={locale}
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Beverage Menu" }]}
        mainEntityId={`${SITE_URL}/menu/beverage#menu`}
      />
      <script
        type="application/ld+json"
        // Data is built from the dictionary above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/beverage-hero.jpg" alt="Raja Bali beverage menu: signature cocktails, Balinese Arak, wine, and refreshments" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-serif mb-2">{bev.heroTitle}</h1>
          <p className="text-sm text-gray-300">{bev.priceNote}</p>
          <LocalizedLink
            href="/menu/food"
            className="u-press mt-6 inline-block border border-white/40 px-8 py-3 text-sm tracking-widest hover:border-white hover:bg-white/10"
          >
            {bev.crossLinkLabel}
          </LocalizedLink>
        </div>
      </section>

      <div className="max-w-5xl mx-auto border-t border-gray-200 py-16 px-6">
        <h2 className="text-3xl font-serif text-center mb-10">{bev.specialCocktailsHeading}</h2>
        <MenuSection title={t.signature} note={n.premiumLocalSpirit} items={signatureCocktails} />
        <MenuSection title={t.balineseCocktail} note={n.allPrice80K} items={balineseCocktails} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-10">{bev.classicCocktailHeading}</h2>
        <MenuSection title={t.classicCocktail} note={n.premiumLocalSpirit} items={classicCocktails} />

        <MenuSection title={t.refreshing} items={refreshing} />
        <MenuSection title={t.wellness} items={wellness} />
        <MenuSection title={t.juice} items={juice} />
        <MenuSection title={t.beer} items={beers} />
        <MenuSection title={t.teaCoffee} items={teaCoffee} />
        <MenuSection title={t.softDrinks} items={softDrinks} />
        <MenuSection title={t.milkshakes} items={milkshakes} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-10">{bev.spiritsHeading}</h2>
        <MenuSection title={t.premiumSpirit} note={n.premiumSpiritShot} items={premiumSpirit} />
        <MenuSection title={t.localSpirit} note={n.localSpiritShot} items={localSpirit} />
        <MenuSection title={t.whiskeyPremium} note={n.whiskeyPremiumShot} items={whiskeyPremium} />
        <MenuSection title={t.whiskeyLocal} note={n.whiskeyLocalShot} items={whiskeyLocal} />

        <h2 className="text-3xl font-serif text-center mb-10 mt-10">{bev.wineListHeading}</h2>
        <h3 className="text-xl font-serif text-red-700 mb-6">{bev.localHouseWineHeading}</h3>
        <WineTable title={t.whiteWine} items={localWhiteWine} glassBottle />
        <WineTable title={t.redWine} items={localRedWine} glassBottle />
        <WineTable title={t.roseWine} items={localRoseWine} glassBottle />
        <WineTable title={t.sparklingWine} items={localSparklingWine} />

        <h3 className="text-xl font-serif text-red-700 mb-6 mt-10">{bev.importedWineHeading}</h3>
        <WineTable title={t.whiteWine} items={importedWhiteWine} />
        <WineTable title={t.redWine} items={importedRedWine} />
        <WineTable title={t.roseWine} items={importedRoseWine} />
        <WineTable title={t.sparklingWine} items={importedSparklingWine} />
      </div>

      <StickyReserveButton href="/outlets" label={common.stickyReserve.table} />
    </main>
  );
}
