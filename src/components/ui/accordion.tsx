"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/ease";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, tone = "light", defaultOpen = 0 }: { items: AccordionItem[]; tone?: "light" | "dark"; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("border-t", tone === "light" ? "border-line" : "border-night-line")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q} className={cn("border-b", tone === "light" ? "border-line" : "border-night-line")}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.0625rem] leading-snug sm:text-h4"
              >
                <span className="transition-colors duration-300 group-hover:text-accent">{item.q}</span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-out-expo",
                    tone === "light" ? "border-line" : "border-night-line",
                    isOpen && "rotate-45 border-ink bg-ink text-white",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-2xl pb-7 pr-12 text-body", tone === "light" ? "text-fg-muted" : "text-night-muted")}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
