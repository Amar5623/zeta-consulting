"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { heroHighlights } from "@/content/company";
import { easeOutExpo } from "@/components/motion/ease";

/** Highlights that cycle above the headline, one at a time. */
export function HeroHighlights() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroHighlights.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  const item = heroHighlights[index];

  return (
    <div className="flex h-12 items-center justify-center" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.text}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex items-center gap-3.5"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-white shadow-pill-light">
            <item.icon className="size-5" strokeWidth={1.6} />
          </span>
          <span className="text-[1.0625rem] text-ink/80">{item.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Hero cursor: a solid dot with hairline crosshairs that track the pointer across the hero.
 * Mouse only. The dot steps aside over links and buttons so the native pointer shows.
 */
export function CursorField({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });
  const [active, setActive] = useState(false);
  const [overTarget, setOverTarget] = useState(false);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    setActive(true);
    setOverTarget(!!(e.target as HTMLElement).closest("a, button"));
  }

  return (
    <div className={`relative md:cursor-none ${className ?? ""}`} onPointerMove={onMove} onPointerLeave={() => setActive(false)}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <motion.div
          className="absolute inset-y-0 left-0 w-px bg-ink/10"
          style={{ x }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-ink/10"
          style={{ y }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
          <motion.span
            className="block size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            animate={{ scale: active && !overTarget ? 1 : 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          />
        </motion.div>
      </div>
    </div>
  );
}
