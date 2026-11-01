import { ArrowRight, Check } from "lucide-react";
import type { ServiceSection } from "@/content/services";
import { cn } from "@/lib/utils";
import { richLines } from "@/lib/rich";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

/** Renders a service's long-form sections in order. */
export function ServiceSections({ sections }: { sections: ServiceSection[] }) {
  return (
    <>
      {sections.map((s, i) => {
        switch (s.kind) {
          case "cards":
            return <CardsSection key={i} section={s} />;
          case "offerings":
            return <OfferingsSection key={i} section={s} />;
          case "phases":
            return <PhasesSection key={i} section={s} />;
          case "principles":
            return <PrinciplesSection key={i} section={s} />;
          case "kpis":
            return <KpiSection key={i} section={s} />;
          case "engagement":
            return <EngagementSection key={i} section={s} />;
          case "callout":
            return <CalloutSection key={i} section={s} />;
        }
      })}
    </>
  );
}

type Of<K extends ServiceSection["kind"]> = Extract<ServiceSection, { kind: K }>;

/** Lets the last cell of a hairline grid span the leftover columns (2 cols on sm, 3 on lg). */
function fillRow(count: number, index: number) {
  if (index !== count - 1) return undefined;
  return cn(count % 2 === 1 && "sm:col-span-2", count % 3 === 1 && "lg:col-span-3", count % 3 === 2 && "lg:col-span-2", count % 3 === 0 && "lg:col-span-1");
}

