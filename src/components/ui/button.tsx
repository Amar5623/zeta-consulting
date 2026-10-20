import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "light" | "ghost-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-pill hover:bg-ink-soft",
  secondary: "bg-surface text-ink border border-muted shadow-pill-light hover:border-line hover:bg-canvas/60",
  accent: "bg-accent text-white shadow-pill hover:brightness-105",
  light: "bg-white text-ink hover:bg-white/90",
  "ghost-light": "bg-white/5 text-white border border-night-line hover:bg-white/10",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-white/12 text-white",
  secondary: "bg-ink text-white",
  accent: "bg-white/20 text-white",
  light: "bg-ink text-white",
  "ghost-light": "bg-white text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-12 pl-5 pr-5 text-[0.9375rem] gap-2.5",
  lg: "h-14 pl-7 pr-7 text-[1.0625rem] gap-3",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Show the circular arrow badge. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (({ href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">));

/** Label that rolls up to a duplicate copy on hover. */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

export function Button({ variant = "primary", size = "lg", arrow = false, className, children, ...props }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-normal transition-[background-color,border-color,box-shadow,filter] duration-300 active:scale-[0.98]",
    sizes[size],
    variants[variant],
    arrow && (size === "lg" ? "pr-2" : "pr-1.5"),
    className,
  );

  const content = (
    <>
      <RollText>{children}</RollText>
      {arrow && (
        <span
          className={cn(
            "grid place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45",
            size === "lg" ? "size-10" : "size-9",
            iconWrap[variant],
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ComponentProps<"button">;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}

/** Low-emphasis inline link with underline + arrow. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 font-normal", className)}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
    </Link>
  );
}
