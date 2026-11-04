import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photo as PhotoData } from "@/lib/content/projects";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  photo: PhotoData;
  locale: Locale;
  /** Responsive sizes hint, so the browser downloads the right width. */
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Override alt text (e.g. "" for decorative duplicates). */
  alt?: string;
};

/**
 * Every photo on the site goes through here so the warm grade, cropping
 * and responsive loading stay consistent. The wrapper's aspect-ratio
 * (set in CSS) reserves space, so there is no layout shift.
 */
export function Photo({ photo, locale, sizes, priority, className, style, alt }: Props) {
  return (
    <div className={`photo${className ? ` ${className}` : ""}`} style={style}>
      <Image
        src={photo.src}
        alt={alt ?? photo.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
