import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/content/industries";
import { IndustryVisual } from "@/components/visuals/industry-visual";

export function IndustryCard({ industry, as: Heading = "h3" }: { industry: Industry; as?: "h2" | "h3" }) {
  return (
    <Link href={`/industries/${industry.slug}`} className="group flex flex-col gap-5">
      <div className="relative overflow-hidden rounded-lg">
        <IndustryVisual industry={industry} className="aspect-[16/11] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" />
        <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" strokeWidth={1.5} />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-[0.875rem] text-fg-muted">
          <industry.icon className="size-4" strokeWidth={1.6} />
          {industry.number} · {industry.short}
        </p>
        <Heading className="text-h4">{industry.name}</Heading>
        <p className="line-clamp-2 text-[0.9375rem] text-fg-muted">{industry.headline}</p>
      </div>
    </Link>
  );
}
