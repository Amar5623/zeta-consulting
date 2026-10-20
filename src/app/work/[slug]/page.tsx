import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/content/work";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/utils";
import { Media } from "@/components/ui/media";
import { Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";
import { Parallax } from "@/components/motion/parallax";
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
    // Placeholder case studies stay out of search results until they're real.
    robots: c.placeholder ? { index: false, follow: true } : undefined,
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

  const index = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const serviceNames = c.services.map((s) => getService(s)).filter((s) => s !== undefined);

  const meta = [
    { label: "Client", value: c.client },
    { label: "Industry", value: c.industry },
    { label: "Year", value: c.year },
    { label: "Duration", value: c.duration },
  ];

  const story = [
    { label: "The challenge", body: c.challenge },
    { label: "Our approach", body: c.approach },
    { label: "The outcome", body: c.outcome },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    abstract: c.summary,
    url: absoluteUrl(`/work/${c.slug}`),
    creator: { "@id": `${site.url}/#organization` },
    about: c.industry,
    dateCreated: c.year,
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
        <dl className="grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4 lg:grid-cols-5">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-label text-fg-subtle">{m.label}</dt>
              <dd className="mt-2">{m.value}</dd>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <dt className="text-label text-fg-subtle">Services</dt>
            <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {serviceNames.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline">
                  {s.title}
                </Link>
              ))}
            </dd>
          </div>
        </dl>
      </PageHero>

      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="overflow-hidden rounded-xl">
          <Parallax offset={50} className="h-[56svh] min-h-[360px] sm:h-[78svh]">
            <Media src={c.cover} alt={`${c.title} — cover`} label={`${c.client} · hero image (2400×1400)`} tint={c.tint} className="-my-[50px] h-[calc(100%+100px)] w-full" priority sizes="100vw" />
          </Parallax>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-20 sm:gap-28">
          <Stagger className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {c.metrics.map((m) => (
              <div key={m.label} className="bg-white p-8 sm:p-12">
                <StaggerItem className="flex flex-col gap-3">
                  <p className="text-display font-medium">{m.value}</p>
                  <p className="text-fg-muted">{m.label}</p>
                </StaggerItem>
              </div>
            ))}
          </Stagger>

          {story.map((s, i) => (
            <div key={s.label} className="grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="text-label text-fg-subtle">0{i + 1}</p>
                <h2 className="mt-3 text-h3">{s.label}</h2>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-8">
                <p className="text-h4 font-normal leading-relaxed text-fg-muted">{s.body}</p>
              </Reveal>
            </div>
          ))}

          <div className="grid gap-3 md:grid-cols-2">
            {(c.gallery?.length ? c.gallery : [undefined, undefined]).map((src, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Media src={src} alt={`${c.title} — image ${i + 1}`} label={`Gallery image ${i + 1}`} tint={c.tint} className="aspect-[4/3] w-full rounded-xl" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Link href={`/work/${next.slug}`} className="group grid items-end gap-8 border-t border-line pt-10 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-4">
              <span className="text-label text-fg-subtle">Next project</span>
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
