import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";
import { site } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav, footer } = dict;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={`/${locale}`} className="wordmark" aria-label="Julieta — home">
              <span className="wordmark__name">
                Julieta<span>.</span>
              </span>
            </Link>
            <p>{footer.statement}</p>
          </div>
          <div className="footer-col">
            <h2>{footer.explore}</h2>
            <ul>
              <li><Link href={`/${locale}/portfolio`}>{nav.portfolio}</Link></li>
              <li><Link href={`/${locale}/services`}>{nav.services}</Link></li>
              <li><Link href={`/${locale}/about`}>{nav.about}</Link></li>
              <li><Link href={`/${locale}/contact?type=consultation`}>{nav.cta}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>{footer.contact}</h2>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.instagram} rel="noopener noreferrer" target="_blank">Instagram</a></li>
              <li>{site.region[locale]}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Julieta {site.tagline[locale]}. {footer.rights}
          </span>
          <span>
            {footer.kvk} {site.kvk}
          </span>
        </div>
      </div>
    </footer>
  );
}
