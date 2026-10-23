import { useId } from "react";

type Props = {
  className?: string;
  /** Tones used for the pavers. */
  tones?: string[];
  /** Colour of the joints between pavers. */
  joint?: string;
};

/**
 * A running-bond paver pattern drawn in SVG. It stands in for photography
 * until real project photos exist, and doubles as the image placeholder.
 * The tile is 240 x 88, which is what the `drift` animation moves by so it loops seamlessly.
 */
export function PaverPattern({
  className,
  tones = ["#8a948b", "#79847b", "#9aa399", "#6c776f", "#a7ada2"],
  joint = "#3d463f",
}: Props) {
  const id = useId().replace(/:/g, "");
  const rows: { y: number; bricks: { x: number; w: number }[] }[] = [
    { y: 0, bricks: [{ x: 0, w: 78 }, { x: 80, w: 78 }, { x: 160, w: 78 }] },
    { y: 22, bricks: [{ x: 0, w: 38 }, { x: 40, w: 78 }, { x: 120, w: 78 }, { x: 200, w: 38 }] },
    { y: 44, bricks: [{ x: 0, w: 78 }, { x: 80, w: 78 }, { x: 160, w: 78 }] },
    { y: 66, bricks: [{ x: 0, w: 38 }, { x: 40, w: 78 }, { x: 120, w: 78 }, { x: 200, w: 38 }] },
  ];
  let n = 0;
  return (
    <svg className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width="240" height="88" patternUnits="userSpaceOnUse">
          <rect width="240" height="88" fill={joint} />
          {rows.flatMap((row) =>
            row.bricks.map((b) => {
              const fill = tones[(n++ * 3) % tones.length];
              return <rect key={`${row.y}-${b.x}`} x={b.x} y={row.y} width={b.w} height={20} fill={fill} />;
            }),
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
