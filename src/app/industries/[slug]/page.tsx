import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getIndustry, industries } from "@/content/industries";
import { getCaseStudy } from "@/content/work";
import { getService } from "@/content/services";
import { contactHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { industryGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusChip } from "@/components/ui/status-chip";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";
import { IndustryVisual } from "@/components/visuals/industry-visual";
import { CaseVisual } from "@/components/visuals/case-visual";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return pageMetadata({ title: `${i.name} Software & AI Solutions`, description: i.valueProp, path: `/industries/${i.slug}`, ownImage: true });
}

export default function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<PageHeroFallback />}>
        <IndustryContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function IndustryContent({ params }: Pick<PageProps<"/industries/[slug]">, "params">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const cs = getCaseStudy(industry.caseStudy);
  const services = industry.services.map((s) => getService(s)).filter((s) => s !== undefined);
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <JsonLd data={industryGraph({ slug: industry.slug, name: industry.name, description: industry.valueProp })} />
      <PageHero
        crumbs={[
          { label: "Industries", href: "/industries" },
          { label: industry.name, href: `/industries/${industry.slug}` },
        ]}
        title={[industry.headline]}
        description={industry.valueProp}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={contactHref} arrow>
            Discuss your challenge
          </Button>
          {cs && (
            <Button href={`/work/${cs.slug}`} variant="secondary">
              Read the case study
            </Button>
          )}
        </div>
      </PageHero>

      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative overflow-hidden rounded-xl">
          <IndustryVisual industry={industry} fit="contain" className="h-[48svh] min-h-[320px] w-full sm:h-[70svh]" />
          <span className="absolute bottom-4 right-4 rounded-full bg-white/10 px-3 py-1.5 text-[0.75rem] text-white/70 backdrop-blur">
            Illustrative interface concept
          </span>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Industry context"
            title={["The problems we", <span key="2" className="accent-serif">keep running into.</span>]}
            description={`Common pain points across ${industry.short.toLowerCase()} teams — and the reason we start every engagement with discovery.`}
          />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industry.painPoints.map((p, i) => (
              <StaggerItem key={p} className="h-full">
                <div className="flex h-full flex-col gap-8 rounded-lg border border-line bg-white p-7">
                  <span className="text-[0.8125rem] tabular-nums text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[1.0625rem] leading-snug">{p}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Offerings */}
      <section className="px-2 sm:px-3">
        <div className="rounded-xl bg-night py-20 text-white sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Eyebrow tone="light">Tailored solutions</Eyebrow>
              <MaskLines lines={["What we build for", <span key="2" className="accent-serif">{industry.short}.</span>]} className="text-h2" />
              <div className="mt-4 flex flex-col gap-3">
                <p className="text-label text-night-muted">Related services</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="rounded-full border border-night-line px-3.5 py-2 text-[0.875rem] text-white/80 transition-colors hover:border-white/40 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Stagger className="flex flex-col lg:col-span-7">
              {industry.offerings.map((o) => (
                <StaggerItem key={o}>
                  <div className="flex items-start gap-4 border-b border-night-line py-5 text-[1.0625rem]">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-white text-ink">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {o}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </div>
      </section>

      {/* Case study */}
      {cs && (
        <section className="py-20 sm:py-28">
          <Container className="flex flex-col gap-14">
            <SectionHeader eyebrow="Detailed case study" title={[cs.title]} />
            <Reveal>
              <Link href={`/work/${cs.slug}`} className="group grid overflow-hidden rounded-xl border border-line bg-white shadow-card md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
                  <div className="flex flex-col gap-5">
                    <StatusChip status={cs.status} className="w-fit" />
                    <p className="text-lead text-fg-muted">{cs.summary}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-label text-fg-subtle">What we measure</p>
                    <ul className="flex flex-wrap gap-2">
                      {cs.kpis.map((k) => (
                        <li key={k.area} className="rounded-full bg-canvas px-3 py-1.5 text-[0.8125rem]">
                          {k.area}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-2">
                      <span className="link-underline">Read the full case study</span>
                      <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
                <div className="order-first p-2 md:order-none md:p-3 md:pl-0">
                  <CaseVisual item={cs} className="aspect-[16/11] h-full w-full rounded-lg" />
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Other industries */}
      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col gap-8 border-t border-line pt-10">
          <h2 className="text-label text-fg-subtle">Other industries</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.9375rem] transition-colors hover:border-ink">
                <o.icon className="size-4" strokeWidth={1.6} />
                {o.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
