"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a Tripadvisor CDS widget's official embed code inside an
 * isolated iframe, instead of injecting it directly into the page's DOM.
 *
 * Why: Tripadvisor's widget script keeps its own internal
 * loaded/initialized state in the page's `window`. Re-injecting the
 * <script> tag ourselves (the previous approach, to work around Next's
 * client-side navigation caching it as "already loaded") made the *tag*
 * re-execute, but the widget's own internal guard still saw itself as
 * already initialized and skipped the full init + data fetch — so only
 * the static fallback logo showed, not the actual rating, until a hard
 * refresh gave it a genuinely fresh `window` with no prior state.
 *
 * An iframe's document is its own separate `window` every time it mounts,
 * so the widget always gets the same clean, first-time initialization a
 * hard refresh would give it — reliably, on every page open and every
 * client-side navigation, no custom re-execution tricks needed. It also
 * fully contains any layout the widget's CSS tries to apply (the earlier
 * "resizes itself" concern) since an iframe's box is a hard boundary
 * nothing inside it can escape.
 *
 * Height is measured from the iframe's own content rather than guessed:
 * a fixed height clipped the widget on some devices/outlets once
 * Tripadvisor's async data (which arrives after the iframe's load event)
 * finished rendering and turned out taller than the estimate. `srcDoc`
 * without a `sandbox` attribute keeps the iframe same-origin to us, so
 * `contentDocument` is readable — poll briefly after load to catch that
 * late-arriving height instead of clipping it.
 *
 * `html` is Tripadvisor's embed code verbatim (not authored by us), so
 * this is safe to render as-is inside the iframe's own document.
 */
export default function TripadvisorEmbed({ html, height: initialHeight }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const measure = () => {
      const body = iframe.contentDocument?.body;
      if (body && body.scrollHeight > 0) {
        setHeight(body.scrollHeight);
      }
    };

    iframe.addEventListener("load", measure);
    // The load event fires once the iframe's static markup is in place,
    // but Tripadvisor's own script still needs to fetch and render the
    // real rating content after that — re-measure a few times afterward
    // to catch the final, settled height.
    const timers = [300, 800, 1500, 2500, 4000].map((ms) => setTimeout(measure, ms));

    return () => {
      iframe.removeEventListener("load", measure);
      timers.forEach(clearTimeout);
    };
  }, []);

  const doc = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" /><style>html,body{margin:0;padding:0;}</style></head><body>${html}</body></html>`;

  return (
    <iframe
      ref={iframeRef}
      srcDoc={doc}
      title="Tripadvisor rating"
      scrolling="no"
      style={{
        width: "100%",
        maxWidth: 320,
        height,
        maxHeight: 400,
        border: "none",
        display: "block",
        margin: "0 auto",
        transition: "height 0.25s ease",
      }}
    />
  );
}
