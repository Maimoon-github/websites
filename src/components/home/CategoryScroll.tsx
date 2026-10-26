import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/homepage-data';

export function CategoryScroll() {
  return (
    <section aria-labelledby="shop-by-category-heading" className="max-w-[1360px] mx-auto px-6 pt-[72px]">
      <div className="flex justify-between items-end gap-4 flex-wrap mb-6">
        <h2
          id="shop-by-category-heading"
          className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
        >
          Shop by{' '}
          <span className="font-display italic text-raka-copper-deep">category</span>
        </h2>
        <Link
          href="/shop"
          className="text-[14px] font-bold text-raka-copper-deep hover:text-raka-ink py-2.5 transition-colors no-underline"
        >
          View all 80+ products
        </Link>
      </div>

      <div className="rk-scroll grid grid-flow-col auto-cols-[minmax(132px,1fr)] gap-4 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href || '/shop'}
            className="rk-card flex flex-col items-center gap-3 no-underline text-raka-ink group"
          >
            <div
              className="w-full aspect-square rounded-capsule overflow-hidden flex items-center justify-center border border-raka-sand relative box-border"
              style={{ backgroundColor: cat.bg }}
            >
              {cat.img ? (
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: cat.pos || 'center' }}
                  sizes="132px"
                />
              ) : (
                <span className="text-[11px] font-semibold text-raka-taupe text-center px-3.5 select-none">
                  [{cat.name} photo]
                </span>
              )}
            </div>
            <span className="text-[14px] font-bold text-center group-hover:text-raka-copper-deep transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
