"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Defers mounting `children` until the wrapper scrolls near the viewport,
 * instead of on initial page load. Built for third-party embeds (like the
 * Tripadvisor widgets) whose script execution competes with hydration for
 * the main thread on slow mobile devices — this keeps that cost out of the
 * critical initial-load path entirely, only paying it once the user is
 * actually about to see the thing.
 *
 * rootMargin gives it a head start so the embed has already begun loading
 * by the time it scrolls fully into view, rather than popping in empty.
 */
export default function LazyMount({ children, rootMargin = "300px", minHeight }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={minHeight ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}
