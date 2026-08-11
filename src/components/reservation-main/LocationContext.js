import Link from "next/link";

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
export default function LocationContext() {
  return (
    <section className="max-w-2xl mx-auto text-center border-t border-gray-200 py-16 px-6">
      <h2 className="text-2xl font-serif mb-4">Perfectly Located in Nusa Dua</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        Raja Bali Main Restaurant is located in Nusa Dua, close to Bali&apos;s leading luxury resorts, cultural attractions, shopping destinations, and pristine beaches. Whether you&apos;re joining our{" "}
        <Link href="/cooking-class" className="u-link text-raja-red">
          Balinese Cooking Class
        </Link>
        , enjoying a traditional{" "}
        <Link href="/dance" className="u-link text-raja-red">
          Balinese Dance Dinner
        </Link>
        , attending a{" "}
        <Link href="/private-events" className="u-link text-raja-red">
          private event
        </Link>
        , or simply dining with family and friends, every experience takes place at this convenient location.
      </p>
    </section>
  );
}
