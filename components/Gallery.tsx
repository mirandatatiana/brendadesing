"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, CloseIcon } from "./Icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import type { Photo as PhotoData } from "@/lib/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";

type Props = {
  photos: PhotoData[];
  locale: Locale;
  labels: Dictionary["a11y"];
};

/**
 * Editorial photo gallery: landscape photos span the full width, portrait
 * photos pair up side by side. Clicking opens an accessible lightbox
 * (native <dialog>, keyboard arrows, Escape to close).
 */
export function Gallery({ photos, locale, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => {
          const landscape = p.width > p.height;
          return (
            <Reveal key={`${p.src}-${i}`} image className={landscape ? "gallery__item--wide" : undefined}>
              <button
                type="button"
                className="gallery__item"
                onClick={() => open(i)}
                aria-label={`${labels.openPhoto}: ${p.alt[locale]}`}
                style={{ "--ratio": `${p.width} / ${p.height}` } as CSSProperties}
              >
                <Photo
                  photo={p}
                  locale={locale}
                  alt=""
                  sizes={landscape ? "(min-width: 1360px) 1300px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                />
              </button>
            </Reveal>
          );
        })}
      </div>

      <dialog ref={dialogRef} className="lightbox" aria-label={current?.alt[locale]}>
        <div className="lightbox__bar lightbox__bar--top">
          <span className="lightbox__caption" aria-live="polite">
            {index !== null && `${index + 1} / ${photos.length}`}
          </span>
          <button type="button" onClick={close} aria-label={labels.closeGallery} autoFocus>
            <CloseIcon />
          </button>
        </div>
        {current && (
          <div className="lightbox__stage">
            <Image src={current.src} alt={current.alt[locale]} fill sizes="100vw" />
          </div>
        )}
        <div className="lightbox__bar lightbox__bar--bottom">
          <button type="button" onClick={() => step(-1)} aria-label={labels.previous}>
            <ArrowLeft />
          </button>
          <span className="lightbox__caption">{current?.alt[locale]}</span>
          <button type="button" onClick={() => step(1)} aria-label={labels.next}>
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </>
  );
}
