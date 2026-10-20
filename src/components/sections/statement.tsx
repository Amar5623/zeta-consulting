import { commitments } from "@/content/company";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ScrollHighlight } from "@/components/motion/scroll-highlight";

export function Statement() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <ArrowLink href="/about" className="text-[0.9375rem]">
                More about Zeta
              </ArrowLink>
            </Reveal>
          </div>
          <ScrollHighlight
            className="text-h3 lg:col-span-9 lg:text-[2.75rem] lg:leading-[1.15] lg:tracking-[-0.03em]"
            text="Zeta is a senior team of engineers, designers and growth strategists. We turn ideas into *working* *software,* put AI to work where it *pays* *off,* and make sure customers can *find* *you* on Google and in AI answers."
          />
        </div>

        <Stagger className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:mt-28 lg:grid-cols-4">
          {commitments.map((c) => (
            <div key={c.label} className="bg-white p-6 sm:p-8">
              <StaggerItem className="flex h-full flex-col gap-8">
                <p className="text-h2 font-medium">
                  <Counter value={c.value} suffix={c.suffix} />
                </p>
                <p className="max-w-[14rem] text-[0.9375rem] text-fg-muted">{c.label}</p>
              </StaggerItem>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
