"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a Tripadvisor CDS widget's official embed code inside an
 * isolated iframe, instead of injecting it directly into the page's DOM.
 *
 * Why an iframe: Tripadvisor's widget script keeps its own internal
 * loaded/initialized state in the page's `window`. Re-injecting the
 * <script> tag ourselves (an earlier approach, to work around Next's
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
 * than whatever width we happened to hand the iframe). Rendering the
 * iframe at its true natural size and then CSS-scaling it down
 * (`transform: scale()`) to fit whatever width is actually available
 * shrinks the whole thing proportionally, the same way a responsive image
 * would, instead of clipping it.
 *
 * Why it stays invisible until `ready`: the very first measurement the
 * iframe's `load` event gives us is often the *unstyled* fallback logo
 * (Tripadvisor's own script hasn't fetched/rendered the real rating
 * content yet at that point), which renders bigger than the final,
 * properly-sized widget — revealing on that first measurement showed the
 * big logo, then visibly shrank once the real content replaced it a
 * moment later. There's no explicit "fully loaded" event from
 * Tripadvisor's script to wait for instead, so this compares each
 * re-measurement to the previous one and only reveals once two
 * consecutive readings agree (the content has stopped changing size) —
 * whatever that settled size is, that's what gets shown, with no
 * visible growing or shrinking beforehand.
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

const STABLE_TOLERANCE_PX = 2;

export default function TripadvisorEmbed({ html, height: initialHeight, width: initialWidth = 400 }) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const lastMeasured = useRef(null);
  const [natural, setNatural] = useState({ height: initialHeight, width: initialWidth });
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  // Measure the widget's true, unconstrained size, re-checking a few
  // times since Tripadvisor's script replaces the unstyled fallback logo
  // with the real rating content asynchronously after the iframe's load
  // event. Only reveals (setReady) once two consecutive readings agree —
  // see the component doc comment above. setReady is called directly here
  // (a real state update) rather than through a ref another effect polls,
  // since a ref mutation alone doesn't make that other effect re-run.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    const measure = (isFinalCheck) => {
      const body = iframe.contentDocument?.body;
      if (!body) return;
      const nextHeight = body.scrollHeight;
      const nextWidth = body.scrollWidth;
      if (nextHeight <= 0 || nextWidth <= 0) return;

      const prev = lastMeasured.current;
      const matchesPrevious =
        prev &&
        Math.abs(prev.height - nextHeight) <= STABLE_TOLERANCE_PX &&
        Math.abs(prev.width - nextWidth) <= STABLE_TOLERANCE_PX;

      lastMeasured.current = { height: nextHeight, width: nextWidth };

      setNatural({
        height: nextHeight + SIZE_BUFFER.height,
        width: Math.min(nextWidth + SIZE_BUFFER.width, MAX_NATURAL_WIDTH),
      });
      // Reveal once the size has settled, or once we've run out of
      // scheduled re-checks — whatever it measured by then is final, so
      // it's better to show that than stay hidden forever.
      if (matchesPrevious || isFinalCheck) setReady(true);
    };

    const onLoad = () => measure(false);
    iframe.addEventListener("load", onLoad);
    const checkpoints = [300, 800, 1500, 2500, 4000];
    const timers = checkpoints.map((ms, i) => setTimeout(() => measure(i === checkpoints.length - 1), ms));

    return () => {
      iframe.removeEventListener("load", onLoad);
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
        height: ready ? natural.height * scale : 0,
        margin: "0 auto",
        overflow: "hidden",
        visibility: ready ? "visible" : "hidden",
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
        }}
      />
    </div>
  );
}
