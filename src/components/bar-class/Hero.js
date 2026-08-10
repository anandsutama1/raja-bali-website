import Image from "next/image";
import Link from "next/link";

export default function BarClassHero() {
  return (
    <section className="relative h-[70vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <Image
        src="/images/bar-class/Hero.jpg"
        alt="Bartender preparing a cocktail at Raja Bali"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10">
        <h1 className="text-5xl font-serif mb-4">An Authentic Balinese Cocktail Class Experience</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Shake, stir, and sip your way through an interactive cocktail-making experience at{" "}
          <Link href="/outlets" className="u-link text-white">
            Raja Bali Main Restaurant
          </Link>{" "}
          in Tanjung Benoa, within the Nusa Dua area, inspired by the vibrant flavors of Bali.
        </p>
      </div>
    </section>
  );
}