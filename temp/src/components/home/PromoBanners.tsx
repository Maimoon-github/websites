import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function PromoBanners() {
  return (
    <section aria-label="Featured collections" className="max-w-[1360px] mx-auto px-6 pt-[72px] grid grid-cols-1 md:grid-cols-2 gap-[18px]">
      {/* Banner 1: Night Ritual set */}
      <Link
        href="/shop"
        className="rk-card relative block rounded-card overflow-hidden min-h-[24rem] no-underline text-raka-ink bg-raka-alpenglow-tint group"
      >
        <div className="absolute right-0 bottom-0 h-full w-[62%]">
          <Image
            src="/home/e401f83c5a5cbba87dd7b5efdf04e5e3.jpg"
            alt="Woman with long glossy dark hair running a hand through it"
            fill
            className="object-cover object-[center_top]"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
        </div>
        <div className="relative p-8 max-w-[56%] flex flex-col gap-3.5 h-full box-border z-10">
          <span className="self-start px-2.5 py-1.5 rounded-crisp bg-raka-ink text-raka-paper text-[11px] font-extrabold tracking-[0.12em] uppercase">
            Night Ritual set
          </span>
          <span className="font-display font-normal text-[clamp(2rem,3vw,2.8rem)] leading-none text-raka-ink">
            Oil in. Silk on.{' '}
            <span className="font-display italic text-raka-copper-deep">Sleep.</span>
          </span>
          <span className="text-[15px] leading-[1.5] text-raka-bark">
            Treatment oil, mulberry silk bonnet and scrunchies in a velvet-lined box.
          </span>
          <span className="mt-auto text-[15px] font-extrabold text-raka-ink underline underline-offset-[5px] group-hover:text-raka-copper-deep transition-colors">
            Shop the set
          </span>
        </div>
      </Link>

      {/* Banner 2: Sialkot steel */}
      <Link
        href="/shop"
        className="rk-card relative block rounded-card overflow-hidden min-h-[24rem] no-underline text-raka-ink bg-raka-ink group"
      >
        <div className="absolute inset-0 bg-[#2A2420] flex items-center justify-end pr-[8%]">
          <div className="w-[46%] aspect-[3/4] rounded-card border border-dashed border-[#8C7B6C] flex items-center justify-center text-center text-[#D9CFC3] text-[12px] font-semibold px-4 box-border">
            [Photo: open leather case, 7 rose-gold instruments]
          </div>
        </div>
        <div className="relative p-8 max-w-[52%] flex flex-col gap-3.5 h-full box-border z-10">
          <span className="self-start px-2.5 py-1.5 rounded-crisp bg-raka-alpenglow text-raka-ink text-[11px] font-extrabold tracking-[0.12em] uppercase">
            Sialkot steel
          </span>
          <span className="font-display font-normal text-[clamp(2rem,3vw,2.8rem)] leading-none text-raka-paper">
            The Signature{' '}
            <span className="font-display italic text-raka-alpenglow">Manicure Set</span>
          </span>
          <span className="text-[15px] leading-[1.5] text-raka-sand">
            Seven Japanese J2 steel instruments in a full-grain leather case. Monogram it.
          </span>
          <span className="mt-auto text-[15px] font-extrabold text-raka-paper underline underline-offset-[5px] group-hover:text-raka-alpenglow transition-colors">
            Shop mani-pedi
          </span>
        </div>
      </Link>
    </section>
  );
}
