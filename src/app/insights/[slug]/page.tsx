import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/content/insights";
import { site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/utils";
import { Media } from "@/components/ui/media";
import { Container } from "@/components/ui/primitives";
import { PostCard } from "@/components/ui/post-card";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
    robots: post.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default function PostPage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<PageHeroFallback />}>
        <PostContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function PostContent({ params }: Pick<PageProps<"/insights/[slug]">, "params">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <PageHero
        crumbs={[
          { label: "Insights", href: "/insights" },
          { label: post.title, href: `/insights/${post.slug}` },
        ]}
        title={[post.title]}
      >
        <div className="flex flex-wrap items-center gap-3 text-[0.875rem] text-fg-muted">
          <span className="rounded-full bg-white px-3 py-1 text-ink">{post.category}</span>
          <span>{post.author}</span>
          <span className="size-1 rounded-full bg-fg-subtle" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="size-1 rounded-full bg-fg-subtle" />
          <span>{post.readTime}</span>
        </div>
      </PageHero>

      <article className="py-16 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <Media src={post.cover} alt={post.title} label="Article cover (1600×900)" tint={post.tint} className="aspect-[16/9] w-full rounded-xl" priority />
          </Reveal>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 text-[1.0625rem] leading-[1.75] text-ink/85">
            <p className="text-lead text-ink">{post.excerpt}</p>
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="pb-20 sm:pb-28">
          <Container className="flex flex-col gap-10 border-t border-line pt-14">
            <h2 className="text-h3">Keep reading</h2>
            <div className="grid gap-x-4 gap-y-12 md:grid-cols-2">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
