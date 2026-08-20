import Script from "next/script";
import Reveal from "./motion/Reveal";

// A prior embed here (embedista.com) hijacked the entire page via
// document.write after a delay, causing the site to intermittently go
// blank — see git history. This is Elfsight instead: the platform.js
// bundle was inspected before adding (no document.write/eval/top-level
// redirects, just a scoped widget renderer), and it's loaded lazily so it
// can't block or delay the rest of the page. If it ever misbehaves, revert
// to a static "View on Instagram" link like before.
export default function InstagramGrid({ content }) {
  return (
    <section className="border-t border-gray-200 px-6 py-20">
      <Reveal as="h2" className="mb-10 text-center font-serif text-3xl">
        {content.heading}
      </Reveal>

      <div className="mx-auto max-w-5xl">
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-af29d11f-dde5-4d63-8ab0-7a8388923a8b" data-elfsight-app-lazy />
      </div>
    </section>
  );
}
