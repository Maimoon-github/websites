'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Play } from 'lucide-react';
import { VideoItem } from '@/types/portfolio';

export const ShowreelMarquee: React.FC = () => {
  const { data, openVideoLightbox } = usePortfolio();
  const [isPaused, setIsPaused] = useState(false);
  const reels = data.showreelReels;

  // Duplicate items for continuous seamless loop
  const displayItems = [...reels, ...reels, ...reels];

  const handleOpenReel = (reel: (typeof reels)[0]) => {
    const videoItem: VideoItem = {
      id: reel.id,
      title: reel.title,
      platform: 'reels',
      url: reel.embedUrl,
      embedUrl: reel.embedUrl,
      thumb: reel.thumb || '',
      vertical: true,
      description: reel.platformLabel,
    };
    openVideoLightbox(videoItem);
  };

  return (
    <div className="w-full my-6 relative overflow-hidden">
      {/* Editorial Label for Reel Marquee */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 mb-3 flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#7e7e7e] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#e22718]" />
          Instant Short-Form Reel Previews (Click to Watch)
        </span>
        <span className="text-xs text-[#7e7e7e] hidden sm:inline">
          Hover to pause · 9:16 High-Retention Cuts
        </span>
      </div>

      {/* Marquee Track Container with Vignette Gradient Edges */}
      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-3 sm:gap-4 w-max ${isPaused ? '' : 'animate-reelmarquee'}`}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {displayItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => handleOpenReel(item)}
              className="group relative flex-none w-[clamp(170px,16vw,240px)] aspect-[9/16] bg-[#1a1a1a] overflow-hidden border border-[#262626] hover:border-[#e22718] transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e22718]/25 cursor-pointer shadow-lg will-change-transform"
            >
              {/* Thumbnail Image */}
              {item.thumb ? (
                <img
                  src={item.thumb}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-smooth"
                />
              ) : (
                <div className="w-full h-full bg-[#111111] flex items-center justify-center text-xs text-[#555]">
                  Video Preview
                </div>
              )}

              {/* Bottom Gradient Fade */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none"
              />

              {/* Play Badge Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="w-11 h-11 rounded-full bg-[#e22718] text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 ease-overshoot">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </span>
              </div>

              {/* Platform Label Tag at bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1 pointer-events-none">
                <span className="self-start text-[11px] font-bold tracking-[1.5px] uppercase text-white bg-[#c8200f] px-2 py-0.5">
                  {item.platformLabel}
                </span>
                <span className="text-xs font-bold text-white uppercase font-display line-clamp-1 group-hover:text-[#e22718] transition-colors">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
