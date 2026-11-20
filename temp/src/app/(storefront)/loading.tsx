import React from 'react';
import { Container } from '@/components/layout/Container';

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh] bg-raka-snow">
      <Container className="flex flex-col items-center justify-center gap-4">
        {/* Animated Rakaposhi Ridge Loader */}
        <div className="animate-pulse" aria-label="Loading content">
          <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
            <path
              d="M1 27 L12 14 L17 18 L27 4 L33 11 L37 8 L47 27"
              stroke="#CF8F63"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[13px] font-semibold text-raka-taupe tracking-wider uppercase">
          RAKA
        </span>
      </Container>
    </div>
  );
}
