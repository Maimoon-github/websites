'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { testimonials } = data;

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="py-12 sm:py-18 lg:py-20 bg-[#0a0a0a] border-t border-[#262626] relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-8">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3.5">
              <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">05</span>
              <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#e6e6e6]">
                Client Reviews & Retention Proof
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[0.92]">
              TRUSTED BY CREATORS & AGENCIES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9a9a9a] max-w-md font-light leading-relaxed">
            Real outcomes from YouTube creators, direct-to-consumer founders, and media agencies worldwide.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="border-t-2 border-[#e22718] pt-6 sm:pt-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start min-h-[170px]">
            {/* Massive Oversized Crimson Quotation Mark */}
            <div className="lg:col-span-2 hidden sm:block">
              <span className="font-display font-extrabold text-5xl lg:text-7xl text-[#e22718] leading-none select-none block">
                “
              </span>
            </div>

            {/* Testimonial Quote & Author Info */}
            <div key={currentIndex} className="lg:col-span-10 flex flex-col justify-between gap-5 animate-fade-in-up">
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white leading-relaxed [text-wrap:pretty]">
                "{current.quote}"
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#262626]">
                <div className="space-y-0.5">
                  <cite className="not-italic text-xs sm:text-sm font-bold text-white uppercase tracking-wider block">
                    {current.name}
                  </cite>
                  <p className="text-xs text-[#7e7e7e]">
                    {current.role} {current.company ? `· ${current.company}` : ''}
                  </p>
                </div>

                {current.metric && (
                  <div className="px-2.5 py-1 bg-[#141414] border border-[#3c3c3c] text-[#e22718] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse-glow">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{current.metric}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Carousel Footer Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-6 pt-4 border-t border-[#1a1a1a]">
            {/* Progress Bars & Index Display */}
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <span className="font-display font-bold text-lg sm:text-xl text-white font-mono">
                {String(currentIndex + 1).padStart(2, '0')}{' '}
                <span className="text-[#555]">/ {String(testimonials.length).padStart(2, '0')}</span>
              </span>

              {/* Step indicator bars */}
              <div className="flex items-center gap-1.5 flex-1 sm:w-48">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="flex-1 h-1.5 bg-[#262626] rounded-none overflow-hidden relative cursor-pointer"
                  >
                    <span
                      className={`absolute inset-0 bg-[#e22718] transition-all duration-500 ease-smooth ${
                        currentIndex === i ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Prev / Next Circular Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#3c3c3c] hover:border-[#e22718] hover:bg-[#c8200f] text-white flex items-center justify-center transition-all duration-300 ease-spring active:scale-[0.92] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#3c3c3c] hover:border-[#e22718] hover:bg-[#c8200f] text-white flex items-center justify-center transition-all duration-300 ease-spring active:scale-[0.92] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
