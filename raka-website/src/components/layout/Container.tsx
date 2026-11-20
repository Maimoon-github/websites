import React from "react";
import { cn } from "@/lib/utils";
import { ContainerProps } from "@/types";

/**
 * Auto-layout container enforcing RAKA responsive horizontal padding:
 * - Mobile (0–599px): 20px margin (px-5)
 * - Tablet (600–1023px): 32px margin (px-8)
 * - Laptop (1024–1279px): 48px margin (px-12)
 * - Desktop (1280px+): 80px margin (px-20), max-width 1280px
 */
export function Container({
  children,
  as: Component = "div",
  noPadding = false,
  className,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto max-w-[1280px]",
        !noPadding && "px-5 tablet:px-8 laptop:px-12 desktop:px-20",
        className
      )}
    >
      {children}
    </Component>
  );
}
