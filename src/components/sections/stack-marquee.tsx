import { stack } from "@/content/company";
import { Container } from "@/components/ui/primitives";
import { Marquee } from "@/components/motion/marquee";

export function StackMarquee() {
  return (
    <section aria-label="Technologies we work with" className="py-14 sm:py-16">
      <Container className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <p className="shrink-0 text-center text-[0.875rem] leading-snug text-fg-muted md:max-w-44 md:text-left">
          Built on the platforms leading teams trust
        </p>
        <Marquee duration={45} className="w-full" gapClass="gap-12 pr-12">
          {stack.map((name) => (
            <span key={name} className="flex items-center gap-12 whitespace-nowrap text-[1.375rem] font-medium tracking-[-0.02em] text-ink/35">
              {name}
              <span className="size-1 rounded-full bg-ink/20" />
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
