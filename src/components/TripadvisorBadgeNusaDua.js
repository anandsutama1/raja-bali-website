import Script from "next/script";
import LazyMount from "@/components/LazyMount";

/**
 * Official Tripadvisor "ratings only wide" widget for Raja Bali Nusa Dua's
 * real listing. Same rationale as TripadvisorBadgeMain.js: a genuine
 * third-party trust signal rendered by Tripadvisor's own script, not our
 * own review/AggregateRating markup.
 *
 * Two performance measures, both aimed at the "loads very slowly on
 * mobile" complaint:
 *  - preconnect/dns-prefetch to jscache.com and tripadvisor.com starts
 *    DNS + TLS for those origins immediately, instead of only once the
 *    script tag itself is discovered.
 *  - LazyMount defers even injecting the script until the badge is about
 *    to scroll into view, so its execution never competes with hydration
 *    for the main thread on slower mobile CPUs.
 *
 * The inner wrapper is defensive, not part of Tripadvisor's embed code:
 * their widget script has no intrinsic size until its async script/CSS
 * finishes loading, so it can flash much larger than the final badge
 * before settling. Capping the wrapper's max-width/height with
 * overflow-hidden keeps that bounded to this box instead of visibly
 * resizing the page around it.
 *
 * IDs/classes inside are exactly what Tripadvisor's embed code specifies.
 */
export default function TripadvisorBadgeNusaDua() {
  return (
    <>
      <link rel="preconnect" href="https://www.jscache.com" />
      <link rel="dns-prefetch" href="https://www.jscache.com" />
      <link rel="preconnect" href="https://www.tripadvisor.com" />
      <link rel="dns-prefetch" href="https://www.tripadvisor.com" />
      <LazyMount minHeight={60}>
        <div className="mx-auto max-h-[60px] max-w-[320px] overflow-hidden" style={{ contain: "layout style" }}>
          <div id="TA_cdsratingsonlywide504" className="TA_cdsratingsonlywide">
            <ul id="GbXBhcF" className="TA_links yuHVxRMTyr">
              <li id="HHNVYtU" className="cc1BlijLZd">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tripadvisor.com/Restaurant_Review-g297698-d13083794-Reviews-Raja_Bali_Restaurant_Nusadua-Nusa_Dua_Benoa_South_Kuta_Badung_Regency_Bali.html"
                >
                  <img
                    src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg"
                    alt="TripAdvisor"
                  />
                </a>
              </li>
            </ul>
          </div>
          <Script
            async
            src="https://www.jscache.com/wejs?wtype=cdsratingsonlywide&uniq=504&locationId=13083794&lang=en_US&border=true&shadow=false&backgroundColor=white&display_version=2"
            strategy="afterInteractive"
          />
        </div>
      </LazyMount>
    </>
  );
}
