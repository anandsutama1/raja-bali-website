"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a Tripadvisor CDS widget's official embed code inside an
 * isolated iframe, instead of injecting it directly into the page's DOM.
 *
 * Why an iframe: Tripadvisor's widget script keeps its own internal
 * loaded/initialized state in the page's `window`. Re-injecting the
 * <script> tag ourselves (the previous approach, to work around Next's
 * client-side navigation caching it as "already loaded") made the *tag*
 * re-execute, but the widget's own internal guard still saw itself as
 * already initialized and skipped the full init + data fetch — so only
 * the static fallback logo showed, not the actual rating, until a hard
 * refresh gave it a genuinely fresh `window` with no prior state. An
 * iframe's document is its own separate `window` every time it mounts,
 * so the widget always gets a clean first-time initialization reliably.
 *
 * Why scale instead of reflow: the widget's logo image doesn't reflow to
 * a narrower width, it has one fixed natural size (measured below via
 * `body { display:inline-block; white-space:nowrap }`, which forces
 * scrollWidth/scrollHeight to report the true unconstrained size rather
 * than whatever width we happened to hand the iframe). Simply capping the
 * iframe's own width to the container's width — the earlier approach —
 * shrank the *box* on mobile but not the *content* inside it, since
 * nowrap content doesn't reflow: the widget just overflowed and got
 * clipped instead of shrinking. Rendering the iframe at its true natural
 * size and then CSS-scaling it down (`transform: scale()`) to fit
 * whatever width is actually available shrinks the whole thing
 * proportionally instead, the same way a responsive image would.
 *
 * `html` is Tripadvisor's embed code verbatim (not authored by us), so
 * this is safe to render as-is inside the iframe's own document.
 *
 * SIZE_BUFFER: both widget URLs pass border=true, and a box-shadow/
 * outline-style border doesn't add to scrollWidth/scrollHeight the way a
 * real border does, so measuring exactly still clipped that decoration by
 * a few pixels.
 */
const SIZE_BUFFER = { width: 16, height: 10 };
const MAX_NATURAL_WIDTH = 520;

export default function TripadvisorEmbed({ html, height: initialHeight, width: initialWidth = 400 }) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [natural, setNatural] = useState({ height: initialHeight, width: initialWidth });
  const [scale, setScale] = useState(1);

  // Measure the widget's true, unconstrained size once Tripadvisor's own
  // script has rendered it (which happens after the iframe's load event,
  // so a few follow-up re-measures catch that late-arriving content).
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const measure = () => {
      const body = iframe.contentDocument?.body;
      if (!body) return;
      const nextHeight = body.scrollHeight;
      const nextWidth = body.scrollWidth;
      if (nextHeight > 0 && nextWidth > 0) {
        setNatural({
          height: nextHeight + SIZE_BUFFER.height,
          width: Math.min(nextWidth + SIZE_BUFFER.width, MAX_NATURAL_WIDTH),
        });
      }
    };

    iframe.addEventListener("load", measure);
    const timers = [300, 800, 1500, 2500, 4000].map((ms) => setTimeout(measure, ms));

    return () => {
      iframe.removeEventListener("load", measure);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Scale down to fit whatever width the surrounding layout actually
  // gives this component — recalculated on resize/orientation change too.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateScale = () => {
      const available = container.clientWidth;
      if (available > 0 && natural.width > 0) {
        setScale(Math.min(1, available / natural.width));
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [natural.width]);

  const doc = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" /><style>html,body{margin:0;padding:0;}body{display:inline-block;white-space:nowrap;}</style></head><body>${html}</body></html>`;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: natural.width,
        height: natural.height * scale,
        margin: "0 auto",
        overflow: "hidden",
        transition: "height 0.25s ease",
      }}
    >
      <iframe
        ref={iframeRef}
        srcDoc={doc}
        title="Tripadvisor rating"
        scrolling="no"
        style={{
          width: natural.width,
          height: natural.height,
          border: "none",
          display: "block",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          transition: "transform 0.25s ease, width 0.25s ease, height 0.25s ease",
        }}
      />
    </div>
  );
}
