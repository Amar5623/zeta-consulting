import type { ReactNode } from "react";

/**
 * Turns a content title into headline lines: "|" starts a new line and *text* becomes the serif accent.
 * e.g. "Search is evolving.|*Your strategy should too.*"
 */
export function richLines(title: string): ReactNode[] {
  return title.split("|").map((line, li) =>
    line.split(/(\*[^*]+\*)/g).map((part, pi) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={`${li}-${pi}`} className="accent-serif">
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      ),
    ),
  );
}
