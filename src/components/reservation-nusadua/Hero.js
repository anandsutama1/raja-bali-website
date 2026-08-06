import SmartImage from "@/components/SmartImage";

export default function ReservationNusaDuaHero() {
  return (
    <section className="relative h-[50vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/reservation-nusadua/Hero.jpg" alt="Raja Bali" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-5xl font-serif mb-4">Raja Bali Nusa Dua</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Enjoy authentic Balinese cuisine in an elegant setting, perfect for romantic dinners, family gatherings, and memorable celebrations in the heart of Nusa Dua.
        </p>
        <p className="mt-3 text-xs text-gray-300">
          Looking for our complimentary Balinese Dance Performance? It&apos;s held every Thursday evening at{" "}
          <a href="/reservation-main" className="underline hover:text-white">
            Raja Bali Main Restaurant
          </a>
          , not this location.
        </p>
      </div>
    </section>
  );
}