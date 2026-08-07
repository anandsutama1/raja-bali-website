import SmartImage from "@/components/SmartImage";

export default function PrivateEventsHero() {
  return (
    <section className="relative h-[50vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/private-events/Hero.jpg" alt="Private event setup at Raja Bali" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-5xl font-serif mb-4">Celebrate Life's Special Moments at Raja Bali</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          From intimate gatherings to grand celebrations, Raja Bali offers elegant venues, authentic Balinese cuisine, and warm hospitality.
        </p>
      </div>
    </section>
  );
}