import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-raka-snow py-space-9">
      <Container className="flex flex-col items-center justify-center text-center gap-space-4 max-w-[500px]">
        <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-raka-copper-deep">
          404 · Page Not Found
        </span>

        <h1 className="font-display text-[48px] tablet:text-[64px] leading-tight text-raka-ink">
          The trail has <em className="raka-italic-turn font-normal">rested.</em>
        </h1>

        <p className="text-[16px] text-raka-bark leading-relaxed">
          The page you are looking for has moved or does not exist. The ritual starts at the summit.
        </p>

        <div className="pt-space-3">
          <Link href="/" className="no-underline">
            <Button variant="primary-buy" size="medium">
              Return to home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
