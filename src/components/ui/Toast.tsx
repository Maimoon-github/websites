'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ToastProps {
  message?: string;
  actionText?: string;
  actionHref?: string;
  durationMs?: number;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Toast Component:
 * - The ONE permitted dark Ink surface (#14110F).
 * - Fixed bottom position with e3 shadow.
 * - Auto-dismisses after 4 seconds (4000ms).
 */
export function Toast({
  message = 'Added to your bag',
  actionText = 'View bag',
  actionHref = '/cart',
  durationMs = 4000,
  onDismiss,
  className,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-raka-ink text-raka-paper rounded-card px-4 py-3.5 shadow-e3 max-w-[90vw] w-[380px] raka-reveal-init',
        className
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CF8F63"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="flex-none"
      >
        <path d="M5 12l5 5 9-10" />
      </svg>

      <span className="flex-1 text-[14px] text-raka-paper font-normal">{message}</span>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="text-[14px] font-semibold text-raka-alpenglow hover:text-raka-copper transition-colors no-underline"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
