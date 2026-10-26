import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';

/**
 * Standard RAKA button primitive.
 * Enforces:
 * - Heights: Large (52px), Medium (44px minimum touch target).
 * - Typography: 15px Manrope, font-weight 600, tracking 0.04em.
 * - Corner Radius: 2px (crisp).
 * - Single filled button per view rule.
 */
export function Button({
  children,
  variant = 'primary-buy',
  size = 'large',
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-interface text-[15px] font-semibold tracking-[0.04em] rounded-crisp transition-colors duration-fast ease-silk focus-visible:outline-2 focus-visible:outline-raka-copper-deep focus-visible:outline-offset-[3px] select-none';

  const sizeStyles = {
    large: 'h-[52px] px-7 gap-2.5',
    medium: 'h-[44px] px-5 gap-2',
  };

  const variantStyles = {
    'primary-buy': 'bg-raka-ink text-raka-paper hover:bg-[#2B2420] active:scale-[0.99]',
    'copper-join': 'bg-raka-copper text-raka-ink hover:bg-[#B87B52] active:scale-[0.99]',
    'outline-explore': 'bg-transparent text-raka-ink border border-raka-ink hover:bg-raka-copper-wash active:scale-[0.99]',
    disabled: 'bg-raka-sand text-raka-taupe cursor-not-allowed border-none',
  };

  const activeVariant = disabled ? 'disabled' : variant;

  return (
    <button
      disabled={disabled}
      className={cn(baseStyles, sizeStyles[size], variantStyles[activeVariant], className)}
      {...props}
    >
      {icon && <span className="flex-none flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
