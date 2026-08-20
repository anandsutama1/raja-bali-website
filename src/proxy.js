import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "@/lib/i18n/config";
import { matchLocale } from "@/lib/i18n/match-locale";

// Next 16's current convention for this file is "proxy.js" (the renamed,
// non-deprecated successor to "middleware.js") — unlike the Mr Bob sister
// site, this project has no Cloudflare/OpenNext build constraint forcing the
// old filename + edge runtime, so there's no reason to fight the current
// convention here. Runs on the default Node.js runtime, which Vercel
// supports natively.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && LOCALES.includes(cookieLocale)
      ? cookieLocale
      : matchLocale(request.headers.get("accept-language"), LOCALES, DEFAULT_LOCALE);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // Deliberately never writes the cookie itself here, even on the redirect
  // that came from Accept-Language — only a manual pick via
  // LanguageSwitcher.js writes NEXT_LOCALE. That means a guest who never
  // touched the switcher gets fresh Accept-Language detection on every
  // bare-root visit (so a phone-language change is picked up next time they
  // land on the site), while a guest who DID manually pick a language has
  // that choice remembered and respected here via cookieLocale above.
  const response = NextResponse.redirect(url);

  // This redirect's target depends on the Accept-Language/Cookie request
  // headers, so it must never be cached and served to a different visitor
  // (or to the same visitor after their language changes) by the browser,
  // Vercel's edge, or any intermediate proxy.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Accept-Language, Cookie");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|images|videos|favicon.ico|icon.png|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};
