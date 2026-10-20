"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState, type PointerEvent } from "react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/ease";

/**
 * Numbered service index. On hover each row inverts to ink, and a preview card
 * with the service's capabilities follows the cursor (pointer devices only).
 */
export function ServicesList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const active = hovered !== null ? services[hovered] : null;

  return (
    <ul className="relative border-t border-line" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      {services.map((s, i) => (
        <motion.li
          key={s.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: (i % 4) * 0.05 }}
          className="border-b border-line"
        >
          <Link
            href={`/services/${s.slug}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            className="group relative isolate grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden py-7 sm:grid-cols-[4rem_1fr_auto] md:py-9 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:gap-8"
          >
            <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100" />
            <span className="pl-0 text-[0.875rem] tabular-nums text-fg-subtle transition-[color,padding] duration-700 ease-out-expo group-hover:pl-4 group-hover:text-white/50">
              {s.number}
            </span>
            <span className="text-h3 transition-[color,transform] duration-700 ease-out-expo group-hover:translate-x-2 group-hover:text-white">{s.title}</span>
            <span className="hidden max-w-md text-[0.9375rem] text-fg-muted transition-colors duration-700 group-hover:text-white/65 lg:block">{s.short}</span>
            <span className="mr-0 grid size-11 place-items-center rounded-full border border-line transition-[transform,background-color,border-color,color,margin] duration-700 ease-out-expo group-hover:mr-4 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-ink">
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </span>
          </Link>
        </motion.li>
      ))}

      {/* Cursor-following preview */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
      >
        <AnimatePresence>
          {active && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="-translate-x-1/2 -translate-y-[115%]"
            >
              <div className="w-72 overflow-hidden rounded-lg bg-white shadow-float ring-1 ring-black/5">
                <div className="bg-dots flex items-center gap-3 bg-canvas p-4">
                  <span className="grid size-10 place-items-center rounded-md bg-accent text-white">
                    <active.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.9375rem] font-medium leading-tight">{active.title}</span>
                </div>
                <ul className="flex flex-col gap-2 p-4">
                  {active.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className={cn("flex items-center gap-2 text-[0.8125rem] text-fg-muted")}>
                      <span className="size-1 rounded-full bg-ink" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ul>
  );
}
