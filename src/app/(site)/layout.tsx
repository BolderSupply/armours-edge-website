import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { resolveContact, site } from "@/lib/site";
import { getSiteSettings } from "@/sanity/queries";

export const revalidate = 60;

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const contact = resolveContact(await getSiteSettings());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: site.name,
    url: site.url,
    email: contact.email,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    areaServed: { "@type": "AdministrativeArea", name: "Region of Waterloo, Ontario" },
    sameAs: [contact.instagram, contact.facebook].filter(Boolean),
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-evergreen focus:px-4 focus:py-3 focus:font-display focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>
      <Header contact={contact} />
      <main id="main">{children}</main>
      <Footer contact={contact} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
