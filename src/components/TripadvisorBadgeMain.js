import TripadvisorScript from "@/components/TripadvisorScript";

/**
 * Official Tripadvisor "scrolling raven arrow" widget for Raja Bali Main
 * Restaurant's real listing (5.0/5 from 63 reviews as of 2026-08-07,
 * #12 of 72 restaurants in Tanjung Benoa). Deliberately NOT structured
 * data: the rating lives on Tripadvisor's own page and is rendered here by
 * Tripadvisor's own script, so it's a genuine third-party trust signal
 * rather than the business marking up its own reviews (which Google's
 * structured data guidelines explicitly disallow — see the audit notes on
 * why components/Testimonials.js isn't wrapped in AggregateRating/Review
 * schema).
 *
 * IDs/classes below are exactly what Tripadvisor's embed code specifies —
 * their script finds this markup by those IDs and fills it in
 * client-side, so they can't be renamed.
 *
 * Loads immediately on mount (no scroll-triggered lazy loading — that
 * traded a slightly later widget appearance for a faster initial page,
 * but the ask here is the opposite: show it as soon as the page opens).
 * Performance/reliability measures kept:
 *  - preconnect/dns-prefetch to jscache.com and static.tacdn.com starts
 *    DNS + TLS for those origins immediately.
 *  - TripadvisorScript (not next/script's <Script>) makes sure the script
 *    actually re-executes on every mount, including after a client-side
 *    route change — see its own doc comment for why that matters here.
 *
 * The wrapper is defensive, not part of Tripadvisor's embed code: their
 * widget script has no intrinsic size until its async script/CSS finishes
 * loading, so it can flash much larger than the final badge before
 * settling. Capping the wrapper's max-width/height with overflow-hidden
 * keeps that bounded to this box instead of visibly resizing the page
 * around it.
 */
export default function TripadvisorBadgeMain() {
  return (
    <>
      <link rel="preconnect" href="https://www.jscache.com" />
      <link rel="dns-prefetch" href="https://www.jscache.com" />
      <link rel="preconnect" href="https://static.tacdn.com" />
      <link rel="dns-prefetch" href="https://static.tacdn.com" />
      <div className="mx-auto max-h-[140px] max-w-[320px] overflow-hidden" style={{ contain: "layout style" }}>
        <div id="TA_cdsscrollingravenarrow568" className="TA_cdsscrollingravenarrow">
          <ul id="sfC4Yk" className="TA_links pCB2aiM">
            <li id="cKuJ1SRH" className="PW6l67">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tripadvisor.com/Restaurant_Review-g1465999-d25432568-Reviews-Raja_Bali_Activities_Main_Restaurant-Tanjung_Benoa_Nusa_Dua_Peninsula_Bali.html"
              >
                <img
                  src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_vertical.svg"
                  alt="TripAdvisor"
                  className="widEXCIMG"
                  id="CDSWIDEXCLOGO"
                />
              </a>
            </li>
          </ul>
        </div>
        <TripadvisorScript src="https://www.jscache.com/wejs?wtype=cdsscrollingravenarrow&uniq=568&locationId=25432568&lang=en_US&border=true&shadow=false&display_version=2" />
      </div>
    </>
  );
}
