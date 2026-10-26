import React from 'react';
import Image from 'next/image';
import { StarIcon, PlayIcon } from '@/components/icons';
import { VIDEO_REVIEWS } from '@/lib/homepage-data';

export function VideoReviewsSection() {
  return (
    <section aria-labelledby="video-reviews-heading" className="max-w-[1360px] mx-auto px-6 pt-20">
      <div className="bg-raka-paper border border-raka-sand rounded-card p-[clamp(24px,4vw,48px)] flex flex-wrap gap-9">
        {/* Left Column: Summary & Honest Disclaimer */}
        <div className="flex-1 basis-[280px] flex flex-col gap-4">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
            Video reviews
          </span>
          <h2
            id="video-reviews-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
          >
            Real hair.{' '}
            <span className="font-display italic text-raka-copper-deep">Real routines.</span>
          </h2>
          <p className="m-0 text-[15px] leading-[1.6] text-raka-bark">
            Customers film their oil night and tell you how it went, good and bad. Every review is from a verified order.
          </p>

          <div className="flex items-center gap-2.5">
            <span className="text-[30px] font-extrabold text-raka-ink">[4.X]</span>
            <div className="flex gap-0.5" aria-label="Average rating placeholder">
              <StarIcon size={18} fill="#CF8F63" />
              <StarIcon size={18} fill="#CF8F63" />
              <StarIcon size={18} fill="#CF8F63" />
              <StarIcon size={18} fill="#CF8F63" />
              <StarIcon size={18} fill="#E4D8CA" />
            </div>
            <span className="text-[13px] text-raka-taupe">[N] reviews</span>
          </div>

          <span className="self-start px-3 py-2 rounded-crisp bg-raka-warning-bg text-raka-warning-text text-[12px] font-bold">
            Layout preview: slots fill with verified customer videos after launch
          </span>
        </div>

        {/* Right Column: Customer Video Slots */}
        <div className="rk-scroll flex-[2_1_560px] grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-3.5 overflow-x-auto min-w-0 pb-1">
          {VIDEO_REVIEWS.map((review, idx) => (
            <div key={`review-${idx}`} className="flex flex-col gap-2.5">
              <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-raka-linen group">
                <Image
                  src={review.poster}
                  alt=""
                  fill
                  className="object-cover object-[center_25%] saturate-[0.85] transition-transform duration-base group-hover:scale-105"
                  sizes="200px"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-capsule bg-white/90 flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
                    <PlayIcon size={20} fill="#14110F" className="ml-1" />
                  </span>
                </span>
                <span className="absolute left-2.5 bottom-2.5 px-2 py-1 rounded-crisp bg-raka-paper text-raka-ink text-[11px] font-bold shadow-sm select-none">
                  Customer video slot
                </span>
              </div>
              <span className="text-[14px] font-bold text-raka-ink">
                {review.customerName}, {review.location}
              </span>
              <span className="text-[13px] text-raka-taupe">
                Verified buyer · {review.product}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
