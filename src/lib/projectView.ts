import { getServiceBySlug } from "@/lib/services";
import { imageSize, imageUrl } from "@/sanity/image";
import type { ProjectDetail, SanityImage } from "@/sanity/queries";
import type { Img, ProjectView } from "@/components/project/types";

function formatMonth(date?: string) {
  if (!date) return undefined;
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}

/** Resolve a Sanity image into display + full-size URLs. `crop` makes a fixed-ratio display version. */
function toImg(image: SanityImage | undefined, fallbackAlt: string, crop?: [number, number]): Img | undefined {
  if (!image?.asset) return undefined;
  const { width, height } = imageSize(image);
  return {
    src: crop ? imageUrl(image, crop[0], crop[1]) : imageUrl(image, Math.min(width, 1600)),
    full: imageUrl(image, Math.min(width, 2400)),
    width,
    height,
    alt: image.alt || fallbackAlt,
    caption: image.caption,
  };
}

function compact<T>(items: (T | undefined)[]): T[] {
  return items.filter((item): item is T => Boolean(item));
}

export function toProjectView(project: ProjectDetail): ProjectView {
  const service = getServiceBySlug(project.serviceType);
  const completed = formatMonth(project.completedOn);

  const stages = (project.stages ?? [])
    .map((stage) => {
      const count = stage.photos?.length ?? 0;
      const photos = compact(
        (stage.photos ?? []).map((photo, i) => {
          const wide = count === 1 || (count === 3 && i === 0);
          return toImg(photo, `${project.title}: ${stage.title}`, wide ? [1600, 900] : [1000, 750]);
        }),
      );
      return { title: stage.title, description: stage.description, photos };
    })
    .filter((stage) => stage.title);

  const transformations = compact(
    (project.transformations ?? []).map((item) => {
      // Same crop for both photos so the slider lines up.
      const before = toImg(item.before, `Before: ${project.title}`, [1600, 1000]);
      const after = toImg(item.after, `After: ${project.title}`, [1600, 1000]);
      return before && after ? { label: item.label, before, after } : undefined;
    }),
  );

  const highlights = (project.highlights ?? []).filter((h) => h.label && h.value);
  const stats = [
    { label: "Location", value: project.town },
    ...(completed ? [{ label: "Completed", value: completed }] : []),
    ...highlights.map(({ label, value }) => ({ label, value })),
  ];

  return {
    title: project.title,
    summary: project.summary,
    town: project.town,
    serviceTitle: service?.title,
    completed,
    cover: toImg(project.coverImage, project.title, [2400, 1350]),
    highlights: highlights.map(({ label, value }) => ({ label, value })),
    stats,
    brief: project.brief,
    solution: project.solution,
    materials: project.materials ?? [],
    clientQuote: project.clientQuote,
    transformations,
    stages,
    gallery: compact((project.gallery ?? []).map((image, i) => toImg(image, `${project.title}, photo ${i + 1}`))),
  };
}
