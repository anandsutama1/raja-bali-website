import SmartImage from "@/components/SmartImage";

// Reuses a real photo from Main Restaurant's own gallery (public/images/
// reservation-main/gallery-3.jpg) rather than a new upload — an evening
// dinner scene under string lights, which reads as "worth sharing" better
// than a plain daytime shot.
export default function ShareHero() {
  return (
    <section className="relative h-[50vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/reservation-main/gallery-3.jpg" alt="Evening dinner under string lights at Raja Bali Nusa Dua (Main Restaurant)" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="mb-3 text-xs font-semibold tracking-widest text-raja-red uppercase">Enjoyed Your Visit?</p>
        <h1 className="text-5xl font-serif mb-4">Share Raja Bali With Friends</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Word of mouth means the world to us. Tap a platform below to share Raja Bali, a short message is already written for you.
        </p>
      </div>
    </section>
  );
}
