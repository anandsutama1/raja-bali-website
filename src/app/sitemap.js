import { SITE_URL } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/alternates";

const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.7 },
  { path: "/outlets", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/menu/food", priority: 0.8 },
  { path: "/menu/beverage", priority: 0.7 },
  { path: "/menu/balinese-buffet", priority: 0.6 },
  { path: "/menu/western-asian-buffet", priority: 0.6 },
  { path: "/cooking-class", priority: 0.8 },
  { path: "/bar-class", priority: 0.8 },
  { path: "/dance", priority: 0.7 },
  { path: "/private-events", priority: 0.7 },
  { path: "/group-reservation", priority: 0.6 },
  { path: "/reservation-main", priority: 0.8 },
  { path: "/reservation-nusadua", priority: 0.8 },
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
          "x-default": `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`,
        },
      },
    }))
  );
}
