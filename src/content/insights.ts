/**
 * Insights / blog — PLACEHOLDERS.
 * Posts with `placeholder: true` are rendered but marked `noindex` so search engines skip them.
 */
export type Post = {
  slug: string;
  placeholder: boolean;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  readTime: string;
  author: string;
  tint: string;
  cover?: string;
  body: string[]; // paragraphs — swap for MDX or a CMS later
};

const placeholderBody = [
  "Placeholder article body. Replace this with the full article, or connect a CMS (Sanity, Contentful) or MDX files and render them here.",
  "Strong posts for an agency answer one specific question your buyers ask, show your thinking with real examples, and end with a clear next step.",
  "Structure each article with descriptive headings, short paragraphs and a summary near the top. That helps readers, search engines and AI answer engines alike.",
];

export const posts: Post[] = [
  {
    slug: "geo-guide",
    placeholder: true,
    title: "A practical guide to GEO: getting cited in AI answers",
    excerpt: "Placeholder excerpt. One or two sentences that make someone want to read the article.",
    category: "GEO & AEO",
    date: "2026-10-01",
    readTime: "6 min read",
    author: "Founder Name",
    tint: "#E1E8F0",
    body: placeholderBody,
  },
  {
    slug: "when-to-build-an-ai-agent",
    placeholder: true,
    title: "When to build an AI agent, and when not to",
    excerpt: "Placeholder excerpt. One or two sentences that make someone want to read the article.",
    category: "AI & Automation",
    date: "2026-09-15",
    readTime: "8 min read",
    author: "Founder Name",
    tint: "#E7E5F3",
    body: placeholderBody,
  },
  {
    slug: "mvp-in-six-weeks",
    placeholder: true,
    title: "Shipping an MVP in six weeks without cutting corners",
    excerpt: "Placeholder excerpt. One or two sentences that make someone want to read the article.",
    category: "Product",
    date: "2026-08-28",
    readTime: "5 min read",
    author: "Founder Name",
    tint: "#F2E6DD",
    body: placeholderBody,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
