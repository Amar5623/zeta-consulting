import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getService, services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { bookingHref, site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Chip, Container, Eyebrow } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { WorkCard } from "@/components/ui/work-card";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";
import { Faq } from "@/components/sections/faq";
import { ServiceSections } from "@/components/sections/service-sections";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.title} — ${site.name}`, description: s.short, url: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<PageHeroFallback />}>
        <ServiceContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function ServiceContent({ params }: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = caseStudies.filter((c) => c.services.includes(s.slug)).slice(0, 2);
  const index = services.findIndex((x) => x.slug === s.slug);
  const next = services[(index + 1) % services.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary,
    serviceType: s.title,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": `${site.url}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} capabilities`,
      itemListElement: s.capabilities.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c } })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: s.title, href: `/services/${s.slug}` },
        ]}
        title={[s.headline ?? s.title]}
        description={s.summary}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={bookingHref()} arrow>
            Discuss your project
          </Button>
          <Button href="#capabilities" variant="secondary">
            What&apos;s included
          </Button>
        </div>
      </PageHero>

      {/* Highlights */}
      <section className="py-20 sm:py-28">
        <Container>
          <Stagger className="grid gap-3 md:grid-cols-3">
            {s.highlights.map((h, i) => (
              <StaggerItem key={h.title} className="h-full">
                <div className="flex h-full flex-col gap-12 rounded-xl border border-line p-8">
                  <span className="text-[0.875rem] tabular-nums text-fg-subtle">0{i + 1}</span>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-h4">{h.title}</h2>
                    <p className="text-fg-muted">{h.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="scroll-mt-28 px-2 sm:px-3">
        <div className="rounded-xl bg-night py-20 text-white sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-5">
              <Eyebrow tone="light">Capabilities</Eyebrow>
              <MaskLines lines={["What we", <span key="2" className="accent-serif">do for you.</span>]} className="text-h2" />
              <p className="max-w-sm text-night-muted">{s.short}</p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-lg border border-night-line bg-night-line sm:grid-cols-2 lg:col-span-7">
              {s.capabilities.map((c, i) => (
                <li key={c} className="flex items-center gap-4 bg-night p-6">
                  <span className="text-[0.8125rem] tabular-nums text-night-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.0625rem]">{c}</span>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      </section>

      {s.sections && <ServiceSections sections={s.sections} />}

      {/* Deliverables + stack */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <h2 className="text-h3">What you get</h2>
            <ul className="flex flex-col border-t border-line">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-4 border-b border-line py-5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-8">
            <h2 className="text-h3">Tools & platforms</h2>
            <div className="flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <Chip key={t} className="px-4 py-2.5 text-[0.9375rem]">
                  {t}
                </Chip>
              ))}
            </div>
            <p className="max-w-md text-fg-muted">
              We choose tools for your context, not ours. If your team already has a stack, we&apos;ll work within it.
            </p>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="pb-20 sm:pb-28">
          <Container className="flex flex-col gap-14">
            <SectionHeader
              eyebrow="Related case studies"
              title={["Where this", <span key="2" className="accent-serif">shows up in practice.</span>]}
              action={
                <Button href="/work" variant="secondary" size="md" arrow>
                  All work
                </Button>
              }
            />
            <Stagger className="grid gap-x-4 gap-y-12 md:grid-cols-2">
              {related.map((c) => (
                <StaggerItem key={c.slug}>
                  <WorkCard item={c} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      <Faq items={s.faqs} title={["Common questions about", <span key="2" className="accent-serif">{s.title}.</span>]} />

      {/* Next service */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <Link href={`/services/${next.slug}`} className="group flex flex-col gap-4 border-t border-line pt-10">
            <span className="text-label text-fg-subtle">Next service</span>
            <span className="flex items-center justify-between gap-6">
              <span className="text-h1 transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{next.title}</span>
              <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight className="size-6" strokeWidth={1.5} />
              </span>
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
