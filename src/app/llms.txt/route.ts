import { services } from "@/content/services";
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
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Company",
    `- [About](${absoluteUrl("/about")})`,
    `- [Work & case studies](${absoluteUrl("/work")})`,
    `- [Insights](${absoluteUrl("/insights")})`,
    `- [Contact](${absoluteUrl("/contact")}): ${site.email}`,
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
