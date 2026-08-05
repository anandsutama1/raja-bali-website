import GalleryGrid from "@/components/GalleryGrid";

const images = Array.from({ length: 8 }, (_, i) => `/images/dance/gallery-${i + 1}.jpg`);

export default function DanceGallery() {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">
        Gallery <span className="text-raja-red">Experience</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        Moments captured from our Balinese dance performances, offering a glimpse into the grace, color, and spirit of the evening.
      </p>
      <div className="max-w-5xl mx-auto">
        <GalleryGrid images={images} altPrefix="Balinese dance performance gallery photo" />
      </div>
    </section>
  );
}
