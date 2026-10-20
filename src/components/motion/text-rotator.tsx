"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "./ease";

/** Cycles through words in place. All words share one grid cell so the width never jumps. */
export function TextRotator({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    <span className={cn("relative inline-grid overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom", className)}>
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
          {w}
        </span>
      ))}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
