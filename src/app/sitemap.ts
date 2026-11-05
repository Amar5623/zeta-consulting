import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { industries } from "@/content/industries";
import { posts } from "@/content/insights";
import { contentUpdated } from "@/content/dates";
import { site } from "@/content/site";

const abs = (p: string) => new URL(p, site.url).toString();

/** Only canonical, indexable URLs. lastModified comes from real content dates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    { path: "/", updatedAt: contentUpdated.home },
    { path: "/services", updatedAt: contentUpdated.services },
    { path: "/industries", updatedAt: contentUpdated.industries },
    { path: "/work", updatedAt: contentUpdated.work },
    { path: "/about", updatedAt: contentUpdated.about },
    { path: "/insights", updatedAt: posts[0]?.dateModified ?? contentUpdated.insights },
    { path: "/contact", updatedAt: contentUpdated.contact },
    { path: "/legal/privacy", updatedAt: contentUpdated.legal },
    { path: "/legal/terms", updatedAt: contentUpdated.legal },
  ];

  return [
    ...core.map((p) => ({ url: abs(p.path), lastModified: new Date(p.updatedAt) })),
    ...services.map((s) => ({ url: abs(`/services/${s.slug}`), lastModified: new Date(contentUpdated.services) })),
    ...industries.map((i) => ({ url: abs(`/industries/${i.slug}`), lastModified: new Date(contentUpdated.industries) })),
    ...caseStudies.map((c) => ({ url: abs(`/work/${c.slug}`), lastModified: new Date(contentUpdated.work) })),
    ...posts.map((p) => ({ url: abs(`/insights/${p.slug}`), lastModified: new Date(p.dateModified) })),
  ];
}
