import Image from "next/image";
import Link from "next/link";
import { PaverPattern } from "@/components/PaverPattern";
import { Reveal } from "@/components/Reveal";
import { getServiceBySlug } from "@/lib/services";
import { imageUrl } from "@/sanity/image";
import type { ProjectCard } from "@/sanity/queries";

const mutedTones = ["#cfd9cb", "#c3cfbf", "#d8e0d3", "#bac7b6", "#dbe3d6"];

function Tile({ project, big, priority }: { project: ProjectCard; big?: boolean; priority?: boolean }) {
  const service = getServiceBySlug(project.serviceType);
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block h-full min-h-[19rem] overflow-hidden bg-sage ${big ? "lg:min-h-[38rem]" : ""}`}
    >
      {project.coverImage?.asset ? (
        <Image
          src={imageUrl(project.coverImage, big ? 1600 : 1000, big ? 1200 : 750)}
          alt={project.coverImage.alt || project.title}
          fill
          priority={priority}
          sizes={big ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <PaverPattern className="absolute inset-0 h-full w-full opacity-70" tones={mutedTones} joint="#aebca9" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/90 via-evergreen-deep/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-paper sm:p-7">
        {service && (
          <span className="mb-3 inline-block bg-amber px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink">
            {service.title}
          </span>
        )}
        <h3 className={`leading-tight text-paper ${big ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
          {project.title}
        </h3>
        <p className="mt-2 flex items-center gap-3 font-display text-sm font-semibold text-sand">
          {project.town}
          <span className="inline-flex items-center gap-2 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100">
            View project
            <svg viewBox="0 0 16 10" className="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
              <path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </p>
      </div>
    </Link>
  );
}

/** Photo-led strip of finished projects for the home page. */
export function RecentProjects({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) return null;
  const [first, ...rest] = projects;
  const layout =
    projects.length === 1 ? "" : projects.length === 2 ? "md:grid-cols-2" : "lg:grid-cols-[1.5fr_1fr] lg:grid-rows-2";

  return (
    <section className="container-page py-16 sm:py-24" aria-labelledby="recent-work">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="recent-work" className="text-4xl sm:text-5xl lg:text-6xl">Recent work</h2>
          <p className="mt-3 max-w-xl text-lg text-granite">
            Finished projects from across the Waterloo Region. Open one to see how it was built, step by step.
          </p>
        </div>
        <Link href="/projects" className="btn btn-line">
          View all projects
        </Link>
      </Reveal>
      <div className={`mt-10 grid gap-4 sm:gap-5 ${layout}`}>
        <Reveal variant="scale" className={projects.length > 2 ? "lg:row-span-2" : ""}>
          <Tile project={first} big={projects.length > 2} priority />
        </Reveal>
        {rest.map((project, i) => (
          <Reveal key={project._id} variant="scale" delay={(i + 1) * 120}>
            <Tile project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
