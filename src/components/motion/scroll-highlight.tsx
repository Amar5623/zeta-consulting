"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("inline-block", accent && "accent-serif")}>
      {children}
    </motion.span>
  );
}

/**
 * Large statement paragraph whose words light up as it scrolls through the viewport.
 * Wrap words in *asterisks* to render them in the serif accent.
 */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words = text.split(" ").map((raw) => {
    const accent = raw.includes("*");
    return { word: raw.replace(/\*/g, ""), accent };
  });

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden className="flex flex-wrap gap-x-[0.26em]">
        {words.map(({ word, accent }, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={accent}
          >
            {word}
          </Word>
        ))}
      </span>
    </p>
  );
}
