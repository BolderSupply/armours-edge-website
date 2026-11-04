"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * Horizontal swipe carousel. Touch devices swipe natively (CSS scroll-snap),
 * mouse users can drag or use the arrows, and keyboard users can tab through
 * the cards. A slim progress bar shows how far along you are.
 */
export function ProjectCarousel({ children, label, dark = false }: { children: ReactNode; label: string; dark?: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState({ start: 0, size: 1, canPrev: false, canNext: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      start: el.scrollWidth ? el.scrollLeft / el.scrollWidth : 0,
      size: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft < max - 4,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    el.addEventListener("scroll", schedule, { passive: true });
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", schedule);
      observer?.disconnect();
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const distance = (first?.offsetWidth ?? el.clientWidth * 0.8) + gap;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: distance * direction, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d.active || !track.current) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  const overflowing = state.size < 0.995;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          // A drag with the mouse should not open the project underneath it.
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className={`carousel-track [&::-webkit-scrollbar]:hidden scroll-px-5 sm:scroll-px-8 -mx-5 flex gap-5 overflow-x-auto px-5 pb-8 pt-4 -mt-4 sm:-mx-8 sm:px-8 ${
          dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory lg:cursor-grab"
        }`}
      >
        {children}
      </ul>

      {overflowing && (
        <div className="mt-6 flex items-center gap-5">
          <div className={`relative h-1 flex-1 ${dark ? "bg-paper/20" : "bg-sage"}`} aria-hidden="true">
            <div
              className="absolute inset-y-0 bg-amber transition-[left] duration-150"
              style={{ left: `${state.start * 100}%`, width: `${state.size * 100}%` }}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!state.canPrev}
              aria-label="Previous projects"
              className={`grid h-11 w-11 place-items-center border-2 transition-colors disabled:pointer-events-none disabled:opacity-30 ${dark ? "border-paper text-paper hover:bg-paper hover:text-evergreen-deep" : "border-evergreen text-evergreen hover:bg-evergreen hover:text-paper"}`}
            >
              <svg viewBox="0 0 16 10" className="h-2.5 w-4 rotate-180" aria-hidden="true">
                <path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!state.canNext}
              aria-label="Next projects"
              className={`grid h-11 w-11 place-items-center border-2 transition-colors disabled:pointer-events-none disabled:opacity-30 ${dark ? "border-paper text-paper hover:bg-paper hover:text-evergreen-deep" : "border-evergreen text-evergreen hover:bg-evergreen hover:text-paper"}`}
            >
              <svg viewBox="0 0 16 10" className="h-2.5 w-4" aria-hidden="true">
                <path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
