import { getIndustry } from "@/content/industries";
import type { CaseStudy } from "@/content/work";
import { Media } from "@/components/ui/media";
import { IndustryVisual } from "./industry-visual";

/** A case study's approved cover image when available, otherwise its industry's designed visual. */
export function CaseVisual({
  item,
  className,
  fit,
  align,
  sizes,
  priority,
}: {
  item: CaseStudy;
  className?: string;
  fit?: "cover" | "contain";
  align?: "center" | "left";
  sizes?: string;
  priority?: boolean;
}) {
  if (item.cover) {
    return <Media src={item.cover} alt={`${item.title} — cover`} className={className} sizes={sizes} priority={priority} />;
  }
  const industry = getIndustry(item.industry);
  if (!industry) return null;
  return <IndustryVisual industry={industry} className={className} fit={fit} align={align} />;
}
