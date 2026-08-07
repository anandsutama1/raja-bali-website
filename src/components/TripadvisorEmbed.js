"use client";

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
 * `html` is Tripadvisor's embed code verbatim (not authored by us), so
 * this is safe to render as-is inside the iframe's own document.
 */
export default function TripadvisorEmbed({ html, height }) {
  const doc = `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" /><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body>${html}</body></html>`;

  return (
    <iframe
      srcDoc={doc}
      title="Tripadvisor rating"
      scrolling="no"
      style={{ width: "100%", maxWidth: 320, height, border: "none", display: "block", margin: "0 auto" }}
    />
  );
}
