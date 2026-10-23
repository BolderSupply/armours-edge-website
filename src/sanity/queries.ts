import type { PortableTextBlock } from "next-sanity";
import { client } from "./client";

export type SanityImage = {
  asset?: { _ref: string; _type: "reference" };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
  caption?: string;
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  serviceType: string;
  town: string;
  summary: string;
  completedOn?: string;
  coverImage?: SanityImage;
};

export type ProjectDetail = ProjectCard & {
  brief?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  materials?: string[];
  clientQuote?: string;
  gallery?: SanityImage[];
};

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  serviceType,
  town,
  summary,
  completedOn,
  coverImage
`;

const REVALIDATE_SECONDS = 60;

/**
 * Wrapper so a temporary Sanity outage (or a missing network during a build)
 * never takes the whole website down. It logs and falls back instead.
 */
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallback:", error instanceof Error ? error.message : error);
    return fallback;
  }
}

export function getAllProjects() {
  return safeFetch<ProjectCard[]>(
    `*[_type == "project" && defined(slug.current)] | order(completedOn desc, _createdAt desc) {${cardFields}}`,
    {},
    [],
  );
}

export function getFeaturedProjects() {
  return safeFetch<ProjectCard[]>(
    `*[_type == "project" && featured == true && defined(slug.current)] | order(completedOn desc, _createdAt desc)[0...3] {${cardFields}}`,
    {},
    [],
  );
}

export function getProjectSlugs() {
  return safeFetch<{ slug: string }[]>(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
    {},
    [],
  );
}

export function getProjectBySlug(slug: string) {
  return safeFetch<ProjectDetail | null>(
    `*[_type == "project" && slug.current == $slug][0]{
      ${cardFields},
      brief,
      solution,
      materials,
      clientQuote,
      gallery
    }`,
    { slug },
    null,
  );
}

export function getRelatedProjects(serviceType: string, excludeId: string) {
  return safeFetch<ProjectCard[]>(
    `*[_type == "project" && serviceType == $serviceType && _id != $excludeId && defined(slug.current)] | order(completedOn desc)[0...3] {${cardFields}}`,
    { serviceType, excludeId },
    [],
  );
}

export type SiteSettings = {
  heroImage?: SanityImage;
  bannerImage?: SanityImage;
  phone?: string;
  email?: string;
  address?: string;
  serviceArea?: string;
  instagram?: string;
  facebook?: string;
};

export function getSiteSettings() {
  return safeFetch<SiteSettings | null>(`*[_type == "siteSettings"][0]`, {}, null);
}
