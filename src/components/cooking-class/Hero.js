import Image from "next/image";

export default function CookingClassHero() {
  return (
    <section className="relative h-[70vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <Image
        src="/images/cooking-class/CookingClass-Hero.jpg"
        alt="Balinese cooking class at Raja Bali"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10">
        <h1 className="text-5xl font-serif mb-4">An Authentic Balinese Cooking Class Experience</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          This Balinese cooking class in Bali is your invitation into the traditions, flavors, and warm hospitality passed down through generations of Balinese families.
        </p>
      </div>
    </section>
  );
}