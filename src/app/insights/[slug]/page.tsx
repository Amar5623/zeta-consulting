import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { author, formatDate, getPost, posts, type Block } from "@/content/insights";
import { getService } from "@/content/services";
import { contactHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { articleGraph } from "@/lib/schema";
import { inline, slugify } from "@/lib/rich-text";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { PostCard } from "@/components/ui/post-card";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";
import { coverAccent, Diagram, InsightCover } from "@/components/visuals/insight-art";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    ownImage: true,
    article: { publishedTime: post.datePublished, modifiedTime: post.dateModified, authors: [author.name] },
  });
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
  const toc = post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const services = post.services.map((s) => getService(s)).filter((s) => s !== undefined);
  const accent = coverAccent[post.cover];

  return (
    <>
      <JsonLd
        data={articleGraph({
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: author.name,
          authorDescription: author.credentials,
        })}
      />
      <PageHero
        crumbs={[
          { label: "Insights", href: "/insights" },
          { label: post.title, href: `/insights/${post.slug}` },
        ]}
        title={[post.title]}
      >
        <div className="flex flex-wrap items-center gap-3 text-[0.875rem] text-fg-muted">
          <span className="rounded-full bg-white px-3 py-1 text-ink">{post.category}</span>
          <span>{author.name}</span>
          <span className="size-1 rounded-full bg-fg-subtle" />
          <span>
            Published <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          </span>
          <span className="size-1 rounded-full bg-fg-subtle" />
          <span>
            Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
          </span>
          <span className="size-1 rounded-full bg-fg-subtle" />
          <span>{post.readTime}</span>
        </div>
      </PageHero>

      <article aria-labelledby="page-title" className="py-16 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <InsightCover kind={post.cover} className="aspect-[16/9] w-full rounded-xl" />
          </Reveal>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="flex min-w-0 flex-col gap-10 lg:col-span-8">
              <div className="rounded-xl bg-canvas p-6 sm:p-8">
                <p className="text-label text-fg-subtle">Short answer</p>
                <p className="mt-3 text-lead text-ink">{post.answer}</p>
              </div>

              <div className="prose-zeta max-w-2xl">
                {post.body.map((b, i) => (
                  <BlockView key={i} block={b} accent={accent} />
                ))}
              </div>

              <section aria-labelledby="sources-heading" className="max-w-2xl border-t border-line pt-8">
                <h2 id="sources-heading" className="text-h4">
                  Sources
                </h2>
                <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-[0.9375rem] text-fg-muted">
                  {post.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1.5 text-ink">
                        <span className="link-underline">{s.label}</span>
                        <ExternalLink className="mt-1 size-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="author-heading" className="max-w-2xl rounded-xl border border-line p-6 sm:p-8">
                <p className="text-label text-fg-subtle">About the author</p>
                <h2 id="author-heading" className="mt-2 text-h4">
                  {author.name}
                </h2>
                <p className="mt-2 text-[0.9375rem] text-fg-muted">{author.credentials}</p>
              </section>
            </div>

            <aside className="lg:col-span-4">
              <div className="flex flex-col gap-6 lg:sticky lg:top-28">
                <nav aria-label="On this page" className="rounded-xl border border-line p-6">
                  <p className="text-label text-fg-subtle">On this page</p>
                  <ol className="mt-4 flex flex-col gap-2.5 text-[0.9375rem]">
                    {toc.map((h) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`} className="text-fg-muted transition-colors hover:text-ink">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                <div className="rounded-xl bg-night p-6 text-white">
                  <p className="text-label text-night-muted">Related services</p>
                  <ul className="mt-4 flex flex-col gap-2.5 text-[0.9375rem]">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="text-white/80 transition-colors hover:text-white">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button href={contactHref} variant="light" size="md" arrow className="mt-6 w-full justify-between">
                    Discuss your use case
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>

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
    </>
  );
}

function BlockView({ block, accent }: { block: Block; accent: string }) {
  switch (block.type) {
    case "p":
      return <p>{inline(block.text)}</p>;
    case "h2":
      return (
        <h2 id={slugify(block.text)} className="scroll-mt-28">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3>{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={cn("flex flex-col gap-2 pl-5", block.ordered ? "list-decimal" : "list-disc")}>
          {block.items.map((item) => (
            <li key={item}>{inline(item)}</li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="-mx-4 overflow-x-auto px-4 sm:-mx-1 sm:px-1">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
            <caption className="mb-3 text-left text-[0.8125rem] text-fg-muted">{block.caption}</caption>
            <thead className="bg-canvas">
              <tr>
                {block.columns.map((c, i) => (
                  <th key={i} scope="col" className="border-b border-line px-4 py-3 font-medium text-ink">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 align-top font-medium text-ink">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 align-top text-fg-muted">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "diagram":
      return (
        <figure className="!mt-8 overflow-hidden rounded-xl bg-night p-4 sm:p-6">
          <Diagram kind={block.kind} alt={block.alt} accent={accent} />
          <figcaption className="mt-4 text-[0.8125rem] text-night-muted">{block.caption}</figcaption>
        </figure>
      );
    case "callout":
      return (
        <aside className="rounded-lg border-l-2 border-accent bg-canvas p-5">
          <p className="font-medium text-ink">{block.title}</p>
          <p className="mt-1 text-fg-muted">{inline(block.text)}</p>
        </aside>
      );
  }
}
