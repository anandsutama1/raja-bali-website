import { SITE_NAME } from "@/lib/site";

// Served automatically at /manifest.webmanifest via Next.js's file
// convention — no explicit <link rel="manifest"> needed in layout.js.
export default function manifest() {
  return {
    name: `${SITE_NAME} | Authentic Balinese Restaurant`,
    short_name: SITE_NAME,
    description:
      "Raja Bali is one of the best restaurants in Bali, offering authentic Balinese cuisine in Nusa Dua, cultural dance performances, and hands-on cooking and cocktail classes.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F1",
    theme_color: "#141414",
    icons: [
      {
        src: "/icon.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
