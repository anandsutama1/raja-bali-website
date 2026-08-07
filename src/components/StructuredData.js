import { BUSINESS_INFO, LOCATIONS, OPENING_HOURS, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Site-wide @graph, rendered on every page via layout.js: Organization (the
 * brand), WebSite (so per-page WebPage nodes in PageSchema.js have an
 * isPartOf target), and both Restaurant locations. Read by search engines
 * and AI answer engines (Google, ChatGPT/Gemini browsing) to ground facts
 * like address, hours, and cuisine instead of guessing from page text.
 *
 * No sitelinks-search WebSite.potentialAction: the site has no on-site
 * search, and Google explicitly says not to add SearchAction markup for a
 * search box that doesn't exist.
 */
export default function StructuredData() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/shared/RajaBali_Navbar.png`,
    },
    // Only identity links we can confirm belong to Raja Bali go here — no
    // guessed social URLs. Combines both outlets' sameAs (Instagram +
    // Tripadvisor) since the graph already scopes each individually below.
    sameAs: Array.from(new Set(LOCATIONS.flatMap((loc) => loc.sameAs))),
    contactPoint: LOCATIONS.map((loc) => ({
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: loc.telephone,
      areaServed: "ID",
      availableLanguage: ["en", "id"],
      url: loc.url,
    })),
    subOrganization: LOCATIONS.map((loc) => ({ "@id": `${SITE_URL}/#${loc.id}` })),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Official website of Raja Bali, an authentic Balinese restaurant with two locations in Tanjung Benoa and Nusa Dua, Bali.",
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };

  const restaurants = LOCATIONS.map((loc) => ({
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#${loc.id}`,
    name: loc.name,
    description: loc.description,
    url: loc.url,
    telephone: loc.telephone,
    image: loc.image,
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    servesCuisine: BUSINESS_INFO.servesCuisine,
    // Per-location override (e.g. Nusa Dua's Place object) falls back to
    // the shared plain-text value when a location doesn't define its own.
    areaServed: loc.areaServed || BUSINESS_INFO.areaServed,
    acceptsReservations: "True",
    hasMap: loc.hasMap,
    menu: `${SITE_URL}/menu/food`,
    parentOrganization: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    // Only set for locations that define it (currently just Nusa Dua) —
    // schema.org has no dedicated "touristArea" property, so this is the
    // closest legitimate equivalent: a real Place/TouristDestination this
    // location sits inside of.
    ...(loc.touristDestination
      ? {
          containedInPlace: {
            "@type": "TouristDestination",
            name: loc.touristDestination.name,
            description: loc.touristDestination.description,
          },
        }
      : {}),
    ...(loc.knowsAbout ? { knowsAbout: loc.knowsAbout } : {}),
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
    "@graph": [organization, website, ...restaurants],
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config (src/lib/site.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
