import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "./primitives";

/** Eyebrow + masked headline + optional description and action, used to open most sections. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "split",
  tone = "dark",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode[];
  description?: ReactNode;
  action?: ReactNode;
  align?: "split" | "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        align === "split" && "lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex max-w-4xl flex-col gap-5", centered && "items-center")}>
        {eyebrow && (
          <Reveal>
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <MaskLines as={as} lines={title} className={cn(as === "h1" ? "text-h1" : "text-h2", tone === "light" && "text-white")} />
      </div>
      {(description || action) && (
        <Reveal delay={0.15} className={cn("flex max-w-md flex-col items-start gap-6", centered && "items-center", align === "split" && "lg:pb-2")}>
          {description && <p className={cn("text-lead", tone === "dark" ? "text-fg-muted" : "text-night-muted")}>{description}</p>}
          {action}
        </Reveal>
      )}
    </div>
  );
}
