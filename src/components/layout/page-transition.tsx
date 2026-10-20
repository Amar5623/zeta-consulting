import { ViewTransition, type ReactNode } from "react";

/**
 * Wrap each page's content so route changes cross-fade with a short rise.
 * Must live in page files (not the layout) so enter/exit fire on navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <main id="main">{children}</main>
    </ViewTransition>
  );
}
