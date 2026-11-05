import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { faqs } from "@/content/company";
import { contactHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Chip, Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { Engagements } from "@/components/sections/engagements";
import { Process } from "@/components/sections/process";
import { FaqSection } from "@/components/seo/FaqSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Services: AI Agents, Web & Mobile, Transformation, SEO & GEO",
  description:
    "AI agents and integrations, app and web strategy, product design, immersive experiences, web platforms, mobile apps, digital transformation, SEO and GEO/AEO, delivered by one senior team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbGraph([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        title={["Ten ways we help you", <span key="2" className="accent-serif">build, launch and grow.</span>]}
        description="Bring us one problem or the whole roadmap. Every service is run by senior specialists who work as one team, so strategy, design, engineering and growth stay connected."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={contactHref} arrow>
            Start a project
          </Button>
          <Button href="/work" variant="secondary">
            See our work
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-24">
          {serviceGroups.map((group, gi) => (
            <div key={group.id} className="grid grid-cols-[minmax(0,1fr)] gap-10 border-t border-line pt-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal className="lg:sticky lg:top-32">
                  <p className="text-label text-fg-subtle">0{gi + 1}</p>
                  <h2 className="mt-3 text-h3">{group.label}</h2>
                  <p className="mt-3 max-w-xs text-fg-muted">{group.blurb}</p>
                </Reveal>
              </div>
              <Stagger className="flex flex-col gap-3 lg:col-span-8">
                {servicesByGroup(group.id).map((s) => (
                  <StaggerItem key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex flex-col gap-8 rounded-xl border border-line bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-muted hover:shadow-card sm:p-9"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <span className="grid size-12 place-items-center rounded-lg bg-canvas transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                            <s.icon className="size-5" strokeWidth={1.6} />
                          </span>
                          <div>
                            <p className="text-[0.8125rem] tabular-nums text-fg-subtle">{s.number}</p>
                            <h3 className="text-h3">{s.title}</h3>
                          </div>
                        </div>
                        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                          <ArrowUpRight className="size-4" strokeWidth={1.75} />
                        </span>
                      </div>
                      <p className="max-w-2xl text-fg-muted">{s.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.capabilities.map((c) => (
                          <Chip key={c} tone="outline">
                            {c}
                          </Chip>
                        ))}
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </Container>
      </section>

      <Process />
      <Engagements />
      <FaqSection items={faqs.slice(0, 6)} />
    </PageTransition>
  );
}
