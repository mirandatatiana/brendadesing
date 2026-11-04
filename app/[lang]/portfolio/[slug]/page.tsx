import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { getProject, projects, rooms, styles } from "@/lib/content/projects";
import { services } from "@/lib/content/services";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/portfolio/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const l = lang as Locale;
  return {
    title: project.title[l],
    description: project.summary[l],
    alternates: {
      canonical: `/${l}/portfolio/${slug}`,
      languages: { en: `/en/portfolio/${slug}`, nl: `/nl/portfolio/${slug}` },
    },
    openGraph: { images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/portfolio/[slug]">) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const t = dict.project;
  const cs = project.caseStudy;
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const serviceNames = project.services
    .map((k) => services.find((s) => s.key === k)?.name[lang])
    .filter(Boolean)
    .join(", ");

  return (
    <article>
      <div className="container project-hero">
        <Reveal image>
          <Photo photo={project.cover} locale={lang} sizes="(min-width: 1360px) 1300px, 100vw" priority />
        </Reveal>
      </div>

      <section className="section--tight container">
        <Link href={`/${lang}/portfolio`} className="back-link">
          <ArrowLeft /> {t.back}
        </Link>
        <div className="project-intro">
          <Reveal>
            <p className="eyebrow">
              {rooms[project.room][lang]} · {project.location}
            </p>
            <h1 style={{ fontSize: "var(--step-4)" }}>{project.title[lang]}</h1>
            <div className="prose">
              {project.description.map((para, i) => (
                <p key={i}>{para[lang]}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <dl className="facts">
              <div>
                <dt>{t.location}</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>{t.year}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>{t.room}</dt>
                <dd>{rooms[project.room][lang]}</dd>
              </div>
              <div>
                <dt>{t.style}</dt>
                <dd>{styles[project.style][lang]}</dd>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <dt>{t.services}</dt>
                <dd>{serviceNames}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="container" aria-label={t.gallery}>
        <Gallery photos={project.gallery} locale={lang} labels={dict.a11y} />
      </section>

      {cs && (
        <section className="section container">
          <div className="case-grid">
            {cs.brief && (
              <Reveal className="case-block">
                <p className="eyebrow">{t.brief}</p>
                <p className="lead" style={{ fontSize: "var(--step-2)", fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {cs.brief[lang]}
                </p>
              </Reveal>
            )}

            {cs.beforeAfter && (
              <Reveal className="case-block">
                <h2>{t.beforeAfter}</h2>
                <div className="before-after">
                  <figure>
                    <Photo photo={cs.beforeAfter.before} locale={lang} sizes="(min-width: 768px) 50vw, 100vw" />
                    <figcaption>{t.before}</figcaption>
                  </figure>
                  <figure>
                    <Photo photo={cs.beforeAfter.after} locale={lang} sizes="(min-width: 768px) 50vw, 100vw" />
                    <figcaption>{t.after}</figcaption>
                  </figure>
                </div>
              </Reveal>
            )}

            {cs.materials && (
              <Reveal className="case-block">
                <h2>{t.materials}</h2>
                <ul className="swatches">
                  {cs.materials.map((m) => (
                    <li key={m.swatch}>
                      <div className="swatch__chip" style={{ background: m.swatch }} aria-hidden="true" />
                      <span className="swatch__name">{m.name[lang]}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {cs.clientStory && (
              <Reveal className="case-block">
                <p className="eyebrow">{t.clientStory}</p>
                <blockquote className="quote">
                  <p>“{cs.clientStory.quote[lang]}”</p>
                  <footer>{cs.clientStory.name}</footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className={`container ${cs ? "section--tight" : "section"}`} aria-labelledby="next-title">
        <hr className="rule" style={{ marginBottom: "clamp(2rem, 1.5rem + 2vw, 3.5rem)" }} />
        <Link href={`/${lang}/portfolio/${next.slug}`} className="next-project">
          <Photo photo={next.cover} locale={lang} sizes="(min-width: 768px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">{t.next}</p>
            <h2 id="next-title" style={{ fontSize: "var(--step-3)" }}>
              {next.title[lang]}
            </h2>
            <span className="arrow-link" style={{ marginTop: "1rem" }}>
              {next.location} <ArrowRight />
            </span>
          </div>
        </Link>
      </section>

      <CtaBand lang={lang} title={t.ctaTitle} text={dict.home.ctaText} button={t.ctaButton} />
    </article>
  );
}
