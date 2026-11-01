import type { Metadata } from "next";
import { caseStudies } from "@/content/work";
import { industries } from "@/content/industries";
import { PageTransition } from "@/components/layout/page-transition";
import { Container } from "@/components/ui/primitives";
import { WorkCard } from "@/components/ui/work-card";
import { PageHero } from "@/components/sections/page-hero";
import { WorkGrid } from "@/components/sections/work-grid";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Case studies and solution blueprints across marketplaces, EV, logistics, maritime, real estate, industrial IoT, finance, talent, education, hospitality, healthcare and SaaS.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = caseStudies.map((c) => ({ slug: c.slug, industry: c.industry, card: <WorkCard item={c} /> }));
  const filters = industries.filter((i) => caseStudies.some((c) => c.industry === i.slug)).map((i) => ({ slug: i.slug, label: i.short }));

  return (
    <PageTransition>
      <PageHero
        eyebrow="Work"
        title={["Twelve industries.", <span key="2" className="accent-serif">One way of working.</span>]}
        description="Case studies, discovery-stage engagements and solution blueprints, each labelled for exactly what it is. Every one starts with a real operational problem and ends with how success gets measured."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <WorkGrid entries={entries} filters={filters} />
        </Container>
      </section>
    </PageTransition>
  );
}
