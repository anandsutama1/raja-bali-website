// Canonical URLs, the sitemap, and Open Graph tags all key off this. Note
// the TLD is .co, not .com — that's the domain that's actually live.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rajabalirestaurant.co";

export const SITE_NAME = "Raja Bali";

export const LOCATIONS = [
  {
    id: "main-restaurant",
    name: "Raja Bali Main Restaurant",
    // Precise framing: this location is in Tanjung Benoa, just north of
    // Nusa Dua proper — not literally inside it. Tanjung Benoa is commonly
    // considered part of Nusa Dua because it's immediately adjacent and
    // shares the same kecamatan (district), which is why "Nusa Dua" still
    // appears in marketing copy/title, but the description here stays
    // precise about the actual location. Landmark names (Westin, Bali
    // Collection, Museum Pasifika) are real, well-known fixtures of the
    // area — a verified geographic fact, not a distance/time claim. See
    // the "Perfectly Located in Nusa Dua" section on /reservation-main for
    // the on-page counterpart to this description.
    description:
      "Raja Bali's flagship cultural destination in Tanjung Benoa, just north of Nusa Dua — an area often considered part of Nusa Dua given its immediate proximity and shared district — pairing authentic Balinese cuisine with live cultural performances and hands-on cooking and cocktail classes. Close to The Westin Resort Nusa Dua, Bali Collection, and Museum Pasifika.",
    areaServed: { "@type": "Place", name: "Tanjung Benoa, Nusa Dua, Bali" },
    touristDestination: {
      name: "Tanjung Benoa",
      description:
        "A coastal village in the Nusa Dua area of South Kuta, Bali, immediately adjacent to Nusa Dua and sharing the same district.",
    },
    knowsAbout: ["Balinese cuisine", "Balinese cooking class", "Balinese cocktail class", "Nusa Dua dining"],
    email: "rajabaliactivities@gmail.com",
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
    // Landmark names are real, well-known fixtures of the compact ITDC Nusa
    // Dua tourism enclave (verified geographic context, not a distance/time
    // claim) — see the "Perfectly Located in Nusa Dua" section on
    // /reservation-nusadua for the on-page counterpart to this description.
    // Unlike Main Restaurant (Tanjung Benoa, within the *greater* Nusa Dua
    // area), this outlet sits directly within Nusa Dua itself — hence the
    // "walk-friendly"/"walking distance" framing here, which Main
    // Restaurant's description doesn't use.
    description:
      "Raja Bali's signature dining destination set directly within Nusa Dua, offering authentic Balinese cuisine in a refined setting for lunch, dinner, and events. A walk-friendly location within walking distance of Bali Collection and the ITDC Nusa Dua tourism area, close to hotels such as The Westin Resort Nusa Dua and Nusa Dua Beach Hotel & Spa.",
    areaServed: { "@type": "Place", name: "Nusa Dua, Bali" },
    touristDestination: {
      name: "Nusa Dua",
      description:
        "A resort and tourism area within South Kuta, Bali, home to luxury hotels, beaches, and cultural attractions.",
    },
    knowsAbout: ["Balinese cuisine", "Nusa Dua dining"],
    email: "rajabalinusadua@gmail.com",
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
