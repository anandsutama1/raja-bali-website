import Image from "next/image";
import Link from "next/link";
import Parallax from "./motion/Parallax";

export default function Hero() {
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
        {/* Light touch — just enough to keep the white text/logo legible
            without dimming the footage the way the old opaque overlay did. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/45" />
      </Parallax>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className="animate-rise mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-raja-red sm:text-xs"
          style={{ animationDelay: "120ms" }}
        >
          A premier destination for authentic Balinese cuisine
        </p>

        <h1
          className="animate-rise"
          style={{ animationDelay: "260ms" }}
        >
          <Image
            src="/images/home/Hero-RajaBali.png"
            alt="Raja Bali"
            width={385}
            height={224}
            priority
            className="h-40 w-auto sm:h-52 md:h-64"
          />
        </h1>

        <p
          className="animate-rise mt-6 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base"
          style={{ animationDelay: "340ms" }}
        >
          A premier destination for authentic Balinese cuisine in the heart
          of Nusa Dua, where time-honored recipes meet heartfelt hospitality.
          Celebrated globally for culinary excellence, we invite you to
          savor the rich traditions and vibrant flavors that have made Bali
          a beloved destination for travelers around the world.
        </p>

        <div
          className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "460ms" }}
        >
          <Link
            href="/outlets"
            className="u-press bg-white px-8 py-3 text-sm tracking-widest text-raja-black hover:bg-raja-red hover:text-white"
          >
            RESERVE TABLE
          </Link>
          <Link
            href="/menu/food"
            className="u-press border border-white/40 px-8 py-3 text-sm tracking-widest hover:border-white hover:bg-white/10"
          >
            VIEW MENU
          </Link>
        </div>
      </div>

      {/* Positioning lives on the wrapper so the entrance and idle animations
          each own a transform without fighting the centring. */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <Link
          href="#welcome"
          aria-label="Scroll to content"
          className="animate-rise block p-2"
          style={{ animationDelay: "700ms" }}
        >
          <span className="animate-cue block h-10 w-px bg-gradient-to-b from-white/0 via-white/70 to-white/0" />
        </Link>
      </div>
    </section>
  );
}
