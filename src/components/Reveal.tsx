"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "fade" | "draw";

type Props = {
  as?: ElementType;
  variant?: Variant;
  /** Milliseconds to wait once the element is in view (use for staggering). */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Reveals its content when scrolled into view. The hidden starting state is
 * only applied when JavaScript is running (the `js` class on <html>), so the
 * page stays fully readable without it. Respects reduced-motion in CSS.
 */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} data-reveal={variant} className={className} style={style}>
      {children}
    </Tag>
  );
}
