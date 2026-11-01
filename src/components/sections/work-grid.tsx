"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/ease";

type GridEntry = { slug: string; industry: string; card: ReactNode };

/**
 * Filterable, staggered two-column case study grid.
 * Cards are rendered on the server and passed in; this component only handles filtering and motion.
 */
export function WorkGrid({ entries, filters }: { entries: GridEntry[]; filters: { slug: string; label: string }[] }) {
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? entries : entries.filter((e) => e.industry === filter);
  const options = [{ slug: "all", label: "All industries" }, ...filters];

  return (
    <div className="flex flex-col gap-12">
      <div role="toolbar" aria-label="Filter case studies by industry" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((f) => {
          const count = f.slug === "all" ? entries.length : entries.filter((e) => e.industry === f.slug).length;
          const active = filter === f.slug;
          return (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.slug)}
              className={cn(
                "relative isolate inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.875rem] transition-colors duration-300",
                active ? "border-ink text-white" : "border-line text-ink hover:border-fg-subtle",
              )}
            >
              {active && <motion.span layoutId="work-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ duration: 0.5, ease: easeOutExpo }} />}
              <span>{f.label}</span>
              <span className={cn("text-[0.75rem] tabular-nums", active ? "text-white/60" : "text-fg-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-x-4 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((entry, i) => (
            <motion.div
              key={entry.slug}
              layout
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: Math.min(i, 4) * 0.05 }}
              className={cn(i % 2 === 1 && "md:mt-24")}
            >
              {entry.card}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
