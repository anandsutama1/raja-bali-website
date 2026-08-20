import Image from "next/image";
import Reveal from "./motion/Reveal";
import Parallax from "./motion/Parallax";
import LocalizedLink from "./LocalizedLink";

export default function VenueRental({ content }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 border-t border-gray-200 px-6 py-16 md:flex-row md:py-20">
      <Reveal x={-36} y={12} className="order-2 w-full border-l-4 border-raja-red pl-6 md:order-1 md:w-1/2">
        <h2 className="mb-4 font-serif text-2xl md:text-3xl">
          {content.heading}
        </h2>
        <p className="mb-6 leading-relaxed text-gray-600">
          {content.body}
        </p>
        <LocalizedLink
          href="/private-events"
          className="u-press group inline-flex items-center gap-2 rounded bg-raja-black px-6 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
        >
          {content.cta}
          <span className="u-nudge">→</span>
        </LocalizedLink>
      </Reveal>

      <Reveal x={36} y={12} delay={120} className="order-1 w-full md:order-2 md:w-1/2">
        <div className="h-64 overflow-hidden rounded md:h-72">
          <Parallax speed={0.06} scale={1.08} className="relative h-full w-full">
            <Image
              src="/images/home/Venue-Rental.jpg"
              alt="Venue rental setup for a private event"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}
