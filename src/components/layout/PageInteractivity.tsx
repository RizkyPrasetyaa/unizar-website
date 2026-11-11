"use client";

import { useSectionInteractivity } from "@/hooks/use-section-interactivity";

/**
 * Wraps each page's main content so the original UNIZAR interactivity
 * (sub-nav builder, filter chips, tabs, mock forms, view toggle) runs
 * after every route change. The hook re-wires on DOM mutations too.
 */
export function PageInteractivity({ children }: { children: React.ReactNode }) {
  useSectionInteractivity();
  return <>{children}</>;
}
