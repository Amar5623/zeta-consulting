import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  /** Route path, e.g. "/services/ai-agents". Resolved against metadataBase, so it is always the apex. */
  path: string;
  noindex?: boolean;
  /** Use the title verbatim instead of appending " | Zeta Consulting" (home page). */
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime: string; authors?: string[] };
  /** Set on routes with their own opengraph-image file; everything else uses the site-wide card. */
  ownImage?: boolean;
};

/**
 * Every route builds its metadata here (spec §3.1). Canonical and og:url are always set per route —
 * never in the root layout — so no page can inherit the homepage as its canonical.
 */
export function pageMetadata({ title, description, path, noindex, absoluteTitle, article, ownImage }: PageMeta): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const image = ownImage ? `${path}/opengraph-image` : "/opengraph-image";
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      siteName: site.name,
      locale: site.locale,
      title: ogTitle,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
      ...(article ?? {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
