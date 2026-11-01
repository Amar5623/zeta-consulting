"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import type { CaseStudy } from "@/content/work";
import { Chip } from "@/components/ui/primitives";
import { StatusChip } from "@/components/ui/status-chip";

type StackItem = { item: CaseStudy; industry: string; visual: ReactNode };

/**
 * Case studies that pin and stack on top of each other while scrolling.
 * Visuals are rendered on the server and passed in, so this client component stays light.
 */
export function WorkStack({ items }: { items: StackItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {items.map((entry, i) => (
        <StackCard
          key={entry.item.slug}
          entry={entry}
          index={i}
          progress={scrollYProgress}
          range={[i / items.length, 1]}
          targetScale={1 - (items.length - 1 - i) * 0.045}
        />
      ))}
    </div>
  );
}

function StackCard({
  entry,
  index,
  progress,
  range,
  targetScale,
}: {
  entry: StackItem;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const { item, industry, visual } = entry;
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, (1 - targetScale) * 1.1]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center py-6" style={{ paddingTop: `calc(5.5rem + ${index * 22}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "50% 0%" }}
        className="relative w-full overflow-hidden rounded-xl border border-line bg-white shadow-card"
      >
        <Link href={`/work/${item.slug}`} className="group flex h-[min(72svh,620px)] flex-col md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex shrink-0 flex-col justify-between gap-6 p-6 sm:gap-8 sm:p-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="outline">{industry}</Chip>
                <StatusChip status={item.status} />
              </div>
              <h3 className="text-[1.375rem] leading-tight tracking-[-0.02em] sm:text-h3">{item.title}</h3>
              <p className="hidden max-w-sm text-fg-muted sm:block">{item.summary}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border-t border-line pt-5 sm:pt-6">
                <p className="mb-3 text-label text-fg-subtle">What we measure</p>
                <ul className="flex flex-wrap gap-2">
                  {item.kpis.slice(0, 3).map((k) => (
                    <li key={k.area} className="rounded-full bg-canvas px-3 py-1.5 text-[0.8125rem]">
                      {k.area}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="hidden items-center gap-2 text-[0.9375rem] sm:inline-flex">
                <span className="link-underline">Read the case study</span>
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.75} />
              </span>
            </div>
          </div>
          <div className="relative order-first min-h-0 flex-1 overflow-hidden p-2 pb-0 md:order-none md:p-3 md:pl-0">
            <div className="h-full overflow-hidden rounded-lg transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]">{visual}</div>
          </div>
        </Link>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  );
}
