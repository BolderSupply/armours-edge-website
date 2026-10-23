import Image from "next/image";
import Link from "next/link";
import { GardenLineArt } from "@/components/GardenLineArt";
import { PaverPattern } from "@/components/PaverPattern";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { process_steps } from "@/lib/process";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { imageUrl } from "@/sanity/image";
import { getFeaturedProjects, getSiteSettings } from "@/sanity/queries";

export const revalidate = 60;

const darkTones = ["#1f4a37", "#245240", "#1b4231", "#2a5b46", "#1e4636"];

const values = [
  {
    title: "Honesty",
    body: "We tell you what your project needs and what it will take, from the first visit to the last stone.",
  },
  {
    title: "Exceptional quality",
    body: "Detail-focused construction, and we stand behind every project after it is complete.",
  },
  {
    title: "Innovation",
    body: "2D and 3D designs on request, and sustainable landscapes built to last.",
  },
];

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedProjects(), getSiteSettings()]);
  const hero = settings?.heroImage?.asset ? settings.heroImage : null;
  const banner = settings?.bannerImage?.asset ? settings.bannerImage : null;
  const words = site.tagline.split(" ");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[max(34rem,calc(100svh-7.75rem))] items-end overflow-hidden bg-evergreen-deep text-paper">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {hero ? (
            <Image
              src={imageUrl(hero, 2400, 1400)}
              alt={hero.alt || "A finished Armours Edge landscape"}
              fill
              priority
              sizes="100vw"
              className="kenburns object-cover"
            />
          ) : (
            <div className="drift absolute -left-[240px] -top-[88px] h-[calc(100%+88px)] w-[calc(100%+240px)]">
              <PaverPattern className="h-full w-full" tones={darkTones} joint="#0e3022" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/95 via-evergreen-deep/50 to-evergreen-deep/25" />
        </div>

        <div className="container-page pb-16 pt-28 sm:pb-24">
          <h1 className="max-w-5xl text-[clamp(2.6rem,6.6vw,5.75rem)] uppercase leading-[0.98]">
            {words.map((word, i) => (
              <span key={word + i} className="hero-word mr-[0.22em]">
                <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-lg text-paper/90 sm:text-xl" style={{ "--d": "900ms" } as React.CSSProperties}>
            Interlock patios and driveways, retaining walls, steps, water features and fire pits. We design with you,
            build it properly, and stand behind it.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap gap-4" style={{ "--d": "1100ms" } as React.CSSProperties}>
            <Link href="/get-a-quote" className="btn btn-amber">
              Get a quote
            </Link>
            <Link href="/projects" className="btn btn-ghost-light">
              See our projects
            </Link>
          </div>
          <div className="bar-grow mt-14" aria-hidden="true" />
        </div>
      </section>

      {/* Intro with line art */}
      <section className="container-page grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl">We build the structures your landscape stands on.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-lg text-granite">
              Armours Edge was formed on honesty, exceptional quality and innovation. We work with you from the first
              design conversation to the final stone, so you feel comfortable and confident the whole way, and we stand
              behind every project we complete.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link href="/about" className="btn btn-line mt-10">
              About us
            </Link>
          </Reveal>
        </div>
        <GardenLineArt />
      </section>

      {/* Services */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl">What we build</h2>
            <Link href="/services" className="btn btn-line">
              All services
            </Link>
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Reveal delay={(i % 4) * 90} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="lift group flex h-full flex-col border-t-4 border-evergreen bg-paper p-7 transition-colors hover:border-amber"
                  >
                    <ServiceIcon
                      slug={service.slug}
                      className="h-12 w-12 text-evergreen transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-amber-deep"
                    />
                    <h3 className="mt-6 text-xl leading-tight">{service.title}</h3>
                    <p className="mt-3 flex-1 text-base text-granite">{service.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.1em] text-evergreen">
                      Learn more
                      <svg viewBox="0 0 16 10" className="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                        <path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statement banner */}
      <section className="relative isolate flex min-h-[26rem] items-center justify-center overflow-hidden bg-evergreen-deep py-24 text-center text-paper sm:min-h-[34rem]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="parallax absolute inset-0">
            {banner ? (
              <Image src={imageUrl(banner, 2400, 1400)} alt={banner.alt || ""} fill sizes="100vw" className="object-cover" />
            ) : (
              <PaverPattern className="h-full w-full" tones={darkTones} joint="#0e3022" />
            )}
          </div>
          <div className="absolute inset-0 bg-evergreen-deep/60" />
        </div>
        <Reveal variant="scale" className="container-page">
          <p className="mx-auto max-w-4xl font-display text-[clamp(2.25rem,6.5vw,5rem)] font-extrabold uppercase leading-[1.02] tracking-[0.02em] [font-variation-settings:'wdth'_108]">
            Picture it.
            <br />
            We&apos;ll build it to last.
          </p>
          <Link href="/get-a-quote" className="btn btn-amber mt-12">
            Start your project
          </Link>
        </Reveal>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="container-page py-20 sm:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl">Recent work</h2>
            <Link href="/projects" className="btn btn-line">
              View all projects
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project._id} delay={i * 110}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Process */}
      <section className={`py-20 sm:py-28 ${featured.length > 0 ? "bg-mist" : ""}`}>
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">From first visit to finished project</h2>
          </Reveal>
          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {process_steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 140} className="relative border-t-2 border-evergreen pt-8">
                  <span
                    className="absolute -top-px left-0 h-1 w-16 bg-amber"
                    aria-hidden="true"
                  />
                  <span
                    className="font-display text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-evergreen)]"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-2xl">{step.title}</h3>
                  <p className="mt-3 text-base text-granite">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="bg-evergreen py-20 text-paper sm:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">What we stand for</h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/20 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 120} className="bg-evergreen p-8 sm:p-10">
                <h3 className="text-2xl text-amber">{value.title}</h3>
                <p className="mt-4 text-lg text-paper/90">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-amber text-ink">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-16 sm:py-20 md:flex-row md:items-center">
          <Reveal className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl">Planning a patio, wall or driveway?</h2>
            <p className="mt-4 text-xl">Tell us about your project and we will set up a free consultation.</p>
          </Reveal>
          <Reveal variant="fade" delay={150}>
            <Link href="/get-a-quote" className="btn btn-solid shrink-0">
              Get a quote
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
