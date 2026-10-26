import type { SiteSettings } from "@/sanity/queries";

export const site = {
  name: "Armours Edge Landscape Construction Inc.",
  shortName: "Armours Edge",
  tagline: "Where nature meets innovation",
  description:
    "Armours Edge Landscape Construction builds interlock patios and driveways, retaining walls, steps, water features, fire pits, lighting, irrigation, decks and fences, with excavation and grading, across the Waterloo Region.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.armoursedge.ca").replace(/\/$/, ""),
  email: "info@armoursedge.ca",
  phone: "(226) 339-5212",
  serviceArea: "the Waterloo Region",
  // Cities and townships of the Region of Waterloo.
  serviceTowns: ["Kitchener", "Waterloo", "Cambridge", "Woolwich", "Elmira", "Wellesley", "Wilmot", "North Dumfries"],
  instagram: "https://instagram.com/armours_edge",
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/get-a-quote", label: "Contact" },
];

/** Contact details: Sanity "Site settings" win, with sensible defaults. */
export function resolveContact(settings?: SiteSettings | null) {
  const phone = settings?.phone?.trim() || site.phone;
  return {
    phone,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "",
    email: settings?.email?.trim() || site.email,
    address: settings?.address?.trim() || "",
    serviceArea: settings?.serviceArea?.trim() || site.serviceArea,
    instagram: settings?.instagram || site.instagram,
    facebook: settings?.facebook || "",
  };
}

export type Contact = ReturnType<typeof resolveContact>;
