import Link from "next/link";
import { ArrowRight, Ornament } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { photos, projects } from "@/lib/content/projects";
import { formatPrice, services } from "@/lib/content/services";
import { getDictionary, type Locale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.home;
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Photo photo={photos.hero} locale={lang} sizes="100vw" priority />
        </div>
        <div className="container hero__content">
          <Reveal>
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 id="hero-title">
              <HeroTitle text={t.heroTitle} />
            </h1>
            <div className="hero__actions">
              <Link href={`/${lang}/contact?type=consultation`} className="btn btn--light">
                {t.heroCta}
              </Link>
              <Link href={`/${lang}/portfolio`} className="btn btn--ghost">
                {t.heroSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statement */}
      <section className="section container" aria-labelledby="statement-label">
        <div className="statement">
          <Reveal>
            <Ornament />
            <p className="eyebrow" id="statement-label" style={{ marginTop: "1rem" }}>
              {t.statementLabel}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="statement__text">{t.statement}</p>
            <p className="statement__sign">{t.statementSign}</p>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <hr className="rule" />
      </div>

      {/* Featured projects */}
      <section className="section container" aria-labelledby="featured-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t.featuredLabel}</p>
            <h2 id="featured-title">{t.featuredTitle}</h2>
          </div>
          <Link href={`/${lang}/portfolio`} className="arrow-link">
            {t.allProjects} <ArrowRight />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}>
              <ProjectCard
                project={p}
                locale={lang}
                wide={i % 4 === 0 || i % 4 === 3}
                sizes={i % 4 === 0 || i % 4 === 3 ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 35vw, 100vw"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="section section--panel" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.servicesLabel}</p>
              <h2 id="services-title">{t.servicesTitle}</h2>
            </div>
            <Link href={`/${lang}/services`} className="arrow-link">
              {t.allServices} <ArrowRight />
            </Link>
          </div>
          <div className="services-preview">
            {services.map((s, i) => (
              <Reveal key={s.key} delay={i * 80}>
                <Link href={`/${lang}/services#${s.key}`} className="service-row">
                  <span className="service-row__num">0{i + 1}</span>
                  <h3>{s.name[lang]}</h3>
                  <p>{s.short[lang]}</p>
                  <span className="service-row__price">
                    {s.priceFrom === null
                      ? dict.services.onRequest
                      : `${dict.services.from} ${formatPrice(s.priceFrom, lang)}`}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={t.ctaTitle} text={t.ctaText} button={t.ctaButton} />
    </>
  );
}

/** Italicise the last word or two of the hero title for a bit of character. */
function HeroTitle({ text }: { text: string }) {
  const comma = text.lastIndexOf(",");
  if (comma === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, comma + 1)} <em>{text.slice(comma + 1).trim()}</em>
    </>
  );
}
