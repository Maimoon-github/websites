import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategoryScroll } from '@/components/home/CategoryScroll';
import { LaunchEditSection } from '@/components/home/LaunchEditSection';
import { PromoBanners } from '@/components/home/PromoBanners';
import { IngredientBadges } from '@/components/home/IngredientBadges';
import { ReelsSection } from '@/components/home/ReelsSection';
import { ConcernSection } from '@/components/home/ConcernSection';
import { GiftSetsSection } from '@/components/home/GiftSetsSection';
import { VideoReviewsSection } from '@/components/home/VideoReviewsSection';
import { JournalSection } from '@/components/home/JournalSection';
import { InstagramSection } from '@/components/home/InstagramSection';
import { StoryBand } from '@/components/home/StoryBand';
import { NewsletterSection } from '@/components/home/NewsletterSection';

/**
 * RAKA Brand Storefront Home Page.
 * Faithfully translates Design-TOKEN/07 Store homepage-html/Home.dc.html
 * into production-ready, accessible, responsive Next.js UI following
 * the master design tokens.
 */
export default function StorefrontHomePage() {
  return (
    <div className="w-full pb-10 flex flex-col">
      {/* 1. Hero banner slider with 3 interactive slides */}
      <HeroSlider />

      {/* 2. Post-hero trust strip with 4 pillars */}
      <TrustStrip />

      {/* 3. Shop by category circular carousel */}
      <CategoryScroll />

      {/* 4. The Launch Edit product carousel with category tabs */}
      <LaunchEditSection />

      {/* 5. Feature promo duo: Night Ritual & Sialkot steel */}
      <PromoBanners />

      {/* 6. Ingredient & formulation promise badges */}
      <IngredientBadges />

      {/* 7. RAKA reels · The Hair Social with looping muted videos */}
      <ReelsSection />

      {/* 8. Shop by concern interactive module */}
      <ConcernSection />

      {/* 9. Sets & bundles ready to give */}
      <GiftSetsSection />

      {/* 10. Customer video reviews preview */}
      <VideoReviewsSection />

      {/* 11. Editorial hair journal articles */}
      <JournalSection />

      {/* 12. Instagram community gallery */}
      <InstagramSection />

      {/* 13. Rakaposhi origins story band */}
      <StoryBand />

      {/* 14. First order incentive newsletter */}
      <div className="mt-20">
        <NewsletterSection />
      </div>
    </div>
  );
}
