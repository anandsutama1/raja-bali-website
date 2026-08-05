import Image from "next/image";
import Reveal from "./motion/Reveal";
import Marquee from "./motion/Marquee";

const awards = [
  { theme: "ctrip", title: "Ctrip Gourmet List 2018", desc: "Recognized by Ctrip for consistently great food and genuine hospitality.", logo: "/images/home/CTRIP.png" },
  { theme: "ctrip", title: "Ctrip Gourmet List 2019", desc: "Recognized by Ctrip for consistently great food and genuine hospitality.", logo: "/images/home/CTRIP.png" },
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
          Raja Bali Restaurant has won the Tripadvisor Travelers&apos;
          Choice Award five years running, placing us among the top 10% of
          restaurants worldwide. Along with our Ctrip Certificate of
          Excellence, it&apos;s recognition we&apos;re genuinely proud of,
          and a reflection of the care we put into every dish and every
          guest&apos;s visit.
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
