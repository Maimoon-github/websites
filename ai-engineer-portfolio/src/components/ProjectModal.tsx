import React, { useState } from 'react';
import {
  X,
  Github,
  Play,
  Layers,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { ProjectCaseStudy } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';

interface ProjectDetailProps {
  project: ProjectCaseStudy;
  onClose?: () => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string, contextScope?: string) => void;
  isPage?: boolean;
}

export const ProjectCaseStudyView: React.FC<ProjectDetailProps> = ({
  project,
  onClose,
  onNavigate,
  onAskAi,
  isPage = false,
}) => {
  const [activeTab, setActiveTab] = useState<'case-study' | 'sandbox'>('case-study');
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive simulator state
  const [simInput, setSimInput] = useState<string>(
    project.demoType === 'agent-flow'
      ? 'Draft and review a technical architecture RFC for asynchronous multi-agent loops in Django & Celery.'
      : project.demoType === 'career-coach'
      ? 'Target Role: Senior Agentic AI Engineer | Current Stack: Python, FastAPI, Docker | Goal: Master LangGraph & Qdrant'
      : 'How does Maimoon combine LangGraph and CrewAI in AI-Learning-Career-Coach?'
  );
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimRunning(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 450);
    setTimeout(() => setSimStep(3), 950);
    setTimeout(() => {
      setSimStep(4);
      setIsSimRunning(false);
    }, 1450);
  };

  const handleCopyCode = () => {
    if (!project.implementation.codeSnippet) return;
    navigator.clipboard.writeText(project.implementation.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div
      className={
        isPage
          ? 'pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
          : 'relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col'
      }
    >
      {/* Breadcrumb Navigation for Full Page */}
      {isPage && onNavigate && (
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-[#0F52BA] dark:hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="hover:text-[#0F52BA] dark:hover:text-white transition-colors cursor-pointer"
            >
              Work
            </button>
            <span>›</span>
            <span className="text-slate-900 dark:text-slate-200">{project.title}</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all case studies</span>
          </button>
        </nav>
      )}

      {/* Header */}
      <div
        className={`${
          isPage
            ? 'p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 mb-8'
            : 'p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141418]'
        } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
      >
        <div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
            {project.categoryLabel} · {project.year} · {project.role} ·{' '}
            <span className="text-[#50C878]">{project.status}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{project.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onAskAi && (
            <button
              type="button"
              onClick={() =>
                onAskAi(
                  `Walk me through the architecture, constraints, and implementation of ${project.title}.`,
                  `work:${project.slug}`
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] bg-[#0F52BA]/10 dark:bg-[#50C878]/10 border border-[#0F52BA]/30 dark:border-[#50C878]/30 hover:brightness-110 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI about this case study</span>
            </button>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className={`${isPage ? 'mb-6' : 'px-6 pt-3 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#101014]'} flex items-center gap-2`}>
        <button
          type="button"
          onClick={() => setActiveTab('case-study')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'case-study'
              ? 'bg-[#0F52BA] text-white shadow-sm'
              : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Architecture Case Study (Problem → Results)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('sandbox');
            if (simStep === 0) runSimulation();
          }}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'sandbox'
              ? 'bg-[#50C878] text-slate-950 shadow-sm'
              : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Interactive System Simulator</span>
        </button>
      </div>

      {/* Main Content */}
      <div className={isPage ? 'space-y-8' : 'p-6 overflow-y-auto space-y-8 flex-1'}>
        {activeTab === 'case-study' ? (
          <div className={isPage ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start' : 'space-y-8'}>
            {/* Left/Main Case Study Column */}
            <div className={isPage ? 'lg:col-span-8 space-y-8' : 'space-y-8'}>
              {/* TL;DR Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10"
                  >
                    <div className="text-xl font-extrabold text-slate-950 dark:text-white font-mono">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* 1. Problem & Constraints */}
              <section id="problem" className="p-6 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#DC143C]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>01 · Problem &amp; Operational Constraints</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                  {project.problem}
                </p>
                <div className="pt-2">
                  <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                    Engineering Constraints:
                  </div>
                  <ul className="space-y-2">
                    {project.constraints.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C] mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 2. Architecture */}
              <section id="architecture" className="p-6 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F52BA]">
                  <Layers className="w-4 h-4" />
                  <span>02 · System Architecture</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.architecture.overview}
                </p>

                {/* Data Flow Pipeline Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-[#0F52BA]/30 font-mono text-xs text-blue-300 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 uppercase mb-1">Execution &amp; Data Flow</div>
                  {project.architecture.dataFlow}
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {project.architecture.components.map((comp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#0F52BA]/15 text-[#0F52BA] dark:text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Implementation & Code */}
              <section id="implementation" className="p-6 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#50C878]">
                  <Cpu className="w-4 h-4" />
                  <span>03 · Implementation Details</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                      Engineering Bottleneck
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.implementation.challenges}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] mb-1.5">
                      Production Solution
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.implementation.solutions}
                    </p>
                  </div>
                </div>

                {project.implementation.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#09090b]">
                    <div className="px-4 py-2.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300 flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[#50C878]" />
                        {project.implementation.codeSnippet.title}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#50C878]" />
                            <span className="text-[#50C878]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                      <code>{project.implementation.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>

              {/* 4. Results & Impact */}
              <section id="results" className="p-6 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#50C878]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>04 · Verified Outcomes &amp; Takeaways</span>
                </div>
                <div className="space-y-2.5">
                  {project.results.impact.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#50C878] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic border-l-2 border-[#0F52BA] pl-3 py-1">
                  Key Takeaway: {project.results.takeaways}
                </p>
              </section>
            </div>

            {/* Right Sticky Sidebar on Full Page */}
            {isPage && (
              <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    On This Page
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <li>
                      <a href="#problem" className="hover:text-[#0F52BA] dark:hover:text-white">
                        01 · Problem &amp; Constraints
                      </a>
                    </li>
                    <li>
                      <a href="#architecture" className="hover:text-[#0F52BA] dark:hover:text-white">
                        02 · System Architecture
                      </a>
                    </li>
                    <li>
                      <a href="#implementation" className="hover:text-[#0F52BA] dark:hover:text-white">
                        03 · Implementation &amp; Code
                      </a>
                    </li>
                    <li>
                      <a href="#results" className="hover:text-[#0F52BA] dark:hover:text-white">
                        04 · Outcomes &amp; Takeaways
                      </a>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Technology Stack
                    </div>
                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                      {project.techStack.join(' · ')}
                    </div>
                  </div>
                </div>

                {/* Contextual RAG Prompt Card */}
                {onAskAi && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0F52BA]/15 via-[#111115] to-[#50C878]/10 border border-[#0F52BA]/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <Sparkles className="w-4 h-4 text-[#50C878]" />
                      <span>Interrogate This Architecture</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Ask the citation-grounded RAG assistant about design trade-offs, failure modes,
                      or implementation details for {project.title}.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onAskAi(
                          `How does ${project.title} handle state transitions and error recovery?`,
                          `work:${project.slug}`
                        )
                      }
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0F52BA]/90 transition-colors cursor-pointer"
                    >
                      Ask AI with Context Scope →
                    </button>
                  </div>
                )}
              </aside>
            )}
          </div>
        ) : (
          /* Interactive Architecture Simulator Tab */
          <div className="space-y-6 p-6 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Interactive Pipeline Trace Simulator — {project.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect how inputs traverse Maimoon’s {project.categoryLabel} pipeline step by step.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#0F52BA]"
              />
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimRunning}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0F52BA] to-[#50C878] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimRunning ? 'Executing Trace...' : 'Run Pipeline Trace'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title:
                    project.demoType === 'agent-flow'
                      ? 'Stage 1: Celery Task Dispatch & Planner Agent'
                      : project.demoType === 'career-coach'
                      ? 'Stage 1: LangGraph Diagnostic Node'
                      : 'Stage 1: Query Normalization & Hybrid RRF Retrieval',
                  detail:
                    project.demoType === 'agent-flow'
                      ? `Dispatched async job via Redis broker. Planner Agent decomposed "${simInput.slice(0, 55)}..." into 4 structured sections and rubric thresholds.`
                      : project.demoType === 'career-coach'
                      ? `Evaluated learner profile ("${simInput.slice(0, 55)}...") and identified target competency deltas in Qdrant memory.`
                      : `Computed BM25 lexical + dense trigram embeddings across ${PROJECTS.length} case studies and timeline chunks.`,
                },
                {
                  step: 2,
                  title:
                    project.demoType === 'agent-flow'
                      ? 'Stage 2: Writer & Editor Agent Synthesis (Google Gemini)'
                      : project.demoType === 'career-coach'
                      ? 'Stage 2: CrewAI Curriculum & Career Coaching Team'
                      : 'Stage 2: Context Grounding & Citation Binding',
                  detail:
                    project.demoType === 'agent-flow'
                      ? 'Writer Agent synthesized initial technical draft; Editor Agent refined structural coherence and code blocks.'
                      : project.demoType === 'career-coach'
                      ? 'Curriculum Architect & Career Mentor agents collaborated sequentially using local Ollama LLM inference.'
                      : 'Selected top-K chunks with Reciprocal Rank Fusion and bound [Source: Title](/url) inline citations.',
                },
                {
                  step: 3,
                  title:
                    project.demoType === 'agent-flow'
                      ? 'Stage 3: Quality-Reviewer Critique Loop (Iteration 1 → 2)'
                      : project.demoType === 'career-coach'
                      ? 'Stage 3: Pydantic AI Schema & Guardrails Check'
                      : 'Stage 3: Streaming SSE / JSON-RPC 2.0 MCP Emission',
                  detail:
                    project.demoType === 'agent-flow'
                      ? 'Quality-Reviewer scored draft (0.94 >= 0.85 rubric gate) after 1 refinement iteration; Langfuse trace recorded.'
                      : project.demoType === 'career-coach'
                      ? 'Validated WeeklyMilestone Pydantic schema and compacted intermediate scratchpad before state commit.'
                      : 'Streamed grounded synthesis with clickable citations and exposed tool output via /mcp.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    simStep >= item.step
                      ? 'bg-[#0F52BA]/10 border-[#0F52BA]/40 text-slate-900 dark:text-slate-200'
                      : 'bg-slate-50 dark:bg-white/[0.01] border-slate-200 dark:border-white/5 text-slate-400 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-[#0F52BA] dark:text-[#50C878]">{item.title}</span>
                    <span>{simStep >= item.step ? 'COMPLETED' : 'PENDING'}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next / Previous Case Study Navigation on Full Page */}
        {isPage && onNavigate && (
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prevProject ? (
              <button
                type="button"
                onClick={() => onNavigate(`/work/${prevProject.slug}`)}
                className="p-4 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 hover:border-[#0F52BA] text-left transition-all cursor-pointer"
              >
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous Case Study
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {prevProject.title}
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextProject && (
              <button
                type="button"
                onClick={() => onNavigate(`/work/${nextProject.slug}`)}
                className="p-4 rounded-2xl bg-white dark:bg-[#111115] border border-slate-200 dark:border-white/10 hover:border-[#0F52BA] text-right transition-all cursor-pointer"
              >
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-end gap-1">
                  Next Case Study <ArrowRight className="w-3 h-3" />
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {nextProject.title}
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const ProjectModal: React.FC<{
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string, contextScope?: string) => void;
}> = ({ project, onClose, onNavigate, onAskAi }) => {
  if (!project) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <ProjectCaseStudyView
        project={project}
        onClose={onClose}
        onNavigate={onNavigate}
        onAskAi={onAskAi}
        isPage={false}
      />
    </div>
  );
};
