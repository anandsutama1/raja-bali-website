import { SITE_URL } from "@/lib/site";

/**
 * Event schema for the weekly Thursday Balinese Dance Performance —
 * separate from the site-wide Restaurant graph in components/StructuredData.js.
 * Uses eventSchedule (Schedule type + repeatFrequency) rather than a single
 * startDate, since Google's guidance for a recurring event without a fixed
 * end is to describe the recurrence pattern instead of enumerating dates.
 *
 * Audit note: Google's Event rich result (the date-carousel snippet) is
 * built for ticketed/dated happenings — concerts, sports, festivals — and
 * isn't guaranteed to surface for ambient, complimentary restaurant
 * entertainment like this. The markup below is accurate either way and
 * still helps Google and AI answer engines understand *when* the
 * performance happens, which is worth having regardless of whether it
 * wins the carousel treatment.
 */
// Schedule.startDate/endDate describe the window this recurrence is valid
// for, not "since when this tradition started" — computed relative to
// render time so the window keeps rolling forward on every rebuild instead
// of going stale and eventually reading as an expired event.
function scheduleWindow() {
  const start = new Date();
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 2);
  const toDate = (d) => d.toISOString().slice(0, 10);
  return { startDate: toDate(start), endDate: toDate(end) };
}

export default function DanceStructuredData() {
  const { startDate, endDate } = scheduleWindow();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}/dance#event`,
    name: "Balinese Dance Performance at Raja Bali Main Restaurant",
    description:
      "A complimentary Balinese dance performance for dining guests, held every Thursday evening at Raja Bali Main Restaurant in Tanjung Benoa, featuring live music, traditional costumes, and a rotating repertoire of sacred stories.",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@id": `${SITE_URL}/#main-restaurant` },
    image: [`${SITE_URL}/images/shared/og-dance.jpg`],
    organizer: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/dance`,
      description: "Complimentary for dining guests",
    },
    eventSchedule: {
      "@type": "Schedule",
      startDate,
      endDate,
      repeatFrequency: "P1W",
      byDay: "https://schema.org/Thursday",
      startTime: "19:00",
      endTime: "21:00",
      scheduleTimezone: "Asia/Makassar",
    },
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
