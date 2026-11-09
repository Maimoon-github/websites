import React, { useState } from 'react';
import {
  X,
  Printer,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Phone,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  TIMELINE,
  PROJECTS,
  SKILL_GROUPS,
} from '../data/portfolioData';
import {
  PersonalInfoData,
  TimelineItem,
  ProjectCaseStudy,
  SkillGroup,
} from '../types/portfolio';

interface ResumeViewProps {
  personalInfo?: PersonalInfoData;
  timeline?: TimelineItem[];
  projects?: ProjectCaseStudy[];
  skillGroups?: SkillGroup[];
  onClose?: () => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string) => void;
  isPage?: boolean;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  personalInfo = PERSONAL_INFO,
  timeline = TIMELINE,
  projects = PROJECTS,
  skillGroups = SKILL_GROUPS,
  onClose,
  onNavigate,
  onAskAi,
  isPage = false,
}) => {
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<string>('all');

  const handlePrint = () => {
    window.print();
  };

  const visibleSkillGroups =
    selectedSkillGroup === 'all'
      ? skillGroups
      : skillGroups.filter((g) => g.id === selectedSkillGroup);

  return (
    <div
      className={
        isPage
          ? 'pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'
          : 'relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col'
      }
    >
      {/* Top Action Bar (Hidden in Print) */}
      <div
        className={`${
          isPage
            ? 'mb-6 p-4 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10'
            : 'p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141418]'
        } flex flex-wrap items-center justify-between gap-3 no-print`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Curriculum Vitae · {personalInfo.name} ({personalInfo.formalName})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onAskAi && (
            <button
              type="button"
              onClick={() =>
                onAskAi(
                  "Evaluate Maimoon's resume for a Senior Agentic AI / LLM Systems Engineer role."
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F52BA]/10 dark:bg-[#50C878]/10 text-[#0F52BA] dark:text-[#50C878] border border-[#0F52BA]/30 dark:border-[#50C878]/30 text-xs font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI if I fit your role</span>
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF (/resume.pdf)</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Printable Resume Sheet */}
      <div
        className={
          isPage
            ? 'p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-8 shadow-sm'
            : 'p-6 sm:p-10 overflow-y-auto space-y-8 flex-1'
        }
      >
        {/* Identity Header */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#50C878] mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{personalInfo.status}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {personalInfo.name}{' '}
              <span className="text-lg font-mono font-normal text-slate-500">
                ({personalInfo.formalName})
              </span>
            </h1>
            <p className="text-[#0F52BA] dark:text-[#50C878] font-medium text-sm sm:text-base mt-1">
              {personalInfo.tagline}
            </p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 font-mono">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0F52BA]" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#50C878]" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#DC143C]" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-3 pt-0.5">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#0F52BA]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{personalInfo.socials.githubHandle}</span>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#0F52BA]"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>{personalInfo.socials.linkedinHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Executive Summary
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>

        {/* Technical Skills Matrix with Interactive Domain Filter */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technical Skills (Grouped — No Arbitrary Progress Bars)
            </h2>
            <div className="flex flex-wrap gap-1.5 no-print">
              <button
                type="button"
                onClick={() => setSelectedSkillGroup('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer ${
                  selectedSkillGroup === 'all'
                    ? 'bg-[#0F52BA] text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                }`}
              >
                All
              </button>
              {skillGroups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedSkillGroup(g.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer ${
                    selectedSkillGroup === g.id
                      ? 'bg-[#0F52BA] text-white'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                  }`}
                >
                  {g.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleSkillGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                  {group.category}
                </div>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                  {group.skills.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured AI Engineering Projects */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Production AI Systems &amp; Case Studies
          </h2>
          <div className="space-y-5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">— {proj.subtitle}</span>
                  </div>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate(`/work/${proj.slug}`)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#0F52BA] dark:text-[#50C878] hover:underline no-print cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.summary}
                </p>

                <ul className="space-y-1 pt-1">
                  {proj.results.impact.map((imp, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-[#50C878]">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-1 text-[11px] font-mono text-slate-500">
                  Stack: {proj.techStack.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education, Mentorship & Engineering Track */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Education, Mentorship &amp; Engineering Programs
          </h2>
          <div className="space-y-5">
            {timeline.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="text-sm font-bold text-slate-950 dark:text-white">
                    {item.institution} —{' '}
                    <span className="text-[#0F52BA] dark:text-[#50C878]">{item.program}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{item.period}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{item.summary}</p>
                <ul className="space-y-1">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-[#0F52BA]">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Languages: </span>
            {personalInfo.languages.map((l) => `${l.name} (${l.proficiency})`).join(' · ')}
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Single Source of Truth · Updated 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResumeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onAskAi?: (prompt: string) => void;
  personalInfo?: PersonalInfoData;
  timeline?: TimelineItem[];
  projects?: ProjectCaseStudy[];
  skillGroups?: SkillGroup[];
}> = ({ isOpen, onClose, onNavigate, onAskAi, personalInfo, timeline, projects, skillGroups }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Maimoon Amin Curriculum Vitae"
    >
      <ResumeView
        onClose={onClose}
        onNavigate={onNavigate}
        onAskAi={onAskAi}
        isPage={false}
        personalInfo={personalInfo}
        timeline={timeline}
        projects={projects}
        skillGroups={skillGroups}
      />
    </div>
  );
};
