'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/icons';
import { useCart } from '@/lib/cart-context';
import { HERO_SLIDES } from '@/lib/homepage-data';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToBag } = useCart();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section aria-label="Featured" className="max-w-[1360px] mx-auto px-6 pt-5">
      <div className="relative rounded-card overflow-hidden bg-raka-alpenglow-tint min-h-[34rem]">
        {/* Slide 0: Launch Hero */}
        {currentSlide === 0 && (
          <div className="flex flex-wrap min-h-[34rem]">
            <div className="flex-1 basis-[440px] p-[clamp(32px,5vw,72px)] flex flex-col justify-center gap-[22px] box-border">
              <span className="self-start px-3 py-1.5 rounded-capsule bg-raka-paper text-[12px] font-bold tracking-[0.12em] uppercase text-raka-ink shadow-sm">
                ✦ New season, new ritual
              </span>
              <h1 className="m-0 font-display font-normal text-[clamp(3rem,6vw,5.6rem)] leading-[0.96] tracking-[-0.015em] text-raka-ink">
                Your hair ritual,{' '}
                <span className="font-display italic text-raka-copper-deep">upgraded.</span>
              </h1>
              <p className="m-0 text-[18px] leading-[1.55] text-raka-bark max-w-[30rem]">
                Treatment oils, mulberry silk and hand-carved tools. Everything for oil night, in one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/shop"
                  className="h-[52px] px-[30px] rounded-crisp bg-raka-ink text-raka-paper text-[15px] font-bold tracking-[0.03em] no-underline inline-flex items-center hover:bg-[#2B2420] transition-colors"
                >
                  Shop the ritual
                </Link>
                <Link
                  href="#sets"
                  className="h-[52px] px-[26px] rounded-crisp border border-raka-ink text-raka-ink text-[15px] font-bold tracking-[0.03em] no-underline inline-flex items-center hover:bg-raka-copper-wash transition-colors"
                >
                  See gift sets
                </Link>
              </div>
            </div>

            <div className="flex-1 basis-[440px] relative min-h-[26rem]">
              <Image
                src="/home/55a4c1509fc7c6420b93d2021009bc12.jpg"
                alt="Laughing woman with long wavy hair on a rooftop at golden hour"
                fill
                priority
                className="object-cover object-[center_22%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Floating Hero Product Badge */}
              <div className="absolute left-5 bottom-5 flex items-center gap-3 bg-raka-paper rounded-card p-2.5 pr-3.5 shadow-e2 z-10">
                <div className="w-[44px] h-[60px] bg-[#EEEAE5] rounded-crisp overflow-hidden relative flex-none">
                  <Image
                    src="/brand/hair-fall-control-oil.jpg"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="44px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-raka-ink">Hair Fall Control Oil</span>
                  <span className="text-[13px] text-raka-taupe">200 ml · Rs [PRICE]</span>
                </div>
                <button
                  type="button"
                  onClick={() => addToBag('Hair Fall Control Oil')}
                  aria-label="Add Hair Fall Control Oil to bag"
                  className="w-10 h-10 ml-1 border-none rounded-capsule bg-raka-copper text-raka-ink flex items-center justify-center hover:bg-[#B87B52] transition-colors focus-visible:outline-none"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Slide 1: Eid and Wedding Season */}
        {currentSlide === 1 && (
          <div className="relative min-h-[34rem] flex items-end">
            <Image
              src="/home/9b91388e19a99e3df567ff5319f8f5e9.jpg"
              alt="Three women in festive outfits with long, glossy hair"
              fill
              className="object-cover object-[center_30%]"
              sizes="100vw"
            />
            <div className="relative m-[clamp(20px,4vw,48px)] bg-raka-paper rounded-card p-[clamp(24px,3vw,40px)] max-w-[30rem] flex flex-col gap-4 shadow-e2 z-10">
              <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
                Eid and wedding season
              </span>
              <h2 className="m-0 font-display font-normal text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-raka-ink">
                Gifts that feel{' '}
                <span className="font-display italic text-raka-copper-deep">personal.</span>
              </h2>
              <p className="m-0 text-[16px] leading-[1.55] text-raka-bark">
                Rigid gift boxes, foil stamped, with a name card. Add engraving to combs and tools.
              </p>
              <Link
                href="#sets"
                className="self-start h-[50px] px-[26px] rounded-crisp bg-raka-ink text-raka-paper text-[15px] font-bold no-underline inline-flex items-center hover:bg-[#2B2420] transition-colors"
              >
                Shop gift sets
              </Link>
            </div>
          </div>
        )}

        {/* Slide 2: Starter Kit Duo */}
        {currentSlide === 2 && (
          <div className="flex flex-wrap min-h-[34rem] bg-raka-linen">
            <div className="flex-1 basis-[420px] flex items-center justify-center p-6 box-border relative min-h-[20rem]">
              <div className="relative w-full h-[30rem] max-w-[28rem]">
                <Image
                  src="/home/05d03053f2e8215c0d19b91b54c53aad.jpg"
                  alt="RAKA Hair Fall Control Treatment Oil with its printed gift box"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="flex-1 basis-[420px] p-[clamp(32px,5vw,72px)] flex flex-col justify-center gap-5 box-border">
              <span className="self-start px-3 py-1.5 rounded-crisp bg-raka-ink text-raka-paper text-[11px] font-bold tracking-[0.14em] uppercase">
                Ritual Starter
              </span>
              <h2 className="m-0 font-display font-normal text-[clamp(2.6rem,5vw,4.4rem)] leading-none text-raka-ink">
                Oil, applicator, comb.{' '}
                <span className="font-display italic text-raka-copper-deep">Done.</span>
              </h2>
              <p className="m-0 text-[17px] leading-[1.55] text-raka-bark max-w-[28rem]">
                Treatment oil, precision applicator and a hand-carved neem comb in one magnetic box.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-[26px] font-extrabold text-raka-ink">Rs [SET PRICE]</span>
                <span className="text-[15px] text-raka-taupe line-through">Rs [VALUE]</span>
              </div>
              <button
                type="button"
                onClick={() => addToBag('Ritual Starter set')}
                className="self-start h-[52px] px-[30px] rounded-crisp bg-raka-copper text-raka-ink text-[15px] font-bold no-underline inline-flex items-center hover:bg-[#B87B52] transition-colors focus-visible:outline-none"
              >
                Get the set
              </button>
            </div>
          </div>
        )}

        {/* Slide Controls (Prev / Next Buttons) */}
        <div className="absolute right-5 top-5 flex gap-2 z-20">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous banner"
            className="w-11 h-11 rounded-capsule border-none bg-raka-paper text-raka-ink flex items-center justify-center shadow-e1 hover:bg-raka-snow transition-all focus-visible:outline-none"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            className="w-11 h-11 rounded-capsule border-none bg-raka-paper text-raka-ink flex items-center justify-center shadow-e1 hover:bg-raka-snow transition-all focus-visible:outline-none"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-1.5 bg-raka-paper/85 px-2.5 py-2 rounded-capsule z-20">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Show banner ${idx + 1}`}
              className="h-2.5 p-0 border-none rounded-capsule transition-all duration-base focus-visible:outline-none"
              style={{
                width: idx === currentSlide ? '28px' : '10px',
                backgroundColor: idx === currentSlide ? '#14110F' : '#CDBFAF',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
