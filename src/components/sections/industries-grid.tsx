import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/content/industries";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** Compact index of all industries; each cell inverts to ink on hover. */
export function IndustriesGrid() {
  return (
    <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4" stagger={0.04}>
      {industries.map((i) => (
        <div key={i.slug} className="bg-white">
          <StaggerItem className="h-full">
            <Link
              href={`/industries/${i.slug}`}
              className="group relative isolate flex h-full min-h-40 flex-col justify-between gap-6 overflow-hidden p-4 sm:min-h-44 sm:gap-8 sm:p-7"
            >
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-canvas transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white">
                  <i.icon className="size-5" strokeWidth={1.6} />
                </span>
                <ArrowUpRight
                  className="size-5 text-fg-subtle transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-white"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.8125rem] tabular-nums text-fg-subtle transition-colors duration-500 group-hover:text-white/50">{i.number}</span>
                <span className="text-[0.9375rem] leading-snug transition-colors duration-500 group-hover:text-white sm:text-[1.125rem]">{i.name}</span>
              </div>
            </Link>
          </StaggerItem>
        </div>
      ))}
    </Stagger>
  );
}
