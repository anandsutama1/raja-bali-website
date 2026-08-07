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
 * Both dimensions are measured from the iframe's own content rather than
 * guessed: a fixed size clipped the widget (bottom, then separately the
 * right edge) once Tripadvisor's async data — which arrives after the
 * iframe's load event, and includes a horizontal logo SVG with its own
 * natural width — finished rendering and turned out bigger than the
 * estimate. `srcDoc` without a `sandbox` attribute keeps the iframe
 * same-origin to us, so `contentDocument` is readable — poll briefly
 * after load to catch that late-arriving size instead of clipping it.
 * The body is forced `inline-block` + `nowrap` so its scrollWidth reflects
 * the content's true natural width, not whatever width we happened to
 * hand the iframe.
 *
 * `html` is Tripadvisor's embed code verbatim (not authored by us), so
 * this is safe to render as-is inside the iframe's own document.
 */
export default function TripadvisorEmbed({ html, height: initialHeight, width: initialWidth = 400 }) {
  const iframeRef = useRef(null);
  const [size, setSize] = useState({ height: initialHeight, width: initialWidth });

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const measure = () => {
      const body = iframe.contentDocument?.body;
      if (!body) return;
      const nextHeight = body.scrollHeight;
      const nextWidth = body.scrollWidth;
      if (nextHeight > 0 && nextWidth > 0) {
        setSize({ height: nextHeight, width: nextWidth });
      }
    };

    iframe.addEventListener("load", measure);
    // The load event fires once the iframe's static markup is in place,
    // but Tripadvisor's own script still needs to fetch and render the
    // real rating content after that — re-measure a few times afterward
    // to catch the final, settled size.
    const timers = [300, 800, 1500, 2500, 4000].map((ms) => setTimeout(measure, ms));

    return () => {
      iframe.removeEventListener("load", measure);
      timers.forEach(clearTimeout);
    };
  }, []);

  const doc = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" /><style>html,body{margin:0;padding:0;}body{display:inline-block;white-space:nowrap;}</style></head><body>${html}</body></html>`;

  return (
    <iframe
      ref={iframeRef}
      srcDoc={doc}
      title="Tripadvisor rating"
      scrolling="no"
      style={{
        width: "100%",
        maxWidth: Math.min(size.width, 500),
        height: size.height,
        maxHeight: 400,
        border: "none",
        display: "block",
        margin: "0 auto",
        transition: "height 0.25s ease, max-width 0.25s ease",
      }}
    />
  );
}
