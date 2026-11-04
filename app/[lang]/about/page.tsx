import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight, Ornament } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { approach, story, values } from "@/lib/content/about";
import { photos } from "@/lib/content/projects";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return {
    title: dict.nav.about,
    description: dict.about.lead,
    alternates: { canonical: `/${lang}/about`, languages: { en: "/en/about", nl: "/nl/about" } },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.about;

  return (
    <>
      <section className="section container" aria-labelledby="about-title">
        <div className="about-intro">
          <Reveal image className="about-portrait">
            <Photo
              photo={photos.aboutPortrait}
              locale={lang}
              alt={t.portraitAlt}
              sizes="(min-width: 900px) 40vw, 100vw"
              priority
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Julieta · {dict.nav.about}</p>
            <h1 id="about-title" style={{ fontSize: "var(--step-4)" }}>
              {t.title}
            </h1>
            <p className="lead" style={{ fontFamily: "var(--font-display)", fontSize: "var(--step-2)", color: "var(--ink)" }}>
              {t.lead}
            </p>
            {story.map((p, i) => (
              <p key={i}>{p[lang]}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container wide-photo" aria-hidden="true">
        <Reveal image>
          <Photo photo={photos.aboutRoom} locale={lang} sizes="(min-width: 1360px) 1300px, 100vw" alt="" />
        </Reveal>
      </section>

      <section className="section container" aria-labelledby="approach-title">
        <div className="statement">
          <Reveal>
            <Ornament />
            <p className="eyebrow" style={{ marginTop: "1rem" }}>
              {t.approachLabel}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="approach-title">{t.approachTitle}</h2>
            <div className="prose">
              {approach.map((p, i) => (
                <p key={i}>{p[lang]}</p>
              ))}
            </div>
            <Link href={`/${lang}/portfolio`} className="arrow-link">
              {dict.home.heroSecondary} <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section--tight container" aria-labelledby="values-title" style={{ paddingTop: 0 }}>
        <h2 id="values-title" className="eyebrow">
          {t.valuesLabel}
        </h2>
        <ul className="values">
          {values.map((v, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <h3>{v.title[lang]}</h3>
              <p>{v.text[lang]}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand lang={lang} title={dict.home.ctaTitle} text={dict.home.ctaText} button={t.cta} />
    </>
  );
}
