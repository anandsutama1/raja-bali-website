"use client";

import { useEffect, useRef, useState } from "react";
import LocalizedLink from "./LocalizedLink";
import { onScrollFrame } from "./motion/ticker";

// Mobile-only floating shortcut between the food and beverage menus,
// stacked directly above StickyReserveButton so a guest scrolling through
// a long dish list can jump straight to the other menu without scrolling
// back up to the hero's own cross-link button. Shares StickyReserveButton's
// show/hide-on-scroll behavior (appears past the hero, hides while
// actively scrolling up) so the two floating buttons always appear and
// disappear together rather than one popping in independently.
export default function StickyMenuCrossLink({ href, label }) {
  const [hidden, setHidden] = useState(true);
  const lastY = useRef(0);
  const idleTimer = useRef(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    return onScrollFrame(({ y, height }) => {
      const pastHero = y > height * 0.6;

      if (!pastHero) {
        setHidden(true);
        lastY.current = y;
        clearTimeout(idleTimer.current);
        return;
      }

      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta < 0);
        lastY.current = y;
      }

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 150);
    });
  }, []);

  useEffect(() => () => clearTimeout(idleTimer.current), []);

  return (
    <div
      className={`fixed inset-x-0 z-30 px-4 transition-transform duration-500 ease-expo md:hidden ${
        hidden ? "translate-y-[calc(100%+1rem)]" : "translate-y-0"
      }`}
      // Stacked just above StickyReserveButton's own bar (its button is
      // ~3.25rem tall, sitting on the same safe-area-aware bottom padding),
      // with a small gap in between.
      style={{ bottom: "calc(3.25rem + max(1rem, env(safe-area-inset-bottom)) + 0.5rem)" }}
    >
      <LocalizedLink
        href={href}
        className="u-press block w-full border border-raja-black bg-white py-3 text-center text-xs tracking-widest text-raja-black shadow-[0_4px_24px_-4px_rgb(0_0_0/0.25)] hover:border-raja-red hover:text-raja-red"
      >
        {label}
      </LocalizedLink>
    </div>
  );
}
