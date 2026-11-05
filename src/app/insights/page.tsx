import Link from "next/link";
import { formatDate, posts } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/primitives";
import { PostCard } from "@/components/ui/post-card";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { InsightCover } from "@/components/visuals/insight-art";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Insights: AI Agents, RAG and Automation Explained",
  description: "Answer-first explainers on AI agents, RPA, retrieval-augmented generation and fine-tuning, written by Zeta's engineers and backed by primary sources.",
  path: "/insights",
});

export default function InsightsPage() {
  const [featured, ...rest] = posts;
  return (
    <PageTransition>
      <JsonLd data={breadcrumbGraph([{ name: "Insights", path: "/insights" }])} />
      <PageHero
        eyebrow="Insights"
        title={["Straight answers on", <span key="2" className="accent-serif">AI in production.</span>]}
        description="Practical, sourced explainers on the questions we hear most from teams planning AI agents, automation and knowledge assistants."
      />

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-20">
          <Reveal>
            <Link href={`/insights/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="overflow-hidden rounded-xl">
                <InsightCover kind={featured.cover} className="aspect-[16/11] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 text-[0.8125rem] text-fg-muted">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">Featured</span>
                  <span className="text-ink">{featured.category}</span>
                  <time dateTime={featured.datePublished}>{formatDate(featured.datePublished)}</time>
                </div>
                <h2 className="text-h2">
                  <span className="link-underline">{featured.title}</span>
                </h2>
                <p className="max-w-lg text-lead text-fg-muted">{featured.excerpt}</p>
                <p className="text-[0.875rem] text-fg-muted">{featured.readTime}</p>
              </div>
            </Link>
          </Reveal>

          <Stagger className="grid gap-x-4 gap-y-14 border-t border-line pt-14 md:grid-cols-2">
            {rest.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} as="h2" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </PageTransition>
  );
}
