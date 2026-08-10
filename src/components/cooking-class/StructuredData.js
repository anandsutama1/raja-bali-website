import { SITE_URL } from "@/lib/site";

/**
 * Structured data for the cooking class page — separate from the site-wide
 * Restaurant graph in components/StructuredData.js. Two nodes describe the
 * same experience from two angles Google supports independently:
 *  - Product/Offer: lets pricing surface directly for "Balinese cooking
 *    class" style queries (merchant/product snippet).
 *  - Course: the hands-on, taught format (chef-led, spice-garden tour,
 *    certificate of completion) genuinely matches schema.org's Course
 *    definition, so this is accurate, not a stretch to chase a rich result.
 * Prices mirror components/cooking-class/Pricing.js; keep both in sync if
 * pricing changes. Each offer's priceSpecification adds an approximate
 * USD equivalent alongside the primary IDR price (the actual charged
 * currency) — third-party resellers list this experience in USD, so
 * giving Google/AI answer engines our own accurate, more competitive USD
 * figure directly helps us compete on price for USD-denominated searches.
 */
export default function CookingClassStructuredData() {
  const url = `${SITE_URL}/cooking-class`;
  const image = `${SITE_URL}/images/cooking-class/CookingClass-Hero.jpg`;
  const description =
    "Hands-on Balinese cooking class at Raja Bali in Nusa Dua's Tanjung Benoa area. Learn authentic recipes from local chefs, tour the spice garden, and enjoy the dishes you cook.";

  const offers = [
    {
      "@type": "Offer",
      "@id": `${url}#offer-shared`,
      name: "Shared Experience",
      description: "Minimum 2 guests",
      price: "550000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${url}#reservation`,
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: "31",
          priceCurrency: "USD",
          description: "Estimated USD equivalent; guests are billed in IDR.",
        },
      ],
    },
    {
      "@type": "Offer",
      "@id": `${url}#offer-individual`,
      name: "Individual Experience",
      description: "Perfect for solo travelers",
      price: "600000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${url}#reservation`,
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: "34",
          priceCurrency: "USD",
          description: "Estimated USD equivalent; guests are billed in IDR.",
        },
      ],
    },
  ];

  const product = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: "Balinese Cooking Class",
    description,
    image,
    url,
    brand: { "@type": "Brand", name: "Raja Bali" },
    offers,
  };

  // Mirrors components/cooking-class/DailySessions.js — three 2-hour
  // sessions run daily (lunch, afternoon, dinner), each bookable at either
  // price tier above.
  const sessionTimes = [
    { name: "Lunch Session", startTime: "11:00", endTime: "13:00" },
    { name: "Afternoon Session", startTime: "14:00", endTime: "16:00" },
    { name: "Dinner Session", startTime: "17:00", endTime: "19:00" },
  ];

  const course = {
    "@type": "Course",
    "@id": `${url}#course`,
    name: "Balinese Cooking Class",
    description,
    image,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    hasCourseInstance: sessionTimes.map((session) => ({
      "@type": "CourseInstance",
      name: session.name,
      courseMode: "Onsite",
      courseWorkload: "PT2H",
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1D",
        startTime: session.startTime,
        endTime: session.endTime,
      },
      location: { "@id": `${SITE_URL}/#main-restaurant` },
      offers,
    })),
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
