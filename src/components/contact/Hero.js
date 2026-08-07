import SmartImage from "@/components/SmartImage";

export default function ContactHero() {
  return (
    <section className="relative h-[50vh] bg-raja-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/contact/Hero.jpg" alt="Dining area at Raja Bali restaurant" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10">
        <h1 className="text-5xl font-serif mb-4">Let's Plan Your Raja Bali Experience</h1>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Planning an intimate dinner, a family gathering, or a cultural experience? Our team is here to help, and happy to answer any questions too.
        </p>
      </div>
    </section>
  );
}