import LocalizedLink from "@/components/LocalizedLink";

/**
 * Deliberately just an h2 + one paragraph — no hotel/attraction list, no
 * extra visuals. The geographic SEO work (specific hotel and landmark
 * names, areaServed, containedInPlace) lives in metadata and JSON-LD
 * instead (see src/lib/site.js and components/StructuredData.js), so the
 * page itself stays uncluttered while search engines still get the
 * detailed context. No About/Gallery/Contact/Home links row here — the
 * Navbar and Footer already cover those on every page, and repeating them
 * here read as redundant.
 */
export default function LocationContext({ content }) {
  return (
    <section className="max-w-2xl mx-auto text-center border-t border-gray-200 py-16 px-6">
      <h2 className="text-2xl font-serif mb-4">{content.heading}</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        {content.descParts.map((part, i) =>
          part.link ? (
            <LocalizedLink key={i} href={part.link} className="u-link text-raja-red">
              {part.text}
            </LocalizedLink>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </p>
    </section>
  );
}
