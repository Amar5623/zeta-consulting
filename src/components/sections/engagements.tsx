import { Check } from "lucide-react";
import { engagements } from "@/content/company";
import { bookingHref } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Engagements() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14 sm:gap-20">
        <SectionHeader
          eyebrow="Ways to work together"
          title={["Simple engagements.", <span key="2" className="accent-serif">No surprises.</span>]}
          description="Pick the model that fits your stage. Every engagement starts with a free intro call and a written scope."
        />
        <Stagger className="grid gap-3 lg:grid-cols-3">
          {engagements.map((e) => (
            <StaggerItem key={e.name} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col gap-10 rounded-xl border p-8 sm:p-10",
                  e.featured ? "border-night bg-night text-white shadow-float" : "border-line bg-white",
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-h3">{e.name}</h3>
                    {e.featured && <span className="rounded-full bg-accent px-3 py-1 text-[0.75rem]">Most popular</span>}
                  </div>
                  <p className={e.featured ? "text-night-muted" : "text-fg-muted"}>{e.tagline}</p>
                </div>
                <div className={cn("border-y py-6", e.featured ? "border-night-line" : "border-line")}>
                  <p className="text-h3 font-medium">{e.price}</p>
                  <p className={cn("mt-2 text-[0.875rem]", e.featured ? "text-night-muted" : "text-fg-muted")}>Best for: {e.bestFor}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", e.featured ? "bg-white text-ink" : "bg-ink text-white")}>
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Button href={bookingHref()} variant={e.featured ? "light" : "secondary"} arrow className="w-full justify-between">
                  Get a quote
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
