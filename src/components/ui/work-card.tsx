import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIndustry } from "@/content/industries";
import type { CaseStudy } from "@/content/work";
import { cn } from "@/lib/utils";
import { CaseVisual } from "@/components/visuals/case-visual";
import { StatusChip } from "./status-chip";

export function WorkCard({ item, className }: { item: CaseStudy; className?: string }) {
  const industry = getIndustry(item.industry);
  return (
    <Link href={`/work/${item.slug}`} className={cn("group flex flex-col gap-5", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <CaseVisual
          item={item}
          className="aspect-[4/3] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.75rem] backdrop-blur">{industry?.short}</span>
        <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" strokeWidth={1.5} />
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <StatusChip status={item.status} className="w-fit" />
        <h3 className="text-h4">{item.title}</h3>
        <p className="line-clamp-2 text-[0.9375rem] text-fg-muted">{item.summary}</p>
      </div>
    </Link>
  );
}
