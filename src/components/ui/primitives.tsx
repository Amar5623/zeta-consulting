import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

/** Section label — a quiet outlined pill in sentence case, e.g. "What we do". */
export function Eyebrow({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-[0.9375rem] leading-6",
        tone === "dark" ? "border-line bg-white text-ink/80" : "border-night-line bg-white/5 text-white/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chip({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-[0.8125rem] leading-none whitespace-nowrap",
        tone === "light" && "bg-surface text-ink border border-line",
        tone === "outline" && "border border-line text-fg-muted",
        tone === "dark" && "border border-night-line bg-white/5 text-white/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
