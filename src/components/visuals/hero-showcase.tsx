"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Bot, Check, Globe, Lock, ScanSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { easeOutExpo } from "@/components/motion/ease";

/**
 * Hero product collage: an illustrative glimpse of the three things Zeta ships —
 * agents, products and visibility. Tilts and scales into place on scroll.
 * Set `site.showreel` to replace it with a video.
 */
export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="container-x relative mt-16 pb-3 [perspective:1800px] sm:mt-20 sm:pb-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.6 }}
      >
        <motion.div
          style={{ scale, rotateX, y, transformOrigin: "50% 0%" }}
          className="relative overflow-hidden rounded-xl border border-black/80 bg-night p-2.5 shadow-float sm:p-3"
        >
          {site.showreel ? (
            <video src={site.showreel} autoPlay muted loop playsInline className="aspect-video w-full rounded-lg object-cover" />
          ) : (
            <div className="bg-grid-light relative grid gap-2.5 rounded-lg sm:gap-3 md:grid-cols-12">
              <AgentCard className="md:col-span-6 lg:col-span-4" />
              <ReleaseCard className="hidden lg:col-span-5 lg:flex" />
              <div className="grid gap-2.5 sm:gap-3 md:col-span-6 lg:col-span-3">
                <VisibilityCard />
                <VitalsCard />
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col rounded-lg border border-night-line bg-night-raised p-4 text-left text-white", className)}>{children}</div>;
}

function PanelTitle({ icon: Icon, title, meta }: { icon: typeof Bot; title: string; meta: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="grid size-7 place-items-center rounded-md bg-white/8 text-white">
          <Icon className="size-3.5" strokeWidth={1.75} />
        </span>
        <span className="text-[0.8125rem] font-medium">{title}</span>
      </div>
      <div className="text-[0.6875rem] text-night-muted">{meta}</div>
    </div>
  );
}

/* ---------------- Agent run ---------------- */

const steps = [
  { label: "Read incoming ticket", time: "0.3s" },
  { label: "Classify intent · refund request", time: "0.6s" },
  { label: "Look up order in Shopify", time: "1.1s" },
  { label: "Draft reply using refund policy", time: "2.4s" },
  { label: "Request approval from a human", time: "—" },
];

function AgentCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setActive((a) => (a >= steps.length ? 0 : a + 1)), active >= steps.length ? 2600 : 1000);
    return () => clearTimeout(id);
  }, [active, inView]);

  const done = Math.min(active, steps.length - 1);

  return (
    <Panel className={className}>
      <div ref={ref}>
        <PanelTitle
          icon={Bot}
          title="Support agent"
          meta={
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success" /> Live · run #4821
            </span>
          }
        />
      </div>
      <ol className="mt-5 flex flex-col gap-1">
        {steps.map((s, i) => {
          const state = i < done || (i === steps.length - 1 && active >= steps.length) ? "done" : i === done ? "active" : "idle";
          return (
            <li
              key={s.label}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2 text-[0.8125rem] transition-colors duration-500",
                state === "active" && "bg-white/[0.06]",
                state === "idle" && "text-white/35",
              )}
            >
              <span className="relative grid size-4 shrink-0 place-items-center">
                {state === "done" && (
                  <motion.span initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="grid size-4 place-items-center rounded-full bg-white text-night">
                    <Check className="size-2.5" strokeWidth={3} />
                  </motion.span>
                )}
                {state === "active" && <span className="size-3.5 animate-spin rounded-full border-[1.5px] border-accent border-t-transparent" />}
                {state === "idle" && <span className="size-3.5 rounded-full border border-white/25" />}
              </span>
              <span className="flex-1 truncate">{s.label}</span>
              <span className="tabular-nums text-[0.6875rem] text-night-muted">{state === "done" ? s.time : ""}</span>
            </li>
          );
        })}
      </ol>
      <div className="mt-auto pt-5">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${(Math.min(active, steps.length) / steps.length) * 100}%` }} transition={{ duration: 0.8, ease: easeOutExpo }} />
        </div>
        <div className="mt-3 flex items-center justify-between text-[0.6875rem] text-night-muted">
          <span>Guardrails on · Audit log enabled</span>
          <span className="tabular-nums">
            {Math.min(active, steps.length)}/{steps.length}
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- Product release ---------------- */

const scores = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best practices", value: 100 },
  { label: "SEO", value: 100 },
];

function ReleaseCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <Panel className={cn("gap-4 p-3", className)}>
      <div ref={ref} className="flex items-center gap-3 px-1">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/[0.06] py-1 text-[0.6875rem] text-night-muted">
          <Lock className="size-2.5" /> yourproduct.com
        </div>
        <Globe className="size-3.5 text-night-muted" />
      </div>

      {/* Wireframe of a shipped site */}
      <div className="relative flex-1 overflow-hidden rounded-md bg-[#1b1b1e] p-5">
        <div className="flex items-center justify-between">
          <div className="h-2 w-14 rounded-full bg-white/25" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1.5 w-8 rounded-full bg-white/10" />
            ))}
            <div className="h-1.5 w-10 rounded-full bg-accent/80" />
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2.5">
          <div className="h-3 w-3/5 rounded-full bg-white/30" />
          <div className="h-3 w-2/5 rounded-full bg-white/20" />
          <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/10" />
          <div className="mt-3 flex gap-2">
            <div className="h-5 w-16 rounded-full bg-white/80" />
            <div className="h-5 w-16 rounded-full border border-white/20" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-md border border-white/[0.06] bg-white/[0.03]" />
          ))}
        </div>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 1.4 }}
          className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-md border border-white/10 bg-night/90 px-3 py-2.5 backdrop-blur"
        >
          <span className="grid size-6 place-items-center rounded-full bg-success/15 text-success">
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
          <div className="flex-1">
            <p className="text-[0.75rem] font-medium">Deployed to production</p>
            <p className="text-[0.6875rem] text-night-muted">v2.4.0 · all checks passed</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {scores.map((s, i) => (
          <ScoreRing key={s.label} {...s} play={inView} delay={0.3 + i * 0.12} />
        ))}
      </div>
    </Panel>
  );
}

function ScoreRing({ label, value, play, delay }: { label: string; value: number; play: boolean; delay: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-md bg-white/[0.03] py-2.5">
      <div className="relative size-10">
        <svg viewBox="0 0 36 36" className="size-10 -rotate-90">
          <circle cx="18" cy="18" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="2.5" />
          <motion.circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={play ? { strokeDashoffset: c * (1 - value / 100) } : {}}
            transition={{ duration: 1.6, ease: easeOutExpo, delay }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[0.6875rem] font-medium tabular-nums text-success">{value}</span>
      </div>
      <span className="text-[0.625rem] text-night-muted">{label}</span>
    </div>
  );
}

/* ---------------- AI visibility ---------------- */

const bars = [18, 24, 22, 34, 41, 52, 61, 78];

function VisibilityCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <Panel>
      <div ref={ref}>
        <PanelTitle icon={ScanSearch} title="AI search visibility" meta="Last 8 weeks" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[1.75rem] font-medium leading-none tracking-tight tabular-nums">+212%</p>
          <p className="mt-1.5 text-[0.75rem] text-night-muted">Citations in ChatGPT, Perplexity & Gemini</p>
        </div>
        <span className="rounded-full bg-success/15 px-2 py-1 text-[0.6875rem] text-success">Trending up</span>
      </div>
      <div className="mt-5 flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={cn("flex-1 rounded-sm", i === bars.length - 1 ? "bg-accent" : "bg-white/15")}
            initial={{ height: "6%" }}
            animate={inView ? { height: `${h}%` } : {}}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.5 + i * 0.07 }}
          />
        ))}
      </div>
    </Panel>
  );
}

function VitalsCard() {
  const metrics = [
    { k: "LCP", v: "0.9s" },
    { k: "INP", v: "48ms" },
    { k: "CLS", v: "0.01" },
  ];
  return (
    <Panel className="justify-between gap-4">
      <p className="text-[0.8125rem] font-medium">Core Web Vitals</p>
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div key={m.k} className="rounded-md bg-white/[0.04] px-2.5 py-2">
            <p className="text-[0.625rem] text-night-muted">{m.k}</p>
            <p className="text-[0.9375rem] font-medium tabular-nums">{m.v}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
