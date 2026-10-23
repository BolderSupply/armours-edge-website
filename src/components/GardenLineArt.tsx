import { Reveal } from "./Reveal";

/**
 * Hand-drawn style line illustration: a stone wall, steps, shrubs, a path
 * light and a tree. The strokes draw themselves as it scrolls into view.
 */
export function GardenLineArt({ className }: { className?: string }) {
  const paths = [
    // ground line
    "M0 262 C110 250 215 272 330 259 S540 247 640 259",
    // wall outline and courses
    "M60 252 V190 H340 V252",
    "M60 210 H340 M60 231 H340",
    "M120 190 V210 M200 190 V210 M280 190 V210",
    "M90 210 V231 M170 210 V231 M250 210 V231 M320 210 V231",
    "M120 231 V252 M200 231 V252 M280 231 V252",
    // steps
    "M340 252 H382 V231 H424 V210 H466 V190 H510",
    // shrubs on the wall
    "M72 190 q8 -30 30 -14 q14 -28 34 -6 q18 -24 36 -2 q20 -18 32 8 q22 -20 34 4 q18 -14 28 10",
    // path light
    "M526 190 V122 M510 126 H542 L535 104 H517 Z M500 112 L486 106 M552 112 L566 106 M526 96 V82",
    // tree
    "M596 259 V196 M596 214 L574 192 M596 205 L618 184",
    "M596 196 c-44 0 -56 -42 -24 -60 c-6 -34 42 -46 58 -20 c34 -6 50 30 24 52 c12 24 -16 40 -58 28",
  ];
  return (
    <Reveal variant="draw" className={className}>
      <svg
        viewBox="0 0 640 300"
        className="h-auto w-full text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {paths.map((d, i) => (
          <path key={d} d={d} pathLength={1} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </svg>
    </Reveal>
  );
}
