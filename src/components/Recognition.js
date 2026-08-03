import Image from "next/image";
import Reveal from "./motion/Reveal";
import Marquee from "./motion/Marquee";

const awards = [
  { theme: "ctrip", title: "Ctrip Gourmet List 2018", desc: "Celebrating culinary excellence, authentic flavors, and memorable dining experiences for travelers from around the world.", logo: "/images/home/CTRIP.png" },
  { theme: "ctrip", title: "Ctrip Gourmet List 2019", desc: "Celebrating culinary excellence, authentic flavors, and memorable dining experiences for travelers from around the world.", logo: "/images/home/CTRIP.png" },
  { theme: "tripadvisor", title: "Tripadvisor Travellers' Choice Awards 2024", desc: "Reviews from millions of Tripadvisor travelers place this winner in the top 10% worldwide.", logo: "/images/home/TripAdvisor.png" },
  { theme: "tripadvisor", title: "Tripadvisor Travellers' Choice Awards 2025", desc: "Reviews from millions of Tripadvisor travelers place this winner in the top 10% worldwide.", logo: "/images/home/TripAdvisor.png" },
  { theme: "tripadvisor", title: "Tripadvisor Travellers' Choice Awards 2026", desc: "Reviews from millions of Tripadvisor travelers place this winner in the top 10% worldwide.", logo: "/images/home/TripAdvisor.png" },
];

const THEME = {
  ctrip: { accent: "text-raja-red" },
  tripadvisor: { accent: "text-emerald-600" },
};

function AwardCard({ award }) {
  const theme = THEME[award.theme];

  return (
    <div className="u-lift w-60 shrink-0 rounded-lg border border-gray-200 bg-white px-6 py-8 text-center sm:w-64 md:w-72">
      <Image
        src={award.logo}
        alt={award.title}
        width={64}
        height={64}
        className="mx-auto mb-4 rounded-full"
      />
      <p className={`mb-2 text-sm tracking-[0.3em] ${theme.accent}`}>★★★★★</p>
      <h3 className="mb-1 text-sm font-semibold">{award.title}</h3>
      <p className="mb-3 text-xs font-semibold text-gray-500">
        Raja Bali Restaurant
      </p>
      <p className="text-xs leading-relaxed text-gray-500">{award.desc}</p>
    </div>
  );
}

export default function Recognition() {
  return (
    <section className="overflow-hidden border-t border-gray-200 bg-white py-20 md:py-24">
      <Reveal as="h2" className="mb-6 px-6 text-center font-serif text-3xl">
        Raja Bali <span className="text-raja-red">Recognition</span>
      </Reveal>

      <div className="px-6">
        <Reveal
          as="p"
          delay={90}
          className="mx-auto mb-12 max-w-2xl border-l-4 border-raja-red pl-6 text-left text-sm leading-relaxed text-gray-600"
        >
          For five consecutive years, Raja Bali Restaurant has proudly earned
          the Tripadvisor Travelers&apos; Choice Award, placing us among the
          Top 10% of restaurants worldwide. Together with our Ctrip
          Certificate of Excellence, these recognitions reflect our
          unwavering commitment to authentic Balinese cuisine, heartfelt
          hospitality, and unforgettable dining experiences.
        </Reveal>
      </div>

      <Marquee speed={38} gap={24} direction="right">
        {awards.map((award) => (
          <AwardCard key={award.title} award={award} />
        ))}
      </Marquee>
    </section>
  );
}
