import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { WorkGrid } from "@/components/sections/work-grid";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description: "Selected projects across AI agents, web platforms, mobile apps, digital transformation, SEO and GEO.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Work"
        title={["Selected work,", <span key="2" className="accent-serif">real outcomes.</span>]}
        description="A look at what we've designed, built and grown with our clients. Each case study covers the challenge, our approach and the measurable result."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <WorkGrid />
        </Container>
      </section>
      <Testimonials />
      <div className="h-20 sm:h-28" />
    </PageTransition>
  );
}
