'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, PlusIcon } from '@/components/icons';
import { useCart } from '@/lib/cart-context';
import { REELS } from '@/lib/homepage-data';

export function ReelsSection() {
  const { addToBag } = useCart();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Autoplay muted videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay policy graceful catch
          });
        }
      }
    });
  }, []);

  return (
    <section aria-labelledby="reels-heading" className="pt-20">
      <div className="max-w-[1360px] mx-auto px-6 flex justify-between items-end gap-4 flex-wrap mb-[22px]">
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
            RAKA reels · The Hair Social
          </span>
          <h2
            id="reels-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
          >
            Watch it.{' '}
            <span className="font-display italic text-raka-copper-deep">Shop it.</span>
          </h2>
        </div>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-bold text-raka-copper-deep hover:text-raka-ink py-2.5 transition-colors no-underline"
        >
          Follow on Instagram
        </Link>
      </div>

      <div className="rk-scroll flex gap-3.5 overflow-x-auto px-6 pb-2 max-w-[1360px] mx-auto box-border">
        {REELS.map((reel, index) => (
          <div
            key={`reel-${index}`}
            className="flex-[0_0_212px] flex flex-col gap-2"
          >
            {/* 9:16 Aspect Ratio Video Box */}
            <div className="relative aspect-[9/16] rounded-card overflow-hidden bg-raka-linen">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={reel.src}
                poster={reel.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={reel.alt}
                className="w-full h-full object-cover block"
              />
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-capsule bg-white/90 text-[11px] font-bold text-raka-ink select-none shadow-sm">
                <PlayIcon size={10} fill="#14110F" aria-hidden="true" />
                <span>{reel.views}</span>
              </span>
            </div>

            {/* Attached Product Action Card */}
            <div className="flex items-center gap-2.5 bg-raka-paper border border-raka-sand rounded-card p-2 shadow-sm">
              <span className="w-9 h-11 flex-none rounded-crisp bg-[#EEEAE5] overflow-hidden flex items-end justify-center relative">
                <Image
                  src="/brand/hair-fall-control-oil.jpg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </span>
              <span className="flex-1 min-w-0 flex flex-col">
                <span className="text-[12px] font-bold text-raka-ink truncate">
                  {reel.product}
                </span>
                <span className="text-[12px] text-raka-taupe">Rs [PRICE]</span>
              </span>
              <button
                type="button"
                onClick={() => addToBag(reel.product)}
                aria-label={`Add ${reel.product} to bag`}
                className="w-9 h-9 min-w-[36px] min-h-[36px] flex-none rounded-capsule border-none bg-raka-copper text-raka-ink flex items-center justify-center hover:bg-[#B87B52] active:scale-95 transition-all focus-visible:outline-none"
              >
                <PlusIcon size={14} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
