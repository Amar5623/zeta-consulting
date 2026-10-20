import { posts } from "@/content/insights";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { PostCard } from "@/components/ui/post-card";

export function InsightsPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14 sm:gap-20">
        <SectionHeader
          eyebrow="Insights"
          title={["Notes on AI, product", <span key="2" className="accent-serif">and growth.</span>]}
          action={
            <Button href="/insights" variant="secondary" size="md" arrow>
              All articles
            </Button>
          }
        />
        <Stagger className="grid gap-x-4 gap-y-12 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
