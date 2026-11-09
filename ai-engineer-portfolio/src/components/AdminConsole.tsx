import React, { useState, useEffect } from 'react';
import {
  Shield,
  RefreshCw,
  LayoutDashboard,
  FileEdit,
  Database,
  Mail,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  Download,
  RotateCcw,
  Lock,
  ExternalLink,
} from 'lucide-react';
import {
  PersonalInfoData,
  ProjectCaseStudy,
  ArticlePost,
  TimelineItem,
  SkillGroup,
  KnowledgeChunk,
  NewsletterSubscriber,
  AdminSiteSettings,
} from '@/types/portfolio';
import { computeDeterministicEmbedding } from '@/lib/rag';
import {
  fetchAdminState,
  updateAdminProfile,
  createAdminProject,
  deleteAdminProject,
  createAdminArticle,
  deleteAdminArticle,
  createAdminTimeline,
  deleteAdminTimeline,
  createAdminContentItem,
  deleteAdminContentItem,
  triggerRagReindex,
  updateAdminMessageStatus,
  deleteAdminMessage,
  updateAvailabilitySettings,
  resetAdminStore,
} from '@/services/portfolioApi';

interface AdminConsoleProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onStoreUpdated: () => void;
}

type AdminTab = 'dashboard' | 'content' | 'knowledge' | 'messages' | 'settings';
type ContentSubTab = 'profile' | 'projects' | 'articles' | 'timeline';

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  currentPath,
  onNavigate,
  onStoreUpdated,
}) => {
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(true);
  const [adminToken, setAdminToken] = useState<string>('maimoon-admin');
  const [statusToast, setStatusToast] = useState<string>('');

  // Derive active tab from URL (/admin/dashboard, /admin/content, /admin/knowledge, /admin/messages, /admin/settings)
  const activeTab: AdminTab = currentPath.includes('/admin/content')
    ? 'content'
    : currentPath.includes('/admin/knowledge')
    ? 'knowledge'
    : currentPath.includes('/admin/messages')
    ? 'messages'
    : currentPath.includes('/admin/settings')
    ? 'settings'
    : 'dashboard';

  const [contentSubTab, setContentSubTab] = useState<ContentSubTab>('projects');

  // Loaded Admin State
  const [state, setState] = useState<{
    personalInfo: PersonalInfoData;
    projects: ProjectCaseStudy[];
    articles: ArticlePost[];
    timeline: TimelineItem[];
    skillGroups: SkillGroup[];
    chunks: KnowledgeChunk[];
    chunkCount: number;
    lastReindexedAt: string;
    subscribers: NewsletterSubscriber[];
    settings: AdminSiteSettings;
    metrics: {
      totalChats: number;
      upvotes: number;
      downvotes: number;
      topQueries: {
        id: string;
        query: string;
        feedback?: 'up' | 'down';
        sources?: string[];
        timestamp: string;
      }[];
      contactsCount: number;
      subscribersCount: number;
      contacts: {
        id: string;
        name: string;
        email: string;
        company?: string;
        projectType: string;
        budgetOrTimeline?: string;
        message: string;
        status: 'new' | 'read' | 'replied';
        createdAt: string;
      }[];
    };
  } | null>(null);

  // Profile editor form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    headline: '',
    subheadline: '',
    summary: '',
    email: '',
    phone: '',
    location: '',
    availabilityDetails: '',
  });

  // New Project form state
  const [projTitle, setProjTitle] = useState('');
  const [projSubtitle, setProjSubtitle] = useState('');
  const [projCategory, setProjCategory] = useState<'agents' | 'rag' | 'infra' | 'oss'>('agents');
  const [projStack, setProjStack] = useState('LangGraph, CrewAI, FastAPI, Qdrant, Docker');
  const [projSummary, setProjSummary] = useState('');
  const [projProblem, setProjProblem] = useState('');
  const [projSolution, setProjSolution] = useState('');

  // New MDX Article form state
  const [artTitle, setArtTitle] = useState('');
  const [artSubtitle, setArtSubtitle] = useState('');
  const [artCategory, setArtCategory] = useState('Agents & Orchestration');
  const [artSeries, setArtSeries] = useState('Production Agentic Systems');
  const [artTags, setArtTags] = useState('LangGraph, RAG, Agents');
  const [artContent, setArtContent] = useState('');

  // New Timeline form state
  const [tlInstitution, setTlInstitution] = useState('');
  const [tlProgram, setTlProgram] = useState('');
  const [tlPeriod, setTlPeriod] = useState('2025');
  const [tlSummary, setTlSummary] = useState('');
  const [tlSkills, setTlSkills] = useState('LangGraph, PyTorch, Docker');

  // New Custom Knowledge Chunk state
  const [chunkTitle, setChunkTitle] = useState('');
  const [chunkTags, setChunkTags] = useState('LangGraph, RAG, Architecture');
  const [chunkBody, setChunkBody] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<AdminSiteSettings>({
    available: true,
    statusText: 'Open to Opportunities',
    model: 'gemini-3.8-flash',
    systemPromptNote: '',
    newsletterEnabled: true,
  });

  const showToast = (msg: string) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(''), 3200);
  };

  const loadData = async () => {
    try {
      const data = await fetchAdminState();
      setState(data);
      if (data.personalInfo) {
        setProfileForm({
          name: data.personalInfo.name || '',
          headline: data.personalInfo.headline || '',
          subheadline: data.personalInfo.subheadline || '',
          summary: data.personalInfo.summary || '',
          email: data.personalInfo.email || '',
          phone: data.personalInfo.phone || '',
          location: data.personalInfo.location || '',
          availabilityDetails: data.personalInfo.availabilityDetails || '',
        });
      }
      if (data.settings) {
        setSettingsForm(data.settings);
      }
    } catch {
      // Ignore error
    }
  };

  useEffect(() => {
    loadData();
  }, [currentPath]);

  const handleReindex = async () => {
    await triggerRagReindex();
    await loadData();
    onStoreUpdated();
    showToast('RAG Knowledge Base re-indexed & synchronized.');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdminProfile(profileForm);
    await loadData();
    onStoreUpdated();
    showToast('Candidate profile & hero updated across site and CV.');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projSummary.trim()) return;
    await createAdminProject({
      title: projTitle,
      subtitle: projSubtitle || 'Production AI System',
      category: projCategory,
      categoryLabel:
        projCategory === 'agents'
          ? 'Multi-Agent System'
          : projCategory === 'rag'
          ? 'RAG & Vector Architecture'
          : 'AI Infrastructure',
      summary: projSummary,
      techStack: projStack.split(',').map((s) => s.trim()).filter(Boolean),
      problem: projProblem || projSummary,
      implementation: {
        challenges: 'Ensuring deterministic execution and low-latency state handoffs.',
        solutions: projSolution || 'Implemented typed Pydantic AI contracts and Langfuse tracing.',
      },
    });
    setProjTitle('');
    setProjSubtitle('');
    setProjSummary('');
    setProjProblem('');
    setProjSolution('');
    await loadData();
    onStoreUpdated();
    showToast('New case study published to /work and indexed into RAG.');
  };

  const handleRemoveProject = async (slug: string) => {
    await deleteAdminProject(slug);
    await loadData();
    onStoreUpdated();
    showToast(`Removed case study "${slug}".`);
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) return;
    await createAdminArticle({
      title: artTitle,
      subtitle: artSubtitle || artContent.slice(0, 120),
      category: artCategory,
      series: artSeries,
      tags: artTags.split(',').map((t) => t.trim()).filter(Boolean),
      content: artContent,
    });
    setArtTitle('');
    setArtSubtitle('');
    setArtContent('');
    await loadData();
    onStoreUpdated();
    showToast('Published MDX post to /writing and indexed into RAG.');
  };

  const handleRemoveArticle = async (slug: string) => {
    await deleteAdminArticle(slug);
    await loadData();
    onStoreUpdated();
    showToast(`Deleted article "${slug}".`);
  };

  const handleAddTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tlInstitution.trim() || !tlProgram.trim()) return;
    await createAdminTimeline({
      institution: tlInstitution,
      program: tlProgram,
      period: tlPeriod,
      summary: tlSummary,
      skills: tlSkills.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setTlInstitution('');
    setTlProgram('');
    setTlSummary('');
    await loadData();
    onStoreUpdated();
    showToast('Added timeline milestone to /about and /resume.');
  };

  const handleRemoveTimeline = async (id: string) => {
    await deleteAdminTimeline(id);
    await loadData();
    onStoreUpdated();
    showToast('Removed timeline milestone.');
  };

  const handleAddKnowledgeChunk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chunkTitle.trim() || !chunkBody.trim()) return;
    await createAdminContentItem({
      title: chunkTitle,
      subtitle: 'Custom Knowledge Chunk',
      category: 'RAG Knowledge',
      summary: chunkBody.slice(0, 140),
      tags: chunkTags.split(',').map((t) => t.trim()),
      content: chunkBody,
    });
    setChunkTitle('');
    setChunkBody('');
    await loadData();
    onStoreUpdated();
    showToast('Embedded and added custom chunk to RAG index.');
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAvailabilitySettings(settingsForm.statusText, settingsForm.available, {
      model: settingsForm.model,
      systemPromptNote: settingsForm.systemPromptNote,
      newsletterEnabled: settingsForm.newsletterEnabled,
    });
    await loadData();
    onStoreUpdated();
    showToast('Saved AI model, prompt directive & availability status.');
  };

  const handleFactoryReset = async () => {
    await resetAdminStore();
    await loadData();
    onStoreUpdated();
    showToast('Restored default Maimoon Amin portfolio store.');
  };

  const navItems: { id: AdminTab; label: string; path: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Content CRUD', path: '/admin/content', icon: FileEdit },
    { id: 'knowledge', label: 'RAG Knowledge', path: '/admin/knowledge', icon: Database },
    { id: 'messages', label: 'Inbox & Leads', path: '/admin/messages', icon: Mail },
    { id: 'settings', label: 'Site & AI Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#50C878] mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Private Admin Console · File-Backed CMS (`data/cms-store.json`) · noindex</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Centralized Portfolio, Résumé &amp; RAG Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReindex}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync &amp; Re-Index RAG ({state?.chunkCount ?? 10} Chunks)</span>
          </button>
          <a
            href="/api/admin/export"
            download="maimoon-cms-store.json"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5 text-[#50C878]" />
            <span>Export JSON</span>
          </a>
        </div>
      </div>

      {/* Live Toast Feedback */}
      {statusToast && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-medium text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#50C878] shrink-0" />
          <span>{statusToast}</span>
        </div>
      )}

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Workspace Navigation */}
          <aside className="lg:col-span-3 space-y-1.5 bg-white dark:bg-[#101014] p-3 rounded-2xl border border-slate-200 dark:border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F52BA] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/10 px-2 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">Last Indexed</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 truncate">
                {state?.lastReindexedAt
                  ? new Date(state.lastReindexedAt).toLocaleTimeString()
                  : 'Just now'}
              </div>
            </div>
          </aside>

          {/* Main Workspace Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. DASHBOARD WORKSPACE (/admin/dashboard) */}
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                    <div className="text-xs font-mono text-slate-400">RAG Vector Chunks</div>
                    <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                      {state?.chunkCount ?? 10}
                    </div>
                    <div className="text-[11px] text-[#50C878] mt-1">
                      {state?.projects.length ?? 3} Projects · {state?.articles.length ?? 3} Posts
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                    <div className="text-xs font-mono text-slate-400">RAG Conversations</div>
                    <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                      {state?.metrics.totalChats ?? 0}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      👍 {state?.metrics.upvotes ?? 0} Helpful · 👎 {state?.metrics.downvotes ?? 0}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                    <div className="text-xs font-mono text-slate-400">Contact Inquiries</div>
                    <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                      {state?.metrics.contactsCount ?? 0}
                    </div>
                    <div className="text-[11px] text-[#0F52BA] dark:text-blue-400 mt-1">
                      Direct to {state?.personalInfo.email}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10">
                    <div className="text-xs font-mono text-slate-400">Newsletter List</div>
                    <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono mt-1">
                      {state?.metrics.subscribersCount ?? 0}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Active Subscribers</div>
                  </div>
                </div>

                {/* Recent RAG Queries & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                        Recent Visitor RAG Queries &amp; Citations
                      </h2>
                      <button
                        type="button"
                        onClick={() => onNavigate('/ai')}
                        className="text-xs font-mono text-[#0F52BA] dark:text-[#50C878] hover:underline cursor-pointer"
                      >
                        Open /ai →
                      </button>
                    </div>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {state?.metrics.topQueries.map((q) => (
                        <div
                          key={q.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono font-semibold text-slate-900 dark:text-white truncate">
                              {q.query}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              {q.feedback === 'up' ? '👍' : q.feedback === 'down' ? '👎' : '•'}{' '}
                              {new Date(q.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          {q.sources && q.sources.length > 0 && (
                            <div className="text-[10px] font-mono text-slate-500 truncate">
                              Cited: {q.sources.join(' · ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                        Recent Hiring &amp; Consulting Leads
                      </h2>
                      <button
                        type="button"
                        onClick={() => onNavigate('/admin/messages')}
                        className="text-xs font-mono text-[#0F52BA] dark:text-[#50C878] hover:underline cursor-pointer"
                      >
                        Manage Inbox →
                      </button>
                    </div>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {state?.metrics.contacts.map((c) => (
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
                  </div>
                </div>
              </>
            )}

            {/* 2. CONTENT CRUD WORKSPACE (/admin/content) */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Sub-Tab Selector */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'projects', label: `Case Studies (${state?.projects.length ?? 3})` },
                    { id: 'articles', label: `MDX Writing (${state?.articles.length ?? 3})` },
                    { id: 'profile', label: 'Profile & Hero Copy' },
                    { id: 'timeline', label: `Timeline & Skills (${state?.timeline.length ?? 4})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setContentSubTab(tab.id as ContentSubTab)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                        contentSubTab === tab.id
                          ? 'bg-[#50C878] text-slate-950'
                          : 'bg-white dark:bg-[#101014] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* A. Case Studies CRUD */}
                {contentSubTab === 'projects' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <form
                      onSubmit={handleAddProject}
                      className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-[#0F52BA]" />
                        <span>Publish New Case Study</span>
                      </h3>
                      <input
                        type="text"
                        required
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="Project Title (e.g., Autonomous-Code-Auditor)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={projSubtitle}
                        onChange={(e) => setProjSubtitle(e.target.value)}
                        placeholder="Subtitle (e.g., Multi-Agent Security Reviewer)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <select
                        value={projCategory}
                        onChange={(e) => setProjCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      >
                        <option value="agents">Multi-Agent Systems (agents)</option>
                        <option value="rag">RAG &amp; MCP (rag)</option>
                        <option value="infra">Backend &amp; Infra (infra)</option>
                        <option value="oss">Open Source (oss)</option>
                      </select>
                      <input
                        type="text"
                        value={projStack}
                        onChange={(e) => setProjStack(e.target.value)}
                        placeholder="Comma-separated Tech Stack"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                      <textarea
                        rows={2}
                        required
                        value={projSummary}
                        onChange={(e) => setProjSummary(e.target.value)}
                        placeholder="Executive summary..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <textarea
                        rows={2}
                        value={projProblem}
                        onChange={(e) => setProjProblem(e.target.value)}
                        placeholder="Problem statement & constraints..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                      >
                        Publish Case Study &amp; Sync RAG
                      </button>
                    </form>

                    <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                        Published Case Studies (/work)
                      </h3>
                      <div className="space-y-2.5">
                        {state?.projects.map((p) => (
                          <div
                            key={p.slug}
                            className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                                <span>{p.title}</span>
                                <span className="text-[10px] font-mono text-[#50C878]">
                                  /work/{p.slug}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                {p.summary}
                              </p>
                              <div className="text-[10px] font-mono text-slate-400 mt-1.5">
                                {p.techStack.join(' · ')}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => onNavigate(`/work/${p.slug}`)}
                                className="p-1.5 rounded-lg bg-slate-200/70 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                                title="View Case Study"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveProject(p.slug)}
                                className="p-1.5 rounded-lg bg-[#DC143C]/15 text-[#DC143C]"
                                title="Delete Case Study"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* B. MDX Writing CRUD */}
                {contentSubTab === 'articles' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <form
                      onSubmit={handleAddArticle}
                      className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-[#50C878]" />
                        <span>Publish New MDX Article</span>
                      </h3>
                      <input
                        type="text"
                        required
                        value={artTitle}
                        onChange={(e) => setArtTitle(e.target.value)}
                        placeholder="Article Title"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={artSubtitle}
                        onChange={(e) => setArtSubtitle(e.target.value)}
                        placeholder="Subtitle / Summary"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={artCategory}
                          onChange={(e) => setArtCategory(e.target.value)}
                          placeholder="Category"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                        />
                        <input
                          type="text"
                          value={artSeries}
                          onChange={(e) => setArtSeries(e.target.value)}
                          placeholder="Series"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={artTags}
                        onChange={(e) => setArtTags(e.target.value)}
                        placeholder="Tags (comma-separated)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                      <textarea
                        rows={5}
                        required
                        value={artContent}
                        onChange={(e) => setArtContent(e.target.value)}
                        placeholder="## Section Heading&#10;&#10;Write MDX paragraphs, > callouts, or ```python code blocks..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                      >
                        Publish MDX Post &amp; Sync RAG
                      </button>
                    </form>

                    <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                        Published Articles (/writing)
                      </h3>
                      <div className="space-y-2.5">
                        {state?.articles.map((a) => (
                          <div
                            key={a.slug}
                            className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-950 dark:text-white">
                                {a.title}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                                {a.date} · {a.series} · {a.tags.join(' · ')}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => onNavigate(`/writing/${a.slug}`)}
                                className="p-1.5 rounded-lg bg-slate-200/70 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveArticle(a.slug)}
                                className="p-1.5 rounded-lg bg-[#DC143C]/15 text-[#DC143C]"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* C. Candidate Profile & Hero Editor */}
                {contentSubTab === 'profile' && (
                  <form
                    onSubmit={handleSaveProfile}
                    className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                      Edit Candidate Profile, Hero Positioning &amp; Contact Channels
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Hero Headline
                        </label>
                        <input
                          type="text"
                          value={profileForm.headline}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, headline: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Direct Email
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, email: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Direct Phone
                        </label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Executive Summary (Drives /about, /resume, /llms.txt &amp; RAG)
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.summary}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, summary: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                    >
                      Save Profile &amp; Sync Across Site
                    </button>
                  </form>
                )}

                {/* D. Timeline & Skills CRUD */}
                {contentSubTab === 'timeline' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <form
                      onSubmit={handleAddTimeline}
                      className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                        Add Timeline / Mentorship Milestone
                      </h3>
                      <input
                        type="text"
                        required
                        value={tlInstitution}
                        onChange={(e) => setTlInstitution(e.target.value)}
                        placeholder="Institution / Organization"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        required
                        value={tlProgram}
                        onChange={(e) => setTlProgram(e.target.value)}
                        placeholder="Role or Program Title"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={tlPeriod}
                        onChange={(e) => setTlPeriod(e.target.value)}
                        placeholder="Period (e.g., 2025)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                      <textarea
                        rows={2}
                        required
                        value={tlSummary}
                        onChange={(e) => setTlSummary(e.target.value)}
                        placeholder="Summary of achievements..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={tlSkills}
                        onChange={(e) => setTlSkills(e.target.value)}
                        placeholder="Skills (comma-separated)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#0F52BA] text-white text-xs font-semibold cursor-pointer"
                      >
                        Add Timeline Entry
                      </button>
                    </form>

                    <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                        Timeline Milestones (Drives Home, /about &amp; /resume)
                      </h3>
                      <div className="space-y-2">
                        {state?.timeline.map((item) => (
                          <div
                            key={item.id}
                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 dark:text-white">
                                {item.period} · {item.institution}
                              </div>
                              <div className="text-xs text-[#0F52BA] dark:text-[#50C878]">
                                {item.program}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveTimeline(item.id)}
                              className="p-1.5 rounded-lg bg-[#DC143C]/15 text-[#DC143C] shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. RAG KNOWLEDGE BASE WORKSPACE (/admin/knowledge) */}
            {activeTab === 'knowledge' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <form
                  onSubmit={handleAddKnowledgeChunk}
                  className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3"
                >
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Ingest Custom RAG Knowledge Chunk
                  </h2>
                  <p className="text-xs text-slate-500">
                    Add supplementary architectural notes or FAQ facts directly into the vector
                    retrieval corpus.
                  </p>
                  <input
                    type="text"
                    required
                    value={chunkTitle}
                    onChange={(e) => setChunkTitle(e.target.value)}
                    placeholder="Chunk Title..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={chunkTags}
                    onChange={(e) => setChunkTags(e.target.value)}
                    placeholder="Keywords (comma-separated)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                  />
                  <textarea
                    rows={4}
                    required
                    value={chunkBody}
                    onChange={(e) => setChunkBody(e.target.value)}
                    placeholder="Factual content to embed and retrieve..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Embed &amp; Index Chunk
                  </button>
                </form>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                      Active Vector Corpus ({state?.chunks.length ?? 0} Chunks)
                    </h2>
                    <span className="text-[11px] font-mono text-[#50C878]">64-d Normalized RRF</span>
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-y-auto">
                    {state?.chunks.map((chunk) => {
                      const vecPreview = computeDeterministicEmbedding(chunk.title, 4);
                      return (
                        <div
                          key={chunk.id}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="min-w-0 space-y-1">
                            <div className="font-bold text-slate-900 dark:text-white truncate">
                              {chunk.title}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              [{chunk.sourceType}] {chunk.url} · vec[{vecPreview.join(', ')}, ...]
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                              {chunk.content}
                            </p>
                          </div>
                          {chunk.id.startsWith('chunk-custom-') && (
                            <button
                              type="button"
                              onClick={async () => {
                                await deleteAdminContentItem(chunk.id);
                                await loadData();
                                onStoreUpdated();
                              }}
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
            )}

            {/* 4. INBOX & LEADS WORKSPACE (/admin/messages) */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4">
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Contact &amp; Consulting Inquiries ({state?.metrics.contacts.length ?? 0})
                  </h2>
                  <div className="space-y-3">
                    {state?.metrics.contacts.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-sm font-bold text-slate-950 dark:text-white">
                            {msg.name}{' '}
                            <span className="font-mono text-xs text-[#0F52BA] dark:text-[#50C878]">
                              &lt;{msg.email}&gt;
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                msg.status === 'replied'
                                  ? 'bg-emerald-500/15 text-[#50C878]'
                                  : msg.status === 'read'
                                  ? 'bg-blue-500/15 text-blue-400'
                                  : 'bg-amber-500/15 text-amber-400'
                              }`}
                            >
                              {msg.status || 'new'}
                            </span>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateAdminMessageStatus(msg.id, 'replied');
                                await loadData();
                                showToast(`Marked message from ${msg.name} as replied.`);
                              }}
                              className="px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-mono text-slate-800 dark:text-slate-200 cursor-pointer"
                            >
                              Mark Replied
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                await deleteAdminMessage(msg.id);
                                await loadData();
                                showToast('Deleted inquiry.');
                              }}
                              className="p-1 rounded bg-[#DC143C]/15 text-[#DC143C] cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                          {msg.projectType} {msg.company ? `· ${msg.company}` : ''}{' '}
                          {msg.budgetOrTimeline ? `· ${msg.budgetOrTimeline}` : ''}
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Subscribers List */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-3">
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Newsletter Subscribers ({state?.subscribers?.length ?? 0})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {state?.subscribers?.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono"
                      >
                        <span className="text-slate-900 dark:text-white truncate">{sub.email}</span>
                        <span className="text-[10px] text-slate-400">{sub.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SITE & AI SETTINGS WORKSPACE (/admin/settings) */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <form
                  onSubmit={handleSaveSettings}
                  className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4"
                >
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    RAG Model, System Prompt &amp; Live Availability Configuration
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Hero &amp; CV Availability Status Badge
                      </label>
                      <input
                        type="text"
                        value={settingsForm.statusText}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, statusText: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Active Gemini Model Alias
                      </label>
                      <select
                        value={settingsForm.model}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, model: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      >
                        <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended)</option>
                        <option value="gemini-3.8-pro">gemini-3.8-pro</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Custom RAG System Prompt Directive
                      </label>
                      <textarea
                        rows={3}
                        value={settingsForm.systemPromptNote}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, systemPromptNote: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                    >
                      Save Configuration
                    </button>

                    <button
                      type="button"
                      onClick={handleFactoryReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DC143C]/15 text-[#DC143C] text-xs font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Store to Factory Seed</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
