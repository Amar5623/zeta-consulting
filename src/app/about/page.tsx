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
import { DeliveryFramework } from "@/components/sections/delivery-framework";
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
        title={["Build smarter systems.", <span key="2" className="accent-serif">Connect what you already use.</span>]}
        description="Zeta Consulting partners with businesses to design, build, integrate and modernize the digital systems they depend on — solving real operational problems without automatically replacing the technology they already have."
      />

      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="overflow-hidden rounded-xl">
          <Parallax offset={50} className="h-[50svh] min-h-[320px] sm:h-[70svh]">
            <Media alt="The Zeta Consulting team at work" label="Team / office photo (2400×1400)" tint="#E9E6E0" className="-my-[50px] h-[calc(100%+100px)] w-full" />
          </Parallax>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-8 lg:col-span-8">
            <Reveal>
              <p className="text-h3 font-normal leading-snug">
                Technology that moves your business forward. We bring business strategy, software engineering, system integration and
                intelligent automation together to <span className="accent-serif">solve complex operational challenges.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-6 text-fg-muted sm:grid-cols-2">
              <p>
                We work with businesses across e-commerce, mobility, logistics, maritime, real estate, manufacturing, financial services,
                education, healthcare, hospitality and enterprise software — designing custom web and mobile applications, scalable SaaS
                products, AI-enabled workflows, industrial IoT solutions and integrations that connect existing systems.
              </p>
              <p>
                We believe transformation should build on what already works. Rather than replacing established systems by default, we
                extend their capabilities, improve workflows and introduce intelligence where it delivers measurable value — from
                discovery and architecture through development, integration, deployment and optimization.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="border-l-2 border-accent pl-4 text-lead">
                Our focus is simple: better-connected systems, more effective operations and measurable progress toward the outcomes that
                matter to your business.
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

      <DeliveryFramework />

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
