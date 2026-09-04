import { cache } from "react";

// Server-only by convention (not enforced via the "server-only" package,
// which isn't a project dependency) — only ever call this from Server
// Components or Route Handlers, never from a "use client" file. Split by
// domain rather than one big per-locale file so a page only pulls in the
// JSON it actually needs. Body copy is further split one file per page
// group (content-*) rather than a single content.json, since Raja Bali has
// far more pages than a single-file domain would stay readable for.
const loaders = {
  common: (l) => import(`@/dictionaries/${l}/common.json`).then((m) => m.default),
  metadata: (l) => import(`@/dictionaries/${l}/metadata.json`).then((m) => m.default),
  forms: (l) => import(`@/dictionaries/${l}/forms.json`).then((m) => m.default),
  email: (l) => import(`@/dictionaries/${l}/email.json`).then((m) => m.default),
  faqs: (l) => import(`@/dictionaries/${l}/faqs.json`).then((m) => m.default),
  menu: (l) => import(`@/dictionaries/${l}/menu.json`).then((m) => m.default),
  "content-home": (l) => import(`@/dictionaries/${l}/content/home.json`).then((m) => m.default),
  "content-about": (l) => import(`@/dictionaries/${l}/content/about.json`).then((m) => m.default),
  "content-outlets": (l) => import(`@/dictionaries/${l}/content/outlets.json`).then((m) => m.default),
  "content-contact": (l) => import(`@/dictionaries/${l}/content/contact.json`).then((m) => m.default),
  "content-gallery": (l) => import(`@/dictionaries/${l}/content/gallery.json`).then((m) => m.default),
  "content-cooking-class": (l) => import(`@/dictionaries/${l}/content/cooking-class.json`).then((m) => m.default),
  "content-bar-class": (l) => import(`@/dictionaries/${l}/content/bar-class.json`).then((m) => m.default),
  "content-dance": (l) => import(`@/dictionaries/${l}/content/dance.json`).then((m) => m.default),
  "content-private-events": (l) => import(`@/dictionaries/${l}/content/private-events.json`).then((m) => m.default),
  "content-venue-rental": (l) => import(`@/dictionaries/${l}/content/venue-rental.json`).then((m) => m.default),
  "content-group-reservation": (l) => import(`@/dictionaries/${l}/content/group-reservation.json`).then((m) => m.default),
  "content-reservation-main": (l) => import(`@/dictionaries/${l}/content/reservation-main.json`).then((m) => m.default),
  "content-reservation-nusadua": (l) => import(`@/dictionaries/${l}/content/reservation-nusadua.json`).then((m) => m.default),
  "content-share": (l) => import(`@/dictionaries/${l}/content/share.json`).then((m) => m.default),
  "content-thank-you": (l) => import(`@/dictionaries/${l}/content/thank-you.json`).then((m) => m.default),
};

// React's cache() request-memoizes this, so calling getDictionary("en",
// "common") from both the layout and a page in the same request only
// actually loads the JSON once.
export const getDictionary = cache(async (locale, domain) => {
  const loader = loaders[domain];
  if (!loader) throw new Error(`Unknown dictionary domain: "${domain}"`);
  return loader(locale);
});
