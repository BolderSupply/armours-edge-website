import Link from "next/link";
import { services } from "@/lib/services";
import { nav, site, type Contact } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ contact }: { contact: Contact }) {
  return (
    <footer className="bg-evergreen-deep text-paper">
      <div className="container-page grid gap-14 py-16 sm:py-20 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Armours Edge, home">
            <Logo light className="h-24 w-auto" />
          </Link>
          <p className="mt-6 max-w-sm text-base text-sand">
            {site.tagline}. We design and build patios, driveways, retaining walls and the outdoor spaces around them.
          </p>
          <address className="mt-6 space-y-1.5 text-base not-italic">
            {contact.phone && (
              <p>
                <a href={contact.phoneHref} className="text-link">
                  {contact.phone}
                </a>
              </p>
            )}
            <p>
              <a href={`mailto:${contact.email}`} className="text-link">
                {contact.email}
              </a>
            </p>
            {contact.address && <p className="text-sand">{contact.address}</p>}
            {contact.serviceArea && <p className="text-sand">Serving {contact.serviceArea}</p>}
          </address>
          <p className="mt-6 flex gap-6 text-base">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-link">
              Instagram
            </a>
            {contact.facebook && (
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-link">
                Facebook
              </a>
            )}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-amber">Explore</p>
          <ul className="mt-5 space-y-2.5 text-base">
            {[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-amber">What we build</p>
          <ul className="mt-5 space-y-2.5 text-base">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-link text-sand hover:text-paper">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-6 text-sm text-sand">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
