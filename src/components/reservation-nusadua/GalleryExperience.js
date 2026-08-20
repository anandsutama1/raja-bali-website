import GalleryGrid from "@/components/GalleryGrid";

const images = Array.from({ length: 8 }, (_, i) => `/images/reservation-nusadua/gallery-${i + 1}.jpg`);

export default function GalleryExperience({ content }) {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        {content.body}
      </p>
      <div className="max-w-5xl mx-auto">
        <GalleryGrid images={images} altPrefix="Raja Bali Nusa Dua gallery photo" />
      </div>
    </section>
  );
}
