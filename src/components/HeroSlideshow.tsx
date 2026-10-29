"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  /** Set for project photos: shows a link to that project. */
  title?: string;
  href?: string;
};

const INTERVAL_MS = 6500;

/**
 * Full-bleed hero background that cross-fades between photos, with a slow zoom
 * on the active one. Pass project cover photos to feature recent work.
 */
export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setCurrent((c) => {
        if (next === c) return c;
        setPrevious(c);
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = window.setInterval(() => {
      if (reduceMotion.current || document.hidden) return;
      go((current + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, current, go, paused]);

  const active = slides[current];

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden bg-evergreen-deep" aria-hidden={count > 1 ? undefined : true}>
        {slides.map((slide, i) => {
          const on = i === current;
          const fading = i === previous;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${on ? "opacity-100" : "opacity-0"}`}
              aria-hidden={!on}
            >
              <Image
                src={slide.src}
                alt={on ? slide.alt : ""}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${on || fading ? "hero-zoom" : ""}`}
              />
            </div>
          );
        })}
        {/* Keeps the headline readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/85 via-evergreen-deep/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-evergreen-deep/60 via-evergreen-deep/15 to-transparent" />
      </div>

      {count > 1 && (
        <div className="hero-fade absolute inset-x-0 bottom-6 z-0 sm:bottom-10" style={{ "--d": "1400ms" } as React.CSSProperties}>
          <div className="container-page flex flex-col items-end gap-3">
            {active.href && active.title && (
              <Link
                key={active.href}
                href={active.href}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="slide-caption group hidden max-w-sm items-center gap-3 border-l-4 border-amber bg-evergreen-deep/80 py-3 pl-4 pr-5 backdrop-blur transition-colors hover:bg-evergreen-deep lg:flex"
              >
                <span className="min-w-0">
                  <span className="block font-display text-xs font-bold uppercase tracking-[0.14em] text-amber">Recent project</span>
                  <span className="mt-1 block truncate font-display text-base font-bold text-paper">{active.title}</span>
                </span>
                <svg viewBox="0 0 16 10" className="h-2.5 w-4 shrink-0 text-paper transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  <path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            <div className="flex items-center gap-2" role="group" aria-label="Choose a photo">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show photo ${i + 1} of ${count}`}
                  aria-current={i === current}
                  className="group flex h-6 w-10 items-center"
                >
                  <span className="relative block h-1 w-full overflow-hidden bg-paper/35 group-hover:bg-paper/60">
                    {i === current && (
                      <span
                        key={`${current}-${paused}`}
                        className="hero-progress absolute inset-y-0 left-0 bg-amber"
                        style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
