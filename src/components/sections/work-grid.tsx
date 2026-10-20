"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { caseStudies, workCategories } from "@/content/work";
import { cn } from "@/lib/utils";
import { WorkCard } from "@/components/ui/work-card";
import { easeOutExpo } from "@/components/motion/ease";

const filters = ["All", ...workCategories] as const;

/** Filterable, staggered two-column case study grid. */
export function WorkGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = filter === "All" ? caseStudies : caseStudies.filter((c) => c.category === filter);

  return (
    <div className="flex flex-col gap-12">
      <div role="toolbar" aria-label="Filter case studies" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const count = f === "All" ? caseStudies.length : caseStudies.filter((c) => c.category === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.875rem] transition-colors duration-300",
                active ? "border-ink text-white" : "border-line text-ink hover:border-fg-subtle",
              )}
            >
              {active && <motion.span layoutId="work-filter" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ duration: 0.5, ease: easeOutExpo }} />}
              <span className="relative">{f}</span>
              <span className={cn("relative text-[0.75rem] tabular-nums", active ? "text-white/60" : "text-fg-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-x-4 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: Math.min(i, 4) * 0.05 }}
              className={cn(i % 2 === 1 && "md:mt-24")}
            >
              <WorkCard item={item} aspect={i % 4 === 0 || i % 4 === 3 ? "aspect-[4/5]" : "aspect-[4/3]"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
