import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

/**
 * Root Storefront Scaffold.
 * Configured with auto-layout primitives based on RAKA design tokens.
 */
export default function StorefrontHomePage() {
  return (
    <Section background="snow" paddingY="normal">
      <Container className="text-center flex flex-col items-center justify-center gap-space-6 py-space-8">
        <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-raka-copper-deep">
          RAKA · Purely powerful
        </span>

        <h1 className="font-display text-[48px] tablet:text-[64px] laptop:text-[86px] leading-[1.05] tracking-[-0.015em] max-w-[800px] text-raka-ink">
          Raise the <em className="raka-italic-turn font-normal">standard.</em>
        </h1>

        <p className="font-interface text-[16px] tablet:text-[18px] text-raka-bark max-w-[560px] leading-[1.6]">
          Snow-bright ground, warm copper accents and a little alpenglow for play.
          Clean enough to read every ingredient, styled enough to feel like a fashion editorial.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-space-4 mt-space-2">
          <Button variant="primary-buy" size="large">
            Join the First Circle
          </Button>
          <Button variant="outline-explore" size="large">
            Explore the ritual
          </Button>
        </div>
      </Container>
    </Section>
  );
}
