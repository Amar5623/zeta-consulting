import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies, statusMeta } from "@/content/work";
import { faqs } from "@/content/company";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines (GEO).
 * Generated from the same content files as the site, so it never drifts.
 */
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    site.positioning,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Industries",
    ...industries.map((i) => `- [${i.name}](${absoluteUrl(`/industries/${i.slug}`)}): ${i.headline}`),
    "",
    "## Case studies",
    ...caseStudies.map((c) => `- [${c.title}](${absoluteUrl(`/work/${c.slug}`)}) (${statusMeta[c.status].label}): ${c.summary}`),
    "",
    "## Company",
    `- [About](${absoluteUrl("/about")})`,
    `- [Insights](${absoluteUrl("/insights")})`,
    `- [Contact](${absoluteUrl("/contact")}): ${site.email}`,
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
