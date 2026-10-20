import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite CSS marquee. Content is rendered twice; pauses on hover. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
  gapClass = "gap-3 pr-3",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  gapClass?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        <div className={cn("flex shrink-0 items-center", gapClass)}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0 items-center", gapClass)}>
          {children}
        </div>
      </div>
    </div>
  );
}
