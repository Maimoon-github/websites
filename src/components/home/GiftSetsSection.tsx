'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { GIFT_SETS } from '@/lib/homepage-data';

export function GiftSetsSection() {
  const { addToBag } = useCart();

  return (
    <section id="sets" aria-labelledby="gift-sets-heading" className="max-w-[1360px] mx-auto px-6 pt-20">
      <div className="flex justify-between items-end gap-4 flex-wrap mb-[22px]">
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
            Sets and bundles
          </span>
          <h2
            id="gift-sets-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
          >
            Wrapped,{' '}
            <span className="font-display italic text-raka-copper-deep">ready to give</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-[14px] font-bold text-raka-copper-deep hover:text-raka-ink py-2.5 transition-colors no-underline"
        >
          All gift sets
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 laptop:grid-cols-4 gap-[18px]">
        {GIFT_SETS.map((set) => (
          <article
            key={set.name}
            className="rk-card rounded-card overflow-hidden flex flex-col border border-raka-sand group"
            style={{ backgroundColor: set.bg }}
          >
            {/* 1:1 Aspect Ratio Media Header */}
            <div className="aspect-square overflow-hidden flex items-center justify-center relative">
              {set.img ? (
                <Image
                  src={set.img}
                  alt={set.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="w-[70%] aspect-square border border-dashed border-[#A99D90] rounded-card flex items-center justify-center text-center text-[12px] font-semibold text-raka-taupe p-3.5 box-border select-none">
                  [Photo: {set.name}, box open]
                </div>
              )}
              <span className="absolute top-3 left-3 px-2 py-1 rounded-crisp bg-raka-paper text-raka-ink text-[10px] font-extrabold tracking-[0.12em] uppercase shadow-sm select-none">
                {set.tag}
              </span>
            </div>

            {/* Content & Actions */}
            <div className="p-4 pt-4 pb-5 flex flex-col gap-1.5 flex-1">
              <span className="font-display font-normal text-[26px] leading-[1.05] text-raka-ink">
                {set.name}
              </span>
              <span className="text-[13px] leading-[1.45] text-raka-bark line-clamp-2">
                {set.items}
              </span>

              <div className="flex justify-between items-center mt-auto pt-3">
                <span className="text-[16px] font-extrabold text-raka-ink">Rs [PRICE]</span>
                <button
                  type="button"
                  onClick={() => addToBag(set.name)}
                  className="h-10 min-h-[44px] px-4 rounded-capsule border-none bg-raka-ink text-raka-paper font-interface text-[13px] font-bold hover:bg-[#2B2420] active:scale-[0.98] transition-all focus-visible:outline-none"
                >
                  Add set
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
