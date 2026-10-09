'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Timer, Zap, Aperture, Users, Film, Sparkles, Sliders } from 'lucide-react';

export const WhyChooseMeSection: React.FC = () => {
  const { data } = usePortfolio();
  const { why } = data;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'timer':
        return <Timer className="w-8 h-8 text-[#e22718]" />;
      case 'zap':
        return <Zap className="w-8 h-8 text-[#e22718]" />;
      case 'aperture':
        return <Aperture className="w-8 h-8 text-[#e22718]" />;
      case 'users':
        return <Users className="w-8 h-8 text-[#e22718]" />;
      case 'film':
        return <Film className="w-8 h-8 text-[#e22718]" />;
      case 'sparkles':
        return <Sparkles className="w-8 h-8 text-[#e22718]" />;
      default:
        return <Sliders className="w-8 h-8 text-[#e22718]" />;
    }
  };

  return (
    <section
      id="why"
      aria-label="Why Choose Ayesha Amin"
      className="py-12 sm:py-18 lg:py-20 bg-[#050505] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-8">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3.5">
              <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">04</span>
              <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#e6e6e6]">
                Competitive Advantage
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[0.92]">
              SPEED, RETENTION & OBSESSION OVER DETAILS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9a9a9a] max-w-md font-light leading-relaxed">
            Why premier creators and high-growth brands rely on me for their primary content pipeline.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {why.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 bg-[#0a0a0a] border border-[#262626] hover:border-[#e22718] transition-all duration-300 ease-spring hover:-translate-y-1.5 flex flex-col justify-between min-h-[250px] group shadow-lg hover:shadow-2xl hover:shadow-[#e22718]/20 will-change-transform"
            >
              {/* Card Top: Icon & Number */}
              <div className="flex items-start justify-between">
                <div className="p-2 bg-[#141414] border border-[#262626] group-hover:border-[#e22718]/60 group-hover:scale-110 transition-all duration-300 ease-overshoot">
                  {renderIcon(item.icon)}
                </div>
                <span className="font-mono text-xs font-bold text-[#555] group-hover:text-[#e22718] transition-colors">
                  {item.num}
                </span>
              </div>

              {/* Card Bottom: Title & Description */}
              <div className="space-y-1.5 mt-6">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-tight group-hover:text-[#e22718] transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9a9a9a] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
