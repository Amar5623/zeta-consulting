import Link from "next/link";
import { cn } from "@/lib/utils";

/** Placeholder mark — swap the SVG for your final logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path d="M10 10.5h12L10 21.5h12" fill="none" stroke="var(--logo-ink, #fff)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="7.5" r="2.5" fill="#f55c1a" />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Zeta Consulting — home"
      className={cn("group inline-flex items-center gap-2.5", tone === "light" ? "text-white [--logo-ink:#010101]" : "text-ink", className)}
    >
      <LogoMark className="transition-transform duration-700 ease-out-expo group-hover:-rotate-6" />
      <span className="flex items-baseline gap-1.5 text-[1.1875rem] leading-none tracking-[-0.03em]">
        <span className="font-semibold">Zeta</span>
        <span className={cn("font-normal", tone === "light" ? "text-white/55" : "text-fg-muted")}>Consulting</span>
      </span>
    </Link>
  );
}
