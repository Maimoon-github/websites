'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { X, Calendar, Clock, Tag } from 'lucide-react';

export const BlogPostModal: React.FC = () => {
  const { activePost, closePostModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePostModal();
      }
    };
    if (activePost) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost, closePostModal]);

  if (!activePost) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activePost.title}
      onClick={closePostModal}
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl my-auto bg-[#0a0a0a] border border-[#3c3c3c] shadow-2xl flex flex-col overflow-hidden text-white animate-scale-in"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#262626] bg-[#050505]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#e22718]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a9a9a]">
              Case Study · {activePost.category}
            </span>
          </div>
          <button
            type="button"
            onClick={closePostModal}
            aria-label="Close article modal"
            className="w-8 h-8 border border-[#3c3c3c] hover:border-[#e22718] hover:text-[#e22718] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto space-y-5">
          {/* Article Header Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#7e7e7e]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#e22718]" />
                {activePost.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#e22718]" />
                {activePost.readTime}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
              {activePost.title}
            </h2>

            <p className="text-sm sm:text-base text-[#bbbbbb] font-light leading-relaxed border-l-2 border-[#e22718] pl-3.5 italic">
              {activePost.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          {activePost.coverImage && (
            <div className="aspect-[16/9] w-full bg-[#141414] overflow-hidden border border-[#262626]">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Prose Content */}
          <div className="prose prose-invert max-w-none text-[#bbbbbb] text-sm sm:text-base leading-relaxed space-y-4 font-light">
            {activePost.content.split('\n\n').map((paragraph, index) => {
              const text = paragraph.trim();
              if (text.startsWith('# ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold font-display uppercase text-white pt-4">
                    {text.replace('# ', '')}
                  </h3>
                );
              }
              if (text.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-lg font-bold uppercase text-[#e22718] pt-2">
                    {text.replace('### ', '')}
                  </h4>
                );
              }
              if (text.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1">
                    {text.split('\n').map((li, i) => (
                      <li key={i}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{text}</p>;
            })}
          </div>

          {/* Tags Footer */}
          {activePost.tags && (
            <div className="pt-6 border-t border-[#262626] flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-bold text-[#7e7e7e] mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs text-[#d0d0d0] bg-[#141414] border border-[#262626]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
