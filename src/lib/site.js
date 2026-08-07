// Canonical URLs, the sitemap, and Open Graph tags all key off this. Note
// the TLD is .co, not .com — that's the domain that's actually live.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rajabalirestaurant.co";

export const SITE_NAME = "Raja Bali";

export const LOCATIONS = [
  {
    id: "main-restaurant",
    name: "Raja Bali Main Restaurant",
    description:
      "Raja Bali's flagship cultural destination in Tanjung Benoa, pairing authentic Balinese cuisine with live cultural performances and hands-on cooking and cocktail classes.",
    telephone: "+62 812-3269-2747",
    streetAddress: "Jl. Pratama No.808 B, Tanjung, Benoa",
    addressLocality: "Kec. Kuta Sel., Kabupaten Badung",
    addressRegion: "Bali",
    postalCode: "80361",
    latitude: -8.7746812,
    longitude: 115.22276810000001,
    // Tripadvisor listing confirmed live: 5.0/5 from 63 reviews as of 2026-08-07.
    sameAs: [
      "https://www.instagram.com/rajabalinusaduamainrestaurant",
      "https://www.facebook.com/share/19JwnjfRDe/",
      "https://www.tripadvisor.com/Restaurant_Review-g1465999-d25432568-Reviews-Raja_Bali_Activities_Main_Restaurant-Tanjung_Benoa_Nusa_Dua_Peninsula_Bali.html",
    ],
    facebook: "https://www.facebook.com/share/19JwnjfRDe/",
    // Official Google share link, provided directly by the business.
    hasMap: "https://share.google/8gzSWdB217YXjQqfc",
    url: `${SITE_URL}/reservation-main`,
    image: `${SITE_URL}/images/contact/Main-Restaurant.jpg`,
  },
  {
    id: "nusa-dua",
    name: "Raja Bali Nusa Dua",
    description:
      "Raja Bali's signature dining destination in Nusa Dua, offering authentic Balinese cuisine in a refined setting for lunch, dinner, and events.",
    telephone: "+62 812-3864-4766",
    streetAddress: "Jl. Nusa Dua No.62, Benoa",
    addressLocality: "Kec. Kuta Sel., Kabupaten Badung",
    addressRegion: "Bali",
    postalCode: "80361",
    latitude: -8.7978961,
    longitude: 115.2246172,
    sameAs: [
      "https://www.instagram.com/rajabalinusadua",
      "https://www.facebook.com/share/17tRPEG8w7/",
      "https://www.tripadvisor.com/Restaurant_Review-g297698-d13083794-Reviews-Raja_Bali_Restaurant_Nusadua-Nusa_Dua_Benoa_South_Kuta_Badung_Regency_Bali.html",
    ],
    facebook: "https://www.facebook.com/share/17tRPEG8w7/",
    // Official Google share link, provided directly by the business.
    hasMap: "https://share.google/XJuUaLxjcCWsXTMhi",
    url: `${SITE_URL}/reservation-nusadua`,
    image: `${SITE_URL}/images/contact/Nusadua-Restaurant.jpg`,
  },
];

// Both locations keep the same posted hours (see Footer.js).
export const OPENING_HOURS = {
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "12:00",
  closes: "21:00",
};

// Shared LocalBusiness facts that don't vary by outlet. priceRange/
// paymentAccepted use schema.org's plain-text conventions (no fixed
// enum), so these strings are what Google's Rich Results Test expects.
export const BUSINESS_INFO = {
  priceRange: "$$",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  areaServed: "Bali, Indonesia",
  servesCuisine: ["Balinese", "Indonesian"],
};
