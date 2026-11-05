import { getCaseStudy, type CaseStudy } from "@/content/work";
import { getIndustry } from "@/content/industries";
import { faqs } from "@/content/company";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { PageTransition } from "@/components/layout/page-transition";
import { FaqSection } from "@/components/seo/FaqSection";
import { Hero } from "@/components/sections/hero";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Statement } from "@/components/sections/statement";
import { ServicesList } from "@/components/sections/services-list";
import { WorkStack } from "@/components/sections/work-stack";
import { Process } from "@/components/sections/process";
import { Values } from "@/components/sections/values";
import { TeamCta } from "@/components/sections/team-cta";
import { Engagements } from "@/components/sections/engagements";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { CaseVisual } from "@/components/visuals/case-visual";

export const metadata = pageMetadata({
  title: `${site.name} | AI Agents, Software & Digital Transformation`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const featured = ["fleet-visibility-trailer-security", "machine-vision-industrial-telemetry", "offline-first-vessel-operations", "enterprise-ai-usage-metering"]
  .map((slug) => getCaseStudy(slug))
  .filter((c): c is CaseStudy => c !== undefined);

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <StackMarquee />
      <Statement />

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-14 sm:gap-20">
          <SectionHeader
            eyebrow="What we do"
            title={["Everything you need to", <span key="2" className="accent-serif">build, connect and grow.</span>]}
            description="Ten service lines, one accountable team. Start with one, or let us run the whole journey."
            action={
              <Button href="/services" variant="secondary" size="md" arrow>
                All services
              </Button>
            }
          />
          <ServicesList />
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col gap-14 sm:gap-20">
          <SectionHeader
            eyebrow="Industries"
            title={["Built for how", <span key="2" className="accent-serif">your industry operates.</span>]}
            description="From marketplaces and maritime fleets to factory floors and clinics, we extend the systems you already rely on instead of replacing them by default."
            action={
              <Button href="/industries" variant="secondary" size="md" arrow>
                All industries
              </Button>
            }
          />
          <IndustriesGrid />
        </Container>
      </section>

      <section className="pb-12 pt-4">
        <Container>
          <SectionHeader
            eyebrow="Case studies"
            title={["Real operational problems,", <span key="2" className="accent-serif">engineered solutions.</span>]}
            description="Each one is labelled for exactly what it is: a delivered reference, a discovery-stage engagement or a solution blueprint."
            action={
              <Button href="/work" variant="secondary" size="md" arrow>
                All case studies
              </Button>
            }
          />
          <WorkStack
            items={featured.map((item) => ({
              item,
              industry: getIndustry(item.industry)?.short ?? "",
              visual: <CaseVisual item={item} className="h-full w-full" />,
            }))}
          />
        </Container>
      </section>

      <Process />
      <Values />
      <TeamCta />
      <Engagements />
      <InsightsPreview />
      <FaqSection items={faqs} />
    </PageTransition>
  );
}
