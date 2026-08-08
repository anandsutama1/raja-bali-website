import { SITE_URL } from "@/lib/site";

/**
 * Event schema for the weekly Thursday Balinese Dance Performance —
 * separate from the site-wide Restaurant graph in components/StructuredData.js.
 * Carries both a concrete startDate/endDate (the next upcoming Thursday
 * 7-9 PM, required by Google's Event rich-result validator) and an
 * eventSchedule describing the weekly recurrence, so the markup is
 * correct whether a tool reads the single occurrence or the pattern.
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

// Google's Event rich-result validator wants a concrete startDate/endDate
// on the Event itself, not just the recurrence pattern in eventSchedule
// below — so this resolves to the next upcoming Thursday 7-9 PM in Bali
// time (Asia/Makassar, UTC+8, no DST). Recomputed on every render/build,
// so it keeps rolling forward to the next Thursday automatically.
function nextThursdayWindow() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 = Sunday ... 4 = Thursday
  let daysUntil = (4 - day + 7) % 7;
  // Past 21:00 WITA (13:00 UTC) on Thursday itself — roll to next week's.
  if (daysUntil === 0 && now.getUTCHours() >= 13) {
    daysUntil = 7;
  }
  const eventDate = new Date(now);
  eventDate.setUTCDate(now.getUTCDate() + daysUntil);
  const dateStr = eventDate.toISOString().slice(0, 10);
  return {
    startDate: `${dateStr}T19:00:00+08:00`,
    endDate: `${dateStr}T21:00:00+08:00`,
  };
}

export default function DanceStructuredData() {
  const { startDate, endDate } = scheduleWindow();
  const nextEvent = nextThursdayWindow();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}/dance#event`,
    name: "Balinese Dance Performance at Raja Bali Main Restaurant",
    description:
      "A complimentary Balinese dance performance for dining guests, held every Thursday evening at Raja Bali Main Restaurant in Tanjung Benoa, featuring live music, traditional costumes, and a rotating repertoire of sacred stories.",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: nextEvent.startDate,
    endDate: nextEvent.endDate,
    location: { "@id": `${SITE_URL}/#main-restaurant` },
    image: [`${SITE_URL}/images/shared/og-dance.jpg`],
    organizer: { "@id": `${SITE_URL}/#organization` },
    performer: {
      "@type": "PerformingGroup",
      name: "Raja Bali Dance Troupe",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/dance`,
      description: "Complimentary for dining guests",
      // Reuses the same rolling "valid from today" date as eventSchedule
      // below, rather than a fixed date that would eventually read as
      // stale.
      validFrom: startDate,
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
