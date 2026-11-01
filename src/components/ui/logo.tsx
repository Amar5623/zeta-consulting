import Link from "next/link";
import { cn } from "@/lib/utils";
import { ZETA_MARK_PATH, ZETA_MARK_VIEWBOX } from "./zeta-mark";

/** The faceted Zeta "Z" mark. Inherits the current text colour. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox={ZETA_MARK_VIEWBOX} className={cn("size-9", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path fill="currentColor" fillRule="evenodd" d={ZETA_MARK_PATH} />
    </svg>
  );
}

/** Primary horizontal lockup: mark + stacked "ZETA / Consulting" wordmark, per the logo system. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Zeta Consulting — home"
      className={cn("group inline-flex items-center gap-2.5", tone === "light" ? "text-white" : "text-ink", className)}
    >
      <LogoMark className="size-[2.375rem] transition-transform duration-700 ease-out-expo group-hover:-rotate-6" />
      <span className="flex flex-col font-brand leading-none">
        <span className="text-[1.3125rem] font-bold tracking-[0.04em]">ZETA</span>
        <span className="mt-[3px] text-[0.75rem] font-normal tracking-[0.07em]">Consulting</span>
      </span>
    </Link>
  );
}
