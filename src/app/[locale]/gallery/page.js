import SmartImage from "@/components/SmartImage";
import CategoryGrid from "@/components/gallery/CategoryGrid";
import PageSchema from "@/components/PageSchema";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/alternates";

const title = "Gallery";
const description =
  "A glimpse into the flavors, celebrations, and warm hospitality that define every Raja Bali experience: dining, cooking and bar classes, dance, and private events.";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/gallery"),
  };
}

// Reuses the photos already uploaded on each experience's own page instead of
// asking for a fresh set just for this grid.
const diningVenueImages = Array.from({ length: 8 }, (_, i) => `/images/reservation-main/gallery-${i + 1}.jpg`);
const cookingClassImages = [
  "/images/cooking-class/Rectangle 12.jpg",
  "/images/cooking-class/Rectangle 12-1.jpg",
  "/images/cooking-class/Rectangle 13.jpg",
  "/images/cooking-class/Rectangle 13-1.jpg",
  "/images/cooking-class/Rectangle 14.jpg",
  "/images/cooking-class/Rectangle 14-1.jpg",
  "/images/cooking-class/Rectangle 15.jpg",
  "/images/cooking-class/Rectangle 15-1.jpg",
];
const barClassImages = [
  "/images/bar-class/Rectangle 12.jpg",
  "/images/bar-class/Rectangle 12-1.jpg",
  "/images/bar-class/Rectangle 13.jpg",
  "/images/bar-class/Rectangle 13-1.jpg",
  "/images/bar-class/Rectangle 14.jpg",
  "/images/bar-class/Rectangle 14-1.jpg",
  "/images/bar-class/Rectangle 15.jpg",
  "/images/bar-class/Rectangle 15-1.jpg",
];
const danceImages = Array.from({ length: 8 }, (_, i) => `/images/dance/gallery-${i + 1}.jpg`);
const privateEventsImages = Array.from({ length: 8 }, (_, i) => `/images/private-events/gallery-${i + 1}.jpg`);
const groupCelebrationsImages = Array.from({ length: 8 }, (_, i) => `/images/group-reservation/gallery-${i + 1}.jpg`);

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  const gallery = await getDictionary(locale, "content-gallery");
  const c = gallery.categories;

  return (
    <main>
      <PageSchema
        path="/gallery"
        locale={locale}
        name={title}
        description={description}
        type="ImageGallery"
        crumbs={[{ name: "Home", path: "/" }, { name: "Gallery" }]}
      />
      <section className="relative h-[40vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/gallery/Hero.jpg" alt="Photo gallery of Raja Bali's dining, cooking class, bar class, dance, and private event experiences" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-serif mb-4">{gallery.heroTitle}</h1>
          <p className="text-sm text-gray-200">
            {gallery.heroBody}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto border-t border-gray-200 py-20 px-6">
        <CategoryGrid title={c.diningVenue} images={diningVenueImages} />
        <CategoryGrid title={c.cookingClass} images={cookingClassImages} />
        <CategoryGrid title={c.barClass} images={barClassImages} />
        <CategoryGrid title={c.dance} images={danceImages} />
        <CategoryGrid title={c.privateEvents} images={privateEventsImages} />
        <CategoryGrid title={c.groupCelebrations} images={groupCelebrationsImages} />
      </div>

    </main>
  );
}
