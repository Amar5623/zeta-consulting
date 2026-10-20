"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";

/** Oversized wordmark that rises into place as the footer scrolls in. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none select-none overflow-hidden">
      <motion.p
        style={{
          y,
          opacity,
          backgroundImage: "linear-gradient(180deg, rgb(255 255 255 / 0.18), rgb(255 255 255 / 0.02) 85%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
        className="-mb-[0.18em] text-center text-[27vw] font-semibold leading-[0.8] tracking-[-0.07em]"
      >
        zeta
      </motion.p>
    </div>
  );
}

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-1.5 hover:text-white"
    >
      Back to top
      <ArrowUp className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
    </button>
  );
}

const noopSubscribe = () => () => {};

/** Current year, read only on the client so the prerendered shell stays static. */
export function Year() {
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => null);
  return <>{year}</>;
}
