"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/content/people";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskLines } from "@/components/motion/mask-lines";
import { easeOutExpo } from "@/components/motion/ease";

const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 40, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (d: number) => ({ opacity: 0, x: d * -40, filter: "blur(6px)" }),
};

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const t = testimonials[index];
  const go = (d: number) => setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d]);

  return (
    <section className="px-2 sm:px-3">
      <div className="rounded-xl bg-canvas py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 lg:col-span-4">
            <div className="flex flex-col gap-5">
              <Eyebrow>Client stories</Eyebrow>
              <MaskLines lines={["Words from", <span key="2" className="accent-serif">the people we build with.</span>]} className="text-h2" />
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-line bg-white transition-colors hover:border-ink hover:bg-ink hover:text-white">
                <ArrowLeft className="size-4" strokeWidth={1.75} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-line bg-white transition-colors hover:border-ink hover:bg-ink hover:text-white">
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </button>
              <span className="ml-2 text-[0.875rem] tabular-nums text-fg-muted">
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-8">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: easeOutExpo }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="flex cursor-grab flex-col gap-10 rounded-xl bg-white p-8 shadow-card active:cursor-grabbing sm:p-12"
              >
                <span aria-hidden className="accent-serif -mb-6 block h-12 text-[6rem] leading-[0.9] text-accent">
                  &ldquo;
                </span>
                <blockquote className="text-h3 leading-[1.3]">{t.quote}</blockquote>
                <figcaption className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full bg-canvas text-[0.875rem] font-medium text-fg-muted">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-[0.875rem] text-fg-muted">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-h3 font-medium">{t.metric.value}</p>
                    <p className="text-[0.8125rem] text-fg-muted">{t.metric.label}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}
