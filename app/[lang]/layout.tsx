import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#f7f1e7",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — Julieta` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", nl: "/nl", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Julieta",
      locale: lang === "nl" ? "nl_NL" : "en_GB",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${fraunces.variable} ${hanken.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal,.reveal-image{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.a11y.skip}
        </a>
        <Header locale={lang} nav={dict.nav} a11y={dict.a11y} tagline={site.tagline[lang]} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
      </body>
    </html>
  );
}
