import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Reveal } from "@/components/Reveal";
import { projects, rooms, styles, type RoomKey, type StyleKey } from "@/lib/content/projects";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/portfolio">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return {
    title: dict.portfolio.title,
    description: dict.portfolio.intro,
    alternates: { canonical: `/${lang}/portfolio`, languages: { en: "/en/portfolio", nl: "/nl/portfolio" } },
  };
}

export default async function PortfolioPage({ params, searchParams }: PageProps<"/[lang]/portfolio">) {
  const lang = (await params).lang as Locale;
  const query = await searchParams;
  const dict = getDictionary(lang);

  const room = typeof query.room === "string" && query.room in rooms ? (query.room as RoomKey) : null;
  const style = typeof query.style === "string" && query.style in styles ? (query.style as StyleKey) : null;

  return (
    <div className="container">
      <header className="page-head">
        <Reveal>
          <p className="eyebrow">Julieta · {dict.nav.portfolio}</p>
          <h1>{dict.portfolio.title}</h1>
          <p className="lead">{dict.portfolio.intro}</p>
        </Reveal>
      </header>
      <div style={{ paddingBottom: "clamp(4rem, 3rem + 6vw, 9rem)" }}>
        <PortfolioGrid
          projects={projects}
          locale={lang}
          labels={dict.portfolio}
          initialRoom={room}
          initialStyle={style}
        />
      </div>
    </div>
  );
}
