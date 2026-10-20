import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <main id="main" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative overflow-hidden rounded-xl bg-canvas py-40 sm:py-56">
        <div aria-hidden className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative flex flex-col items-center gap-8 text-center">
          <Reveal>
            <p className="text-label text-fg-muted">Error 404</p>
          </Reveal>
          <MaskLines as="h1" trigger="mount" className="text-display" lines={["This page", <span key="2" className="accent-serif">wandered off.</span>]} />
          <Reveal delay={0.3}>
            <p className="max-w-md text-lead text-fg-muted">The link may be broken or the page may have moved. Let&apos;s get you back on track.</p>
          </Reveal>
          <Reveal delay={0.4} className="flex flex-wrap justify-center gap-3">
            <Button href="/" arrow>
              Back to home
            </Button>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </Reveal>
        </Container>
      </div>
    </main>
  );
}
