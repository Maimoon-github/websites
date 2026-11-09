/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Terminal,
  Cpu,
  Database,
  Shield,
  RefreshCw,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  FileText,
  Sun,
  Moon,
  X,
  Lock,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { ProjectModal, ProjectCaseStudyView } from '@/components/ProjectModal';
import { Articles } from '@/components/Articles';
import { ArticleModal, ArticleDetailView } from '@/components/ArticleModal';
import { AboutSkills } from '@/components/AboutSkills';
import { ContactSection } from '@/components/ContactSection';
import { AiAssistant } from '@/components/AiAssistant';
import { ResumeModal, ResumeView } from '@/components/ResumeModal';
import { Footer } from '@/components/Footer';
import {
  PERSONAL_INFO,
  PROJECTS,
  ARTICLES,
  USES_STACK,
  KNOWLEDGE_CHUNKS,
} from '@/data/portfolioData';
import { ProjectCategory, ProjectCaseStudy, ArticlePost, KnowledgeChunk } from '@/types/portfolio';
import { retrieveKnowledgeChunks, executeMcpTool, computeDeterministicEmbedding } from '@/lib/rag';
import { useNavigation } from '@/hooks/useNavigation';
import {
  fetchAdminState,
  triggerRagReindex,
  updateAvailabilitySettings,
  createAdminContentItem,
  deleteAdminContentItem,
} from '@/services/portfolioApi';

