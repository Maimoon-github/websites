'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Plus, Play } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { data, openVideoLightbox } = usePortfolio();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { services, videos } = data;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handlePlaySample = (sampleTitle: string) => {
    const matched = videos.find((v) => v.title.toLowerCase().includes(sampleTitle.toLowerCase())) || videos[0];
    if (matched) {
      openVideoLightbox(matched);
    }
  };

  return (
    <section
      id="services"
      aria-label="Video Editing Services"
      className="pt-[clamp(48px,6vw,88px)] pb-[clamp(56px,7vw,100px)] bg-[#0a0a0a] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-8">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3.5">
              <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">03</span>
              <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
              <span className="text-[13px] font-bold tracking-[2px] uppercase text-[#e6e6e6]">
                Capabilities & Deliverables
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(40px,5vw,80px)] leading-[0.92] text-white uppercase">
              WHAT I BRING TO YOUR VISION
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9a9a9a] max-w-md font-light leading-relaxed">
            Full-pipeline video post-production tailored to elevate your metrics, audience retention, and brand aesthetics.
          </p>
        </div>

        {/* Services Accordion List */}
        <div className="border-y border-[#3c3c3c] divide-y divide-[#262626]">
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={service.id} className="transition-colors duration-200">
                {/* Accordion Trigger Button */}
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${service.id}`}
                    className="w-full py-5 sm:py-6 flex items-start justify-between gap-6 sm:gap-10 text-left group cursor-pointer"
                  >
                    <div className="flex items-start gap-4 sm:gap-8">
                      <span className="font-display font-bold text-[clamp(18px,1.6vw,24px)] leading-[1.6] text-[#e22718] mt-1 shrink-0">
                        {service.num}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="font-display font-extrabold text-[clamp(30px,4vw,64px)] leading-[0.95] text-white uppercase group-hover:text-[#e22718] transition-colors">
                          {service.title}
                        </span>
                        <span className="text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-[#bbbbbb] font-light max-w-2xl">
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Circular Expanding Icon Indicator */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ease-spring ${
                        isOpen
                          ? 'bg-[#c8200f] border-[#c8200f] text-white rotate-45 scale-105'
                          : 'bg-transparent border-[#3c3c3c] text-[#bbbbbb] group-hover:border-white group-hover:text-white'
                      }`}
                    >
                      <Plus className="w-5 h-5 transition-transform duration-300 ease-spring" />
                    </div>
                  </button>
                </h3>

                {/* Collapsible Panel Content */}
                {isOpen && (
                  <div
                    id={`service-panel-${service.id}`}
                    role="region"
                    className="pb-8 sm:pb-10 pl-8 sm:pl-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-in-up duration-300"
                  >
                    {/* Left: Detailed Overview */}
                    <div className="lg:col-span-5 space-y-3">
                      <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white">
                        Post-Production Scope
                      </h4>
                      <p className="text-[clamp(16px,1.2vw,18px)] leading-[1.65] text-[#e6e6e6] font-light">
                        {service.description}
                      </p>
                    </div>

                    {/* Middle: Included Deliverables Checklist */}
                    <div className="lg:col-span-4 space-y-3">
                      <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white">
                        What's Included
                      </h4>
                      <ul className="space-y-2 text-[16px] leading-[1.5] text-[#bbbbbb]">
                        {service.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e22718] mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Sample Video Showcase links */}
                    <div className="lg:col-span-3 space-y-3">
                      <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white">
                        Selected Sample Cuts
                      </h4>
                      <div className="space-y-2">
                        {service.samples && service.samples.length > 0 ? (
                          service.samples.map((sample, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handlePlaySample(sample)}
                              className="w-full text-left p-2.5 bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#e22718] transition-colors flex items-center justify-between text-xs text-white group cursor-pointer"
                            >
                              <span className="truncate pr-2">{sample}</span>
                              <Play className="w-3 h-3 text-[#e22718] shrink-0 group-hover:scale-125 transition-transform" />
                            </button>
                          ))
                        ) : (
                          <p className="text-xs text-[#7e7e7e]">Samples linked in Selected Work section.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
