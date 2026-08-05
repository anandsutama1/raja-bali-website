"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onScrollFrame } from "./motion/ticker";

// Homepage only, mobile only — the hero's own "Reserve Table" button
// scrolls away with it, so this picks up once the user has scrolled past
// that point and keeps the CTA within thumb's reach the rest of the page.
export default function StickyReserveButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return onScrollFrame(({ y, height }) => {
      setVisible(y > height * 0.6);
    });
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-transform duration-500 ease-expo md:hidden ${
        visible ? "translate-y-0" : "translate-y-[calc(100%+1rem)]"
      }`}
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/outlets"
        className="u-press block w-full bg-raja-black py-4 text-center text-sm tracking-widest text-white shadow-[0_4px_24px_-4px_rgb(0_0_0/0.4)] hover:bg-raja-red"
      >
        RESERVE TABLE
      </Link>
    </div>
  );
}
