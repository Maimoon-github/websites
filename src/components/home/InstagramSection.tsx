import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InstagramIcon } from '@/components/icons';
import { INSTAGRAM_POSTS } from '@/lib/homepage-data';

export function InstagramSection() {
  return (
    <section aria-labelledby="instagram-heading" className="max-w-[1360px] mx-auto px-6 pt-20">
      <div className="flex justify-between items-end gap-4 flex-wrap mb-[22px]">
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
            On Instagram
          </span>
          <h2
            id="instagram-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
          >
            Join{' '}
            <span className="font-display italic text-raka-copper-deep">the hair social</span>
          </h2>
        </div>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="h-[46px] px-5 rounded-capsule border border-raka-ink text-raka-ink text-[14px] font-bold no-underline inline-flex items-center gap-2 hover:bg-raka-copper-wash transition-colors"
        >
          <InstagramIcon size={18} />
          <span>[@raka handle]</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 laptop:grid-cols-8 gap-2">
        {INSTAGRAM_POSTS.map((src, index) => (
          <Link
            key={`ig-${index}`}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram post"
            className="rk-card block aspect-[4/5] rounded-crisp overflow-hidden bg-raka-linen relative group"
          >
            <Image
              src={src}
              alt="RAKA Instagram community post"
              fill
              className="object-cover object-[center_top]"
              sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
