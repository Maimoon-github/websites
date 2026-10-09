'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Plus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { data } = usePortfolio();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqs } = data;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-12 sm:py-18 lg:py-20 bg-[#0a0a0a] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Split Grid: Sticky Headline on Left / Questions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Sticky Title & Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">06</span>
              <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#e6e6e6]">
                Frequently Asked Questions
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight leading-[0.92]">
              EVERYTHING YOU NEED TO KNOW
            </h2>

            <p className="text-xs sm:text-sm text-[#9a9a9a] font-light leading-relaxed max-w-md">
              Have questions regarding turnaround time, project files, music licensing, or custom retainers? Here are the transparent details.
            </p>

            <div className="pt-4 border-t border-[#262626]">
              <p className="text-xs text-[#7e7e7e]">
                Have a unique project scope?{' '}
                <a href="#contact" className="text-[#e22718] underline font-bold">
                  Ask me directly on WhatsApp →
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 border-y border-[#3c3c3c] divide-y divide-[#262626]">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.id} className="transition-colors">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full py-3.5 sm:py-4.5 flex items-center justify-between gap-5 text-left group cursor-pointer"
                    >
                      <span className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-[#e22718] transition-colors">
                        {faq.question}
                      </span>

                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ease-spring ${
                          isOpen
                            ? 'bg-[#c8200f] border-[#c8200f] text-white rotate-45 scale-105'
                            : 'bg-transparent border-[#3c3c3c] text-[#bbbbbb] group-hover:border-white group-hover:text-white'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5 transition-transform duration-300 ease-spring" />
                      </div>
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      className="pb-4 pr-6 text-xs sm:text-sm text-[#bbbbbb] font-light leading-relaxed animate-fade-in-up duration-300"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
