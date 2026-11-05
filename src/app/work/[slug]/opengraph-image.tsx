import { getCaseStudy, statusMeta, caseStudies } from "@/content/work";
import { site } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name} share image`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((x) => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  return ogImage({ eyebrow: item ? `Case study · ${statusMeta[item.status].label}` : "Case study", title: item?.title ?? site.name });
}
