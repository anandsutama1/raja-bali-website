"use client";

import Reveal from "./motion/Reveal";

/** Kept for compatibility — Reveal is the one to reach for in new code. */
export default function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}
