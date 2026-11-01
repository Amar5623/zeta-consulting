import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { industries } from "@/content/industries";
import { posts } from "@/content/insights";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/industries", "/work", "/about", "/insights", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...pages,
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...industries.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...caseStudies.map((c) => ({ url: absoluteUrl(`/work/${c.slug}`), priority: 0.7 })),
    // Placeholder posts are excluded until they're real.
    ...posts.filter((p) => !p.placeholder).map((p) => ({ url: absoluteUrl(`/insights/${p.slug}`), lastModified: p.date, priority: 0.6 })),
  ];
}
