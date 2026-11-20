import React from 'react';
import { cn } from '@/lib/utils';
import { SectionProps } from '@/types';

/**
 * Auto-layout Section container enforcing Raka vertical rhythm:
 * - Mobile: 64px (space-8)
 * - Tablet: 96px (space-9)
 * - Desktop: 128px (space-10)
 */
export function Section({
  children,
  background = 'snow',
  paddingY = 'normal',
  className,
}: SectionProps) {
  const bgMap = {
    snow: 'bg-raka-snow',
    paper: 'bg-raka-paper',
    linen: 'bg-raka-linen',
    'alpenglow-tint': 'bg-raka-alpenglow-tint',
  };

  const paddingMap = {
    tight: 'py-space-6 tablet:py-space-7 desktop:py-space-8',
    normal: 'raka-section-spacing',
    relaxed: 'py-space-8 tablet:py-space-9 desktop:py-space-10',
    none: 'py-0',
  };

  return (
    <section className={cn('w-full', bgMap[background], paddingMap[paddingY], className)}>
      {children}
    </section>
  );
}
