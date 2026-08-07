import Link from "next/link";

/**
 * Deliberately just an h2 + one paragraph — no hotel/attraction list, no
 * extra visuals. The geographic SEO work (specific hotel and landmark
 * names, areaServed, containedInPlace) lives in metadata and JSON-LD
 * instead (see src/lib/site.js and components/StructuredData.js), so the
 * page itself stays uncluttered while search engines still get the
 * detailed context.
 */
export default function LocationContext() {
  return (
    <section className="max-w-2xl mx-auto text-center border-t border-gray-200 py-16 px-6">
      <h2 className="text-2xl font-serif mb-4">Perfectly Located in Nusa Dua</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        Raja Bali Restaurant is ideally located in the heart of{" "}
        <Link href="/outlets" className="u-link text-raja-red">
          Nusa Dua
        </Link>
        , just moments from Bali&apos;s leading luxury resorts, shopping destinations, cultural attractions, and pristine beaches. Whether you&apos;re staying nearby or exploring the area,{" "}
        <Link href="/menu/food" className="u-link text-raja-red">
          authentic Balinese cuisine
        </Link>{" "}
        is always within easy reach.
      </p>
    </section>
  );
}
