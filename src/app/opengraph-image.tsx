import { site } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name}: AI agents, software engineering and digital transformation`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "AI agents · Software · Transformation", title: "Build smarter systems. Connect what you already use." });
}
