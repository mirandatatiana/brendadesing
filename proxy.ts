import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales } from "@/lib/i18n/config";

/**
 * Every page lives under /en or /nl. Requests without a locale prefix are
 * redirected: to the visitor's previously chosen language if they picked
 * one with the switcher, otherwise to English (the default).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookie) ? cookie : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and files with an extension (images, sitemap.xml, robots.txt…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