export default function App() {
  const { currentPath, searchParams, navigate } = useNavigation();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Interactive states
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectCaseStudy | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<ArticlePost | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Command Palette (⌘K) & Assistant state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [commandQuery, setCommandQuery] = useState<string>('');
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantInitialPrompt, setAssistantInitialPrompt] = useState<string | undefined>();
  const [assistantContextScope, setAssistantContextScope] = useState<string | undefined>();
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Admin & live availability state
  const [availabilityStatus, setAvailabilityStatus] = useState<string>(PERSONAL_INFO.status);
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(true);
  const [adminToken, setAdminToken] = useState<string>('maimoon-admin');
  const [newContentTitle, setNewContentTitle] = useState<string>('');
  const [newContentTags, setNewContentTags] = useState<string>('LangGraph, RAG, Agents');
  const [newContentBody, setNewContentBody] = useState<string>('');
  const [adminState, setAdminState] = useState<{
    statusText?: string;
    available?: boolean;
    lastReindexedAt?: string;
    chunkCount?: number;
    chunks?: KnowledgeChunk[];
    metrics?: {
      totalChats: number;
      upvotes: number;
      downvotes: number;
      topQueries: { query: string; count: number; timestamp: string }[];
      contactsCount: number;
      contacts: { id: string; name: string; email: string; projectType: string; message: string; createdAt: string }[];
    };
  } | null>(null);
  const [mcpTestTool, setMcpTestTool] = useState<string>('check_availability');
  const [mcpTestQuery, setMcpTestQuery] = useState<string>('LangGraph');

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync URL ?tag=... and ?context=... query parameters
  useEffect(() => {
    const tagParam = searchParams.get('tag') as ProjectCategory | null;
    if (tagParam && ['all', 'agents', 'rag', 'infra', 'oss'].includes(tagParam)) {
      setSelectedCategory(tagParam);
    }
    const ctxParam = searchParams.get('context');
    if (ctxParam) {
      setAssistantContextScope(ctxParam);
    }
  }, [searchParams]);

  // Global keyboard shortcut: ⌘K / Ctrl+K for Command Palette, Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setActiveProjectModal(null);
        setActiveArticleModal(null);
        setIsResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch admin state when visiting /admin
  const loadAdminMetrics = async () => {
    try {
      const data = await fetchAdminState();
      setAdminState(data);
      if (data.statusText) setAvailabilityStatus(data.statusText);
    } catch {
      // Fallback to local state
    }
  };

  useEffect(() => {
    if (currentPath === '/admin') {
      loadAdminMetrics();
    }
  }, [currentPath]);

  const handleOpenAssistant = (prompt?: string, scope?: string) => {
    if (scope) setAssistantContextScope(scope);
    if (prompt) setAssistantInitialPrompt(prompt);
    setIsAssistantOpen(true);
  };

  const handleCategoryChange = (cat: ProjectCategory) => {
    setSelectedCategory(cat);
    if (currentPath === '/work') {
      const nextUrl = cat === 'all' ? '/work' : `/work?tag=${cat}`;
      window.history.replaceState({}, '', nextUrl);
    }
  };

  const commandResults = useMemo(() => {
    const q = commandQuery.trim() || 'Maimoon case study skills';
    return retrieveKnowledgeChunks(q, KNOWLEDGE_CHUNKS, 6);
  }, [commandQuery]);

  const mcpPreviewResult = useMemo(
    () => executeMcpTool(mcpTestTool, { query: mcpTestQuery, slug: 'agentic-review-architecture' }),
    [mcpTestTool, mcpTestQuery]
  );

  // Route matching
  const workSlugMatch = currentPath.startsWith('/work/')
    ? currentPath.replace('/work/', '').trim()
    : null;
  const matchedProject = workSlugMatch
    ? PROJECTS.find((p) => p.slug === workSlugMatch)
    : null;

  const writingSlugMatch = currentPath.startsWith('/writing/')
    ? currentPath.replace('/writing/', '').trim()
    : null;
  const matchedArticle = writingSlugMatch
    ? ARTICLES.find((a) => a.slug === writingSlugMatch)
    : null;

  const renderRouteView = () => {
    if (currentPath === '/') {
      return (
        <>
          <Hero
            onNavigate={navigate}
            onOpenAssistant={(prompt) => handleOpenAssistant(prompt)}
            availabilityStatus={availabilityStatus}
          />
          <Experience
            onOpenResume={() => setIsResumeModalOpen(true)}
            onNavigate={navigate}
          />
          <Projects
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            onSelectProject={(project) => setActiveProjectModal(project)}
            onNavigate={navigate}
            onAskAi={(prompt) => handleOpenAssistant(prompt)}
          />
          <Articles
            onSelectArticle={(article) => setActiveArticleModal(article)}
            onNavigate={navigate}
            onAskAi={(prompt) => handleOpenAssistant(prompt)}
          />
          <AboutSkills
            onNavigate={navigate}
            onAskAi={(prompt) => handleOpenAssistant(prompt)}
          />
          <ContactSection onNavigate={navigate} />
        </>
      );
    }

    if (currentPath === '/work') {
      return (
        <Projects
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          onSelectProject={(project) => setActiveProjectModal(project)}
          onNavigate={navigate}
          onAskAi={(prompt) => handleOpenAssistant(prompt)}
          isFullPage
        />
      );
    }

    if (workSlugMatch && matchedProject) {
      return (
        <ProjectCaseStudyView
          project={matchedProject}
          onNavigate={navigate}
          onAskAi={(prompt, scope) => handleOpenAssistant(prompt, scope)}
          isPage
        />
      );
    }

    if (currentPath === '/writing') {
      return (
        <Articles
          onSelectArticle={(article) => setActiveArticleModal(article)}
          onNavigate={navigate}
          onAskAi={(prompt) => handleOpenAssistant(prompt)}
          isFullPage
        />
      );
    }

    if (writingSlugMatch && matchedArticle) {
      return (
        <ArticleDetailView
          article={matchedArticle}
          onNavigate={navigate}
          onAskAi={(prompt, scope) => handleOpenAssistant(prompt, scope)}
          isPage
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <>
          <AboutSkills
            onNavigate={navigate}
            onAskAi={(prompt) => handleOpenAssistant(prompt)}
            isFullPage
          />
          <Experience
            onOpenResume={() => navigate('/resume')}
            onNavigate={navigate}
          />
        </>
      );
    }

    if (currentPath === '/resume') {
      return (
        <ResumeView
          onNavigate={navigate}
          onAskAi={(prompt) => handleOpenAssistant(prompt)}
          isPage
        />
      );
    }

    if (currentPath === '/contact') {
      return <ContactSection onNavigate={navigate} isFullPage />;
    }

    if (currentPath === '/contact/thanks') {
      return <ContactSection onNavigate={navigate} isThanksPage />;
    }

    if (currentPath === '/ai') {
      return (
        <AiAssistant
          initialPrompt={assistantInitialPrompt}
          contextScope={assistantContextScope}
          onClearContextScope={() => setAssistantContextScope(undefined)}
          onNavigate={navigate}
          isFullPage
        />
      );
    }

    if (currentPath === '/uses' || currentPath === '/now') {
      return (
        <section className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#0F52BA] dark:text-[#50C878] mb-2">
              {currentPath === '/now' ? '/now · Current Engineering Focus' : '/uses · Production Stack & Environment'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
              {currentPath === '/now'
                ? 'What Maimoon (Moon) Amin Is Building Now'
                : 'Daily Agentic AI Stack, Inference Runtime & DevOps Tooling'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              {currentPath === '/now'
                ? 'Focused on multi-agent orchestration (LangGraph + CrewAI + Pydantic AI), hybrid vector RAG, and reproducible NixOS/Docker model serving.'
                : 'Verified production libraries, vector databases, observability pipelines, and Linux infrastructure.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {USES_STACK.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4"
              >
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  {group.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5"
                    >
                      <div className="text-sm font-bold text-[#0F52BA] dark:text-[#50C878] font-mono">
                        {item.name}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (currentPath === '/colophon') {
      return (
        <section className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#0F52BA] dark:text-[#50C878] mb-2">
              /colophon · System Architecture &amp; Open-Source Blueprint
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
              How This Portfolio, Hybrid RAG Engine &amp; MCP Server Are Built
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Designed as a living full-stack AI engineering proof-of-work for {PERSONAL_INFO.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-2">
              <Cpu className="w-5 h-5 text-[#0F52BA]" />
              <h2 className="text-base font-bold text-slate-950 dark:text-white">
                3D PBR Gemstone Viewport
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Procedural Three.js icosahedron crystal with Sapphire (`#0F52BA`), Emerald
                (`#50C878`), Crimson (`#DC143C`), and Obsidian (`#0B0B0B`) facets, DPR `[1, 1.5]`
                clamping, and `IntersectionObserver` off-screen pause.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-2">
              <Database className="w-5 h-5 text-[#50C878]" />
              <h2 className="text-base font-bold text-slate-950 dark:text-white">
                Hybrid RRF RAG Pipeline
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Combines BM25-style lexical token scoring with character-trigram cosine vector
                similarity via Reciprocal Rank Fusion (`k=60`) over {KNOWLEDGE_CHUNKS.length} unified
                knowledge chunks.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-2">
              <Terminal className="w-5 h-5 text-[#DC143C]" />
              <h2 className="text-base font-bold text-slate-950 dark:text-white">
                Public MCP Server (`/mcp`)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Exposes `search_content`, `get_case_study`, `get_experience`, and
                `check_availability` over JSON-RPC 2.0 alongside `/llms.txt` and `/llms-full.txt`.
              </p>
            </div>
          </div>

          {/* Interactive MCP Tool Tester */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  Interactive MCP JSON-RPC 2.0 Inspector
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Test the live tools exposed at <code>POST /mcp</code>:
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['check_availability', 'search_content', 'get_case_study', 'get_experience'].map(
                  (tool) => (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => setMcpTestTool(tool)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer ${
                        mcpTestTool === tool
                          ? 'bg-[#0F52BA] text-white'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {tool}
                    </button>
                  )
                )}
              </div>
            </div>

            {mcpTestTool === 'search_content' && (
              <input
                type="text"
                value={mcpTestQuery}
                onChange={(e) => setMcpTestQuery(e.target.value)}
                placeholder="Enter search query (e.g., LangGraph, Qdrant, KodeKloud)..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
              />
            )}

            <pre className="p-4 rounded-xl bg-[#09090b] border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-72">
              <code>
                {JSON.stringify(
                  {
                    jsonrpc: '2.0',
                    method: 'tools/call',
                    params: { name: mcpTestTool },
                    result: mcpPreviewResult,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        </section>
      );
    }

    if (currentPath === '/search') {
      return (
        <section className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Hybrid Knowledge Search
          </h1>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={commandQuery}
              onChange={(e) => setCommandQuery(e.target.value)}
              placeholder="Search case studies, essays, LangGraph, CrewAI, Qdrant, DevOps..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
            />
          </div>
          <div className="space-y-3">
            {commandResults.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.url)}
                className="p-4 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 hover:border-[#0F52BA] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span className="uppercase text-[#0F52BA] dark:text-[#50C878]">
                    {item.sourceType}
                  </span>
                  <span>{item.url}</span>
                </div>
                <div className="text-base font-bold text-slate-950 dark:text-white">
                  {item.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.snippet}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (currentPath === '/admin') {
      const handleReindex = async () => {
        await triggerRagReindex();
        loadAdminMetrics();
      };

      const handleUpdateStatus = async (nextStatus: string) => {
        setAvailabilityStatus(nextStatus);
        await updateAvailabilitySettings(nextStatus, true);
        loadAdminMetrics();
      };

      const handleCreateContent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newContentTitle.trim() || !newContentBody.trim()) return;
        await createAdminContentItem({
          title: newContentTitle,
          subtitle: 'Custom MDX Knowledge Chunk',
          category: 'Agents & RAG',
          summary: newContentBody.slice(0, 140),
          tags: newContentTags.split(',').map((t) => t.trim()),
          content: newContentBody,
        });
        setNewContentTitle('');
        setNewContentBody('');
        loadAdminMetrics();
      };

      const handleDeleteChunk = async (id: string) => {
        await deleteAdminContentItem(id);
        loadAdminMetrics();
      };

      const activeChunks = adminState?.chunks || KNOWLEDGE_CHUNKS;

      return (
        <section className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#50C878] mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin &amp; Observability Console (/admin · noindex)</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
                Content CRUD, RAG Vector Index &amp; Telemetry
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReindex}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F52BA] text-white text-xs font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Index RAG Corpus ({activeChunks.length} Chunks)</span>
              </button>
            </div>
          </div>

          {!adminUnlocked ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 max-w-md space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Lock className="w-4 h-4 text-[#0F52BA]" />
                <span>Enter Admin Passkey</span>
              </div>
              <input
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setAdminUnlocked(true)}
                className="px-4 py-2 rounded-xl bg-[#0F52BA] text-white text-xs font-semibold"
              >
                Unlock Console
              </button>
            </div>
          ) : (
            <>
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono text-slate-400">Indexed RAG Chunks</div>
                  <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                    {adminState?.chunkCount ?? activeChunks.length}
                  </div>
                  <div className="text-[11px] text-[#50C878] mt-1">
                    pgvector / Qdrant / RRF Ready
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono text-slate-400">Assistant Queries</div>
                  <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                    {adminState?.metrics?.totalChats ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    👍 {adminState?.metrics?.upvotes ?? 0} · 👎 {adminState?.metrics?.downvotes ?? 0}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono text-slate-400">Contact Leads</div>
                  <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                    {adminState?.metrics?.contactsCount ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Honeypot + Rate-Limited</div>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono text-slate-400">Live Status Banner</div>
                  <select
                    value={availabilityStatus}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    aria-label="Live Availability Status"
                    className="mt-2 w-full px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                  >
                    <option value="Open to Opportunities">Open to Opportunities</option>
                    <option value="Available for Q4/Q1 AI Consulting">
                      Available for Q4/Q1 AI Consulting
                    </option>
                    <option value="Selective Advisory & Roles">Selective Advisory &amp; Roles</option>
                  </select>
                </div>
              </div>

              {/* Content CRUD & Live Vector Ingestion */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <form
                  onSubmit={handleCreateContent}
                  className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3"
                >
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Ingest New MDX Post / RAG Knowledge Chunk
                  </h2>
                  <input
                    type="text"
                    required
                    value={newContentTitle}
                    onChange={(e) => setNewContentTitle(e.target.value)}
                    placeholder="Post or Case Study Title..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={newContentTags}
                    onChange={(e) => setNewContentTags(e.target.value)}
                    placeholder="Comma-separated tags (e.g., LangGraph, Qdrant)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                  />
                  <textarea
                    rows={3}
                    required
                    value={newContentBody}
                    onChange={(e) => setNewContentBody(e.target.value)}
                    placeholder="MDX content to embed and index into the live RAG store..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Embed &amp; Add to Vector Index
                  </button>
                </form>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3 max-h-[340px] overflow-y-auto">
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Indexed Vector Chunks ({activeChunks.length})
                  </h2>
                  <div className="space-y-2">
                    {activeChunks.map((chunk) => {
                      const sampleVec = computeDeterministicEmbedding(chunk.title, 4);
                      return (
                        <div
                          key={chunk.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white truncate">
                              {chunk.title}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 truncate">
                              {chunk.sourceType} · {chunk.url} · vec[{sampleVec.join(', ')}, ...]
                            </div>
                          </div>
                          {chunk.id.startsWith('chunk-custom-') && (
                            <button
                              type="button"
                              onClick={() => handleDeleteChunk(chunk.id)}
                              className="px-2 py-1 rounded bg-[#DC143C]/15 text-[#DC143C] text-[10px] font-mono shrink-0 cursor-pointer"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Queries & Contact Submissions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Recent RAG Chat Queries
                  </h2>
                  {adminState?.metrics?.topQueries && adminState.metrics.topQueries.length > 0 ? (
                    <div className="space-y-2">
                      {adminState.metrics.topQueries.map((q, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 flex items-center justify-between text-xs"
                        >
                          <span className="text-slate-800 dark:text-slate-200 font-mono truncate">
                            {q.query}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                            {new Date(q.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No queries logged in this server session yet. Try asking a question in /ai!
                    </p>
                  )}
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Recent Contact Leads
                  </h2>
                  {adminState?.metrics?.contacts && adminState.metrics.contacts.length > 0 ? (
                    <div className="space-y-2">
                      {adminState.metrics.contacts.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                            <span>
                              {c.name} ({c.email})
                            </span>
                            <span className="text-[10px] font-mono text-[#50C878]">
                              {c.projectType}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                            {c.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No inquiries submitted in this session yet.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      );
    }

    // 404 Not Found with RAG Search Suggestion
    return (
      <section className="pt-32 pb-24 max-w-3xl mx-auto px-4 text-center space-y-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#DC143C]">
          404 · Route Not Found
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
          This node isn’t in the state graph.
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Use the global Command Palette (<kbd className="font-mono">⌘K</kbd>), ask the RAG
          assistant, or jump back to Maimoon’s core case studies.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-[#0F52BA] text-white text-xs font-semibold cursor-pointer"
          >
            Return Home (/)
          </button>
          <button
            type="button"
            onClick={() => navigate('/work')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
          >
            View Case Studies (/work)
          </button>
          <button
            type="button"
            onClick={() => navigate('/ai')}
            className="px-5 py-2.5 rounded-xl bg-[#50C878]/15 text-[#50C878] border border-[#50C878]/30 text-xs font-semibold cursor-pointer"
          >
            Ask My AI (/ai)
          </button>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0B] text-slate-900 dark:text-slate-100 selection:bg-[#0F52BA] selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-200">
      {/* Persistent Header & Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAssistant={(prompt) => handleOpenAssistant(prompt)}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />

      {/* Main Landmark */}
      <main id="main-content">{renderRouteView()}</main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Quick Preview Modals */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onNavigate={(path) => {
          setActiveProjectModal(null);
          navigate(path);
        }}
        onAskAi={(prompt, scope) => {
          setActiveProjectModal(null);
          handleOpenAssistant(prompt, scope);
        }}
      />
      <ArticleModal
        article={activeArticleModal}
        onClose={() => setActiveArticleModal(null)}
        onNavigate={(path) => {
          setActiveArticleModal(null);
          navigate(path);
        }}
        onAskAi={(prompt, scope) => {
          setActiveArticleModal(null);
          handleOpenAssistant(prompt, scope);
        }}
      />
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onNavigate={(path) => {
          setIsResumeModalOpen(false);
          navigate(path);
        }}
        onAskAi={(prompt) => {
          setIsResumeModalOpen(false);
          handleOpenAssistant(prompt);
        }}
      />

      {/* Global Command Palette Modal (⌘K / Ctrl+K) */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm no-print"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette and Global Search"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Search className="w-4 h-4 text-[#0F52BA]" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Type a command or search projects, essays, skills (e.g., LangGraph, Qdrant, CV)..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
              {/* Quick Actions */}
              <div>
                <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Quick Actions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      handleOpenAssistant(
                        commandQuery.trim() ||
                          "Summarize Maimoon's multi-agent and RAG experience."
                      );
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-[#0F52BA]/15 text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#50C878]" />
                      <span>Ask AI Portfolio Twin</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigate('/resume');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-[#0F52BA]/15 text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#0F52BA]" />
                      <span>Open Interactive CV &amp; PDF (/resume)</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(PERSONAL_INFO.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-[#0F52BA]/15 text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-[#50C878]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>
                        {copiedEmail ? 'Copied ideal.rhel@gmail.com!' : 'Copy Email (ideal.rhel@gmail.com)'}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-[#0F52BA]/15 text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'dark' ? (
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Moon className="w-3.5 h-3.5 text-[#0F52BA]" />
                      )}
                      <span>Toggle {theme === 'dark' ? 'Light' : 'Obsidian Dark'} Theme</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Matching Knowledge Results */}
              <div>
                <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Knowledge &amp; Route Matches
                </div>
                <div className="space-y-1">
                  {commandResults.map((res) => (
                    <button
                      key={res.id}
                      type="button"
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        navigate(res.url);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {res.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {res.snippet}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 shrink-0">
                        {res.url}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating RAG Assistant (Hidden when already on full-page /ai) */}
      {currentPath !== '/ai' && (
        <AiAssistant
          externalOpen={isAssistantOpen}
          onExternalClose={() => setIsAssistantOpen(false)}
          initialPrompt={assistantInitialPrompt}
          contextScope={assistantContextScope}
          onClearContextScope={() => setAssistantContextScope(undefined)}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}
