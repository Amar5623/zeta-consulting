"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "./ease";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
  span: motion.span,
};

const line: Variants = {
  hidden: { y: "105%" },
  show: (delay: number) => ({ y: "0%", transition: { duration: 1.1, ease: easeOutExpo, delay } }),
};

type MaskLinesProps = {
  lines: ReactNode[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** "mount" animates immediately (hero), "view" waits until scrolled into view. */
  trigger?: "mount" | "view";
};

/**
 * Editorial headline reveal: each line slides up from behind a mask.
 * Lines are authored explicitly so line breaks stay intentional.
 * The in-view observer sits on the outer element — the inner spans start clipped.
 */
export function MaskLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "view",
}: MaskLinesProps) {
  const Comp = tags[as];
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <Comp className={className} initial="hidden" {...play}>
      {lines.map((content, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.12em] -mb-[0.12em]", lineClassName)}>
          <motion.span className="block will-change-transform" variants={line} custom={delay + i * stagger}>
            {content}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
