"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import { locales, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
  tagline: string;
};

export function Wordmark({ locale, tagline }: { locale: Locale; tagline?: string }) {
  return (
    <Link href={`/${locale}`} className="wordmark" aria-label="Julieta — home">
      <span className="wordmark__name">
        Julieta<span>.</span>
      </span>
      {tagline && <span className="wordmark__tag">{tagline}</span>}
    </Link>
  );
}

export function Header({ locale, nav, a11y, tagline }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: `/${locale}/portfolio`, label: nav.portfolio },
    { href: `/${locale}/services`, label: nav.services },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Wordmark locale={locale} tagline={tagline} />

        <nav className="nav" aria-label={a11y.mainNav}>
          <ul className="nav__list">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav__link" aria-current={isCurrent(l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageSwitch locale={locale} pathname={pathname} a11y={a11y} />
          <Link href={`/${locale}/contact?type=consultation`} className="btn">
            {nav.cta}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? a11y.close : a11y.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} inert={!open}>
        <nav aria-label={a11y.mainNav}>
          <ul>
            <li>
              <Link href={`/${locale}`} aria-current={pathname === `/${locale}` ? "page" : undefined}>
                {nav.home}
              </Link>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href={`/${locale}/contact?type=consultation`} className="btn">
          {nav.cta}
        </Link>
      </div>
    </header>
  );
}

function LanguageSwitch({ locale, pathname, a11y }: { locale: Locale; pathname: string; a11y: Dictionary["a11y"] }) {
  const rest = pathname.replace(/^\/(en|nl)(?=\/|$)/, "");
  return (
    <div className="lang-switch" role="group" aria-label={a11y.language}>
      {locales.map((l) =>
        l === locale ? (
          <span key={l} aria-current="true" lang={l}>
            {l.toUpperCase()}
          </span>
        ) : (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-label={a11y.switchTo}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
          >
            {l.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
