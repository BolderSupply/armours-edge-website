import Image from "next/image";
import Link from "next/link";
import { PaverPattern } from "@/components/PaverPattern";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Reveal } from "@/components/Reveal";
import { imageUrl } from "@/sanity/image";
import type { ProjectCard } from "@/sanity/queries";

const mutedTones = ["#cfd9cb", "#c3cfbf", "#d8e0d3", "#bac7b6", "#dbe3d6"];

function Tile({ project, priority }: { project: ProjectCard; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-evergreen-deep shadow-[0_30px_50px_-28px_rgb(0,0,0,0.7)] ring-1 ring-paper/10 transition-transform duration-500 hover:-translate-y-2"
    >
      {project.coverImage?.asset ? (
        <Image
          src={imageUrl(project.coverImage, 900, 1125)}
          alt={project.coverImage.alt || project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 85vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <PaverPattern className="absolute inset-0 h-full w-full opacity-70" tones={mutedTones} joint="#aebca9" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/90 via-evergreen-deep/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-paper sm:p-7">
        <h3 className="line-clamp-3 text-lg leading-snug text-paper sm:text-xl">
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

const sectionTones = ["#1f5a3b", "#215f3f", "#1b5237", "#246543", "#1e583a"];

/** Swipeable strip of finished projects for the home page. */
export function RecentProjects({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-evergreen py-20 text-paper sm:py-28"
      aria-labelledby="recent-work"
    >
      {/* stone texture, fading out towards the bottom */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <PaverPattern className="h-full w-full" tones={sectionTones} joint="#17482f" />
        <div className="absolute inset-0 bg-gradient-to-b from-evergreen/20 via-evergreen/70 to-evergreen-deep" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-amber" />
      </div>
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="recent-work" className="text-4xl text-paper sm:text-5xl lg:text-6xl">Recent work</h2>
            <div className="mt-5 h-1 w-20 bg-amber" aria-hidden="true" />
            <p className="mt-5 max-w-xl text-lg text-sand">
              Finished projects, one swipe at a time. Open one to see how it was built, step by step.
            </p>
          </div>
          <Link href="/projects" className="btn btn-ghost-light">
            View all projects
          </Link>
        </Reveal>
        <Reveal className="mt-12">
          <ProjectCarousel label="Recent projects" dark>
            {projects.map((project, i) => (
              <li
                key={project._id}
                className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2.2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <Tile project={project} priority={i === 0} />
              </li>
            ))}
          </ProjectCarousel>
        </Reveal>
      </div>
    </section>
  );
}
