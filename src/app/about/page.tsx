import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { team, clients } from "@/content/people";
import { Media } from "@/components/ui/media";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { Values } from "@/components/sections/values";
import { Process } from "@/components/sections/process";
import { Statement } from "@/components/sections/statement";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a senior team of engineers, designers, AI specialists and growth strategists building software that moves businesses forward.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { address } = site;
  return (
    <PageTransition>
      <PageHero
        eyebrow="About Zeta"
        title={["A small senior team", <span key="2" className="accent-serif">with a big remit.</span>]}
        description="We started Zeta to be the partner we always wanted to hire: one team that can think through strategy, design the experience, engineer it properly and then make sure people find it."
      />

      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="overflow-hidden rounded-xl">
          <Parallax offset={50} className="h-[50svh] min-h-[320px] sm:h-[70svh]">
            <Media alt="The Zeta Consulting team at work" label="Team / office photo (2400×1400)" tint="#E9E6E0" className="-my-[50px] h-[calc(100%+100px)] w-full" />
          </Parallax>
        </div>
      </section>

      {/* Story — placeholder copy, rewrite in your own words */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-8 lg:col-span-8">
            <Reveal>
              <p className="text-h3 font-normal leading-snug">
                Most companies juggle an agency for the website, a freelancer for the app, a consultant for AI and someone else for SEO. Things fall
                between the cracks. <span className="accent-serif">We built Zeta to close those gaps.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-6 text-fg-muted sm:grid-cols-2">
              <p>
                Placeholder. Tell the founding story here: who started Zeta, what you saw in the market, and the kind of work you set out to do. Keep it
                specific and human; this is where trust starts.
              </p>
              <p>
                Placeholder. Describe how you work today: team size, where you&apos;re based, the industries you know best, and what clients can expect in
                the first 30 days of working with you.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Statement />
      <Values />

      {/* Team */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Team"
            title={["The people", <span key="2" className="accent-serif">behind the work.</span>]}
            description="Senior specialists across engineering, design, AI and growth. Add real names, roles and photos in src/content/people.ts."
          />
          <Stagger className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3">
            {team.map((m, i) => (
              <StaggerItem key={`${m.name}-${i}`} className="group flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg">
                  <Media src={m.photo} alt={`${m.name}, ${m.role}`} label="Portrait 4:5" className="aspect-[4/5] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]" sizes="(min-width: 768px) 33vw, 50vw" />
                </div>
                <div>
                  <p className="text-h4">{m.name}</p>
                  <p className="text-[0.875rem] text-fg-muted">{m.role}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Clients */}
      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <Eyebrow>Clients & partners</Eyebrow>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {clients.map((c) => (
              <div key={c.name} className="grid aspect-[3/2] place-items-center bg-white p-6">
                <StaggerItem>
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={c.name} className="max-h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
                  ) : (
                    <span className="text-[1.0625rem] font-medium tracking-tight text-fg-subtle">{c.name}</span>
                  )}
                </StaggerItem>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      <Process />

      {/* Office */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col justify-between gap-10 rounded-xl bg-canvas p-8 sm:p-12">
            <div className="flex flex-col gap-5">
              <Eyebrow>Visit us</Eyebrow>
              <h2 className="text-h2">
                Our <span className="accent-serif">office.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <address className="flex gap-3 text-lead not-italic">
                <MapPin className="mt-1.5 size-5 shrink-0" strokeWidth={1.5} />
                <span>
                  {address.street}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                  <br />
                  {address.country}
                </span>
              </address>
              <p className="text-fg-muted">{site.hours}</p>
              {address.mapUrl && (
                <a href={address.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline w-fit">
                  Open in Google Maps
                </a>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Media alt="Zeta Consulting office" label="Office photo or map embed" tint="#E3E7EC" className="aspect-[4/3] h-full w-full rounded-xl" />
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
