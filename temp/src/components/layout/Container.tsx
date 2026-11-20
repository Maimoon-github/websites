import React from 'react';
import { cn } from '@/lib/utils';
import { ContainerProps } from '@/types';

/**
 * Auto-layout container enforcing Raka responsive horizontal padding:
 * - Mobile (0–599px): 20px margin
 * - Tablet (600–1023px): 32px margin
 * - Laptop (1024–1279px): 48px margin
 * - Desktop (1280px+): 80px margin (Max content: 1280px)
 */
export function Container({
  children,
  as: Component = 'div',
  noPadding = false,
  className,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full mx-auto max-w-content-max',
        !noPadding && 'px-5 tablet:px-8 laptop:px-12 desktop:px-20',
        className
      )}
    >
      {children}
    </Component>
  );
}
