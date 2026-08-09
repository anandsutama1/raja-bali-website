import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

const images = Array.from({ length: 8 }, (_, i) => `/images/group-reservation/gallery-${i + 1}.jpg`);

export default function GalleryExperience() {
  return (
    <section className="py-24 px-6 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-center mb-2">
        Gallery <span className="text-raja-red">Experience</span>
      </h2>
      <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
        Showcase beautifully captured moments from birthdays, family gatherings, corporate dinners, wedding receptions, and private events hosted at Raja Bali.
      </p>
      <div className="max-w-5xl mx-auto">
        <GalleryGrid images={images} altPrefix="Corporate and group dining experience at Raja Bali" />
      </div>
      <p className="text-center text-gray-600 mt-14 max-w-xl mx-auto">
        Guests joining us for a group or corporate dinner can also explore Raja Bali&apos;s other experiences, such as our{" "}
        <Link href="/cooking-class" className="font-semibold text-raja-red u-link">
          Balinese Cooking Class
        </Link>{" "}
        and{" "}
        <Link href="/bar-class" className="font-semibold text-raja-red u-link">
          Cocktail Class
        </Link>
        .
      </p>
    </section>
  );
}
