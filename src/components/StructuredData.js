import { LOCATIONS, OPENING_HOURS, SITE_URL } from "@/lib/site";

/**
 * @graph of both Raja Bali locations as schema.org Restaurant entities. Read
 * by search engines and AI answer engines (Google, ChatGPT/Gemini browsing)
 * to ground facts like address, hours, and cuisine instead of guessing from
 * page text — rendered site-wide so it's present regardless of entry page.
 */
export default function StructuredData() {
  const graph = LOCATIONS.map((loc) => ({
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#${loc.id}`,
    name: loc.name,
    description: loc.description,
    url: loc.url,
    telephone: loc.telephone,
    servesCuisine: "Balinese",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.addressLocality,
      addressRegion: loc.addressRegion,
      postalCode: loc.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.latitude,
      longitude: loc.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS.dayOfWeek,
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
    award: [
      "Tripadvisor Travelers' Choice Award (5 consecutive years), placing among the top 10% of restaurants worldwide",
      "Ctrip Gourmet List Certificate of Excellence",
    ],
    sameAs: loc.sameAs,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config (src/lib/site.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
