import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PaverPattern } from "@/components/PaverPattern";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interlock patios, pool decks and driveways, retaining walls, steps, water features, fire pits, lighting, irrigation, excavation, decks and fences.",
  alternates: { canonical: "/services" },
};

const mutedTones = ["#cfd9cb", "#c3cfbf", "#d8e0d3", "#bac7b6", "#dbe3d6"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        intro="From the first excavation to the finished surface, we build the structures that make a landscape work."
      />

      <section className="py-10 sm:py-16">
        <ul className="container-page">
          {services.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={service.slug} id={service.slug} className="scroll-mt-32 py-10 sm:py-14">
                <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <Reveal variant={flip ? "right" : "left"}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative block aspect-[4/3] overflow-hidden bg-sage"
                      aria-label={service.title}
                    >
                      <PaverPattern
                        className="absolute inset-0 h-full w-full opacity-60 transition-transform duration-700 group-hover:scale-105"
                        tones={mutedTones}
                        joint="#aebca9"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-28 w-28 items-center justify-center bg-paper text-evergreen shadow-[0_20px_40px_-20px_rgb(14_48_34_/_0.6)] transition-transform duration-500 group-hover:-translate-y-2">
                          <ServiceIcon slug={service.slug} className="h-14 w-14" />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                  <Reveal delay={120}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl">{service.title}</h2>
                    <p className="mt-6 max-w-xl text-lg text-granite">{service.description}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link href={`/services/${service.slug}`} className="btn btn-line">
                        Learn more
                      </Link>
                      <Link href={`/get-a-quote?service=${service.slug}`} className="btn btn-solid">
                        Get a quote
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
