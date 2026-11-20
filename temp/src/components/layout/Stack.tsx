import React from 'react';
import { cn } from '@/lib/utils';
import { StackProps } from '@/types';

/**
 * Auto-layout Flexbox Stack Primitive with tokenized gap scales.
 */
export function Stack({
  children,
  direction = 'vertical',
  gap = '4',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
}: StackProps) {
  const gapMap = {
    '1': 'gap-space-1',
    '2': 'gap-space-2',
    '3': 'gap-space-3',
    '4': 'gap-space-4',
    '5': 'gap-space-5',
    '6': 'gap-space-6',
    '7': 'gap-space-7',
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  );
}
