import Link from "next/link";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";
import type { Locale } from "@/lib/i18n/config";

export function CtaBand({ lang, title, text, button }: { lang: Locale; title: string; text: string; button: string }) {
  return (
    <section className="section cta-band" aria-labelledby="cta-title">
      <span className="cta-band__arch" aria-hidden="true" />
      <div className="container cta-band__inner">
        <Reveal>
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
        </Reveal>
        <Reveal delay={120}>
          <Link href={`/${lang}/contact?type=consultation`} className="btn btn--light">
            {button} <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
