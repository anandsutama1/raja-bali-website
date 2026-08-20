import Image from "next/image";
import Parallax from "./motion/Parallax";
import LocalizedLink from "./LocalizedLink";

export default function Hero({ content }) {
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-raja-black text-white">
      {/* Backdrop drifts slower than the page, which is what sells the depth. */}
      <Parallax speed={0.18} scale={1.12} className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homepage_Hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Darkened for legibility — the lighter touch tried before left the
            title/body text too hard to read against brighter footage. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/70" />
      </Parallax>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* No entrance animation here (unlike the rest of the page) —
            this is the LCP candidate, so it must paint on the first frame
            instead of fading in after a delay. Everything below it still
            gets the usual animate-rise treatment. */}
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-raja-red sm:text-xs">
          {content.eyebrow}
        </p>

        <h1>
          {/* Visually hidden: the logo image below carries the same brand
              name visually, but crawlers need actual text here to
              understand what this page (and site) is about — an image alt
              attribute alone is a weaker signal for the page's single
              highest-weight heading. */}
          <span className="sr-only">{content.srHeading}</span>
          <Image
            src="/images/home/Hero-RajaBali.png"
            alt="Raja Bali"
            width={385}
            height={224}
            priority
            fetchPriority="high"
            className="h-40 w-auto sm:h-52 md:h-64"
          />
        </h1>

        <p
          className="animate-rise mt-6 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base"
          style={{ animationDelay: "120ms" }}
        >
          {content.body}
        </p>

        <div
          className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <LocalizedLink
            href="/outlets"
            className="u-press bg-white px-8 py-3 text-sm tracking-widest text-raja-black hover:bg-raja-red hover:text-white"
          >
            {content.reserveTable}
          </LocalizedLink>
          <LocalizedLink
            href="/menu/food"
            className="u-press border border-white/40 px-8 py-3 text-sm tracking-widest hover:border-white hover:bg-white/10"
          >
            {content.viewMenu}
          </LocalizedLink>
        </div>
      </div>

      {/* Positioning lives on the wrapper so the entrance and idle animations
          each own a transform without fighting the centring. */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#welcome"
          aria-label={content.scrollAria}
          className="animate-rise block p-2"
          style={{ animationDelay: "700ms" }}
        >
          <span className="animate-cue block h-10 w-px bg-gradient-to-b from-white/0 via-white/70 to-white/0" />
        </a>
      </div>
    </section>
  );
}
