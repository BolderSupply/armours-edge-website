"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "./Lightbox";
import type { StageView } from "./types";

function PhotoLayout({ photos }: { photos: StageView["photos"] }) {
  const n = photos.length;
  if (n === 0) return null;
  const sizeFull = "(min-width: 1216px) 1100px, (min-width: 768px) 80vw, 92vw";
  const sizeHalf = "(min-width: 1216px) 540px, (min-width: 768px) 40vw, 46vw";
  if (n === 1) {
    return (
      <div className="aspect-[16/9]">
        <Photo group={photos} index={0} sizes={sizeFull} />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {photos.map((_, i) => {
        const wide = n === 3 && i === 0;
        return (
          <div key={i} className={wide ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}>
            <Photo group={photos} index={i} sizes={wide ? sizeFull : sizeHalf} />
          </div>
        );
      })}
    </div>
  );
}

/** A vertical build timeline: the line fills and the steps light up as you scroll. */
export function ProcessTimeline({ stages }: { stages: StageView[] }) {
  const wrap = useRef<HTMLOListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setProgress(Math.min(Math.max((mid - rect.top) / rect.height, 0), 1));
      let current = -1;
      items.current.forEach((item, i) => {
        if (item && item.getBoundingClientRect().top < mid) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={wrap} className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-[1.4rem] top-0 w-0.5 bg-line md:left-[1.9rem]" />
      <span
        aria-hidden="true"
        className="absolute left-[1.4rem] top-0 w-0.5 bg-amber md:left-[1.9rem]"
        style={{ height: `${progress * 100}%` }}
      />
      {stages.map((stage, i) => {
        const on = i <= active;
        return (
          <li
            key={stage.title + i}
            ref={(node) => {
              items.current[i] = node;
            }}
            className="relative grid grid-cols-[2.8rem_1fr] gap-x-5 pb-16 last:pb-0 md:grid-cols-[3.8rem_1fr] md:gap-x-8 md:pb-24"
          >
            <span
              className={`relative z-10 flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full border-2 font-display text-lg font-extrabold transition-colors duration-500 md:h-[3.8rem] md:w-[3.8rem] md:text-2xl ${
                on ? "border-amber bg-amber text-ink" : "border-line bg-paper text-granite"
              }`}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="pt-1 text-2xl leading-tight md:pt-3 md:text-4xl">{stage.title}</h3>
              {stage.description && <p className="mt-3 max-w-2xl text-lg text-granite">{stage.description}</p>}
              <div className="mt-6">
                <PhotoLayout photos={stage.photos} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
