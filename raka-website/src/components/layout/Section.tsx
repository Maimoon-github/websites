import React from "react";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types";

/**
 * Auto-layout Section container enforcing RAKA vertical rhythm:
 * - Mobile: 64px (py-16)
 * - Tablet: 96px (tablet:py-24)
 * - Desktop: 128px (desktop:py-32)
 */
export function Section({
  children,
  background = "snow",
  paddingY = "normal",
  className,
}: SectionProps) {
  const bgMap = {
    snow: "bg-raka-snow",
    paper: "bg-raka-paper",
    linen: "bg-raka-linen",
    "alpenglow-tint": "bg-raka-alpenglow-tint",
  };

  const paddingMap = {
    tight: "py-8 tablet:py-12 desktop:py-16",
    normal: "py-16 tablet:py-24 desktop:py-32",
    relaxed: "py-20 tablet:py-28 desktop:py-36",
    none: "py-0",
  };

  return (
    <section className={cn("w-full", bgMap[background], paddingMap[paddingY], className)}>
      {children}
    </section>
  );
}
