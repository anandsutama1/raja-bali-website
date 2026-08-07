import Link from "next/link";
import Reveal from "./motion/Reveal";

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="mx-auto max-w-3xl scroll-mt-24 border-t border-gray-200 px-6 py-20 text-center md:py-28"
    >
      <Reveal as="h2" className="mb-6 font-serif text-3xl md:text-4xl">
        Welcome to <span className="text-raja-red">Raja Bali</span>
      </Reveal>

      <Reveal as="p" delay={110} className="mb-8 leading-relaxed text-gray-600">
        Raja Bali has built its reputation on genuinely great
        Balinese food, backed by years of strong reviews from travelers
        around the world. We bring together Bali&apos;s cultural heritage
        and warm, personal hospitality, with every dish drawing on recipes
        passed down through generations.
      </Reveal>

      <Reveal delay={220} className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/outlets"
          className="u-press rounded bg-raja-black px-6 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
        >
          RESERVE TABLE
        </Link>
        <Link
          href="/private-events"
          className="u-press rounded border border-raja-black px-6 py-3 text-sm tracking-widest hover:border-raja-red hover:text-raja-red"
        >
          PLAN AN EVENT
        </Link>
      </Reveal>
    </section>
  );
}
