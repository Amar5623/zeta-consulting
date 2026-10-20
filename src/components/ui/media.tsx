import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders an image when `src` is set; otherwise a designed placeholder so layouts
 * look intentional before real assets arrive.
 */
export function Media({
  src,
  alt,
  label,
  tint = "#ECEDF1",
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority,
}: {
  src?: string;
  alt: string;
  label?: string;
  tint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative isolate overflow-hidden bg-dots", className)}
      style={{ backgroundColor: tint }}
    >
      {/* crop marks */}
      <span className="absolute left-4 top-4 size-3 border-l border-t border-ink/20" />
      <span className="absolute right-4 top-4 size-3 border-r border-t border-ink/20" />
      <span className="absolute bottom-4 left-4 size-3 border-b border-l border-ink/20" />
      <span className="absolute bottom-4 right-4 size-3 border-b border-r border-ink/20" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[0.75rem] text-fg-muted backdrop-blur-sm">
          <ImageIcon className="size-3.5" strokeWidth={1.75} />
          {label ?? "Image placeholder"}
        </div>
      </div>
    </div>
  );
}
