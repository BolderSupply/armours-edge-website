import type { SiteSettings } from "@/sanity/queries";

export const site = {
  name: "Armours Edge Landscape Construction Inc.",
  shortName: "Armours Edge",
  tagline: "Where nature meets innovation",
  description:
    "Armours Edge Landscape Construction builds interlock patios and driveways, retaining walls, steps, water features, fire pits, lighting, irrigation, decks and fences, with excavation and grading.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.armoursedge.ca").replace(/\/$/, ""),
  email: "info@armoursedge.ca",
  instagram: "https://instagram.com/armours_edge",
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/get-a-quote", label: "Contact" },
];

/** Contact details: Sanity "Site settings" win, with sensible defaults. */
export function resolveContact(settings?: SiteSettings | null) {
  const phone = settings?.phone?.trim() || "";
  return {
    phone,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "",
    email: settings?.email?.trim() || site.email,
    address: settings?.address?.trim() || "",
    serviceArea: settings?.serviceArea?.trim() || "",
    instagram: settings?.instagram || site.instagram,
    facebook: settings?.facebook || "",
  };
}

export type Contact = ReturnType<typeof resolveContact>;
