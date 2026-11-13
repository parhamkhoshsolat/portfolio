import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { inProgressProjects } from "@/lib/in-progress-projects";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = [...projects, ...inProgressProjects].map((p) => p.slug);
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    ...slugs.map((slug) => ({
      url: `${siteConfig.url}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
