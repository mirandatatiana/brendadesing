type IconProps = { size?: number; className?: string };

export function ArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeft({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M15 8H2M7 3 2 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Small terracotta sprig used as a section marker. */
export function Ornament({ className = "ornament" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 22V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 13c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6Z" fill="currentColor" opacity=".85" />
      <path d="M12 10c3 0 5-2 5-5-3 0-5 2-5 5Z" fill="currentColor" opacity=".55" />
      <circle cx="12" cy="3" r="1.4" fill="currentColor" />
    </svg>
  );
}
