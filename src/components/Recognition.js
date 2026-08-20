import Image from "next/image";
import Reveal from "./motion/Reveal";
import Marquee from "./motion/Marquee";
import { LOCATIONS } from "@/lib/site";

const LOGOS = {
  ctrip: "/images/home/CTRIP.png",
  tripadvisor: "/images/home/TripAdvisor.png",
};

const THEME = {
  ctrip: { accent: "text-raja-red" },
  tripadvisor: { accent: "text-emerald-600" },
};

function AwardCard({ award, businessName }) {
  const theme = THEME[award.theme];

  return (
    <div className="u-lift w-60 shrink-0 rounded-lg border border-gray-200 bg-white px-6 py-8 text-center sm:w-64 md:w-72">
      <Image
        src={LOGOS[award.theme]}
        alt={award.title}
        width={64}
        height={64}
        className="mx-auto mb-4 rounded-full"
      />
      <p className={`mb-2 text-sm tracking-[0.3em] ${theme.accent}`}>★★★★★</p>
      <h3 className="mb-1 text-sm font-semibold">{award.title}</h3>
      <p className="mb-3 text-xs font-semibold text-gray-500">
        {businessName}
      </p>
      <p className="text-xs leading-relaxed text-gray-500">{award.desc}</p>
    </div>
  );
}

export default function Recognition({ content }) {
  // Numbers are Main Restaurant-specific (LOCATIONS[0]) — confirmed live
  // listings, see the sameAs comment in src/lib/site.js for dates/sources.
  const mainRestaurant = LOCATIONS[0];
  const tripadvisorUrl = mainRestaurant.sameAs.find((url) => url.includes("tripadvisor.com"));

  return (
    <section className="overflow-hidden border-t border-gray-200 bg-white py-20 md:py-24">
      <Reveal as="h2" className="mb-4 px-6 text-center font-serif text-3xl">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </Reveal>

      <Reveal
        delay={40}
        className="mb-8 flex flex-col items-center justify-center gap-2 px-6 text-center sm:flex-row sm:gap-8"
      >
        <p className="text-2xl font-serif text-raja-red">
          4.9 <span aria-hidden="true">★</span>{" "}
          <span className="text-base font-sans text-gray-500">{content.ratingGoogleSuffix}</span>
        </p>
        <span className="hidden h-6 w-px bg-gray-200 sm:block" aria-hidden="true" />
        <p className="text-2xl font-serif text-raja-red">
          4.8 <span aria-hidden="true">★</span>{" "}
          <span className="text-base font-sans text-gray-500">{content.ratingTripadvisorSuffix}</span>
        </p>
      </Reveal>

      <div className="px-6">
        <Reveal
          as="p"
          delay={90}
          className="mx-auto mb-12 max-w-2xl border-l-4 border-raja-red pl-6 text-left text-sm leading-relaxed text-gray-600"
        >
          {content.intro}
        </Reveal>
      </div>

      <Marquee speed={38} gap={24} direction="right">
        {content.awards.map((award) => (
          <AwardCard key={award.title} award={award} businessName={content.businessName} />
        ))}
      </Marquee>

      {tripadvisorUrl && (
        <Reveal delay={80} className="mt-10 flex justify-center px-6">
          <a
            href={tripadvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="u-press border border-raja-black px-8 py-3 text-center text-sm tracking-widest hover:border-raja-red hover:text-raja-red"
          >
            {content.viewOnTripadvisor}
          </a>
        </Reveal>
      )}
    </section>
  );
}
