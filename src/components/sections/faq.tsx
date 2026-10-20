import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { jsonLd } from "@/lib/utils";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

/** FAQ with FAQPage structured data — helps both rich results and AI answer engines. */
export function Faq({ items, title }: { items: AccordionItem[]; title?: React.ReactNode[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section className="py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <MaskLines lines={title ?? ["Questions,", <span key="2" className="accent-serif">answered.</span>]} className="text-h2" />
            <Reveal delay={0.1} className="mt-4">
              <div className="flex max-w-sm flex-col gap-3 rounded-lg bg-canvas p-6">
                <p className="font-medium">Still have questions?</p>
                <p className="text-[0.9375rem] text-fg-muted">{site.responseTime}</p>
                <a href={`mailto:${site.email}`} className="group mt-2 inline-flex items-center gap-2 text-[0.9375rem]">
                  <Mail className="size-4" strokeWidth={1.75} />
                  <span className="link-underline">{site.email}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
