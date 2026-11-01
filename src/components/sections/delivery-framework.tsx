import { deliveryFramework } from "@/content/industries";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** The cross-industry delivery framework as a numbered list. */
export function DeliveryFramework() {
  return (
    <section className="px-2 sm:px-3">
      <div className="rounded-xl bg-canvas py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Cross-industry delivery framework"
            title={["From business problem to", <span key="2" className="accent-serif">production-ready solution.</span>]}
            description="The same evidence-led method in every industry, with measurable acceptance criteria at each stage."
          />
          <Stagger className="flex flex-col border-t border-line">
            {deliveryFramework.map((s) => (
              <StaggerItem key={s.step}>
                <div className="grid gap-3 border-b border-line py-8 md:grid-cols-[6rem_18rem_1fr] md:gap-8">
                  <span className="text-h3 tabular-nums text-fg-subtle">{s.step}</span>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="max-w-2xl text-fg-muted md:pt-1.5">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </div>
    </section>
  );
}
