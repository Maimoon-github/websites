import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/portfolioData';
import { ArticlePost } from '../types/portfolio';

interface ArticlesProps {
  articles?: ArticlePost[];
  activeTagRoute?: string;
  activeSeriesRoute?: string;
  activePage?: number;
  onSelectArticle: (article: ArticlePost) => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string) => void;
  isFullPage?: boolean;
}

const ArticleArtwork: React.FC<{ index: number }> = ({ index }) => {
  if (index % 3 === 0) {
    return (
      <svg viewBox="0 0 400 160" className="w-full h-full">
        <rect width="400" height="160" fill="#09090b" />
        <path d="M 0 120 Q 120 30, 240 100 T 400 50" fill="none" stroke="#0F52BA" strokeWidth="2" />
        <path d="M 0 135 Q 140 55, 260 115 T 400 70" fill="none" stroke="#50C878" strokeWidth="1.5" />
        <path d="M 0 145 Q 160 80, 280 125 T 400 90" fill="none" stroke="#DC143C" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index % 3 === 1) {
    return (
      <svg viewBox="0 0 400 160" className="w-full h-full">
        <rect width="400" height="160" fill="#09090b" />
        <g stroke="#0F52BA" strokeWidth="1.2" fill="#0F52BA" fillOpacity="0.12">
          <rect x="65" y="45" width="55" height="55" rx="8" />
          <rect x="170" y="30" width="60" height="60" rx="8" stroke="#50C878" />
          <rect x="280" y="50" width="50" height="50" rx="8" stroke="#DC143C" />
        </g>
        <line x1="120" y1="72" x2="170" y2="60" stroke="#50C878" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="230" y1="60" x2="280" y2="75" stroke="#DC143C" strokeWidth="1.2" strokeDasharray="3 3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 160" className="w-full h-full">
      <rect width="400" height="160" fill="#09090b" />
      <circle cx="200" cy="80" r="45" fill="#0F52BA" fillOpacity="0.12" stroke="#0F52BA" strokeWidth="1.5" />
      <circle cx="200" cy="80" r="24" fill="#50C878" fillOpacity="0.15" stroke="#50C878" strokeWidth="1.2" />
      <circle cx="200" cy="80" r="6" fill="#DC143C" />
    </svg>
  );
};

export const Articles: React.FC<ArticlesProps> = ({
  articles = ARTICLES,
  activeTagRoute,
  activeSeriesRoute,
  onSelectArticle,
  onNavigate,
  onAskAi,
  isFullPage = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>(activeTagRoute || 'all');

  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)));
  const allSeries = Array.from(new Set(articles.map((a) => a.series)));

  const effectiveTag = activeTagRoute || selectedTag;

  const filteredArticles = articles.filter((article) => {
    const matchesTag =
      effectiveTag === 'all' ||
      article.tags.some((t) => t.toLowerCase() === effectiveTag.toLowerCase());
    const matchesSeries =
      !activeSeriesRoute ||
      article.series
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') === activeSeriesRoute.toLowerCase() ||
      article.series.toLowerCase() === activeSeriesRoute.toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesSeries && matchesSearch;
  });

  const handleOpenArticle = (article: ArticlePost) => {
    if (onNavigate) {
      onNavigate(`/writing/${article.slug}`);
    } else {
      onSelectArticle(article);
    }
  };

  return (
    <section id="blog" className={`${isFullPage ? 'pt-28 pb-20' : 'py-16 lg:py-20'} relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="w-12 h-1 bg-gradient-to-r from-[#DC143C] via-[#50C878] to-[#0F52BA] rounded-full mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {activeTagRoute ? (
                <>
                  Articles Tagged{' '}
                  <span className="text-[#0F52BA] dark:text-[#50C878]">#{activeTagRoute}</span>
                </>
              ) : activeSeriesRoute ? (
                <>
                  Series:{' '}
                  <span className="text-[#0F52BA] dark:text-[#50C878]">{activeSeriesRoute}</span>
                </>
              ) : (
                <>
                  Latest{' '}
                  <span className="bg-gradient-to-r from-[#0F52BA] to-[#50C878] bg-clip-text text-transparent">
                    Articles &amp; Research
                  </span>
                </>
              )}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1.5">
              Architectural essays on LangGraph, CrewAI, Django + Celery multi-agent loops, Qdrant
              RAG, and NixOS infrastructure.
            </p>
          </div>

          {!isFullPage && onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('/writing')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] hover:underline self-start sm:self-auto cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View All Articles (/writing)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {(activeTagRoute || activeSeriesRoute) && onNavigate && (
            <button
              type="button"
              onClick={() => {
                setSelectedTag('all');
                onNavigate('/writing');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] hover:underline self-start sm:self-auto cursor-pointer"
            >
              <span>Clear Archive Filter (/writing)</span>
            </button>
          )}
        </div>

        {/* Full Page Search, Tag & Series Archive Bar */}
        {isFullPage && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search essays by topic, framework, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTag('all');
                    if (onNavigate && (activeTagRoute || activeSeriesRoute)) onNavigate('/writing');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    effectiveTag === 'all' && !activeSeriesRoute
                      ? 'bg-[#0F52BA] text-white'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All Topics
                </button>
                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      if (onNavigate) onNavigate(`/writing/tags/${encodeURIComponent(tag)}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                      effectiveTag.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#0F52BA] text-white'
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Series Archive Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-slate-400">Series Archives:</span>
              {allSeries.map((series) => {
                const seriesSlug = series
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                return (
                  <button
                    key={series}
                    type="button"
                    onClick={() => onNavigate && onNavigate(`/writing/series/${seriesSlug}`)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-slate-600 dark:text-slate-300 hover:border-[#0F52BA] cursor-pointer"
                  >
                    {series}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleOpenArticle(article)}
              className="group rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 hover:border-[#0F52BA]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-sm"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden border-b border-slate-200 dark:border-white/5">
                  <ArticleArtwork index={index} />
                  <div className="absolute bottom-3 left-4 right-4 text-[11px] font-mono text-slate-300">
                    {article.category} · {article.readTime}
                  </div>
                </div>

                <div className="p-6">
                  {/* Unboxed clean metadata text */}
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                    {article.date} · {article.series}
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-[#0F52BA] dark:group-hover:text-[#50C878] transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate pr-2">
                  {article.tags.slice(0, 3).join(' · ')}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onAskAi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskAi(`Summarize Maimoon's article "${article.title}".`);
                      }}
                      title="Ask AI about this essay"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#50C878]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
