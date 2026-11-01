import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { caseStudies, getCaseStudy, statusMeta } from "@/content/work";
import { getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { bookingHref, site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { StatusChip } from "@/components/ui/status-chip";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";
import { CaseVisual } from "@/components/visuals/case-visual";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Case Study`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
  };
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<PageHeroFallback />}>
        <CaseStudyContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function CaseStudyContent({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const industry = getIndustry(c.industry);
  const index = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const services = c.services.map((s) => getService(s)).filter((s) => s !== undefined);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    abstract: c.summary,
    url: absoluteUrl(`/work/${c.slug}`),
    creator: { "@id": `${site.url}/#organization` },
    about: industry?.name,
    genre: statusMeta[c.status].label,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <PageHero
        crumbs={[
          { label: "Work", href: "/work" },
          { label: c.title, href: `/work/${c.slug}` },
        ]}
        title={[c.title]}
        description={c.summary}
      >
        <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-label text-fg-subtle">Industry</dt>
            <dd className="mt-2">
              {industry ? (
                <Link href={`/industries/${industry.slug}`} className="link-underline">
                  {industry.name}
                </Link>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-label text-fg-subtle">Client</dt>
            <dd className="mt-2">{c.client}</dd>
          </div>
          <div>
            <dt className="text-label text-fg-subtle">Status</dt>
            <dd className="mt-2">
              <StatusChip status={c.status} />
            </dd>
          </div>
          <div>
            <dt className="text-label text-fg-subtle">Services</dt>
            <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline">
                  {s.title}
                </Link>
              ))}
            </dd>
          </div>
        </dl>
      </PageHero>

      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative overflow-hidden rounded-xl">
          <CaseVisual item={c} fit="contain" className="h-[52svh] min-h-[340px] w-full sm:h-[74svh]" priority sizes="100vw" />
          {!c.cover && (
            <span className="absolute bottom-4 right-4 rounded-full bg-white/10 px-3 py-1.5 text-[0.75rem] text-white/70 backdrop-blur">
              Illustrative interface concept
            </span>
          )}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-20 sm:gap-28">
          {/* Status note */}
          <Reveal>
            <div className="flex gap-4 rounded-lg border border-line bg-canvas/60 p-5 sm:items-center sm:p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-fg-muted sm:mt-0" strokeWidth={1.6} />
              <p className="text-[0.9375rem] text-fg-muted">
                <span className="text-ink">{statusMeta[c.status].label}.</span> {statusMeta[c.status].description}
              </p>
            </div>
          </Reveal>

          {/* Challenge */}
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-label text-fg-subtle">01</p>
              <h2 className="mt-3 text-h3">The challenge</h2>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-5 lg:col-span-8">
              {c.challenge.map((p) => (
                <p key={p} className="text-h4 font-normal leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>

          {/* Architecture */}
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-label text-fg-subtle">02</p>
              <h2 className="mt-3 text-h3">Our architecture & mindset</h2>
              <p className="mt-4 max-w-sm text-fg-muted">{c.approachIntro}</p>
            </Reveal>
            <div className="flex flex-col gap-6 lg:col-span-8">
              <Stagger className="flex flex-col gap-2">
                {c.layers.map((l, i) => (
                  <StaggerItem key={l.name}>
                    <div className="grid gap-2 rounded-lg border border-line bg-white p-5 sm:grid-cols-[3rem_14rem_1fr] sm:items-baseline sm:gap-4 sm:p-6">
                      <span className="text-[0.8125rem] tabular-nums text-fg-subtle">L{i + 1}</span>
                      <span className="font-medium">{l.name}</span>
                      <span className="text-fg-muted">{l.body}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              {c.approachNote && (
                <Reveal>
                  <p className="border-l-2 border-accent pl-4 text-fg-muted">{c.approachNote}</p>
                </Reveal>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-label text-fg-subtle">03</p>
              <h2 className="mt-3 text-h3">Key features</h2>
            </Reveal>
            <Stagger className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:col-span-8">
              {c.features.map((f) => (
                <StaggerItem key={f}>
                  <div className="flex items-start gap-3 border-b border-line py-4">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {f}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {c.gallery?.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {c.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.1}>
                  <Media src={src} alt={`${c.title} — image ${i + 1}`} className="aspect-[4/3] w-full rounded-xl" />
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {/* KPIs */}
      <section className="px-2 sm:px-3">
        <div className="rounded-xl bg-night py-20 text-white sm:py-28">
          <Container className="flex flex-col gap-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5">
                <Eyebrow tone="light">Impact, KPIs & KRAs</Eyebrow>
                <MaskLines lines={["How success", <span key="2" className="accent-serif">gets measured.</span>]} className="text-h2" />
              </div>
              {c.kpiNote && <p className="max-w-md text-night-muted">{c.kpiNote}</p>}
            </div>
            <Stagger className="grid gap-px overflow-hidden rounded-xl border border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-3">
              {c.kpis.map((k, i) => (
                <div key={k.area} className="bg-night p-7 sm:p-8">
                  <StaggerItem className="flex flex-col gap-3">
                    <span className="text-[0.8125rem] tabular-nums text-night-muted">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-h4">{k.area}</p>
                    <p className="text-night-muted">{k.metrics}</p>
                  </StaggerItem>
                </div>
              ))}
            </Stagger>
            <div className="flex flex-col gap-4 border-t border-night-line pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-night-muted">Facing something similar? We start by establishing your baseline and the outcome you need.</p>
              <Button href={bookingHref()} variant="light" arrow>
                Discuss your project
              </Button>
            </div>
          </Container>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Link href={`/work/${next.slug}`} className="group grid items-end gap-8 border-t border-line pt-10 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-4">
              <span className="text-label text-fg-subtle">Next case study</span>
              <span className="text-h1 transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{next.title}</span>
            </div>
            <span className="grid size-16 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowUpRight className="size-6" strokeWidth={1.5} />
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
