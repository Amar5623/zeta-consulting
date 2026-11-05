import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

type Crumb = { label: string; href: string };

/** Framed canvas hero used at the top of every inner page. Breadcrumb JSON-LD comes from each route's schema graph. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode[];
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];

  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className={cn("relative overflow-hidden rounded-xl bg-canvas pb-16 pt-36 sm:pb-24 sm:pt-44", className)}>
        <div aria-hidden className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_60%_70%_at_80%_0%,black,transparent)]" />
        <Container className="relative flex flex-col gap-8">
          {crumbs.length > 0 ? (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-fg-muted">
                  {trail.map((c, i) => (
                    <li key={c.href} className="flex items-center gap-1.5">
                      {i > 0 && <ChevronRight className="size-3.5 text-fg-subtle" />}
                      {i === trail.length - 1 ? (
                        <span aria-current="page" className="text-ink">
                          {c.label}
                        </span>
                      ) : (
                        <Link href={c.href} className="hover:text-ink">
                          {c.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          ) : (
            eyebrow && (
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            )
          )}
          <MaskLines id="page-title" as="h1" trigger="mount" delay={0.1} lines={title} className="max-w-5xl text-h1" />
          {description && (
            <Reveal delay={0.3} className="max-w-2xl">
              <p className="text-lead text-fg-muted">{description}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.4}>{children}</Reveal>}
        </Container>
      </div>
    </section>
  );
}

/** Same footprint as PageHero — shown while a dynamic page's params resolve during client navigation. */
export function PageHeroFallback() {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3" aria-busy>
      <div className="min-h-[70svh] rounded-xl bg-canvas" />
    </section>
  );
}
