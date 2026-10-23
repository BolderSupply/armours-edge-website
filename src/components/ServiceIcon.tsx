const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Simple line icons, one per service. */
export function ServiceIcon({ slug, className = "h-12 w-12" }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false" {...common}>
      {slug === "interlock" && (
        <>
          <rect x="5" y="9" width="17" height="8" />
          <rect x="26" y="9" width="17" height="8" />
          <rect x="15" y="20" width="17" height="8" />
          <path d="M5 20h6v8H5zM36 20h7v8h-7z" />
          <rect x="5" y="31" width="17" height="8" />
          <rect x="26" y="31" width="17" height="8" />
        </>
      )}
      {slug === "retaining-walls" && (
        <>
          <path d="M5 40h38V12H5z" />
          <path d="M5 21h38M5 30h38M17 12v9M31 12v9M10 21v9M24 21v9M38 21v9M17 30v10M31 30v10" />
        </>
      )}
      {slug === "steps" && <path d="M5 40h10v-9h10v-9h10v-9h8M5 40h38" />}
      {slug === "water-features-fire-pits" && (
        <>
          <path d="M14 8c-5 7-8 10-8 15a8 8 0 0 0 16 0c0-5-3-8-8-15z" />
          <path d="M34 20c1 5 6 7 6 14a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 2 4 3 4 0-4-1-7 3-10z" />
        </>
      )}
      {slug === "landscape-lighting" && (
        <>
          <path d="M24 44V22M16 22h16l-3-10h-10z" />
          <path d="M24 6V3M10 12l-3-2M38 12l3-2M8 22H4M44 22h-4" />
        </>
      )}
      {slug === "irrigation" && (
        <>
          <path d="M24 44V30M20 30h8" />
          <path d="M24 26c0-6 0-9-3-13M24 26c0-6 0-9 3-13M24 26c-2-5-7-7-11-7M24 26c2-5 7-7 11-7" />
          <path d="M10 14h.01M38 14h.01M18 8h.01M30 8h.01" />
        </>
      )}
      {slug === "excavation-grading" && (
        <>
          <path d="M6 42h36" />
          <path d="M30 6 18 24" />
          <path d="M14 26h14l-3 10H17z" />
          <path d="M34 30c3 0 6 3 8 8" />
        </>
      )}
      {slug === "decks-fences" && (
        <>
          <path d="M6 14l4-5 4 5v28H6zM18 14l4-5 4 5v28H18zM30 14l4-5 4 5v28H30z" />
          <path d="M2 22h44M2 34h44" />
        </>
      )}
    </svg>
  );
}
