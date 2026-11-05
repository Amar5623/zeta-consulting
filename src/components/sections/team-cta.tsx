import { Mail, Phone } from "lucide-react";
import { contactHref, mailtoHref, site, telHref } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

/** Mid-page "talk to the team" band: the project form, or a direct email or call. */
export function TeamCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-10 rounded-xl border border-line bg-white p-6 shadow-card sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-h3">
                Talk directly with <span className="accent-serif">our team.</span>
              </p>
              <p className="max-w-lg text-fg-muted">
                No sales layer. Send the project form, or write and call us directly. A senior engineer reads every message and replies within
                one business day.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Button href={contactHref} arrow>
                Start a project
              </Button>
              <Button href={mailtoHref} variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" strokeWidth={1.75} /> Email us
                </span>
              </Button>
              <Button href={telHref} variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4" strokeWidth={1.75} /> {site.phoneDisplay}
                </span>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
