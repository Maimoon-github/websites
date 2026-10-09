'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Play, Plus, Eye } from 'lucide-react';
import { ShowreelMarquee } from './ShowreelMarquee';

export const WorkSection: React.FC = () => {
  const { data, openVideoLightbox } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'youtube' | 'reels' | 'commercial'>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: data.videos.length },
    {
      id: 'youtube',
      label: 'YouTube Long-Form',
      count: data.videos.filter((v) => v.platform === 'youtube').length,
    },
    {
      id: 'reels',
      label: 'Reels & TikToks',
      count: data.videos.filter((v) => v.platform === 'reels' || v.platform === 'tiktok').length,
    },
    {
      id: 'commercial',
      label: 'Commercial & Ads',
      count: data.videos.filter((v) => v.platform === 'commercial').length,
    },
  ];

  const filteredVideos = data.videos.filter((v) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'reels') return v.platform === 'reels' || v.platform === 'tiktok';
    return v.platform === activeFilter;
  });

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section
      id="work"
      aria-label="Selected Portfolio Projects"
      className="pt-[clamp(50px,6vw,96px)] pb-[clamp(68px,8.5vw,130px)] bg-[#050505] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 items-end mb-8 sm:mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">02</span>
              <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
              <span className="text-[13px] font-bold tracking-[2px] uppercase text-[#e6e6e6]">
                Selected Work & Case Studies
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(48px,6.5vw,112px)] leading-[0.92] tracking-[-0.5px] text-white uppercase">
              CRAFTED WITH PRECISION & PASSION
            </h2>
          </div>
          <p className="text-[clamp(17px,1.35vw,20px)] leading-[1.55] font-light text-[#e6e6e6] max-w-xl">
            A curated collection of short-form viral cuts, high-converting commercial spots, and narrative-driven YouTube features.
          </p>
        </div>

        {/* High-Retention Showreel Marquee Carousel */}
        <div className="mb-6 sm:mb-8">
          <ShowreelMarquee />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="border-b border-[#3c3c3c] mb-6 overflow-x-auto pb-1">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.id as any);
                    setVisibleCount(6);
                  }}
                  className={`pb-3 text-[13px] font-bold tracking-[1.5px] uppercase transition-colors relative flex items-center gap-2 cursor-pointer ${
                    isActive ? 'text-white' : 'text-[#7e7e7e] hover:text-[#bbbbbb]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-xs font-mono text-[#7e7e7e]">({tab.count})</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e22718]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => openVideoLightbox(video)}
              className="group relative bg-[#0a0a0a] border border-[#262626] hover:border-[#e22718] transition-all duration-300 ease-spring hover:-translate-y-1.5 flex flex-col overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#e22718]/20 will-change-transform"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[16/9] w-full bg-[#141414] overflow-hidden">
                {video.thumb ? (
                  <img
                    src={video.thumb}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-smooth filter brightness-95 group-hover:brightness-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#555]">
                    Video Preview
                  </div>
                )}

                {/* Dark Gradient Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none"
                />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-[#e22718] bg-[#050505]/90">
                    {video.platform === 'reels' ? 'Instagram' : video.platform}
                  </span>
                  {video.vertical && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#bbbbbb] bg-[#050505]/80 border border-[#3c3c3c]">
                      9:16 Reel
                    </span>
                  )}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-none bg-[#c8200f] text-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#e22718] transition-all duration-300 ease-overshoot">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[11px] font-mono font-medium text-white bg-black/80 backdrop-blur-sm border border-white/10">
                    {video.duration}
                  </span>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  {video.client && (
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7e7e7e]">
                      {video.client}
                    </p>
                  )}
                  <h3 className="font-display font-bold text-[22px] leading-[1.05] text-white uppercase group-hover:text-[#e22718] transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-xs text-[#9a9a9a] line-clamp-2 font-light leading-relaxed mt-0.5">
                      {video.description}
                    </p>
                  )}
                </div>

                {/* Card Footer Metric */}
                <div className="pt-2.5 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#7e7e7e]">
                  <span className="font-mono text-[#d0d0d0] font-medium flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#e22718]" />
                    {video.views || 'Verified Campaign'}
                  </span>
                  <span className="uppercase text-[11px] tracking-wider text-[#e22718] font-bold group-hover:translate-x-1.5 transition-transform duration-200">
                    Watch Cut →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {displayedVideos.length === 0 && (
          <div className="py-16 text-center border border-dashed border-[#262626]">
            <p className="text-base text-[#9a9a9a]">No videos found for this category.</p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2.5 h-[46px] sm:h-[48px] px-6 bg-transparent border border-white hover:bg-white hover:text-[#050505] text-white text-[14px] font-bold tracking-[1.5px] uppercase transition-all duration-300 ease-spring active:scale-[0.97] cursor-pointer"
            >
              <span>Load More</span>
              <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
