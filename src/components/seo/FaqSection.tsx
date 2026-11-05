import { Mail, Phone, Plus } from "lucide-react";
import { mailtoHref, site, telHref } from "@/content/site";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

/**
 * FAQ with FAQPage structured data. Answers live in the DOM inside native <details>, so they are crawlable,
 * keyboard-operable and match the schema text exactly.
 */
export function FaqSection({ items, title }: { items: { q: string; a: string }[]; title?: React.ReactNode[] }) {
  return (
    <section aria-labelledby="faq-heading" className="py-20 sm:py-28">
      <JsonLd data={faqSchema(items)} />
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <MaskLines id="faq-heading" lines={title ?? ["Questions,", <span key="2" className="accent-serif">answered.</span>]} className="text-h2" />
            <Reveal delay={0.1} className="mt-4">
              <div className="flex max-w-sm flex-col gap-3 rounded-lg bg-canvas p-6">
                <p className="font-medium">Still have questions?</p>
                <p className="text-[0.9375rem] text-fg-muted">{site.responseTime}</p>
                <a href={mailtoHref} className="group mt-2 inline-flex items-center gap-2 text-[0.9375rem]">
                  <Mail className="size-4" strokeWidth={1.75} />
                  <span className="link-underline">{site.email}</span>
                </a>
                <a href={telHref} className="group inline-flex items-center gap-2 text-[0.9375rem]">
                  <Phone className="size-4" strokeWidth={1.75} />
                  <span className="link-underline">{site.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="border-t border-line">
            {items.map((item, i) => (
              <details key={item.q} name="faq" open={i === 0} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.0625rem] leading-snug sm:text-h4 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-normal transition-colors duration-300 group-hover:text-accent">{item.q}</h3>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,border-color,color] duration-500 ease-out-expo group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-white">
                    <Plus className="size-4" strokeWidth={1.75} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pr-12 text-body text-fg-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
