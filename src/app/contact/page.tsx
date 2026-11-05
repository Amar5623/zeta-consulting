import { Globe2, Mail, Phone } from "lucide-react";
import { mailtoHref, site, telHref } from "@/content/site";
import { faqs } from "@/content/company";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Start a Project",
  description: `Tell us about your project, or email ${site.email}. A senior engineer replies within one business day with questions, options and a clear next step.`,
  path: "/contact",
});

const nextSteps = [
  { title: "We reply within a day", body: "A senior engineer reads every message and replies personally." },
  { title: "Scoping conversation", body: "We talk goals, constraints, existing systems and whether we're the right fit." },
  { title: "Proposal & scope", body: "You get a written scope, timeline and price, usually within a week." },
];

export default function ContactPage() {
  const channels = [
    { icon: Mail, label: "Email", value: site.email, href: mailtoHref },
    { icon: Phone, label: "Phone", value: site.phoneDisplay, href: telHref },
  ];

  return (
    <PageTransition>
      <JsonLd data={breadcrumbGraph([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title={["Let's talk about", <span key="2" className="accent-serif">what you&apos;re building.</span>]}
        description="Share a few details and we'll come back with thoughts, questions and a clear next step. No sales scripts."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="sr-only">Project form</h2>
            <ContactForm />
          </Reveal>

          <aside className="flex flex-col gap-10 lg:col-span-5 lg:pl-8">
            <Reveal delay={0.1} className="flex flex-col">
              <h2 className="sr-only">Contact us directly</h2>
              {channels.map((c) => (
                <a key={c.label} href={c.href} className="group flex items-center gap-5 border-b border-line py-5 first:pt-0">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-canvas transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                    <c.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.8125rem] text-fg-muted">{c.label}</span>
                    <span className="text-[1.0625rem]">
                      <span className="link-underline">{c.value}</span>
                    </span>
                  </span>
                </a>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="flex flex-col gap-4 rounded-xl bg-canvas p-7">
              <p className="flex items-start gap-3">
                <Globe2 className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
                <span>{site.workingModel}</span>
              </p>
              <p className="text-fg-muted">{site.responseTime}</p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-6">
              <h2 className="text-label text-fg-subtle">What happens next</h2>
              <ol className="flex flex-col gap-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-[0.8125rem] tabular-nums">{i + 1}</span>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-[0.9375rem] text-fg-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>
        </Container>
      </section>

      <FaqSection items={faqs.slice(0, 4)} />
    </PageTransition>
  );
}
