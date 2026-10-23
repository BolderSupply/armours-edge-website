import Link from "next/link";
import type { ReactNode } from "react";
import { PaverPattern } from "./PaverPattern";

const darkTones = ["#1f4a37", "#245240", "#1b4231", "#2a5b46", "#1e4636"];

type Crumb = { href: string; label: string };

/** Dark title band used at the top of inner pages. */
export function PageHero({
  title,
  intro,
  crumbs = [],
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-evergreen-deep text-paper">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="drift absolute -left-[240px] -top-[88px] h-[calc(100%+88px)] w-[calc(100%+240px)]">
          <PaverPattern className="h-full w-full" tones={darkTones} joint="#0e3022" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-evergreen-deep via-evergreen-deep/85 to-evergreen-deep/40" />
      </div>
      <div className="container-page py-16 sm:py-24">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="hero-fade mb-6 text-sm text-sand" style={{ "--d": "100ms" } as React.CSSProperties}>
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="text-link">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-paper">
                {title}
              </li>
            </ol>
          </nav>
        )}
        <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,5.25rem)] uppercase leading-[0.98]">
          {title.split(" ").map((word, i) => (
            <span key={word + i} className="hero-word mr-[0.22em]">
              <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
            </span>
          ))}
        </h1>
        {intro && (
          <p className="hero-fade mt-6 max-w-2xl text-lg text-paper/90 sm:text-xl" style={{ "--d": "600ms" } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-fade mt-8" style={{ "--d": "800ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
        <div className="bar-grow mt-10" aria-hidden="true" />
      </div>
    </section>
  );
}
