import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bookingHref, site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { FooterWordmark, BackToTop, Year } from "./footer-client";

const company = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { address } = site;
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <Container className="pt-24 sm:pt-32">
        {/* Closing CTA */}
        <div className="flex flex-col gap-12 border-b border-night-line pb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow tone="light">Start a project</Eyebrow>
            </Reveal>
            <MaskLines
              as="h2"
              className="text-display"
              lines={["Have an idea?", <span key="l2" className="accent-serif text-white/90">Let&apos;s build it.</span>]}
            />
          </div>
          <Reveal delay={0.15} className="flex flex-col gap-6 lg:items-end">
            <Magnetic>
              <Button href={bookingHref()} variant="light" arrow>
                Book a free 30-min call
              </Button>
            </Magnetic>
            <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-2 text-h4 text-white/80 hover:text-white">
              <span className="link-underline">{site.email}</span>
              <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.5} />
            </a>
          </Reveal>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Logo tone="light" />
            <p className="max-w-xs text-night-muted">{site.description}</p>
          </div>

          <FooterColumn title="Services" className="lg:col-span-3">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company" className="lg:col-span-2">
            {company.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="flex flex-col gap-8 lg:col-span-3">
            <FooterColumn title="Office">
              <address className="not-italic leading-relaxed text-white/80">
                {address.street}
                <br />
                {address.locality}, {address.region} {address.postalCode}
                <br />
                {address.country}
              </address>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-white/80 hover:text-white">
                {site.phone}
              </a>
              <p className="text-night-muted">{site.hours}</p>
            </FooterColumn>
            <FooterColumn title="Follow">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-white/80 hover:text-white">
                    <span className="link-underline">{s.label}</span>
                  </a>
                ))}
              </div>
            </FooterColumn>
          </div>
        </div>
      </Container>

      <FooterWordmark />

      <Container>
        <div className="flex flex-col gap-4 border-t border-night-line py-6 text-[0.8125rem] text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-white">
              Terms
            </Link>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 text-label text-night-muted">{title}</p>
      <div className="flex flex-col gap-3 text-[0.9375rem]">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group w-fit text-white/80 transition-colors hover:text-white">
      <span className="link-underline">{children}</span>
    </Link>
  );
}
