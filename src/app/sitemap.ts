import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { getAllProjects } from "@/sanity/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const paths = ["", "/projects", "/services", "/about", "/get-a-quote", ...services.map((s) => `/services/${s.slug}`)];
  const pages = paths.map((path) => ({ url: `${site.url}${path}` }));
  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    ...(p.completedOn ? { lastModified: p.completedOn } : {}),
  }));
  return [...pages, ...projectPages];
}
