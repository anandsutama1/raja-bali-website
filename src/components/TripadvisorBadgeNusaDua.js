import Script from "next/script";

/**
 * Official Tripadvisor "scrolling raven arrow" widget for Raja Bali Nusa
 * Dua's real listing. Same rationale as TripadvisorBadgeMain.js: a genuine
 * third-party trust signal rendered by Tripadvisor's own script, not our
 * own review/AggregateRating markup.
 *
 * IDs/classes are exactly what Tripadvisor's embed code specifies. The
 * logo id (CDSWIDEXCLOGO) is shared with TripadvisorBadgeMain.js, so never
 * render both badges on the same page — this one is scoped to
 * /reservation-nusadua only.
 */
export default function TripadvisorBadgeNusaDua() {
  return (
    <>
      <div id="TA_cdsscrollingravenarrow206" className="TA_cdsscrollingravenarrow">
        <ul id="esAGQVJU" className="TA_links OG9yLCb7">
          <li id="4kvHQCBU" className="VXzGgpoeai">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tripadvisor.com/Restaurant_Review-g297698-d13083794-Reviews-Raja_Bali_Restaurant_Nusadua-Nusa_Dua_Benoa_South_Kuta_Badung_Regency_Bali.html"
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
      <Script
        async
        src="https://www.jscache.com/wejs?wtype=cdsscrollingravenarrow&uniq=206&locationId=13083794&lang=en_US&border=true&display_version=2"
        strategy="afterInteractive"
      />
    </>
  );
}
