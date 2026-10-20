import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";

/** PLACEHOLDER legal pages — have these written or reviewed by a lawyer for your jurisdiction. */
const pages = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "Who we are", p: `${site.legalName} operates ${site.url}. Contact us at ${site.email} with any privacy questions.` },
      { h: "What we collect", p: "Placeholder. Describe the personal data you collect (e.g. contact form submissions, analytics) and why." },
      { h: "How we use it", p: "Placeholder. Explain how the data is used, the legal basis, and who it is shared with (hosting, email and analytics providers)." },
      { h: "Your rights", p: "Placeholder. Describe how people can access, correct or delete their data, and how long you retain it." },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      { h: "Using this site", p: "Placeholder. Set out the terms under which visitors may use this website and its content." },
      { h: "Intellectual property", p: `Placeholder. Content on this site is owned by ${site.legalName} unless stated otherwise.` },
      { h: "Liability", p: "Placeholder. Limitations of liability and disclaimers appropriate to your jurisdiction." },
      { h: "Contact", p: `Questions about these terms can be sent to ${site.email}.` },
    ],
  },
} as const;

type Slug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as Slug];
  return page ? { title: page.title, alternates: { canonical: `/legal/${slug}` } } : {};
}

export default function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<PageHeroFallback />}>
        <LegalContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function LegalContent({ params }: Pick<PageProps<"/legal/[slug]">, "params">) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" title={[page.title]} />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            {page.sections.map((s) => (
              <div key={s.h} className="flex flex-col gap-3">
                <h2 className="text-h4">{s.h}</h2>
                <p className="text-fg-muted">{s.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
