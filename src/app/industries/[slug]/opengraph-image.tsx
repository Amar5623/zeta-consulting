import { getIndustry, industries } from "@/content/industries";
import { site } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name} share image`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return industries.map((x) => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getIndustry(slug);
  return ogImage({ eyebrow: "Industry solutions", title: item?.headline ?? site.name });
}
