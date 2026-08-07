import { SITE_URL } from "@/lib/site";

/**
 * Product/Offer schema for the cooking class itself — separate from the
 * site-wide Restaurant graph in components/StructuredData.js. Lets Google
 * show pricing directly in search results for "Balinese cooking class"
 * style queries. Prices mirror components/cooking-class/Pricing.js; keep
 * both in sync if pricing changes.
 */
export default function CookingClassStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Balinese Cooking Class",
    description:
      "Hands-on Balinese cooking class at Raja Bali in Tanjung Benoa, Bali. Learn authentic recipes from local chefs, tour the spice garden, and enjoy the dishes you cook.",
    image: `${SITE_URL}/images/cooking-class/CookingClass-Hero.jpg`,
    url: `${SITE_URL}/cooking-class`,
    brand: {
      "@type": "Brand",
      name: "Raja Bali",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Shared Experience",
        description: "Minimum 2 guests",
        price: "550000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/cooking-class#reservation`,
      },
      {
        "@type": "Offer",
        name: "Individual Experience",
        description: "Perfect for solo travelers",
        price: "600000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/cooking-class#reservation`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config above, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
