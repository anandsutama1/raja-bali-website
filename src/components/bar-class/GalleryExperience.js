import Image from "next/image";

const images = [
  "/images/bar-class/Rectangle 12.jpg",
  "/images/bar-class/Rectangle 12-1.jpg",
  "/images/bar-class/Rectangle 13.jpg",
  "/images/bar-class/Rectangle 13-1.jpg",
  "/images/bar-class/Rectangle 14.jpg",
  "/images/bar-class/Rectangle 14-1.jpg",
  "/images/bar-class/Rectangle 15.jpg",
  "/images/bar-class/Rectangle 15-1.jpg",
];

export default function GalleryExperience() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">
        Gallery <span className="text-raja-red">Experience</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        Step behind the bar and discover the art of mixology through an immersive hands-on experience.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-5xl mx-auto">
        {images.map((src, index) => (
          <div key={src} className="relative h-40">
            <Image
              src={src}
              alt={`Bar class gallery photo ${index + 1}`}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}