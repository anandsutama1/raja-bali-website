"use client";

import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { onScrollFrame } from "./motion/ticker";
import ScrollProgress from "./motion/ScrollProgress";
import LocalizedLink from "./LocalizedLink";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ dict }) {
  const nav = dict.nav;
  const links = [
    { href: "/gallery", label: nav.gallery },
    { href: "/contact", label: nav.contact },
    { href: "/about", label: nav.aboutUs },
  ];
  const drawerLinks = [
    { href: "/", label: nav.home },
    ...links,
    { href: "/menu/food", label: nav.menu },
    { href: "/cooking-class", label: nav.cookingClass },
    { href: "/bar-class", label: nav.barClass },
    { href: "/dance", label: nav.dance },
    { href: "/private-events", label: nav.privateEvents },
    { href: "/group-reservation", label: nav.groupReservation },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const lastToggle = useRef(0);
  const pathname = usePathname();
  const { locale } = useParams();
  // pathname includes the /{locale} prefix; strip it so link-active
  // comparisons below match the bare hrefs in `links`/`drawerLinks`.
  const barePathname = pathname.startsWith(`/${locale}`) ? pathname.slice(`/${locale}`.length) || "/" : pathname;

  // Belt-and-suspenders for mobile browsers where the synthetic click after
  // a tap has been unreliable: onTouchEnd fires the same toggle directly,
  // guarded so a genuine click right behind it (the usual touchend -> click
  // sequence) doesn't flip it back off.
  const toggleMenu = () => {
    const now = Date.now();
    if (now - lastToggle.current < 500) return;
    lastToggle.current = now;
    setOpen((value) => !value);
  };

  useEffect(() => {
    lastY.current = window.scrollY;

    return onScrollFrame(({ y }) => {
      setScrolled(y > 12);

      // Only react to a deliberate move, so a trackpad twitch never flickers
      // the bar in and out.
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 220);
        lastY.current = y;
      }
    });
  }, []);

  // A drawer that stays open across a navigation feels broken.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-[transform,background-color,box-shadow,backdrop-filter] duration-500 ease-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/85 backdrop-blur-md shadow-[0_1px_24px_-8px_rgb(20_20_20/0.35)]"
            : "bg-white shadow-none"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 md:px-10 transition-[padding] duration-500 ease-expo ${
            scrolled ? "py-1" : "py-2"
          }`}
        >
          <LocalizedLink href="/" className="u-press shrink-0">
            <Image
              src="/images/shared/RajaBali_Navbar.png"
              alt="Raja Bali"
              width={500}
              height={500}
              priority
              className="-my-2 h-20 w-20 md:h-24 md:w-24"
            />
          </LocalizedLink>

          <ul className="hidden md:flex gap-10 text-sm tracking-wide">
            {links.map((link) => (
              <li key={link.href}>
                <LocalizedLink
                  href={link.href}
                  className={`u-link transition-colors duration-500 ease-expo hover:text-raja-red ${
                    barePathname === link.href ? "text-raja-red" : ""
                  }`}
                >
                  {link.label}
                </LocalizedLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:flex" />

            <LocalizedLink
              href="/outlets"
              className="hidden sm:inline-block bg-raja-black text-white px-6 py-2.5 text-sm tracking-wide u-press hover:bg-raja-red"
            >
              {nav.reserveTable}
            </LocalizedLink>

            <button
              type="button"
              onClick={toggleMenu}
              onTouchEnd={toggleMenu}
              aria-label={open ? nav.closeMenu : nav.openMenu}
              aria-expanded={open}
              className="md:hidden relative h-10 w-10 -mr-2 grid touch-manipulation place-items-center"
            >
              <span className="relative block h-4 w-6">
                {[0, 1, 2].map((line) => (
                  <span
                    key={line}
                    className="absolute left-0 h-px w-full bg-raja-black transition-all duration-500 ease-expo"
                    style={{
                      top: open ? "50%" : `${line * 50}%`,
                      opacity: open && line === 1 ? 0 : 1,
                      transform: open
                        ? `rotate(${line === 0 ? 45 : line === 2 ? -45 : 0}deg)`
                        : "none",
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>

        <ScrollProgress />
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-[opacity,visibility] duration-500 ease-expo ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label={nav.closeMenu}
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full bg-raja-black/40 backdrop-blur-sm"
        />

        <div
          data-native-scroll
          className={`absolute inset-y-0 right-0 w-[82%] max-w-sm overflow-y-auto bg-raja-cream px-8 pt-28 pb-12 shadow-2xl transition-transform duration-[600ms] ease-expo ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <LanguageSwitcher
            className="mb-6 justify-center gap-4 text-sm"
            style={{
              transitionDelay: open ? "80ms" : "0ms",
              opacity: open ? 1 : 0,
            }}
          />

          <LocalizedLink
            href="/outlets"
            className="mb-8 block bg-raja-black px-6 py-4 text-center text-sm tracking-widest text-white u-press hover:bg-raja-red"
            style={{
              transitionDelay: open ? "120ms" : "0ms",
              opacity: open ? 1 : 0,
            }}
          >
            {nav.reserveTable.toUpperCase()}
          </LocalizedLink>

          <ul className="space-y-1">
            {drawerLinks.map((link, index) => (
              <li
                key={link.href}
                className="transition-all duration-[600ms] ease-expo"
                style={{
                  transitionDelay: open ? `${120 + (index + 1) * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateX(24px)",
                }}
              >
                <LocalizedLink
                  href={link.href}
                  className={`block border-b border-raja-black/10 py-4 text-xl font-serif transition-colors duration-[400ms] ease-expo hover:text-raja-red ${
                    barePathname === link.href ? "text-raja-red" : ""
                  }`}
                >
                  {link.label}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
