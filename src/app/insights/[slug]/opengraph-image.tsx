import { getPost, posts } from "@/content/insights";
import { site } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name} share image`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((x) => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPost(slug);
  return ogImage({ eyebrow: "Insights", title: item?.title ?? site.name });
}
