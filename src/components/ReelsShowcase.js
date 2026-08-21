import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";

// Vertical video clips (Instagram Reels-style) — muted/looped/autoplay, no
// captions or attribution baked in since we don't have per-clip creator
// handles to credit yet. Hosted on Cloudinary rather than Vercel's own
// /public on purpose: expected to grow to "many" clips over time, and video
// bandwidth at that scale belongs on a CDN built for it, not riding on the
// app's own hosting bill. If a clip ever needs to come down (e.g. a creator
// objects), removing its URL from the calling page's `videos` array is
// enough — the file stays wherever it was uploaded, this just stops linking
// to it. `videos` is a prop (not hardcoded here) so this section can be
// reused per page with its own clip set — first used on the homepage, then
// cooking-class.
//
// Static 2-up grid (not a scroller) so both clips are visible at once even
// on a mobile screen without swiping.
function ReelCard({ src }) {
  return (
    <div className="overflow-hidden rounded-lg bg-raja-black">
      <video
        className="aspect-[9/16] w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}

export default function ReelsShowcase({ content, videos }) {
  return (
    <section className="border-t border-gray-200 px-6 py-16 md:py-20">
      <Reveal as="h2" className="mb-2 text-center font-serif text-3xl">
        {content.heading}
      </Reveal>
      <Reveal as="p" delay={90} className="mb-10 text-center text-gray-500">
        {content.subheading}
      </Reveal>

      <Stagger className="mx-auto grid max-w-md grid-cols-2 gap-4 sm:max-w-lg sm:gap-6">
        {videos.map((src) => (
          <ReelCard key={src} src={src} />
        ))}
      </Stagger>
    </section>
  );
}
