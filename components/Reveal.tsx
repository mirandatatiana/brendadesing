"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** Use the image "unmask" reveal instead of the fade-up. */
  image?: boolean;
  delay?: number;
  className?: string;
};

/** Gentle fade / unmask when an element scrolls into view. */
export function Reveal({ children, as: Tag = "div", image = false, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const obs = getObserver();
    if (!el || !obs) return;
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const style = delay ? ({ "--delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} className={`${image ? "reveal-image" : "reveal"} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
