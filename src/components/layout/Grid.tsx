import React from 'react';
import { cn } from '@/lib/utils';
import { GridProps } from '@/types';

/**
 * Auto-layout grid system:
 * - When `responsiveProductGrid` is true:
 *   2 columns on mobile, 3 columns on tablet, 4 columns on desktop.
 * - Otherwise configurable with standard column counts.
 */
export function Grid({
  children,
  cols = 12,
  gap = '5',
  responsiveProductGrid = false,
  className,
}: GridProps) {
  if (responsiveProductGrid) {
    return (
      <div className={cn('raka-product-grid', className)}>
        {children}
      </div>
    );
  }

  const gapClasses: Record<string, string> = {
    '1': 'gap-space-1',
    '2': 'gap-space-2',
    '3': 'gap-space-3',
    '4': 'gap-space-4',
    '5': 'gap-space-5',
    '6': 'gap-space-6',
    '7': 'gap-space-7',
    '8': 'gap-space-8',
  };

  const colClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 tablet:grid-cols-2',
    3: 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3',
    4: 'grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4',
    6: 'grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-6',
    8: 'grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8',
    12: 'grid-cols-4 tablet:grid-cols-8 laptop:grid-cols-12',
  };

  return (
    <div className={cn('grid', colClasses[cols] || 'grid-cols-12', gapClasses[gap], className)}>
      {children}
    </div>
  );
}
