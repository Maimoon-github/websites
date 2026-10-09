'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowRight, FileText } from 'lucide-react';
import { ResumeModal } from '../modals/ResumeModal';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section
      id="about"
      aria-label="About Ayesha Amin"
      className="pt-[clamp(72px,8.5vw,130px)] pb-[clamp(50px,6vw,90px)] bg-[#0a0a0a] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header Label */}
        <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
          <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">01</span>
          <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
          <span className="text-[13px] font-bold tracking-[2px] uppercase text-[#e6e6e6]">
            {about.label.replace('01 — ', '')}
          </span>
        </div>

        {/* 2-Column Split: Image on Left / Story & Philosophy on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Portrait & Stats Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[8/7] max-w-[640px] bg-[#1a1a1a] overflow-hidden border border-[#3c3c3c] shadow-2xl">
              <img
                src={about.image}
                alt={about.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"
              />

              {/* In-Frame Stat Callout Badge */}
              {about.statsHighlight && (
                <div className="absolute bottom-3 left-3 right-3 p-3.5 bg-[#050505]/90 border border-[#3c3c3c] backdrop-blur-md">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#e22718]">
                      {about.statsHighlight.value}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wider text-white">
                      Verified Views
                    </span>
                  </div>
                  <p className="text-xs text-[#9a9a9a] mt-0.5 leading-snug">
                    {about.statsHighlight.label}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Experience Badges below image */}
            <div className="grid grid-cols-2 gap-3 mt-3.5">
              <div className="p-3 bg-[#111111] border border-[#262626] hover:border-[#e22718]/60 hover:-translate-y-0.5 transition-all duration-300 ease-spring">
                <span className="block text-base sm:text-lg font-extrabold font-display text-white">5+ YEARS</span>
                <span className="text-[10px] sm:text-[11px] text-[#7e7e7e] uppercase tracking-wider">Professional NLE Experience</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#262626] hover:border-[#e22718]/60 hover:-translate-y-0.5 transition-all duration-300 ease-spring">
                <span className="block text-base sm:text-lg font-extrabold font-display text-white">100% ON-TIME</span>
                <span className="text-[10px] sm:text-[11px] text-[#7e7e7e] uppercase tracking-wider">Milestone Delivery Rate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Body, Philosophy & Capabilities */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 max-w-[680px]">
            <h2 className="font-display font-extrabold text-[clamp(48px,6.5vw,112px)] leading-[0.92] tracking-[-0.5px] text-white uppercase">
              {about.heading}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-3 text-[16px] leading-[1.6] text-[#bbbbbb] font-light">
              {about.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Skills / Toolset Breakdown */}
            <div className="pt-4 border-t border-[#3c3c3c] space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-[#e6e6e6]">
                Software Mastery & Core Disciplines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {about.skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="p-3 bg-[#111111] border border-[#262626] hover:border-[#e22718]/60 hover:-translate-y-0.5 transition-all duration-300 ease-spring flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-[#e22718] uppercase tracking-wider">
                      {skillGroup.category}
                    </span>
                    <ul className="text-xs text-[#d0d0d0] space-y-1 font-normal">
                      {skillGroup.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#7e7e7e]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Line & Actions */}
            <div className="pt-5 border-t border-[#3c3c3c] flex flex-wrap items-center gap-5 sm:gap-8">
              <p className="font-display font-bold text-[clamp(24px,2vw,32px)] leading-[1.1] text-white uppercase flex-1 min-w-[260px]">
                "{about.closing}"
              </p>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="group inline-flex items-center gap-2.5 h-[46px] sm:h-[48px] px-6 bg-[#141414] hover:bg-[#202020] border border-[#3c3c3c] hover:border-white text-white text-[14px] font-bold tracking-[1.5px] uppercase transition-all duration-300 ease-spring active:scale-[0.97] cursor-pointer will-change-transform"
                >
                  <FileText className="w-4 h-4 text-[#e22718] transition-transform duration-300 group-hover:scale-110" />
                  <span>View CV / Resume</span>
                </button>

                <a
                  href="#services"
                  className="group inline-flex items-center gap-2.5 h-[46px] sm:h-[48px] px-6 bg-transparent border border-white hover:bg-white hover:text-[#050505] text-white text-[14px] font-bold tracking-[1.5px] uppercase transition-all duration-300 ease-spring active:scale-[0.97] will-change-transform"
                >
                  <span>{about.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Viewer Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};
