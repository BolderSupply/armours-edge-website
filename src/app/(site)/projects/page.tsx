import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getAllProjects } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Finished landscape and hardscape projects by Armours Edge: what each client wanted and how we built it.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage(props: PageProps<"/projects">) {
  const [projects, searchParams] = await Promise.all([getAllProjects(), props.searchParams]);
  const service = typeof searchParams.service === "string" ? searchParams.service : "all";

  return (
    <>
      <PageHero
        title="Projects"
        intro="A closer look at finished work: what each client wanted, and how we built it."
      />
      <section className="container-page py-16 sm:py-24">
        <ProjectGrid projects={projects} initialService={service} />
      </section>
    </>
  );
}
