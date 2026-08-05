import GalleryGrid from "@/components/GalleryGrid";

const images = [
  "/images/cooking-class/Rectangle 12.jpg",
  "/images/cooking-class/Rectangle 12-1.jpg",
  "/images/cooking-class/Rectangle 13.jpg",
  "/images/cooking-class/Rectangle 13-1.jpg",
  "/images/cooking-class/Rectangle 14.jpg",
  "/images/cooking-class/Rectangle 14-1.jpg",
  "/images/cooking-class/Rectangle 15.jpg",
  "/images/cooking-class/Rectangle 15-1.jpg",
];

export default function GalleryExperience() {
  return (
    <section className="border-t border-gray-200 py-24 px-6 bg-white">
      <h2 className="text-3xl font-serif text-center mb-2">
        Gallery <span className="text-raja-red">Experience</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        Explore moments captured from our Balinese Cooking Class.
      </p>
      <div className="max-w-5xl mx-auto">
        <GalleryGrid images={images} altPrefix="Cooking class gallery photo" />
      </div>
    </section>
  );
}