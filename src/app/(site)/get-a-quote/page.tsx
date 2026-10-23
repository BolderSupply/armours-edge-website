import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { process_steps } from "@/lib/process";
import { getServiceBySlug } from "@/lib/services";
import { resolveContact } from "@/lib/site";
import { getSiteSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Tell us about your landscape project and we will set up a free consultation.",
  alternates: { canonical: "/get-a-quote" },
};

export default async function QuotePage(props: PageProps<"/get-a-quote">) {
  const [searchParams, settings] = await Promise.all([props.searchParams, getSiteSettings()]);
  const contact = resolveContact(settings);
  const requested = typeof searchParams.service === "string" ? searchParams.service : "";
  const defaultService = getServiceBySlug(requested)?.slug ?? "";

  return (
    <>
      <PageHero
        title="Get a quote"
        intro="Tell us what you have in mind. We will follow up to set up a free consultation."
      />
      <section className="container-page grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <Reveal variant="left">
          <h2 className="text-3xl sm:text-4xl">What happens next</h2>
          <ol className="mt-8 space-y-7">
            {process_steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-5">
                <span
                  className="flex h-10 w-10 items-center justify-center bg-evergreen font-display text-lg font-extrabold text-paper"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="mt-1.5 text-base text-granite">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 border-t-4 border-amber bg-mist p-7">
            <p className="font-display text-lg font-bold">Prefer to reach us directly?</p>
            <p className="mt-3 text-base">
              {contact.phone && (
                <>
                  <a href={contact.phoneHref} className="text-link font-semibold text-evergreen">
                    {contact.phone}
                  </a>
                  <br />
                </>
              )}
              <a href={`mailto:${contact.email}`} className="text-link font-semibold text-evergreen">
                {contact.email}
              </a>
            </p>
            {contact.serviceArea && <p className="mt-3 text-base text-granite">Serving {contact.serviceArea}</p>}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm defaultService={defaultService} />
        </Reveal>
      </section>
    </>
  );
}
