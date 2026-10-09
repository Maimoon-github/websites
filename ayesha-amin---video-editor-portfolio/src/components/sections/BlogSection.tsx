'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { BlogPost } from '@/types/portfolio';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, openPostModal } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { blog } = data;

  const categories = ['all', ...Array.from(new Set(blog.map((post) => post.category)))];

  const filteredPosts =
    selectedCategory === 'all'
      ? blog
      : blog.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section
      id="blog"
      aria-label="Editorial & Case Studies"
      className="py-12 sm:py-18 lg:py-20 bg-[#050505] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-8">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3.5">
              <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">07</span>
              <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#e6e6e6]">
                Editorial & Breakdown Insights
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[0.92]">
              CASE STUDIES & EDITING INSIGHTS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9a9a9a] max-w-md font-light leading-relaxed">
            Technical breakdowns of retention architecture, sound design science, and color grading pipelines.
          </p>
        </div>

        {/* Category Tabs */}
        {categories.length > 2 && (
          <div className="flex items-center gap-5 sm:gap-6 border-b border-[#262626] mb-6 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`pb-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
                  selectedCategory === cat ? 'text-white' : 'text-[#7e7e7e] hover:text-white'
                }`}
              >
                <span>{cat === 'all' ? 'All Articles' : cat}</span>
                {selectedCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e22718]" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => openPostModal(post)}
              className="bg-[#0a0a0a] border border-[#262626] hover:border-[#e22718] transition-all duration-300 ease-spring hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#e22718]/20 will-change-transform"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full bg-[#141414] overflow-hidden">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-smooth"
                  />
                ) : (
                  <div className="w-full h-full bg-[#111111]" />
                )}
                <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white bg-[#c8200f]">
                  {post.category}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#7e7e7e]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#e22718]" />
                      {post.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#e22718]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-tight group-hover:text-[#e22718] transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#9a9a9a] font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#e22718]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
