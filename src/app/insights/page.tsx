import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, posts } from "@/content/insights";
import { Media } from "@/components/ui/media";
import { Container } from "@/components/ui/primitives";
import { PostCard } from "@/components/ui/post-card";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical notes on AI agents, product development, SEO and generative engine optimization from the Zeta team.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [featured, ...rest] = posts;
  return (
    <PageTransition>
      <PageHero
        eyebrow="Insights"
        title={["Notes on AI, product", <span key="2" className="accent-serif">and growth.</span>]}
        description="What we're learning from building agents, shipping products and growing visibility in search and AI answers."
      />

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-20">
          {featured && (
            <Reveal>
              <Link href={`/insights/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className="overflow-hidden rounded-xl">
                  <Media src={featured.cover} alt={featured.title} label="Featured article cover" tint={featured.tint} className="aspect-[16/11] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 text-[0.8125rem] text-fg-muted">
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">Featured</span>
                    <span className="text-ink">{featured.category}</span>
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  </div>
                  <h2 className="text-h2">
                    <span className="link-underline">{featured.title}</span>
                  </h2>
                  <p className="max-w-lg text-lead text-fg-muted">{featured.excerpt}</p>
                  <p className="text-[0.875rem] text-fg-muted">
                    {featured.author} · {featured.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}

          <Stagger className="grid gap-x-4 gap-y-14 border-t border-line pt-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </PageTransition>
  );
}
