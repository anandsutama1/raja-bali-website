import Script from "next/script";

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
 * their script (loaded via next/script) finds this markup by those IDs and
 * fills it in client-side, so they can't be renamed. Note the logo id
 * (CDSWIDEXCLOGO) is shared with TripadvisorBadgeNusaDua.js, so never
 * render both badges on the same page — keep Main on /outlets and
 * /reservation-main, Nusa Dua only on /reservation-nusadua.
 */
export default function TripadvisorBadgeMain() {
  return (
    <>
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
      <Script
        async
        src="https://www.jscache.com/wejs?wtype=cdsscrollingravenarrow&uniq=568&locationId=25432568&lang=en_US&border=true&shadow=false&display_version=2"
        strategy="afterInteractive"
      />
    </>
  );
}