function CardsSection({ section }: { section: Of<"cards"> }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={section.eyebrow} title={richLines(section.title)} description={section.intro} />
        <Stagger className={cn("grid gap-3 sm:grid-cols-2", section.items.length % 3 === 0 || section.items.length === 5 ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
          {section.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="flex h-full flex-col gap-10 rounded-lg border border-line bg-white p-7 sm:p-8">
                {item.label ? (
                  <span className="w-fit rounded-full bg-canvas px-3 py-1 text-[0.8125rem] text-fg-muted">{item.label}</span>
                ) : (
                  <span className="size-2 rounded-full bg-accent" />
                )}
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-h4">{item.title}</h3>
                  <p className="text-fg-muted">{item.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function OfferingsSection({ section }: { section: Of<"offerings"> }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={section.eyebrow} title={richLines(section.title)} description={section.intro} />
        <div className="flex flex-col border-t border-line">
          {section.items.map((o, i) => (
            <Reveal key={o.title}>
              <article className="grid gap-8 border-b border-line py-12 lg:grid-cols-12">
                <div className="flex flex-col gap-4 lg:col-span-5">
                  <span className="text-[0.875rem] tabular-nums text-fg-subtle">{String.fromCharCode(65 + i)}</span>
                  <h3 className="text-h3">{o.title}</h3>
                  <p className="text-lead text-fg-muted">{o.tagline}</p>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-7">
                  <p>{o.body}</p>
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {o.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.9375rem]">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                          <Check className="size-3" strokeWidth={2.5} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  {o.outcome && <p className="rounded-lg bg-canvas p-5 text-[0.9375rem] text-fg-muted">{o.outcome}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PhasesSection({ section }: { section: Of<"phases"> }) {
  const compact = section.items.every((p) => !p.points && !p.deliverables);
  return (
    <section className="px-2 sm:px-3">
      <div className="rounded-xl bg-canvas py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeader eyebrow={section.eyebrow} title={richLines(section.title)} description={section.intro} />
          {compact ? (
            <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {section.items.map((p, i) => (
                <StaggerItem key={p.title} className="h-full">
                  <div className="relative flex h-full flex-col gap-6 rounded-lg bg-white p-6">
                    <span className="text-[0.8125rem] tabular-nums text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-h4">{p.title}</h3>
                      <p className="text-[0.9375rem] text-fg-muted">{p.tagline}</p>
                    </div>
                    {i < section.items.length - 1 && (
                      <ArrowRight className="absolute right-5 top-6 hidden size-4 text-fg-subtle xl:block" strokeWidth={1.5} />
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <ol className="flex flex-col gap-3">
              {section.items.map((p, i) => (
                <Reveal key={p.title}>
                  <li className="grid gap-8 rounded-xl bg-white p-7 sm:p-10 lg:grid-cols-12">
                    <div className="flex flex-col gap-4 lg:col-span-5">
                      <span className="grid size-11 place-items-center rounded-full bg-ink text-[0.9375rem] tabular-nums text-white">{i + 1}</span>
                      <h3 className="text-h3">{p.title}</h3>
                      <p className="text-fg-muted">{p.tagline}</p>
                    </div>
                    <div className="flex flex-col gap-6 lg:col-span-7">
                      {p.body && <p>{p.body}</p>}
                      {p.points && (
                        <ul className="flex flex-col gap-3">
                          {p.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-3 text-[0.9375rem]">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                      {p.deliverables && (
                        <div className={cn("flex flex-col gap-3", (p.body || p.points) && "border-t border-line pt-6")}>
                          <p className="text-label text-fg-subtle">Deliverables</p>
                          <div className="flex flex-wrap gap-2">
                            {p.deliverables.map((d) => (
                              <span key={d} className="rounded-full border border-line px-3 py-1.5 text-[0.8125rem]">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {p.checkpoint && (
                        <p className="rounded-lg bg-canvas p-4 text-[0.9375rem] text-fg-muted">
                          <span className="text-ink">Decision checkpoint: </span>
                          {p.checkpoint}
                        </p>
                      )}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          )}
        </Container>
      </div>
    </section>
  );
}

function PrinciplesSection({ section }: { section: Of<"principles"> }) {
  return (
    <section className="px-2 pt-20 sm:px-3 sm:pt-28">
      <div className="rounded-xl bg-night py-20 text-white sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeader eyebrow={section.eyebrow} tone="light" title={richLines(section.title)} description={section.intro} />
          <Stagger className="grid gap-px overflow-hidden rounded-xl border border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((p, i) => (
              <div key={p.title} className={cn("bg-night p-7 sm:p-8", fillRow(section.items.length, i))}>
                <StaggerItem className="flex flex-col gap-6">
                  <span className="text-[0.8125rem] tabular-nums text-night-muted">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-h4">{p.title}</h3>
                    <p className="text-night-muted">{p.body}</p>
                  </div>
                </StaggerItem>
              </div>
            ))}
          </Stagger>
        </Container>
      </div>
    </section>
  );
}

function KpiSection({ section }: { section: Of<"kpis"> }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={section.eyebrow} title={richLines(section.title)} description={section.intro} />
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left">
              <thead className="hidden bg-canvas md:table-header-group">
                <tr>
                  {section.columns.map((c) => (
                    <th key={c} scope="col" className="px-6 py-4 text-[0.875rem] font-normal text-fg-muted">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map(([a, b, c]) => (
                  <tr key={a} className="flex flex-col gap-1 border-t border-line px-6 py-5 first:border-t-0 md:table-row md:p-0 md:first:border-t">
                    <th scope="row" className="font-medium md:w-[24%] md:px-6 md:py-5">
                      {a}
                    </th>
                    <td className="text-[0.9375rem] md:w-[40%] md:px-6 md:py-5">{b}</td>
                    <td className="text-[0.9375rem] text-fg-muted md:px-6 md:py-5">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        {section.note && <p className="max-w-3xl text-[0.9375rem] text-fg-muted">{section.note}</p>}
      </Container>
    </section>
  );
}

function EngagementSection({ section }: { section: Of<"engagement"> }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={section.eyebrow} title={richLines(section.title)} description={section.intro} />
        <Stagger className={cn("grid gap-3 sm:grid-cols-2", section.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-5")}>
          {section.items.map((e, i) => (
            <StaggerItem key={e.name} className="h-full">
              <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-white p-7">
                <div className="flex flex-col gap-4">
                  <span className="text-[0.8125rem] tabular-nums text-fg-subtle">Stage {i + 1}</span>
                  <h3 className="text-h4">{e.name}</h3>
                  <p className="text-[0.9375rem] text-fg-muted">{e.body}</p>
                </div>
                <div className="border-t border-line pt-5">
                  <p className="text-label text-fg-subtle">Output</p>
                  <p className="mt-1.5 text-[0.9375rem]">{e.output}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {section.note && <p className="max-w-3xl text-[0.9375rem] text-fg-muted">{section.note}</p>}
      </Container>
    </section>
  );
}

function CalloutSection({ section }: { section: Of<"callout"> }) {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="grid gap-6 rounded-xl border border-line bg-canvas p-8 sm:p-12 lg:grid-cols-12">
            <h2 className="text-h3 lg:col-span-4">{section.title}</h2>
            <p className="text-lead text-fg-muted lg:col-span-8">{section.body}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
