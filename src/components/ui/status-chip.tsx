import { statusMeta, type CaseStatus } from "@/content/work";
import { cn } from "@/lib/utils";

/** Labels how far a case study has progressed, so the site never overstates delivered work. */
export function StatusChip({ status, className, tone = "light" }: { status: CaseStatus; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      title={statusMeta[status].description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8125rem] leading-none whitespace-nowrap",
        tone === "light" ? "border border-line bg-white text-ink/80" : "border border-night-line bg-white/5 text-white/80",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", status === "discovery" ? "bg-[#F5A524]" : status === "reference" ? "bg-[#38BDF8]" : "bg-fg-subtle")} />
      {statusMeta[status].label}
    </span>
  );
}
