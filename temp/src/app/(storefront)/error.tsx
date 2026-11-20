'use client';

import React, { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh] bg-raka-snow py-space-9">
      <Container className="flex flex-col items-center justify-center text-center gap-space-4 max-w-[500px]">
        <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-raka-error-text">
          System Notice
        </span>

        <h1 className="font-display text-[40px] tablet:text-[52px] leading-tight text-raka-ink">
          A momentary <em className="raka-italic-turn font-normal">pause.</em>
        </h1>

        <p className="text-[16px] text-raka-bark leading-relaxed">
          Something unexpected happened while preparing this view. Let us resume the ritual.
        </p>

        <div className="pt-space-3">
          <Button variant="primary-buy" size="medium" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </Container>
    </div>
  );
}
