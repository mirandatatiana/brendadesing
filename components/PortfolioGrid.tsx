"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { rooms, styles, type Project, type RoomKey, type StyleKey } from "@/lib/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";

type Props = {
  projects: Project[];
  locale: Locale;
  labels: Dictionary["portfolio"];
  initialRoom?: RoomKey | null;
  initialStyle?: StyleKey | null;
};

export function PortfolioGrid({ projects, locale, labels, initialRoom = null, initialStyle = null }: Props) {
  const [room, setRoom] = useState<RoomKey | null>(initialRoom);
  const [style, setStyle] = useState<StyleKey | null>(initialStyle);

  // Only offer filters that have at least one project
  const roomKeys = useMemo(
    () => (Object.keys(rooms) as RoomKey[]).filter((r) => projects.some((p) => p.room === r)),
    [projects],
  );
  const styleKeys = useMemo(
    () => (Object.keys(styles) as StyleKey[]).filter((s) => projects.some((p) => p.style === s)),
    [projects],
  );

  const visible = projects.filter((p) => (!room || p.room === room) && (!style || p.style === style));

  function update(nextRoom: RoomKey | null, nextStyle: StyleKey | null) {
    setRoom(nextRoom);
    setStyle(nextStyle);
    // Keep the URL shareable without triggering a navigation
    const params = new URLSearchParams();
    if (nextRoom) params.set("room", nextRoom);
    if (nextStyle) params.set("style", nextStyle);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  const count = visible.length === 1 ? labels.countOne : labels.countOther.replace("{n}", String(visible.length));

  return (
    <>
      <div className="filters">
        <fieldset className="filter-group">
          <legend>{labels.filterRoom}</legend>
          <button type="button" className="chip" aria-pressed={room === null} onClick={() => update(null, style)}>
            {labels.all}
          </button>
          {roomKeys.map((r) => (
            <button key={r} type="button" className="chip" aria-pressed={room === r} onClick={() => update(r, style)}>
              {rooms[r][locale]}
            </button>
          ))}
        </fieldset>
        <fieldset className="filter-group">
          <legend>{labels.filterStyle}</legend>
          <button type="button" className="chip" aria-pressed={style === null} onClick={() => update(room, null)}>
            {labels.all}
          </button>
          {styleKeys.map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={style === s} onClick={() => update(room, s)}>
              {styles[s][locale]}
            </button>
          ))}
        </fieldset>
        <p className="filters__count" role="status" aria-live="polite">
          {count}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="portfolio-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {visible.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 90}>
              <ProjectCard project={p} locale={locale} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="portfolio-empty">{labels.empty}</p>
      )}
    </>
  );
}
