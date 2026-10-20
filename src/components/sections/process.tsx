"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { process } from "@/content/company";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";

/**
 * Pinned horizontal scroll on large screens; a simple vertical list on small ones.
 * The horizontal distance is measured, so on mobile (flex-col) it is 0 and nothing pins.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - track.clientWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pinned = distance > 0;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-night text-white"
      style={pinned ? { height: distance + vh } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "py-24"}>
        <Container className="flex flex-col gap-6 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow tone="light">How we work</Eyebrow>
            <MaskLines
              lines={["From first call to", <span key="2" className="accent-serif">launch and beyond.</span>]}
              className="text-h2"
            />
          </div>
          <div className="flex max-w-sm flex-col gap-5">
            <p className="text-night-muted">
              A clear, repeatable process with a working release every week. You always know what&apos;s shipping, what&apos;s next and what it costs.
            </p>
            <div className="hidden h-px w-full bg-night-line lg:block">
              <motion.div style={{ width: progressWidth }} className="h-px bg-accent" />
            </div>
          </div>
        </Container>

        <div className="container-x overflow-visible">
          <motion.div
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className="flex flex-col gap-3 lg:flex-row lg:gap-4"
          >
            {process.map((p) => (
              <article
                key={p.step}
                className="group flex shrink-0 flex-col justify-between gap-10 rounded-xl border border-night-line bg-night-raised p-7 transition-colors duration-500 hover:border-white/20 sm:p-8 lg:h-[min(56svh,460px)] lg:w-[420px]"
              >
                <div className="flex flex-col gap-10">
                  <div className="flex items-start justify-between">
                    <span className="text-[4.5rem] font-medium leading-none tracking-[-0.05em] text-white/12 transition-colors duration-500 group-hover:text-accent">
                      {p.step}
                    </span>
                    <span className="rounded-full border border-night-line px-3 py-1 text-[0.75rem] text-night-muted">{p.timing}</span>
                  </div>
                  <h3 className="text-h3">{p.title}</h3>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-night-muted">{p.body}</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.outputs.map((o) => (
                      <li key={o} className="rounded-full bg-white/5 px-3 py-1.5 text-[0.75rem] text-white/75">
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
