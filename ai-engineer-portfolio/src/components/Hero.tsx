import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  FileText,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PersonalInfoData } from '../types/portfolio';
import { Gemstone3D } from './Gemstone3D';

interface HeroProps {
  onNavigate: (path: string) => void;
  onOpenAssistant: (initialPrompt?: string) => void;
  availabilityStatus?: string;
  personalInfo?: PersonalInfoData;
}

const CAPABILITY_PROOF_ITEMS = [
  {
    icon: Layers,
    label: 'Multi-Agent Orchestration',
    detail: 'LangGraph · CrewAI · AutoGen · Pydantic AI',
    accent: '#0F52BA',
  },
  {
    icon: Database,
    label: 'Hybrid RAG & Vector Memory',
    detail: 'Qdrant · Pinecone · Milvus · pgvector',
    accent: '#50C878',
  },
  {
    icon: Cpu,
    label: 'Inference & Serving',
    detail: 'vLLM · Ollama · FastAPI · Django + Celery',
    accent: '#DC143C',
  },
  {
    icon: ShieldCheck,
    label: 'Eval, Guardrails & DevOps',
    detail: 'Langfuse · Guardrails AI · Docker · NixOS',
    accent: '#0F52BA',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenAssistant,
  availabilityStatus,
  personalInfo = PERSONAL_INFO,
}) => {
  const statusText = availabilityStatus || personalInfo.status;

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-14 lg:pt-28 lg:pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Ambient Gemstone Aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#0F52BA]/12 blur-[130px]" />
        <div className="absolute top-1/3 right-0 w-[440px] h-[440px] rounded-full bg-[#50C878]/8 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full bg-[#DC143C]/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Value Proposition, Identity & Conversion CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Status Indicator (Clean static indicator — no pulsing distraction) */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#50C878]" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200 tracking-wide">
                {statusText}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {personalInfo.location}
              </span>
            </div>

            {/* Identity Overline */}
            <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0F52BA] dark:text-[#50C878]">
              {personalInfo.name} ({personalInfo.formalName})
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.05] text-slate-950 dark:text-white">
              I build LLM/RAG/
              <br />
              agent{' '}
              <span className="bg-gradient-to-r from-[#0F52BA] via-[#50C878] to-[#DC143C] bg-clip-text text-transparent">
                systems.
              </span>
            </h1>

            {/* Subheadline */}
            <div className="space-y-2 max-w-xl">
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {personalInfo.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Turning complex ideas into intelligent, scalable products — from LangGraph &amp;
                CrewAI multi-agent pipelines to hybrid vector retrieval, local Ollama/vLLM
                inference, and Langfuse-monitored backends.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#0F52BA] via-[#2b7a98] to-[#DC143C] hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(15,82,186,0.55)] cursor-pointer"
              >
                <span>Hire Me / Consult</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/work')}
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-[#0F52BA]/40 hover:border-[#0F52BA] transition-all duration-300 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-[#0F52BA] dark:text-[#50C878] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenAssistant(
                    "Summarize Maimoon's 3 flagship AI case studies and technical stack."
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full font-medium text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.02] hover:bg-slate-200/70 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#50C878]" />
                <span>Ask My AI</span>
              </button>
            </div>

            {/* Verified Contact & Social Links + Printable CV Trigger */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (/Maimoon-github)"
                  title="GitHub (/Maimoon-github)"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (/in/maimoon-moon-amin)"
                  title="LinkedIn (/in/maimoon-moon-amin)"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.email}
                  aria-label="Email Maimoon Amin (ideal.rhel@gmail.com)"
                  title="ideal.rhel@gmail.com"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => onNavigate('/resume')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-[#0F52BA] dark:hover:text-[#50C878] transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#0F52BA]" />
                <span>Interactive CV &amp; PDF (/resume)</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Faceted Gemstone Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 relative rounded-3xl bg-[#0B0B0B] border border-slate-800/80 overflow-hidden shadow-2xl"
          >
            <Gemstone3D />
          </motion.div>
        </div>

        {/* Full-Width Capabilities & Proof Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITY_PROOF_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white dark:bg-[#111115]/90 border border-slate-200/80 dark:border-white/[0.08] flex items-start gap-3.5 shadow-sm"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${item.accent}18`,
                      color: item.accent,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
