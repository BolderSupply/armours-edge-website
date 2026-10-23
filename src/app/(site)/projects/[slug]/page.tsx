import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { PaverPattern } from "@/components/PaverPattern";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { getServiceBySlug } from "@/lib/services";
import { imageSize, imageUrl } from "@/sanity/image";
import { getProjectBySlug, getProjectSlugs, getRelatedProjects } from "@/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const image = project.coverImage?.asset ? imageUrl(project.coverImage, 1200, 630) : undefined;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

function formatMonth(date?: string) {
  if (!date) return "";
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const service = getServiceBySlug(project.serviceType);
  const related = await getRelatedProjects(project.serviceType, project._id);
  const completed = formatMonth(project.completedOn);

  return (
    <article>
      <PageHero
        title={project.title}
        intro={project.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
        ]}
      >
        <p className="font-display text-base font-semibold text-sand">
          {project.town}
          {service ? `, ${service.title}` : ""}
          {completed ? `, completed ${completed}` : ""}
        </p>
      </PageHero>

      <div className="container-page relative z-10 -mt-10 sm:-mt-14">
        <Reveal variant="scale">
          <div className="relative aspect-[16/9] overflow-hidden bg-sage shadow-[0_40px_80px_-40px_rgb(14_48_34_/_0.6)]">
            {project.coverImage?.asset ? (
              <Image
                src={imageUrl(project.coverImage, 2000, 1125)}
                alt={project.coverImage.alt || project.title}
                fill
                priority
                sizes="(min-width: 1216px) 1216px, 100vw"
                className="object-cover"
              />
            ) : (
              <PaverPattern
                className="absolute inset-0 h-full w-full opacity-70"
                tones={["#cfd9cb", "#c3cfbf", "#d8e0d3", "#bac7b6", "#dbe3d6"]}
                joint="#aebca9"
              />
            )}
          </div>
        </Reveal>
      </div>

      <div className="container-page grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1fr]">
        {project.brief && project.brief.length > 0 && (
          <section>
            <h2 className="text-3xl sm:text-4xl">The brief</h2>
            <div className="prose-story mt-5">
              <PortableText value={project.brief} />
            </div>
          </section>
        )}
        {project.solution && project.solution.length > 0 && (
          <section>
            <h2 className="text-3xl sm:text-4xl">The solution</h2>
            <div className="prose-story mt-5">
              <PortableText value={project.solution} />
            </div>
          </section>
        )}
        {project.materials && project.materials.length > 0 && (
          <section className="lg:col-span-2">
            <h2 className="text-2xl">Materials</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.materials.map((material) => (
                <li key={material} className="bg-mist px-3 py-1.5 font-display text-sm font-semibold">
                  {material}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {project.clientQuote && (
        <section className="bg-mist">
          <blockquote className="container-page max-w-4xl py-16 sm:py-20">
            <p className="font-display text-2xl font-bold leading-snug text-evergreen sm:text-3xl">
              “{project.clientQuote}”
            </p>
          </blockquote>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="container-page py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl">Photos</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {project.gallery
              .filter((image) => image.asset)
              .map((image, i) => {
                const { width, height } = imageSize(image);
                return (
                  <figure key={image.asset?._ref ?? i}>
                    <Image
                      src={imageUrl(image, 1400)}
                      alt={image.alt || `${project.title}, photo ${i + 1}`}
                      width={width}
                      height={height}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                    {image.caption && <figcaption className="mt-2 text-base text-granite">{image.caption}</figcaption>}
                  </figure>
                );
              })}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-mist py-16 sm:py-24">
          <div className="container-page">
            <h2 className="text-3xl sm:text-4xl">More {service ? service.title.toLowerCase() : "projects"}</h2>
            <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-amber text-ink">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl sm:text-4xl">Want something like this at your place?</h2>
          <Link
            href={`/get-a-quote${project.serviceType ? `?service=${project.serviceType}` : ""}`}
            className="btn btn-solid shrink-0"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </article>
  );
}
