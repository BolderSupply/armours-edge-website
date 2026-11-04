import Image from "next/image";

/**
 * A project photo turned into a faint pencil-sketch with a pale wash, faded
 * out at the edges so it melts into a white section. Decorative only.
 */
export function GhostPhoto({ src, className }: { src: string; className?: string }) {
  const fade = "linear-gradient(to right, transparent 0%, #000 55%, #000 100%), linear-gradient(to top, transparent 0%, #000 30%)";
  return (
    <div
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{
        WebkitMaskImage: fade,
        maskImage: fade,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
      aria-hidden="true"
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="pencil" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feGaussianBlur stdDeviation="1.1" />
            <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="-5" intercept="1.02" />
              <feFuncG type="linear" slope="-5" intercept="1.02" />
              <feFuncB type="linear" slope="-5" intercept="1.02" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      {/* pale wash */}
      <Image src={src} alt="" fill sizes="50vw" className="object-cover opacity-[0.16] grayscale" />
      {/* pencil lines */}
      <Image src={src} alt="" fill sizes="50vw" className="object-cover opacity-45 mix-blend-multiply" style={{ filter: "url(#pencil)" }} />
    </div>
  );
}
