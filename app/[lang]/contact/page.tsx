import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Ornament } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/content/services";
import { getDictionary, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return {
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: { canonical: `/${lang}/contact`, languages: { en: "/en/contact", nl: "/nl/contact" } },
  };
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const query = await searchParams;
  const dict = getDictionary(lang);
  const t = dict.contact;

  const initialType = query.type === "question" ? "question" : "consultation";
  const initialService =
    typeof query.service === "string" && services.some((s) => s.key === query.service) ? query.service : "";

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <p className="eyebrow">Julieta · {dict.nav.contact}</p>
          <h1>{t.title}</h1>
          <p className="lead">{t.intro}</p>
        </Reveal>
      </header>

      <div className="contact-layout" style={{ paddingBottom: "clamp(4rem, 3rem + 6vw, 9rem)" }}>
        <aside className="contact-aside">
          <Reveal>
            <hr className="rule" style={{ marginBottom: "1.5rem" }} />
            <h2 className="eyebrow">{t.direct}</h2>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>{t.area}</dt>
                <dd>{site.region[lang]}</dd>
              </div>
            </dl>
            <Ornament className="ornament" />
          </Reveal>
        </aside>

        <Reveal delay={100}>
          <ContactForm
            locale={lang}
            labels={t}
            serviceOptions={services.map((s) => ({ key: s.key, name: s.name[lang] }))}
            initialType={initialType}
            initialService={initialService}
          />
        </Reveal>
      </div>
    </div>
  );
}
