"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { services } from "@/lib/services";
import type { ProjectCard as ProjectCardData } from "@/sanity/queries";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function ProjectGrid({
  projects,
  initialService = "all",
}: {
  projects: ProjectCardData[];
  initialService?: string;
}) {
  const used = useMemo(() => new Set(projects.map((p) => p.serviceType)), [projects]);
  const filters = services.filter((s) => used.has(s.slug));
  const [active, setActive] = useState(used.has(initialService) ? initialService : "all");

  const visible = active === "all" ? projects : projects.filter((p) => p.serviceType === active);

  if (projects.length === 0) {
    return (
      <div className="bg-mist p-8 sm:p-14">
        <h2 className="text-3xl sm:text-4xl">Projects are on the way</h2>
        <p className="mt-4 max-w-xl text-lg text-granite">
          We are adding our finished work to this page. In the meantime, tell us about your project and we will set up
          a free consultation.
        </p>
        <Link href="/get-a-quote" className="btn btn-solid mt-8">
          Get a quote
        </Link>
      </div>
    );
  }

  return (
    <div>
      {filters.length > 1 && (
        <div role="group" aria-label="Filter projects by service" className="mb-12 flex flex-wrap gap-2">
          {[{ slug: "all", title: "All projects" }, ...filters].map((f) => (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active === f.slug}
              onClick={() => setActive(f.slug)}
              className="border-2 border-evergreen px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-evergreen transition-colors hover:bg-evergreen/10 aria-pressed:border-amber aria-pressed:bg-amber aria-pressed:text-ink"
            >
              {f.title}
            </button>
          ))}
        </div>
      )}
      <div key={active} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project._id} delay={(i % 3) * 100}>
            <ProjectCard project={project} priority={i < 3} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
