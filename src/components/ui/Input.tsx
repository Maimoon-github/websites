import React from 'react';
import { cn } from '@/lib/utils';
import { InputProps } from '@/types';

/**
 * Standard RAKA Form Input component.
 * Features:
 * - 48px height, 2px crisp radius, 14px horizontal padding.
 * - Focus state: 2px solid Copper Deep (#8E5530).
 * - Optional Pakistan phone input format with fixed +92 country pill.
 */
export function Input({
  label,
  helperText,
  error,
  isPakistanPhone = false,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-semibold text-raka-ink">
          {label}
        </label>
      )}

      {isPakistanPhone ? (
        <div className="flex items-center h-12 w-full border border-raka-sand rounded-crisp bg-raka-paper overflow-hidden focus-within:border-2 focus-within:border-raka-copper-deep">
          <span className="px-3 py-2 bg-raka-linen/50 text-raka-ink text-[15px] font-semibold border-r border-raka-sand select-none">
            +92
          </span>
          <input
            id={inputId}
            type="tel"
            maxLength={11}
            placeholder="331 7000000"
            className={cn(
              'flex-1 h-full px-3 text-[16px] text-raka-ink bg-transparent focus:outline-none placeholder:text-raka-taupe/60',
              className
            )}
            {...props}
          />
        </div>
      ) : (
        <input
          id={inputId}
          className={cn(
            'h-12 w-full px-3.5 text-[16px] text-raka-ink bg-raka-paper border border-raka-sand rounded-crisp transition-colors focus:outline-none focus:border-2 focus:border-raka-copper-deep placeholder:text-raka-taupe/60',
            error && 'border-raka-error-text',
            className
          )}
          {...props}
        />
      )}

      {error ? (
        <span className="text-[12px] text-raka-error-text">{error}</span>
      ) : helperText ? (
        <span className="text-[12px] text-raka-taupe">{helperText}</span>
      ) : null}
    </div>
  );
}
