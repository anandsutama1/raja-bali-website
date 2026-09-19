/**
 * Inline Google Maps embed for a single location — same iframe pattern as
 * components/outlets/Location.js, but as a standalone component so pages
 * that only need one map (cooking-class, bar-class — both held at the
 * Main Restaurant) don't have to duplicate that markup. `mapSrc` is meant
 * to come from a LOCATIONS entry's `mapEmbedSrc` (see lib/site.js) rather
 * than being authored inline again.
 */
export default function LocationMap({ mapSrc, title, heading, address }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {heading && <h3 className="text-center text-xl font-serif mb-1">{heading}</h3>}
      {address && <p className="text-center text-sm text-gray-500 mb-4">{address}</p>}
      <div className="h-64 overflow-hidden rounded-lg border border-gray-200">
        <iframe
          src={mapSrc}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
