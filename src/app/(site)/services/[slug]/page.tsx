import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getServiceBySlug, services } from "@/lib/services";
import { getAllProjects } from "@/sanity/queries";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const projects = (await getAllProjects()).filter((p) => p.serviceType === service.slug).slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        title={service.title}
        intro={service.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
      >
        <Link href={`/get-a-quote?service=${service.slug}`} className="btn btn-amber">
          Get a quote
        </Link>
      </PageHero>

      <section className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-[auto_1fr] lg:gap-20">
        <Reveal variant="scale">
          <div className="flex h-32 w-32 items-center justify-center bg-sage text-evergreen">
            <ServiceIcon slug={service.slug} className="h-16 w-16" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-3xl sm:text-4xl">About this service</h2>
          <p className="mt-6 max-w-2xl text-xl text-granite">{service.description}</p>
          <p className="mt-6 max-w-2xl text-lg text-granite">
            Every project starts with a free consultation. We meet you on site, take the measurements the project
            needs, and put together a quote that fits your budget. 2D and 3D designs are available on request.
          </p>
        </Reveal>
      </section>

      {projects.length > 0 && (
        <section className="bg-mist py-16 sm:py-24">
          <div className="container-page">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl">Our work</h2>
              <Link href={`/projects?service=${service.slug}`} className="btn btn-line">
                More projects
              </Link>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project._id} delay={i * 110}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16 sm:py-24">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Other services</h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {others.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 2) * 80}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 border-t border-line py-5 font-display text-lg font-bold transition-colors hover:text-evergreen"
                >
                  <span className="flex items-center gap-4">
                    <ServiceIcon slug={s.slug} className="h-8 w-8 text-evergreen" />
                    {s.title}
                  </span>
                  <svg viewBox="0 0 16 10" className="h-2.5 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                    <path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-amber text-ink">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl sm:text-4xl">Ready to talk about your project?</h2>
          <Link href={`/get-a-quote?service=${service.slug}`} className="btn btn-solid shrink-0">
            Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}
