import SmartImage from "@/components/SmartImage";

export default function ReservationMainHero() {
  return (
    <section className="relative h-[50vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/reservation-main/Hero.jpg" alt="Raja Bali" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-5xl font-serif mb-4">Raja Bali Main Restaurant</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Reserve your table at Raja Bali Tanjung Benoa and immerse yourself in authentic Balinese cuisine, traditional cultural performances, and heartfelt island hospitality.
        </p>
      </div>
    </section>
  );
}