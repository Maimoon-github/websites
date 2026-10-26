import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/types';

/**
 * Auto-layout Card Primitive
 * - Standard 6px radius
 * - Paper or Alpenglow tint ground
 * - Ink-tinted elevation levels (e0, e1, e2, e3)
 */
export function Card({
  children,
  surface = 'paper',
  elevation = 'e0',
  radius = 'card',
  className,
}: CardProps) {
  const surfaceClasses = {
    paper: 'bg-raka-paper border border-raka-sand',
    'alpenglow-tint': 'bg-raka-alpenglow-tint border-none',
  };

  const elevationClasses = {
    e0: 'shadow-none',
    e1: 'shadow-e1 hover:shadow-e2 transition-shadow duration-fast ease-silk',
    e2: 'shadow-e2',
    e3: 'shadow-e3',
  };

  const radiusClasses = {
    crisp: 'rounded-crisp',
    card: 'rounded-card',
    capsule: 'rounded-capsule',
  };

  return (
    <div
      className={cn(
        'overflow-hidden',
        radiusClasses[radius],
        surfaceClasses[surface],
        elevationClasses[elevation],
        className
      )}
    >
      {children}
    </div>
  );
}
