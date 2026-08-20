import { LOCALES, DEFAULT_LOCALE } from "./config";

// Every route now lives at `/{locale}{path}` under src/app/[locale]/, so
// this is the one place that maps a bare, locale-agnostic path (e.g.
// "/about", or "/" for home) to a real URL for a given locale.
export function localePath(locale, path) {
  return `/${locale}${path === "/" ? "" : path}`;
}

// Builds Next's `alternates` metadata block (canonical + hreflang) for a
// page — every locale variant of `path` plus the `x-default` entry
// Google's hreflang spec expects for visitors whose language matched none
// of ours.
export function localeAlternates(locale, path) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
      "x-default": localePath(DEFAULT_LOCALE, path),
    },
  };
}
