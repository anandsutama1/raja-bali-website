// TODO: replace with the real production domain once it's live, then update
// NEXT_PUBLIC_SITE_URL (or this fallback) — canonical URLs, the sitemap, and
// Open Graph tags all key off this.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rajabalirestaurant.com";

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
    sameAs: ["https://www.instagram.com/rajabalinusaduamainrestaurant"],
    url: `${SITE_URL}/reservation-main`,
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
    sameAs: ["https://www.instagram.com/rajabalinusadua"],
    url: `${SITE_URL}/reservation-nusadua`,
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
  opens: "11:00",
  closes: "22:00",
};
