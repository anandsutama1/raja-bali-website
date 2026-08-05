import Image from "next/image";

export default function BarClassHero() {
  return (
    <section className="relative h-[70vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <Image
        src="/images/bar-class/Hero.jpg"
        alt="Bartender preparing a cocktail at Raja Bali"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10">
        <h1 className="text-5xl font-serif mb-4">Master the Art of Mixology</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Shake, stir, and sip your way through an interactive cocktail-making experience inspired by the vibrant flavors of Bali.
        </p>
      </div>
    </section>
  );
}