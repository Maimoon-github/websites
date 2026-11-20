import React from 'react';
import { cn } from '@/lib/utils';
import { ChipProps } from '@/types';

/**
 * Filter Chip Component (Capsule Shape)
 * - Height: 44px (touch safe)
 * - Radius: 9999px (capsule)
 * - Active state: Copper Wash background (#F3E2D5) + Copper border (#CF8F63)
 */
export function Chip({ label, selected = false, className, onClick, ...props }: ChipProps) {
  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'h-11 px-5 rounded-capsule text-[14px] font-medium transition-colors duration-fast ease-silk flex items-center justify-center select-none border focus-visible:outline-2 focus-visible:outline-raka-copper-deep focus-visible:outline-offset-2',
        selected
          ? 'bg-raka-copper-wash border-raka-copper text-raka-ink font-semibold'
          : 'bg-raka-paper border-raka-sand text-raka-ink hover:border-raka-copper',
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}
