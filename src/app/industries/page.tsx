import type { Metadata } from "next";
import { industries } from "@/content/industries";
import { bookingHref } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { IndustryCard } from "@/components/ui/industry-card";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { DeliveryFramework } from "@/components/sections/delivery-framework";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industry solutions for marketplaces, EV and mobility, logistics, maritime, real estate, robotics and industrial IoT, finance, talent and compliance, education, hospitality, healthcare and SaaS.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Industries"
        title={["Solutions shaped by", <span key="2" className="accent-serif">how your industry works.</span>]}
        description="We bring business strategy, software engineering, system integration and intelligent automation together to solve operational challenges. Rather than replacing established systems by default, we extend what already works and add intelligence where it delivers measurable value."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={bookingHref()} arrow>
            Talk to an industry lead
          </Button>
          <Button href="/work" variant="secondary">
            See case studies
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container>
          <Stagger className="grid gap-x-4 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <StaggerItem key={i.slug}>
                <IndustryCard industry={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <DeliveryFramework />
      <div className="h-20 sm:h-28" />
    </PageTransition>
  );
}
