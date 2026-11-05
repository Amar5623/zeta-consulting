import { CalendarCheck, FileText, Globe2, KeyRound, LineChart, MessagesSquare, ShieldCheck, Timer, UserCheck, Workflow, Wrench, Zap } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { Values } from "@/components/sections/values";
import { DeliveryFramework } from "@/components/sections/delivery-framework";
import { Statement } from "@/components/sections/statement";
import { TeamCta } from "@/components/sections/team-cta";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "About Zeta: A Remote-First Senior Engineering Team",
  description:
    "Zeta Consulting is a remote-first team of senior engineers who design, build and integrate AI agents, platforms and digital transformation programs, measured against your baseline.",
  path: "/about",
});

const operatingModel = [
  {
    icon: Globe2,
    title: "Remote by design, not by default",
    body: "Our engineers work from where they do their best work. Every engagement agrees fixed overlap hours with your team, so decisions never wait a day.",
  },
  {
    icon: UserCheck,
    title: "Senior people on every project",
    body: "The engineers you meet in scoping are the engineers who build. There is no hand-off to a junior bench after the contract is signed.",
  },
  {
    icon: KeyRound,
    title: "One accountable lead",
    body: "A single technical lead owns scope, quality and communication. You always know who to ask, and they always know the answer.",
  },
  {
    icon: MessagesSquare,
    title: "Async-first communication",
    body: "Written updates, recorded walkthroughs and a shared tracker replace status meetings. Meetings are kept for decisions.",
  },
  {
    icon: CalendarCheck,
    title: "A working demo every week",
    body: "Progress is shown in running software, not slides. You can test, comment and redirect while change is still cheap.",
  },
  {
    icon: FileText,
    title: "Documentation is a deliverable",
    body: "Architecture notes, runbooks and decision records ship with the code, so your team can own and extend what we build.",
  },
];

const cadence = [
  { day: "Monday", title: "Plan", body: "Priorities confirmed against the agreed outcome. Risks and open questions logged where you can see them." },
  { day: "Mid-week", title: "Build & update", body: "Short written updates with links to working builds, plus answers to anything raised the day before." },
  { day: "Friday", title: "Demo & decide", body: "A live demo of what shipped, measured against acceptance criteria, and a clear call on what comes next." },
  { day: "Monthly", title: "Review outcomes", body: "Progress compared with the baseline: what improved, what didn't, and what we recommend changing." },
];

const value = [
  { icon: Timer, title: "Less time lost to manual work", body: "We automate the repeatable steps and route exceptions to the right person, so teams spend time on judgment, not copy-paste." },
  { icon: Workflow, title: "Systems that finally talk to each other", body: "We connect ERP, CRM, finance and operational tools through clean integrations instead of spreadsheets and re-keying." },
  { icon: LineChart, title: "Decisions on live data", body: "Dashboards and alerts built on the data you already have, so leaders see what is happening now, not last month." },
  { icon: Zap, title: "Faster, more reliable products", body: "Web and mobile platforms engineered for speed, accessibility and uptime, which customers notice and search engines reward." },
  { icon: ShieldCheck, title: "Lower delivery risk", body: "Discovery, prototypes and pilots validate the idea before large spend, and every claim is checked against a baseline." },
  { icon: Wrench, title: "Technology you can own", body: "You keep 100% of the code and IP, with documentation and handover that make you independent of us." },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbGraph([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About Zeta"
        title={["Senior engineers, working remotely,", <span key="2" className="accent-serif">measured on outcomes.</span>]}
        description="Zeta Consulting partners with businesses to design, build, integrate and modernize the digital systems they depend on, solving real operational problems without automatically replacing the technology they already have."
      />

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-8 lg:col-span-8">
            <Reveal>
              <h2 className="text-h3 font-normal leading-snug">
                Projects rarely fail because of the technology. They fail because nobody connects the software to{" "}
                <span className="accent-serif">the way the business actually runs.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-6 text-fg-muted sm:grid-cols-2">
              <p>
                Zeta was founded by engineers who had spent years inside other companies&apos; technology projects and kept seeing the same
                pattern. New platforms were bought to replace systems that only needed extending. AI pilots launched without a baseline, so
                nobody could say whether they worked. Polished builds were handed to teams who could not maintain them.
              </p>
              <p>
                We built Zeta to work the other way round. We start with the operational problem — the bottleneck, the manual hours, the data
                nobody trusts — and only then choose the technology. We extend what already works, add intelligence where it delivers
                measurable value, and measure the result against where you started.
              </p>
              <p>
                We chose to be remote-first from day one. It lets us bring together specialists in AI, integration, product engineering and
                search who would never fit in one office, and it builds the habits that make projects predictable: clear writing, visible
                progress and decisions that are recorded, not remembered.
              </p>
              <p>
                Today we work with startups, growing SaaS companies and established operators across twelve industries — from marketplaces and
                maritime fleets to factory floors, clinics and finance teams.
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

      {/* How our team works */}
      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col gap-14 sm:gap-20">
          <SectionHeader
            eyebrow="How our team works"
            title={["A distributed team that", <span key="2" className="accent-serif">executes like it sits next to you.</span>]}
            description="Hyper-skilled specialists across AI, integration, product engineering and growth, organised around one accountable lead per engagement."
          />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {operatingModel.map((m) => (
              <StaggerItem key={m.title}>
                <div className="group flex h-full flex-col gap-10 rounded-lg border border-line bg-white p-7 transition-[box-shadow,transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-muted hover:shadow-card sm:p-8">
                  <span className="grid size-11 place-items-center rounded-full bg-canvas transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                    <m.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-h4">{m.title}</h3>
                    <p className="text-fg-muted">{m.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Weekly rhythm */}
      <section className="px-2 sm:px-3">
        <div className="rounded-xl bg-night py-20 text-white sm:py-28">
          <Container className="flex flex-col gap-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5">
                <Eyebrow tone="light">The weekly rhythm</Eyebrow>
                <MaskLines lines={["Predictable by design,", <span key="2" className="accent-serif">wherever we are.</span>]} className="text-h2" />
              </div>
              <p className="max-w-md text-night-muted">The same cadence on every engagement, so you always know what shipped, what is next and what it costs.</p>
            </div>
            <Stagger className="grid gap-px overflow-hidden rounded-xl border border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-4">
              {cadence.map((c) => (
                <div key={c.day} className="bg-night p-7 sm:p-8">
                  <StaggerItem className="flex flex-col gap-3">
                    <span className="text-[0.8125rem] text-night-muted">{c.day}</span>
                    <h3 className="text-h4">{c.title}</h3>
                    <p className="text-night-muted">{c.body}</p>
                  </StaggerItem>
                </div>
              ))}
            </Stagger>
          </Container>
        </div>
      </section>

      <Statement />

      {/* Business value */}
      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col gap-14 sm:gap-20">
          <SectionHeader
            eyebrow="Business value"
            title={["What changes when", <span key="2" className="accent-serif">the work is done.</span>]}
            description="We agree the baseline, the target and the measurement method before we build, so value is something we can show, not something we claim."
          />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {value.map((v) => (
              <StaggerItem key={v.title}>
                <div className="flex h-full flex-col gap-10 rounded-lg border border-line bg-white p-7 sm:p-8">
                  <span className="grid size-11 place-items-center rounded-full bg-canvas">
                    <v.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-h4">{v.title}</h3>
                    <p className="text-fg-muted">{v.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <DeliveryFramework />
      <Values />
      <TeamCta />
    </PageTransition>
  );
}
