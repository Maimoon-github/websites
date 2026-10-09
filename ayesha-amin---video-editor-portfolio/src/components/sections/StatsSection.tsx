'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export const StatsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { stats } = data;

  return (
    <section
      id="stats"
      aria-label="Verified Performance Numbers"
      className="py-8 sm:py-11 lg:py-12 bg-[#050505] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat) => (
            <li
              key={stat.id}
              className="relative pt-3 border-t border-[#3c3c3c] flex flex-col gap-1 group hover:-translate-y-1 transition-all duration-300 ease-spring cursor-default will-change-transform"
            >
              {/* Red Top Accent Line */}
              <span
                aria-hidden="true"
                className="absolute top-[-1px] left-0 w-16 h-[2px] bg-[#e22718] group-hover:w-full transition-all duration-500 ease-smooth origin-left"
              />

              {/* Massive Tabular Number Display */}
              <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-none [font-variant-numeric:tabular-nums]">
                <span>{stat.value}</span>
                <span className="text-[#e22718]">{stat.suffix}</span>
              </div>

              {/* Explanatory Label */}
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
