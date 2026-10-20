import { values } from "@/content/company";
import { Container } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Values() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14 sm:gap-20">
        <SectionHeader
          eyebrow="Why Zeta"
          title={["A partner,", <span key="2" className="accent-serif">not a vendor.</span>]}
          description="We work like an extension of your team: senior people, honest advice and a bias for shipping."
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="group flex h-full flex-col gap-10 rounded-lg border border-line bg-white p-7 transition-[box-shadow,transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-muted hover:shadow-card sm:p-8">
                <span className="grid size-11 place-items-center rounded-full bg-canvas transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
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
  );
}
