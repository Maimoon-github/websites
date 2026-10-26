import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONCERN_ITEMS } from '@/lib/homepage-data';

export function ConcernSection() {
  return (
    <section id="concerns" aria-labelledby="concern-heading" className="max-w-[1360px] mx-auto px-6 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] items-stretch">
        {/* Left Side: Editorial Concern Photo */}
        <div className="rounded-card overflow-hidden bg-[#E9B23B] min-h-[22rem] relative">
          <Image
            src="/home/e46df3bd632e47504e215058a2f4bbf0.jpg"
            alt="What is your biggest hair concern: frizz, dryness, hair fall or hair damage"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Side: Concern Selection Card */}
        <div className="bg-raka-paper border border-raka-sand rounded-card p-[clamp(24px,4vw,44px)] flex flex-col gap-[18px]">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
            Shop by concern
          </span>
          <h2
            id="concern-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
          >
            What is your hair{' '}
            <span className="font-display italic text-raka-copper-deep">telling you?</span>
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            {CONCERN_ITEMS.map((concern) => (
              <Link
                key={concern.name}
                href="/shop"
                className="flex justify-between items-center min-h-[56px] px-4 rounded-card text-raka-ink no-underline text-[15px] font-bold hover:scale-[1.02] active:scale-[0.99] transition-all"
                style={{ backgroundColor: concern.bg }}
              >
                <span>{concern.name}</span>
                <span aria-hidden="true" className="text-raka-ink font-normal text-[18px]">
                  →
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/quiz"
            className="mt-auto self-start h-[50px] px-6 rounded-crisp bg-raka-ink text-raka-paper text-[15px] font-bold no-underline inline-flex items-center hover:bg-[#2B2420] transition-colors"
          >
            Take the 1-minute hair quiz
          </Link>
        </div>
      </div>
    </section>
  );
}
