"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Img } from "./types";

type Ctx = { open: (group: Img[], index: number) => void };
const LightboxContext = createContext<Ctx | null>(null);

/** Wraps a page so any <Photo> inside can open the full-screen viewer. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ group: Img[]; index: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((group: Img[], index: number) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setState({ group, index });
  }, []);
  const close = useCallback(() => {
    setState(null);
    returnFocus.current?.focus?.();
  }, []);
  const step = useCallback((dir: 1 | -1) => {
    setState((s) => (s ? { ...s, index: (s.index + dir + s.group.length) % s.group.length } : s));
  }, []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [state, close, step]);

  const current = state ? state.group[state.index] : null;

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photos"
          className="lightbox-in fixed inset-0 z-[100] flex flex-col bg-ink/95 text-paper"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 text-sm">
            <span className="font-display font-semibold tracking-wide">
              {state.index + 1} / {state.group.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/40 hover:bg-paper hover:text-ink"
              aria-label="Close photos"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <Image
              key={current.full}
              src={current.full}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="lightbox-img max-h-full w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
              priority
            />
            {state.group.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 bg-ink/50 hover:bg-paper hover:text-ink sm:left-4"
                >
                  <svg viewBox="0 0 10 16" className="h-4 w-3" aria-hidden="true">
                    <path d="M8 2L2 8l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 bg-ink/50 hover:bg-paper hover:text-ink sm:right-4"
                >
                  <svg viewBox="0 0 10 16" className="h-4 w-3" aria-hidden="true">
                    <path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <p className="min-h-[3.25rem] px-5 py-4 text-center text-base text-sand">{current.caption || current.alt}</p>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

/** A photo that opens the full-screen viewer on click. Fills its parent. */
export function Photo({
  group,
  index,
  sizes,
  className = "",
  priority = false,
  naturalHeight = false,
}: {
  group: Img[];
  index: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Render at the photo's own proportions instead of filling the parent. */
  naturalHeight?: boolean;
}) {
  const ctx = useContext(LightboxContext);
  const img = group[index];
  return (
    <button
      type="button"
      onClick={() => ctx?.open(group, index)}
      aria-label={`View photo larger: ${img.alt}`}
      className={`photo-zoom group relative block w-full overflow-hidden bg-sage ${naturalHeight ? "" : "h-full"} ${className}`}
    >
      {naturalHeight ? (
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-ink/70 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4">
          <path d="M9 2h5v5M7 14H2V9M14 2L9 7M2 14l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}
