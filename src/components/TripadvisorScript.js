"use client";

import { useEffect } from "react";

/**
 * Manually injects the Tripadvisor widget's <script> tag on every mount,
 * instead of using next/script's <Script> component.
 *
 * Why: next/script tracks scripts as "already loaded" by `src` for the
 * lifetime of the browser session, across client-side route changes. That's
 * the right behavior for something like an analytics tag you only want
 * initialized once — but this script's job is to find its widget's
 * specific DOM elements (by id) and populate them, which it must do again
 * every time a *new* instance of that markup mounts. Without this, the
 * bug was: visit /outlets (loads the script, next/script marks it
 * "loaded"), then client-side-navigate to /reservation-main — the same
 * markup mounts again, but next/script skips re-injecting since it thinks
 * the script's already there, so the widget never populates until a hard
 * refresh resets that tracking.
 *
 * Appending a fresh <script> element ourselves forces the browser to
 * execute it again on every mount (the network request itself is served
 * from cache, so this doesn't add real load cost).
 */
export default function TripadvisorScript({ src }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [src]);

  return null;
}
