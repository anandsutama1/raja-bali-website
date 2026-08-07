import TripadvisorEmbed from "@/components/TripadvisorEmbed";

/**
 * Official Tripadvisor "ratings only wide" widget for Raja Bali Nusa Dua's
 * real listing. Same rationale as TripadvisorBadgeMain.js: a genuine
 * third-party trust signal rendered by Tripadvisor's own script, not our
 * own review/AggregateRating markup.
 *
 * Rendered via TripadvisorEmbed (an isolated iframe) — see that file for
 * why: the widget needs a genuinely fresh document to fully initialize
 * every time, not just a re-executed script tag.
 *
 * The embed code below (`html`) is Tripadvisor's own, verbatim, including
 * the widget-instance IDs their script looks up — don't rename them.
 */
export default function TripadvisorBadgeNusaDua() {
  const html = `<div id="TA_cdsratingsonlywide504" class="TA_cdsratingsonlywide"><ul id="GbXBhcF" class="TA_links yuHVxRMTyr"><li id="HHNVYtU" class="cc1BlijLZd"><a target="_blank" href="https://www.tripadvisor.com/Restaurant_Review-g297698-d13083794-Reviews-Raja_Bali_Restaurant_Nusadua-Nusa_Dua_Benoa_South_Kuta_Badung_Regency_Bali.html"><img src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg" alt="TripAdvisor"/></a></li></ul></div><script async src="https://www.jscache.com/wejs?wtype=cdsratingsonlywide&uniq=504&locationId=13083794&lang=en_US&border=true&shadow=false&backgroundColor=white&display_version=2" data-loadtrk onload="this.loadtrk=true"></script>`;

  return (
    <>
      <link rel="preconnect" href="https://www.jscache.com" />
      <link rel="dns-prefetch" href="https://www.jscache.com" />
      <link rel="preconnect" href="https://www.tripadvisor.com" />
      <link rel="dns-prefetch" href="https://www.tripadvisor.com" />
      <TripadvisorEmbed html={html} height={60} />
    </>
  );
}
