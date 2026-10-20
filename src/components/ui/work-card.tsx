import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/work";
import { cn } from "@/lib/utils";
import { Media } from "./media";

export function WorkCard({ item, className, aspect = "aspect-[4/3]" }: { item: CaseStudy; className?: string; aspect?: string }) {
  return (
    <Link href={`/work/${item.slug}`} className={cn("group flex flex-col gap-5", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <Media
          src={item.cover}
          alt={`${item.title} — cover image`}
          label={`${item.client} · cover image`}
          tint={item.tint}
          className={cn("w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]", aspect)}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.75rem] backdrop-blur">{item.category}</span>
        <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-ink text-white opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" strokeWidth={1.5} />
        </span>
      </div>
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-h4">{item.title}</h3>
          <p className="text-[0.875rem] text-fg-muted">
            {item.client} · {item.industry}
          </p>
        </div>
        <span className="shrink-0 pt-1 text-[0.875rem] tabular-nums text-fg-subtle">{item.year}</span>
      </div>
    </Link>
  );
}
