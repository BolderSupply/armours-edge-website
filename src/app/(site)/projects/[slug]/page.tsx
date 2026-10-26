import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectShowcase } from "@/components/project/ProjectShowcase";
import { ProjectCard } from "@/components/ProjectCard";
import { getServiceBySlug } from "@/lib/services";
import { toProjectView } from "@/lib/projectView";
import { imageUrl } from "@/sanity/image";
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

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const service = getServiceBySlug(project.serviceType);
  const related = await getRelatedProjects(project.serviceType, project._id);
  const view = toProjectView(project);

  return (
    <article>
      <ProjectShowcase project={view} />

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
