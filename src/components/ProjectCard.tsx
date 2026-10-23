import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/services";
import { imageUrl } from "@/sanity/image";
import type { ProjectCard as ProjectCardData } from "@/sanity/queries";
import { PaverPattern } from "./PaverPattern";

const mutedTones = ["#cfd9cb", "#c3cfbf", "#d8e0d3", "#bac7b6", "#dbe3d6"];

export function ProjectCard({ project, priority = false }: { project: ProjectCardData; priority?: boolean }) {
  const service = getServiceBySlug(project.serviceType);
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-sage">
          {project.coverImage?.asset ? (
            <Image
              src={imageUrl(project.coverImage, 1200, 900)}
              alt={project.coverImage.alt || project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <PaverPattern
              className="absolute inset-0 h-full w-full opacity-70 transition-transform duration-700 group-hover:scale-105"
              tones={mutedTones}
              joint="#aebca9"
            />
          )}
          {service && (
            <span className="absolute bottom-0 left-0 max-w-[85%] truncate bg-amber px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink">
              {service.title}
            </span>
          )}
        </div>
        <h3 className="mt-5 text-2xl leading-tight transition-colors group-hover:text-evergreen">{project.title}</h3>
        <p className="mt-1.5 font-display text-sm font-semibold text-moss">{project.town}</p>
        <p className="mt-3 text-base text-granite">{project.summary}</p>
      </Link>
    </article>
  );
}
