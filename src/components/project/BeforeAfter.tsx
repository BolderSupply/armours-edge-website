"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TransformationView } from "./types";

/**
 * Drag (or use arrow keys) to compare before and after. A transparent range
 * input sits on top, so mouse, touch and keyboard all work natively.
 */
export function BeforeAfter({ item, priority = false }: { item: TransformationView; priority?: boolean }) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);

  // One gentle wiggle when it scrolls into view, so people see it is draggable.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          if (touchedRef.current) return;
          const t = Math.min((now - start) / 2200, 1);
          setPos(50 + Math.sin(t * Math.PI * 2) * 24 * (1 - t));
          if (t < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const onInput = (value: number) => {
    touchedRef.current = true;
    setTouched(true);
    setPos(value);
  };

  return (
    <figure>
      <div
        ref={ref}
        className="relative aspect-[4/3] select-none overflow-hidden bg-sage sm:aspect-[16/10]"
        style={{ touchAction: "pan-y" }}
      >
        <Image
          src={item.after.src}
          alt={item.after.alt}
          fill
          sizes="(min-width: 1216px) 1216px, 100vw"
          className="object-cover"
          priority={priority}
          draggable={false}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={item.before.src}
            alt={item.before.alt}
            fill
            sizes="(min-width: 1216px) 1216px, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute left-0 top-0 bg-ink/80 px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-paper">
          Before
        </span>
        <span className="pointer-events-none absolute right-0 top-0 bg-amber px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
          After
        </span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper shadow-[0_0_12px_rgb(0_0_0_/_0.4)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-evergreen shadow-lg">
            <svg viewBox="0 0 24 12" className="h-3 w-6" aria-hidden="true">
              <path d="M7 1L2 6l5 5M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => onInput(Number(e.target.value))}
          aria-label={`Compare before and after${item.label ? `: ${item.label}` : ""}`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute inset-0 ring-4 ring-inset ring-amber opacity-0 peer-focus-visible:opacity-100" aria-hidden="true" />

        {!touched && (
          <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink/75 px-4 py-2 font-display text-sm font-semibold text-paper">
            Drag to compare
          </span>
        )}
      </div>
      {item.label && <figcaption className="mt-3 font-display text-base font-semibold text-moss">{item.label}</figcaption>}
    </figure>
  );
}
