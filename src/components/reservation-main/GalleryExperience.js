import SmartImage from "@/components/SmartImage";

const images = Array.from({ length: 8 }, (_, i) => `/images/reservation-main/gallery-${i + 1}.jpg`);

export default function GalleryExperience() {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">
        Gallery <span className="text-raja-red">Experience</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        Showcase beautifully captured moments from birthdays, family gatherings, corporate dinners, wedding receptions, and private events hosted at Raja Bali.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-5xl mx-auto">
        {images.map((src, index) => (
          <div key={src} className="relative h-40">
            <SmartImage
              src={src}
              alt={`Raja Bali Main Restaurant gallery photo ${index + 1}`}
              sizes="(min-width: 640px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
