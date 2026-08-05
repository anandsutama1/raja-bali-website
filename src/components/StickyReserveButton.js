"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { onScrollFrame } from "./motion/ticker";

// Mobile only — each page's own hero button scrolls away with it, so this
// picks up once the user has scrolled past that point, acting as a shortcut
// straight to that page's reservation form (or /outlets, for pages without
// one of their own). Mirrors the navbar's show/hide, but inverted: the
// navbar hides on scroll-down and shows on scroll-up/idle, so this one
// shows on scroll-down/idle and hides only while actively scrolling up (an
// "up" gesture reads as heading back toward the hero's own button).
export default function StickyReserveButton({ href = "/outlets", label = "RESERVE TABLE" }) {
  const [hidden, setHidden] = useState(true);
  const [atTarget, setAtTarget] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef(null);
  const targetId = href.startsWith("#") ? href.slice(1) : null;

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

      // Idle: once scrolling settles (no significant movement for a beat),
      // always reveal rather than leaving it stuck hidden from a prior
      // upward scroll.
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 150);
    });
  }, []);

  useEffect(() => () => clearTimeout(idleTimer.current), []);

  // Once the reservation form the button points to is on screen — whether
  // the guest tapped the button or just scrolled there themselves — the
  // shortcut has done its job, so it disappears instead of sitting on top
  // of the form guests are trying to fill in.
  useEffect(() => {
    if (!targetId) return undefined;
    const target = document.getElementById(targetId);
    if (!target) return undefined;

    // Default threshold (0): hides as soon as any part of the form is on
    // screen and reappears the moment the form has scrolled fully out of
    // view again — a ratio-based threshold would keep it hidden far too
    // long on a form section this much taller than the viewport.
    const observer = new IntersectionObserver(([entry]) => setAtTarget(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  // z-30 is deliberately one below the mobile nav drawer's z-40
  // (Navbar.js) so it sinks behind the drawer automatically once opened
  // instead of floating on top of the menu.
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pb-4 transition-transform duration-500 ease-expo md:hidden ${
        hidden || atTarget ? "translate-y-[calc(100%+1rem)]" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href={href}
        className="u-press block w-full bg-raja-black py-4 text-center text-sm tracking-widest text-white shadow-[0_4px_24px_-4px_rgb(0_0_0/0.4)] hover:bg-raja-red"
      >
        {label}
      </Link>
    </div>
  );
}
