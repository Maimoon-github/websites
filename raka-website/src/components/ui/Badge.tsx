import React from "react";
import { cn } from "@/lib/utils";
import { BadgeProps } from "@/types";
import { SparkleIcon } from "@/components/icons";

/**
 * RAKA Badge Primitive
 * - Typography: 11px uppercase, font-weight 700, tracking 0.14em, padding 4px 8px.
 * - Radius: 2px (crisp).
 * - Authentic claims only: no fabricated ratings or bestsellers.
 */
export function Badge({ variant = "new", text, className }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] rounded-crisp select-none leading-none";

  const variants = {
    new: "bg-raka-ink text-raka-paper",
    "first-circle": "bg-raka-alpenglow-tint text-raka-ink",
    offer: "bg-raka-ember text-raka-paper",
    spec: "bg-raka-paper text-raka-bark border border-raka-sand",
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {variant === "first-circle" && <SparkleIcon size={11} fill="#8E5530" />}
      <span>{text}</span>
    </span>
  );
}
