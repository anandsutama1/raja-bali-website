import TripadvisorEmbed from "@/components/TripadvisorEmbed";

/**
 * Official Tripadvisor "excellent" widget for Raja Bali Main Restaurant's
 * real listing (5.0/5 from 63 reviews as of 2026-08-07, #12 of 72
 * restaurants in Tanjung Benoa). Deliberately NOT structured
 * data: the rating lives on Tripadvisor's own page and is rendered here by
 * Tripadvisor's own script, so it's a genuine third-party trust signal
 * rather than the business marking up its own reviews (which Google's
 * structured data guidelines explicitly disallow — see the audit notes on
 * why components/Testimonials.js isn't wrapped in AggregateRating/Review
 * schema).
 *
 * Rendered via TripadvisorEmbed (an isolated iframe) — see that file for
 * why: the widget needs a genuinely fresh document to fully initialize
 * every time, not just a re-executed script tag.
 *
 * preconnect/dns-prefetch to jscache.com and static.tacdn.com starts DNS
 * + TLS for those origins immediately, shaving a little off the load
 * inside the iframe too.
 *
 * The embed code below (`html`) is Tripadvisor's own, verbatim, including
 * the widget-instance IDs their script looks up — don't rename them.
 */
export default function TripadvisorBadgeMain() {
  const html = `<div id="TA_excellent821" class="TA_excellent"><ul id="7M2xxxj1L" class="TA_links PUMpjxwLy"><li id="MCrtWPRFWZ" class="HLTi1WFex9"><a target="_blank" href="https://www.tripadvisor.com/Restaurant_Review-g1465999-d25432568-Reviews-Raja_Bali_Activities_Main_Restaurant-Tanjung_Benoa_Nusa_Dua_Peninsula_Bali.html"><img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" class="widEXCIMG" id="CDSWIDEXCLOGO"/></a></li></ul></div><script async src="https://www.jscache.com/wejs?wtype=excellent&uniq=821&locationId=25432568&lang=en_US&display_version=2" data-loadtrk onload="this.loadtrk=true"></script>`;

  return (
    <>
      <link rel="preconnect" href="https://www.jscache.com" />
      <link rel="dns-prefetch" href="https://www.jscache.com" />
      <link rel="preconnect" href="https://static.tacdn.com" />
      <link rel="dns-prefetch" href="https://static.tacdn.com" />
      <TripadvisorEmbed html={html} height={70} />
    </>
  );
}
