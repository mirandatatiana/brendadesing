"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Ornament } from "@/components/Icons";

const copy = {
  en: { title: "This room is still empty", text: "The page you're looking for doesn't exist or has moved.", back: "Back to home" },
  nl: { title: "Deze kamer is nog leeg", text: "De pagina die je zoekt bestaat niet of is verplaatst.", back: "Terug naar home" },
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang === "nl" ? "nl" : "en";
  const t = copy[lang];
  return (
    <section className="not-found">
      <Ornament className="ornament" />
      <h1 style={{ fontSize: "var(--step-4)", marginTop: "1rem" }}>{t.title}</h1>
      <p className="lead" style={{ marginInline: "auto" }}>{t.text}</p>
      <p>
        <Link href={`/${lang}`} className="btn">{t.back}</Link>
      </p>
    </section>
  );
}
