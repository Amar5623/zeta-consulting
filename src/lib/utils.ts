import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { site } from "@/content/site";

// Teach tailwind-merge about the custom type-scale tokens in globals.css, so `text-h2` isn't
// mistaken for a text colour and dropped when merged with e.g. `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "label"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Serialize JSON-LD safely for a <script> tag (escapes `<` to prevent injection). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
