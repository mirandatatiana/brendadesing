import Link from "next/link";
import { Photo } from "./Photo";
import { rooms, type Project } from "@/lib/content/projects";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  project: Project;
  locale: Locale;
  wide?: boolean;
  sizes?: string;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({
  project,
  locale,
  wide = false,
  sizes = "(min-width: 1200px) 30vw, (min-width: 700px) 45vw, 100vw",
  headingLevel: H = "h3",
}: Props) {
  return (
    <Link href={`/${locale}/portfolio/${project.slug}`} className={`project-card${wide ? " project-card--wide" : ""}`}>
      <Photo photo={project.cover} locale={locale} sizes={sizes} />
      <div className="project-card__meta">
        <span>{rooms[project.room][locale]}</span>
        <span>{project.location}</span>
      </div>
      <H className="project-card__title">{project.title[locale]}</H>
      <p className="project-card__summary">{project.summary[locale]}</p>
    </Link>
  );
}
