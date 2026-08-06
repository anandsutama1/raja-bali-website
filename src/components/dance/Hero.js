import SmartImage from "@/components/SmartImage";

export default function DanceHero() {
  return (
    <section className="relative h-[70vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/dance/Hero.jpg" alt="Raja Bali" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="mb-3 text-xs font-semibold tracking-widest text-raja-red uppercase">
          Complimentary &middot; Every Thursday &middot; Exclusively at Raja Bali Main Restaurant
        </p>
        <h1 className="text-5xl font-serif mb-4">A Timeless Balinese Dance Experience</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Step into an evening where ancient stories come alive through movement, music, and the sacred artistry of Bali.
        </p>
      </div>
    </section>
  );
}