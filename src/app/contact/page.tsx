import type { Metadata } from "next";
import { CalendarDays, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { bookingHref, site, whatsappHref } from "@/content/site";
import { faqs } from "@/content/company";
import { Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell us about your project. ${site.responseTime}`,
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { title: "We reply within a day", body: "A senior lead reads every message and replies personally." },
  { title: "30-minute intro call", body: "We talk goals, constraints and whether we're the right fit." },
  { title: "Proposal & scope", body: "You get a written scope, timeline and price, usually within a week." },
];

export default function ContactPage() {
  const wa = whatsappHref();
  const channels = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    ...(wa ? [{ icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: wa }] : []),
    { icon: CalendarDays, label: "Book a call", value: "Pick a time that suits you", href: bookingHref() },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        title={["Let's talk about", <span key="2" className="accent-serif">what you&apos;re building.</span>]}
        description="Share a few details and we'll come back with thoughts, questions and a clear next step. No sales scripts."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <aside className="flex flex-col gap-10 lg:col-span-5 lg:pl-8">
            <Reveal delay={0.1} className="flex flex-col">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 border-b border-line py-5 first:pt-0"
                >
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
                <MapPin className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
                <span>
                  {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}, {site.address.country}
                </span>
              </p>
              <p className="flex items-center gap-3 text-fg-muted">
                <Clock className="size-5 shrink-0" strokeWidth={1.5} />
                {site.hours}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-6">
              <p className="text-label text-fg-subtle">What happens next</p>
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

      <Faq items={faqs.slice(0, 4)} />
    </PageTransition>
  );
}
