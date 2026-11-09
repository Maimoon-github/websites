import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Globe,
  Sliders,
  Briefcase,
  Sparkles,
  ArrowRight,
  Languages,
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_GROUPS } from '../data/portfolioData';
import { PersonalInfoData, SkillGroup } from '../types/portfolio';
import { calculateSkillCompatibility } from '../utils/portfolioLogic';

interface AboutSkillsProps {
  personalInfo?: PersonalInfoData;
  skillGroups?: SkillGroup[];
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string) => void;
  isFullPage?: boolean;
}

const ROLE_REQUIREMENTS = [
  'LangGraph',
  'CrewAI',
  'AutoGen',
  'Pydantic AI',
  'LangChain',
  'LlamaIndex',
  'Qdrant',
  'Pinecone',
  'Milvus',
  'vLLM',
  'Ollama',
  'FastAPI',
  'Django',
  'Celery',
  'Next.js',
  'React',
  'TypeScript',
  'Docker',
  'NixOS',
  'Langfuse',
  'Guardrails AI',
];

export const AboutSkills: React.FC<AboutSkillsProps> = ({
  personalInfo = PERSONAL_INFO,
  skillGroups = SKILL_GROUPS,
  onNavigate,
  onAskAi,
  isFullPage = false,
}) => {
  const [selectedReqSkills, setSelectedReqSkills] = useState<string[]>([
    'LangGraph',
    'CrewAI',
    'Qdrant',
    'FastAPI',
    'Django',
    'Docker',
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedReqSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const compatibility = calculateSkillCompatibility(selectedReqSkills);

  return (
    <section id="about" className={`${isFullPage ? 'pt-28 pb-20' : 'py-16 lg:py-20'} relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="w-12 h-1 bg-gradient-to-r from-[#50C878] via-[#0F52BA] to-[#DC143C] rounded-full mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              About &amp; Technical Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1.5">
              Production engineering depth across autonomous agent frameworks, hybrid vector
              retrieval, and resilient serving infrastructure.
            </p>
          </div>

          {!isFullPage && onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('/about')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] hover:underline cursor-pointer"
            >
              <span>Full Bio, Philosophy &amp; Stack (/about)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Bio, Availability & Interactive Role Compatibility */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Narrative & Commercial Signals Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-5 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F52BA] via-[#50C878] to-[#DC143C] p-[1.5px]">
                  <div className="w-full h-full bg-white dark:bg-[#0B0B0B] rounded-[14px] flex items-center justify-center font-black text-slate-950 dark:text-white text-lg">
                    MA
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs text-[#0F52BA] dark:text-[#50C878] font-mono">
                    {personalInfo.formalName} · {personalInfo.role}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {personalInfo.summary}
              </p>

              {/* Commercial Signals */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#50C878] shrink-0" />
                  <span>{personalInfo.availabilityDetails}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                  <Globe className="w-4 h-4 text-[#0F52BA] shrink-0" />
                  <span>
                    {personalInfo.location} · {personalInfo.timezone}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                  <Languages className="w-4 h-4 text-[#DC143C] shrink-0" />
                  <span>
                    Languages: English (Professional Working) · Urdu (Native / Bilingual)
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                  <Briefcase className="w-4 h-4 text-[#50C878] shrink-0" />
                  <span>
                    Direct: {personalInfo.email} · {personalInfo.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Role Stack Compatibility Evaluator */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0F52BA]" />
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                    Role Stack Compatibility Check
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-500/15 text-[#50C878] border border-emerald-500/30">
                  {compatibility.score}% Match
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select the technologies your team uses to verify coverage across Maimoon’s stack:
              </p>

              <div className="flex flex-wrap gap-1.5">
                {ROLE_REQUIREMENTS.map((skill) => {
                  const active = selectedReqSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        active
                          ? 'bg-[#0F52BA] text-white border border-blue-400/50'
                          : 'bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>

              {onAskAi && (
                <button
                  type="button"
                  onClick={() =>
                    onAskAi(
                      `Evaluate Maimoon's fit for a role requiring: ${selectedReqSkills.join(', ')}.`
                    )
                  }
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] bg-[#0F52BA]/10 dark:bg-[#50C878]/10 border border-[#0F52BA]/25 dark:border-[#50C878]/25 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI to generate a Role-Fit Brief for these {selectedReqSkills.length} skills</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Grouped Skills Matrix (Strictly NO Progress Bars) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 grid grid-cols-1 gap-4"
          >
            {skillGroups.map((group) => (
              <div
                key={group.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: group.accentColor }}
                    />
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {group.skills.length} capabilities
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {group.description}
                </p>

                {/* Grouped Skill Chips — Zero Progress Bars */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const isHighlighted = selectedReqSkills.includes(skill);
                    return (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                          isHighlighted
                            ? 'bg-[#0F52BA]/15 dark:bg-[#0F52BA]/25 text-[#0F52BA] dark:text-white border border-[#0F52BA]/50 font-semibold'
                            : 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
