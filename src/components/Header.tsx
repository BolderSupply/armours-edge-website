"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { services } from "@/lib/services";
import { nav, type Contact } from "@/lib/site";
import { Logo } from "./Logo";
import { ServiceIcon } from "./ServiceIcon";

const linkBase =
  "relative py-2 font-display text-[0.95rem] font-bold uppercase tracking-[0.08em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-300 hover:text-evergreen hover:after:scale-x-100 aria-[current=page]:text-evergreen aria-[current=page]:after:scale-x-100";

export function Header({ contact }: { contact: Contact }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <>
      {/* Utility bar: scrolls away with the page, so nothing ever changes height */}
      <div className="bg-evergreen-deep text-paper">
        <div className="container-page flex h-11 items-center justify-between gap-4 text-sm">
          <p className="hidden truncate text-sand sm:block">
            Proudly serving {contact.serviceArea}
          </p>
          <div className="ml-auto flex items-center gap-5">
            {contact.phone ? (
              <a href={contact.phoneHref} className="font-semibold hover:text-amber">
                {contact.phone}
              </a>
            ) : (
              <a href={`mailto:${contact.email}`} className="hidden font-semibold hover:text-amber sm:inline">
                {contact.email}
              </a>
            )}
            <Link
              href="/get-a-quote"
              className="bg-amber px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-paper"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <header className={`sticky top-0 z-40 border-b border-line bg-paper transition-shadow duration-300 ${scrolled ? "shadow-[0_8px_30px_-18px_rgb(14_48_34_/_0.5)]" : ""}`}>
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link href="/" onClick={close} aria-label="Armours Edge Landscape Construction, home">
            <Logo className="h-16 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            <div className="group relative">
              <Link
                href="/services"
                aria-current={isCurrent("/services") ? "page" : undefined}
                className={`${linkBase} inline-flex items-center gap-1.5`}
              >
                Services
                <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[40rem] -translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-1 border-t-4 border-amber bg-paper p-3 shadow-[0_30px_60px_-30px_rgb(14_48_34_/_0.55)]">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group/item flex items-center gap-3 p-3 transition-colors hover:bg-mist"
                    >
                      <ServiceIcon slug={s.slug} className="h-8 w-8 shrink-0 text-evergreen transition-transform duration-300 group-hover/item:scale-110" />
                      <span className="font-display text-[0.95rem] font-bold leading-tight">{s.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={linkBase}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center text-evergreen lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-7">
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-all duration-300 ${open ? "top-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-full bg-current transition-all duration-300 ${open ? "top-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="fixed inset-0 -z-10 overflow-y-auto bg-evergreen-deep pt-32 text-paper lg:hidden"
        >
          <ul className="container-page flex flex-col pb-16">
            {[{ href: "/services", label: "Services" }, ...nav].map((item, i) => (
              <li key={item.href} className="menu-item border-b border-white/15" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-5 font-display text-3xl font-extrabold uppercase tracking-wide"
                >
                  {item.label}
                </Link>
                {item.href === "/services" && (
                  <ul className="grid grid-cols-1 gap-x-6 pb-5 sm:grid-cols-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} onClick={close} className="block py-1.5 text-base text-sand hover:text-amber">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="menu-item mt-8" style={{ "--i": 6 } as React.CSSProperties}>
              <Link href="/get-a-quote" onClick={close} className="btn btn-amber w-full">
                Get a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
      </header>
    </>
  );
}
