import { SITE_URL } from "@/lib/site";

/**
 * Structured data for the bar/cocktail class page — mirrors the pattern in
 * components/cooking-class/StructuredData.js (Product/Offer for pricing,
 * Course for the taught, hands-on format). Session time/price mirror
 * components/bar-class/DailySessions.js and Pricing.js; keep in sync if
 * either changes.
 */
export default function BarClassStructuredData() {
  const url = `${SITE_URL}/bar-class`;
  const image = `${SITE_URL}/images/shared/og-bar-class.jpg`;
  const description =
    "Hands-on Balinese cocktail class at Raja Bali in Tanjung Benoa, Bali. Learn mixology from expert bartenders, taste authentic Balinese Arak, and craft your own signature drink. Thursdays only.";

  const offers = [
    {
      "@type": "Offer",
      name: "Bartender Class",
      description: "Minimum 2 guests",
      price: "250000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${url}#reservation`,
    },
  ];

  const product = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: "Balinese Cocktail Class",
    description,
    image,
    url,
    brand: { "@type": "Brand", name: "Raja Bali" },
    offers,
  };

  const course = {
    "@type": "Course",
    "@id": `${url}#course`,
    name: "Balinese Cocktail Class",
    description,
    image,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: "Thursday Session",
      courseMode: "Onsite",
      courseWorkload: "PT1H",
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: "https://schema.org/Thursday",
        startTime: "15:00",
        endTime: "16:00",
      },
      location: { "@id": `${SITE_URL}/#main-restaurant` },
      offers,
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [product, course],
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config above, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
