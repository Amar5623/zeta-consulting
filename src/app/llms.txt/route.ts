import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies, statusMeta } from "@/content/work";
import { posts } from "@/content/insights";
import { faqs } from "@/content/company";
import { site } from "@/content/site";

/**
 * /llms.txt — a plain-text index for AI assistants and answer engines (spec §3.5).
 * Generated from the same content files as the site, so it never drifts.
 */
export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    site.positioning,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${u(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Insights",
    ...posts.slice(0, 20).map((p) => `- [${p.title}](${u(`/insights/${p.slug}`)}): ${p.answer}`),
    "",
    "## Industries",
    ...industries.map((i) => `- [${i.name}](${u(`/industries/${i.slug}`)}): ${i.headline}`),
    "",
    "## Case studies",
    ...caseStudies.map((c) => `- [${c.title}](${u(`/work/${c.slug}`)}) (${statusMeta[c.status].label}): ${c.summary}`),
    "",
    "## Company",
    `- [About](${u("/about")}): Remote-first senior team, delivery framework, values and how we create business value`,
    `- [Contact](${u("/contact")}): Start a project. Email ${site.email}, phone ${site.phone}`,
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
