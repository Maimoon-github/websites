'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { X, ExternalLink } from 'lucide-react';

export const VideoLightbox: React.FC = () => {
  const { activeVideo, closeVideoLightbox } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideoLightbox();
      }
    };
    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo, closeVideoLightbox]);

  if (!activeVideo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeVideo.title}
      onClick={closeVideoLightbox}
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full flex flex-col gap-4 animate-scale-in ${
          activeVideo.vertical ? 'max-w-[420px]' : 'max-w-[1100px]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#262626] pb-3 text-white">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold tracking-widest text-[#e22718] uppercase">
              {activeVideo.platform.toUpperCase()} {activeVideo.views ? `· ${activeVideo.views}` : ''}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl uppercase truncate">
              {activeVideo.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeVideo.url && (
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#bbbbbb] hover:text-white uppercase font-bold tracking-wider"
              >
                <span>Original Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={closeVideoLightbox}
              aria-label="Close video player"
              className="w-10 h-10 rounded-full border border-[#3c3c3c] text-white hover:border-[#e22718] hover:text-[#e22718] flex items-center justify-center transition-colors bg-[#0a0a0a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div
          className={`relative w-full bg-black overflow-hidden border border-[#262626] shadow-2xl ${
            activeVideo.vertical ? 'aspect-[9/16] max-h-[82vh]' : 'aspect-[16/9] max-h-[80vh]'
          }`}
        >
          {activeVideo.embedUrl ? (
            <iframe
              src={activeVideo.embedUrl}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0 absolute inset-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white gap-4 bg-[#111111]">
              <p className="text-lg font-bold">Video Preview Active</p>
              <p className="text-xs text-[#9a9a9a] max-w-sm">
                This project cut is hosted externally. Click below to view the high-bitrate master file.
              </p>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#c8200f] text-white text-xs font-bold uppercase tracking-widest"
              >
                View on {activeVideo.platform}
              </a>
            </div>
          )}
        </div>

        {/* Video Detail Footer */}
        {activeVideo.description && (
          <div className="p-3 bg-[#0a0a0a] border border-[#262626] text-xs text-[#9a9a9a] leading-relaxed">
            {activeVideo.description}
          </div>
        )}
      </div>
    </div>
  );
};
