import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/content/projects";
import { formatPrice, process, services, type ServiceKey } from "@/lib/content/services";
import { getDictionary, type Locale } from "@/lib/i18n";

const serviceImage: Record<ServiceKey, keyof typeof photos> = {
  consultation: "serviceConsultation",
  moodboard: "serviceMoodboard",
  styling: "serviceStyling",
};

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return {
    title: dict.services.title,
    description: dict.services.intro,
    alternates: { canonical: `/${lang}/services`, languages: { en: "/en/services", nl: "/nl/services" } },
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.services;

  return (
    <>
      <div className="container">
        <header className="page-head">
          <Reveal>
            <p className="eyebrow">Julieta · {dict.nav.services}</p>
            <h1>{t.title}</h1>
            <p className="lead">{t.intro}</p>
          </Reveal>
        </header>

        {services.map((s, i) => (
          <section key={s.key} id={s.key} className="service-detail" aria-labelledby={`${s.key}-title`}>
            <Reveal image className="service-detail__media">
              <Photo photo={photos[serviceImage[s.key]]} locale={lang} sizes="(min-width: 900px) 42vw, 100vw" />
            </Reveal>
            <Reveal delay={100}>
              <span className="service-row__num">0{i + 1}</span>
              <h2 id={`${s.key}-title`} style={{ fontSize: "var(--step-4)" }}>
                {s.name[lang]}
              </h2>
              <p className="lead">{s.description[lang]}</p>
              <div className="service-detail__price">
                {s.priceFrom === null ? (
                  <strong style={{ fontSize: "var(--step-2)" }}>{t.onRequest}</strong>
                ) : (
                  <>
                    <span>{t.from}</span>
                    <strong>{formatPrice(s.priceFrom, lang)}</strong>
                    {s.unit && <span>{s.unit[lang]}</span>}
                  </>
                )}
              </div>
              <h3 className="checklist-title">{t.includes}</h3>
              <ul className="checklist">
                {s.includes.map((item, j) => (
                  <li key={j}>{item[lang]}</li>
                ))}
              </ul>
              <Link href={`/${lang}/contact?type=consultation&service=${s.key}`} className="btn">
                {t.cta} <ArrowRight />
              </Link>
            </Reveal>
          </section>
        ))}

        <p className="fine-print" style={{ paddingBottom: "2rem" }}>
          {t.vatNote}
        </p>
      </div>

      <section className="section section--panel" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.processLabel}</p>
              <h2 id="process-title">{t.processTitle}</h2>
            </div>
          </div>
          <ol className="process">
            {process.map((step, i) => (
              <Reveal as="li" key={i} delay={i * 90}>
                <h3>{step.title[lang]}</h3>
                <p>{step.text[lang]}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand lang={lang} title={dict.home.ctaTitle} text={dict.home.ctaText} button={dict.home.ctaButton} />
    </>
  );
}
