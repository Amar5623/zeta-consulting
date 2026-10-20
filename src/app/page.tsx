import { caseStudies } from "@/content/work";
import { faqs } from "@/content/company";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { PageTransition } from "@/components/layout/page-transition";
import { Hero } from "@/components/sections/hero";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Statement } from "@/components/sections/statement";
import { ServicesList } from "@/components/sections/services-list";
import { WorkStack } from "@/components/sections/work-stack";
import { Process } from "@/components/sections/process";
import { Values } from "@/components/sections/values";
import { Testimonials } from "@/components/sections/testimonials";
import { TeamCta } from "@/components/sections/team-cta";
import { Engagements } from "@/components/sections/engagements";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { Faq } from "@/components/sections/faq";

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
            title={["Everything you need to", <span key="2" className="accent-serif">build, launch and grow.</span>]}
            description="Eight service lines, one accountable team. Start with one, or let us run the whole journey."
            action={
              <Button href="/services" variant="secondary" size="md" arrow>
                All services
              </Button>
            }
          />
          <ServicesList />
        </Container>
      </section>

      <section className="pb-12 pt-20 sm:pt-28">
        <Container>
          <SectionHeader
            eyebrow="Selected work"
            title={["Work that", <span key="2" className="accent-serif">speaks for itself.</span>]}
            description="A few recent projects across AI, product and growth. Full case studies on the work page."
            action={
              <Button href="/work" variant="secondary" size="md" arrow>
                See all work
              </Button>
            }
          />
          <WorkStack items={caseStudies.slice(0, 4)} />
        </Container>
      </section>

      <Process />
      <Values />
      <Testimonials />
      <TeamCta />
      <Engagements />
      <InsightsPreview />
      <Faq items={faqs} />
    </PageTransition>
  );
}
