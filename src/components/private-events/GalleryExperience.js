import GalleryGrid from "@/components/GalleryGrid";

const images = Array.from({ length: 8 }, (_, i) => `/images/private-events/gallery-${i + 1}.jpg`);

export default function GalleryExperience() {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">
        Gallery <span className="text-raja-red">Experience</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        Showcase beautifully captured moments from birthdays, family gatherings, corporate dinners, wedding receptions, and private events.
      </p>
      <div className="max-w-5xl mx-auto">
        <GalleryGrid images={images} altPrefix="Private event gallery photo" />
      </div>
    </section>
  );
}
