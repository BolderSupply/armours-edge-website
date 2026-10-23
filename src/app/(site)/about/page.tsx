import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { process_steps } from "@/lib/process";

export const metadata: Metadata = {
  title: "About",
  description:
    "Armours Edge Landscape Construction was formed on honesty, exceptional quality and innovation. Meet the team and see how a project works.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "Kyle Somani",
    role: "Owner and operator",
    initials: "KS",
    bio: [
      "Kyle's passion for landscape construction began in 2017. He started as a labourer for Clintar Kitchener in the summers while studying criminal justice at the University of Guelph. When he finished his degree, he realised landscape construction was his true calling.",
      "He has worked at Clintar ever since and was groomed by his mentors into a foreman for landscape construction and a supervisor for winter operations. Kyle has always had an entrepreneurial mindset and believes the recipe for success is a strong company culture, attention to detail and strong relationships with clients.",
      "With more than seven years in the industry, he keeps learning and adapting so that Armours Edge stays a locally trusted landscape construction company. When he is not playing in the dirt, you can find him at the cottage with friends and family or on the golf course.",
    ],
  },
  {
    name: "John Trollope",
    role: "Head foreman and operations manager",
    initials: "JT",
    bio: [
      "John started his career in golf course construction in 2000. In 2005 he moved into residential and commercial landscape construction and started A & T Landscaping.",
      "He has worked on projects of every scope and size, and with 24 years of experience he can help you turn any vision into reality. John spends his spare time on the golf course or with his two kids, Kira and Ashton.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About us"
        intro="Honesty, exceptional quality and innovation. That is what Armours Edge was formed on, and what every project is measured against."
      />

      <section className="container-page grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Comfortable and confident, start to finish.</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xl text-granite">
            At Armours Edge Landscape Construction we want our customers to feel comfortable and confident through the
            whole process of their project. We take honour in our work from the initial design phase, and we stand
            behind every project after completion.
          </p>
          <p className="mt-6 text-lg text-granite">
            Our goal is to build long-term relationships with our clients through the crafting of sustainable
            landscapes.
          </p>
        </Reveal>
      </section>

      <section className="bg-mist py-16 sm:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl">Meet the team</h2>
          </Reveal>
          <div className="mt-14 grid gap-14 md:grid-cols-2">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 120}>
                <article>
                  <div className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-20 w-20 shrink-0 items-center justify-center bg-evergreen font-display text-2xl font-extrabold tracking-wide text-paper"
                    >
                      {person.initials}
                    </span>
                    <div>
                      <h3 className="text-3xl">{person.name}</h3>
                      <p className="mt-1 font-display text-base font-semibold text-moss">{person.role}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 text-lg text-granite">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <Reveal>
          <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl">Our process</h2>
        </Reveal>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {process_steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 140} className="relative border-t-2 border-evergreen pt-8">
                <span className="absolute -top-px left-0 h-1 w-16 bg-amber" aria-hidden="true" />
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
      </section>

      <section className="bg-amber text-ink">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl sm:text-4xl">Start with a free consultation.</h2>
          <Link href="/get-a-quote" className="btn btn-solid shrink-0">
            Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}
