import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function StoryBand() {
  return (
    <section aria-labelledby="story-band-heading" className="pt-20">
      <div className="relative overflow-hidden bg-raka-linen">
        <div className="relative w-full h-[18rem]">
          <Image
            src="/home/7e389b98bdb21f3c6a00fb62b4a8b153.jpg"
            alt="Rakaposhi peak in the Karakoram"
            fill
            className="object-cover opacity-90"
            sizes="100vw"
          />
        </div>
        <div className="max-w-[1360px] mx-auto px-6 pt-9 pb-12 flex flex-wrap gap-7 justify-between items-end">
          <h2
            id="story-band-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.02] max-w-[40rem] text-raka-ink"
          >
            Named after Rakaposhi. Made across{' '}
            <span className="font-display italic text-raka-copper-deep">Pakistan.</span>
          </h2>
          <Link
            href="/story"
            className="text-[15px] font-bold text-raka-copper-deep hover:text-raka-ink py-2.5 transition-colors no-underline"
          >
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
