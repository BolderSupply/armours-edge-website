import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { PaverPattern } from "@/components/PaverPattern";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { LightboxProvider, Photo } from "./Lightbox";
import { ProcessTimeline } from "./ProcessTimeline";
import type { ProjectView } from "./types";

const darkTones = ["#1f4a37", "#245240", "#1b4231", "#2a5b46", "#1e4636"];

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-granite">{intro}</p>}
    </Reveal>
  );
}

export function ProjectShowcase({ project }: { project: ProjectView }) {
  const titleSize =
    project.title.length <= 40
      ? "text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.02]"
      : "text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.08]";

  const sidePhoto =
    project.gallery[0] ?? project.transformations[0]?.after ?? project.stages.at(-1)?.photos[0] ?? undefined;
  const hasStory = Boolean(project.brief?.length || project.solution?.length);
  const hasQuote = Boolean(project.clientQuote);

  return (
    <LightboxProvider>
      {/* Hero: the finished project, full width */}
      <section className="relative isolate flex min-h-[28rem] items-end overflow-hidden bg-evergreen-deep text-paper sm:min-h-[min(46rem,78svh)]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="100vw"
              className="kenburns object-cover"
            />
          ) : (
            <div className="drift absolute left-0 top-0 h-[calc(100%+88px)] w-[calc(100%+240px)]">
              <PaverPattern className="h-full w-full" tones={darkTones} joint="#0e3022" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/95 via-evergreen-deep/45 to-evergreen-deep/10" />
        </div>
        <div className="container-page pb-10 pt-32 sm:pb-14">
          <nav aria-label="Breadcrumb" className="hero-fade mb-5 text-sm text-sand" style={{ "--d": "100ms" } as React.CSSProperties}>
            <ol className="flex flex-wrap items-center gap-2">
              <li className="flex items-center gap-2">
                <Link href="/" className="text-link">Home</Link>
                <span aria-hidden="true">/</span>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/projects" className="text-link">Projects</Link>
                <span aria-hidden="true">/</span>
              </li>
              <li aria-current="page" className="text-paper">{project.title}</li>
            </ol>
          </nav>
          {project.serviceTitle && (
            <p className="hero-fade mb-4 inline-block bg-amber px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink" style={{ "--d": "250ms" } as React.CSSProperties}>
              {project.serviceTitle}
            </p>
          )}
          <h1 className={`max-w-4xl ${titleSize}`}>
            {project.title.split(" ").map((word, i) => (
              <span key={word + i} className="hero-word mr-[0.22em]">
                <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-5 max-w-2xl text-lg text-paper/90 sm:text-xl" style={{ "--d": "700ms" } as React.CSSProperties}>
            {project.summary}
          </p>
        </div>
      </section>

      {/* At a glance */}
      <section aria-label="Project facts" className="border-b border-line bg-paper">
        <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-7 md:grid-flow-col md:auto-cols-fr md:gap-0 md:py-9">
          {project.stats.map((stat, i) => (
            <div key={stat.label} className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-line"}`}>
              <dt className="font-display text-xs font-bold uppercase tracking-[0.14em] text-granite">{stat.label}</dt>
              <dd className="mt-1 font-display text-xl font-extrabold text-evergreen sm:text-2xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The story, with a photo beside the words */}
      {hasStory && (
        <section className="container-page py-16 sm:py-24">
          <div className={`grid items-start gap-10 lg:gap-16 ${sidePhoto ? "lg:grid-cols-[1.05fr_0.95fr]" : "lg:grid-cols-2"}`}>
            <div className="space-y-12">
              {project.brief && project.brief.length > 0 && (
                <Reveal>
                  <h2 className="border-l-4 border-amber pl-5 text-3xl sm:text-4xl">What the client wanted</h2>
                  <div className="prose-lead mt-6">
                    <PortableText value={project.brief} />
                  </div>
                </Reveal>
              )}
              {project.solution && project.solution.length > 0 && (
                <Reveal delay={100}>
                  <h2 className="border-l-4 border-amber pl-5 text-3xl sm:text-4xl">What we built</h2>
                  <div className="prose-lead mt-6">
                    <PortableText value={project.solution} />
                  </div>
                </Reveal>
              )}
              {project.materials.length > 0 && (
                <Reveal delay={150}>
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-granite">Materials</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.materials.map((material) => (
                      <li key={material} className="border-l-4 border-evergreen bg-mist px-3 py-1.5 font-display text-sm font-semibold">
                        {material}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
            {sidePhoto && (
              <Reveal variant="right" className="lg:sticky lg:top-28">
                <div className="aspect-[4/5]">
                  <Photo group={[sidePhoto]} index={0} sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Before and after */}
      {project.transformations.length > 0 && (
        <section className="bg-mist py-16 sm:py-24">
          <div className="container-page">
            <SectionHeading
              title="Before and after"
              intro="Drag the handle across to see how much the space changed."
            />
            <div className="mt-10 space-y-12">
              {project.transformations.map((item, i) => (
                <Reveal key={item.after.src + i} variant="scale">
                  <BeforeAfter item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The build, step by step */}
      {project.stages.length > 0 && (
        <section className="container-page py-16 sm:py-28">
          <SectionHeading
            title="How we built it"
            intro="Every project follows the same careful steps. Here is this one, from the first day on site to the last stone."
          />
          <div className="mt-12 md:mt-16">
            <ProcessTimeline stages={project.stages} />
          </div>
        </section>
      )}

      {/* Client quote */}
      {hasQuote && (
        <section className="relative isolate overflow-hidden bg-evergreen-deep text-paper">
          <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
            <PaverPattern className="h-full w-full" tones={darkTones} joint="#0e3022" />
          </div>
          <blockquote className="container-page max-w-4xl py-16 sm:py-24">
            <Reveal>
              <svg viewBox="0 0 48 36" className="h-10 w-12 text-amber" aria-hidden="true">
                <path fill="currentColor" d="M0 36V20C0 8 6 1 18 0v6c-6 1-9 4-9 9h9v21H0zm27 0V20c0-12 6-19 18-20v6c-6 1-9 4-9 9h9v21H27z" />
              </svg>
              <p className="mt-6 font-display text-2xl font-bold leading-snug sm:text-4xl">{project.clientQuote}</p>
            </Reveal>
          </blockquote>
        </section>
      )}

      {/* More photos: a tight photo wall, opens full screen */}
      {project.gallery.length > 0 && (
        <section className="container-page py-16 sm:py-24">
          <SectionHeading title="More photos" />
          <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3">
            {project.gallery.map((_, i) => (
              <div key={project.gallery[i].src + i} className="mb-3 break-inside-avoid sm:mb-4">
                <Photo
                  group={project.gallery}
                  index={i}
                  naturalHeight
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </LightboxProvider>
  );
}
