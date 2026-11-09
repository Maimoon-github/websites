import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCaseStudy, ProjectCategory } from '../types/portfolio';
import { filterProjects } from '../utils/portfolioLogic';

interface ProjectsProps {
  projects?: ProjectCaseStudy[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string) => void;
  isFullPage?: boolean;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'agents', label: 'Multi-Agent Systems' },
  { id: 'rag', label: 'RAG & MCP' },
  { id: 'infra', label: 'Backend & Infra' },
  { id: 'oss', label: 'Open Source' },
];

const ProjectArtwork: React.FC<{ demoType: ProjectCaseStudy['demoType'] }> = ({ demoType }) => {
  if (demoType === 'agent-flow') {
    return (
      <svg viewBox="0 0 400 180" className="w-full h-full">
        <defs>
          <linearGradient id="agentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F52BA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#50C878" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DC143C" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="400" height="180" fill="#0B0B0B" />
        <g stroke="url(#agentGrad)" strokeWidth="1.5" fill="none">
          <line x1="70" y1="90" x2="155" y2="50" />
          <line x1="155" y1="50" x2="245" y2="50" />
          <line x1="245" y1="50" x2="330" y2="90" />
          <path d="M 330 90 Q 200 155 155 50" stroke="#DC143C" strokeDasharray="4 4" />
        </g>
        <circle cx="70" cy="90" r="16" fill="#0F52BA" fillOpacity="0.25" stroke="#0F52BA" strokeWidth="1.5" />
        <circle cx="155" cy="50" r="16" fill="#50C878" fillOpacity="0.25" stroke="#50C878" strokeWidth="1.5" />
        <circle cx="245" cy="50" r="16" fill="#0F52BA" fillOpacity="0.25" stroke="#0F52BA" strokeWidth="1.5" />
        <circle cx="330" cy="90" r="18" fill="#DC143C" fillOpacity="0.25" stroke="#DC143C" strokeWidth="1.5" />
        <text x="53" y="122" fill="#94a3b8" fontSize="9" fontFamily="monospace">Planner</text>
        <text x="140" y="25" fill="#50C878" fontSize="9" fontFamily="monospace">Writer</text>
        <text x="232" y="25" fill="#93c5fd" fontSize="9" fontFamily="monospace">Editor</text>
        <text x="308" y="122" fill="#fca5a5" fontSize="9" fontFamily="monospace">Reviewer</text>
      </svg>
    );
  }

  if (demoType === 'career-coach') {
    return (
      <svg viewBox="0 0 400 180" className="w-full h-full">
        <rect width="400" height="180" fill="#0B0B0B" />
        <g stroke="#1e293b" strokeWidth="1">
          <line x1="30" y1="45" x2="370" y2="45" />
          <line x1="30" y1="90" x2="370" y2="90" />
          <line x1="30" y1="135" x2="370" y2="135" />
        </g>
        <rect x="45" y="62" width="85" height="52" rx="10" fill="#0F52BA" fillOpacity="0.2" stroke="#0F52BA" />
        <rect x="160" y="42" width="90" height="92" rx="10" fill="#50C878" fillOpacity="0.16" stroke="#50C878" />
        <rect x="280" y="62" width="75" height="52" rx="10" fill="#DC143C" fillOpacity="0.2" stroke="#DC143C" />
        <line x1="130" y1="88" x2="160" y2="88" stroke="#50C878" strokeWidth="1.5" />
        <line x1="250" y1="88" x2="280" y2="88" stroke="#DC143C" strokeWidth="1.5" />
        <text x="56" y="92" fill="#e2e8f0" fontSize="9" fontFamily="monospace">LangGraph</text>
        <text x="175" y="85" fill="#50C878" fontSize="9" fontFamily="monospace">CrewAI Team</text>
        <text x="175" y="100" fill="#94a3b8" fontSize="8" fontFamily="monospace">Curriculum+Coach</text>
        <text x="292" y="92" fill="#fca5a5" fontSize="9" fontFamily="monospace">Ollama LLM</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 180" className="w-full h-full">
      <rect width="400" height="180" fill="#0B0B0B" />
      <path
        d="M0,135 Q100,60 200,115 T400,65"
        fill="none"
        stroke="#0F52BA"
        strokeWidth="2.5"
      />
      <path
        d="M0,150 Q130,85 230,125 T400,85"
        fill="none"
        stroke="#50C878"
        strokeWidth="2"
      />
      <path
        d="M0,160 Q140,120 260,140 T400,105"
        fill="none"
        stroke="#DC143C"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <circle cx="120" cy="95" r="5" fill="#50C878" />
      <circle cx="220" cy="115" r="5" fill="#0F52BA" />
      <circle cx="310" cy="82" r="5" fill="#DC143C" />
      <text x="24" y="34" fill="#93c5fd" fontSize="10" fontFamily="monospace">
        Hybrid RRF · Qdrant/pgvector · /mcp JSON-RPC
      </text>
    </svg>
  );
};

export const Projects: React.FC<ProjectsProps> = ({
  projects = PROJECTS,
  selectedCategory,
  onSelectCategory,
  onSelectProject,
  onNavigate,
  onAskAi,
  isFullPage = false,
}) => {
  const filteredProjects = filterProjects(projects, selectedCategory);

  const handleOpenProject = (project: ProjectCaseStudy) => {
    if (onNavigate) {
      onNavigate(`/work/${project.slug}`);
    } else {
      onSelectProject(project);
    }
  };

  return (
    <section id="projects" className={`${isFullPage ? 'pt-28 pb-20' : 'py-16 lg:py-20'} relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0F52BA] via-[#50C878] to-[#DC143C] rounded-full mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {isFullPage ? 'AI Engineering Case Studies' : 'Featured Projects'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1.5">
              Production multi-agent pipelines, hybrid RAG architectures, and full-stack AI systems
              structured as{' '}
              <span className="text-slate-900 dark:text-slate-200 font-mono text-xs">
                Problem → Constraints → Architecture → Implementation → Results
              </span>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F52BA] text-white shadow-[0_0_15px_rgba(15,82,186,0.4)]'
                    : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => handleOpenProject(project)}
              className="group relative rounded-2xl bg-white dark:bg-[#101014] border border-slate-200/90 dark:border-white/10 hover:border-[#0F52BA]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_40px_-15px_rgba(15,82,186,0.3)] cursor-pointer"
            >
              <div>
                {/* Artwork Banner */}
                <div className="relative h-44 w-full overflow-hidden border-b border-slate-200 dark:border-white/5">
                  <ProjectArtwork demoType={project.demoType} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>
                      {project.categoryLabel} · {project.year}
                    </span>
                    <span className="text-[#50C878]">{project.status}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-[#0F52BA] dark:group-hover:text-[#50C878] transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#0F52BA] group-hover:translate-x-1 transition-transform shrink-0" />
                    </h3>
                  </div>

                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-white/5 mb-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-xs font-bold text-slate-900 dark:text-white font-mono truncate">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Unboxed Clean Metadata Text + Action */}
              <div className="px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate pr-2">
                  {project.techStack.slice(0, 4).join(' · ')}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onAskAi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskAi(`Explain the architecture and tech stack of ${project.title}.`);
                      }}
                      title={`Ask AI about ${project.title}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#50C878] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878]">
                    <span>Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Link on Home */}
        {!isFullPage && onNavigate && (
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F52BA] dark:text-[#50C878] hover:underline cursor-pointer"
            >
              <span>View Full Case Studies &amp; Simulators (/work)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
