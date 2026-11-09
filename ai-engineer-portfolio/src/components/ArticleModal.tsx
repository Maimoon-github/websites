import React from 'react';
import { X, Clock, Calendar, ArrowLeft, Sparkles, UserCheck } from 'lucide-react';
import { ArticlePost } from '@/types/portfolio';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { parseMdxBlocks } from '@/lib/mdx';

interface ArticleDetailProps {
  article: ArticlePost;
  onClose?: () => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string, contextScope?: string) => void;
  isPage?: boolean;
}

export const ArticleDetailView: React.FC<ArticleDetailProps> = ({
  article,
  onClose,
  onNavigate,
  onAskAi,
  isPage = false,
}) => {
  const mdxBlocks = parseMdxBlocks(article);

  return (
    <div
      className={
        isPage
          ? 'pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'
          : 'relative w-full max-w-3xl max-h-[88vh] bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col'
      }
    >
      {/* Breadcrumb on Full Page */}
      {isPage && onNavigate && (
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-[#0F52BA] dark:hover:text-white cursor-pointer"
            >
              Home
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => onNavigate('/writing')}
              className="hover:text-[#0F52BA] dark:hover:text-white cursor-pointer"
            >
              Writing
            </button>
            <span>›</span>
            <span className="text-slate-900 dark:text-slate-200 truncate max-w-xs">
              {article.title}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/writing')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All essays</span>
          </button>
        </nav>
      )}

      {/* Article Header */}
      <div
        className={
          isPage
            ? 'p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 mb-8'
            : 'p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141418] flex items-start justify-between gap-4'
        }
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-[#0F52BA] dark:text-[#50C878] font-semibold">
              {article.category}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Topics: {article.tags.join(' · ')}
            </div>

            {onAskAi && (
              <button
                type="button"
                onClick={() =>
                  onAskAi(
                    `Explain the key engineering patterns in "${article.title}".`,
                    `post:${article.slug}`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] bg-[#0F52BA]/10 dark:bg-[#50C878]/10 border border-[#0F52BA]/30 dark:border-[#50C878]/30 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI about this post</span>
              </button>
            )}
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Article Body + Optional Sticky TOC */}
      <div
        className={
          isPage
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'
            : 'p-6 sm:p-8 overflow-y-auto space-y-5 flex-1'
        }
      >
        <div
          className={
            isPage
              ? 'lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-5'
              : 'space-y-5'
          }
        >
          {mdxBlocks.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={idx}
                  id={block.id}
                  className="text-xl font-bold text-slate-950 dark:text-white pt-4 border-t border-slate-200 dark:border-white/10"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'code') {
              return (
                <pre
                  key={idx}
                  className="p-4 rounded-xl bg-[#09090b] border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed"
                >
                  <code>{block.text}</code>
                </pre>
              );
            }
            if (block.type === 'callout') {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0F52BA]/10 border-l-4 border-[#0F52BA] text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                >
                  {block.text}
                </div>
              );
            }
            return (
              <p
                key={idx}
                className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line"
              >
                {block.text}
              </p>
            );
          })}

          {/* Author Bio Card */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0F52BA] via-[#50C878] to-[#DC143C] flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <div className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                  <span>Written by {PERSONAL_INFO.name}</span>
                  <UserCheck className="w-3.5 h-3.5 text-[#50C878]" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {PERSONAL_INFO.role} · {PERSONAL_INFO.location}
                </div>
              </div>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0F52BA]/90 transition-colors cursor-pointer"
              >
                Discuss This Architecture →
              </button>
            )}
          </div>
        </div>

        {/* Sticky Table of Contents on Full Page */}
        {isPage && (
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Table of Contents
              </div>
              <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                {article.headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="hover:text-[#0F52BA] dark:hover:text-[#50C878] transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export const ArticleModal: React.FC<{
  article: ArticlePost | null;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string, contextScope?: string) => void;
}> = ({ article, onClose, onNavigate, onAskAi }) => {
  if (!article) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <ArticleDetailView
        article={article}
        onClose={onClose}
        onNavigate={onNavigate}
        onAskAi={onAskAi}
        isPage={false}
      />
    </div>
  );
};
