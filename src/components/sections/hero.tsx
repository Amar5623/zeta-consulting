import { contactHref } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";
import { TextRotator } from "@/components/motion/text-rotator";
import { HeroShowcase } from "@/components/visuals/hero-showcase";
import { CursorField, HeroHighlights } from "./hero-client";

const rotating = ["AI agents", "web platforms", "mobile apps", "digital products", "growth engines"];
// One bright colour per rotating phrase; the rest of the hero stays black and white.
const rotatingColors = ["#F55C1A", "#7C3AED", "#0EA5E9", "#10B981", "#E11D48"];

export function Hero() {
  return (
    <section className="relative px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative overflow-hidden rounded-xl bg-canvas">
        <div aria-hidden className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

        <CursorField className="pb-6 pt-32 sm:pt-40">
          <Container className="relative flex flex-col items-center text-center">
            <Reveal>
              <HeroHighlights />
            </Reveal>

            <h1 className="mt-8 text-display">
              <span className="sr-only">We build AI agents, web platforms, mobile apps and growth engines that move business forward.</span>
              <MaskLines
                aria-hidden
                as="span"
                trigger="mount"
                delay={0.15}
                className="block"
                lines={[
                  "We build",
                  <TextRotator key="r" words={rotating} colors={rotatingColors} className="accent-serif text-[1.08em]" />,
                  "that move business forward.",
                ]}
              />
            </h1>

            <Reveal delay={0.45} className="mt-8 max-w-2xl">
              <p className="text-lead text-fg-muted">
                Build smarter systems. Connect what you already use. Zeta designs, builds, integrates and modernizes the platforms your business
                depends on, and measures what changes.
              </p>
            </Reveal>

            <Reveal delay={0.55} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button href={contactHref} arrow>
                Start a project
              </Button>
              <Button href="/work" variant="secondary">
                See our work
              </Button>
            </Reveal>
          </Container>
        </CursorField>

        <HeroShowcase />
      </div>
    </section>
  );
}
