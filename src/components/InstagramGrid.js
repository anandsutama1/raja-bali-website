import Reveal from "./motion/Reveal";

const PROFILE_URL = "https://www.instagram.com/rajabalinusaduamainrestaurant";

// Deliberately static — no embed script. The embedista.com widget previously
// used here was found to hijack the entire page (document.write-based
// takeover replacing all content with a third-party promo site) after a
// delay, which is what caused the site to intermittently go blank. Do not
// re-add a third-party embed script here without verifying it first.
export default function InstagramGrid() {
  return (
    <section className="border-t border-gray-200 px-6 py-20">
      <Reveal as="h2" className="mb-10 text-center font-serif text-3xl">
        Instagram
      </Reveal>

      <div className="mx-auto flex w-full max-w-[540px] flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white px-8 py-12 text-center">
        <p className="text-sm text-gray-600">
          Follow @rajabalinusaduamainrestaurant on Instagram for our latest
          posts, behind-the-scenes moments, and updates.
        </p>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="u-press bg-raja-black px-8 py-3 text-sm tracking-widest text-white hover:bg-raja-red"
        >
          View on Instagram
        </a>
      </div>
    </section>
  );
}
