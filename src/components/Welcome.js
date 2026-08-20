import Reveal from "./motion/Reveal";
import LocalizedLink from "./LocalizedLink";

export default function Welcome({ content }) {
  return (
    <section
      id="welcome"
      className="mx-auto max-w-3xl scroll-mt-24 border-t border-gray-200 px-6 py-20 text-center md:py-28"
    >
      <Reveal as="h2" className="mb-6 font-serif text-3xl md:text-4xl">
        {content.headingPrefix}<span className="text-raja-red">{content.headingAccent}</span>
      </Reveal>

      <Reveal as="p" delay={110} className="mb-8 leading-relaxed text-gray-600">
        {content.body}
      </Reveal>

      <Reveal delay={220} className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <LocalizedLink
          href="/outlets"
          className="u-press rounded bg-raja-black px-6 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
        >
          {content.reserveTable}
        </LocalizedLink>
        <LocalizedLink
          href="/private-events"
          className="u-press rounded border border-raja-black px-6 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red"
        >
          {content.planEvent}
        </LocalizedLink>
      </Reveal>
    </section>
  );
}
