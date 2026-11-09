import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Server, Cpu, MessageSquare } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';
import { TimelineItem } from '../types/portfolio';

interface ExperienceProps {
  timeline?: TimelineItem[];
  onOpenResume: () => void;
  onNavigate?: (path: string) => void;
}

const TimelineIcon: React.FC<{ type: TimelineItem['type']; color: string }> = ({
  type,
  color,
}) => {
  const Icon =
    type === 'mentorship'
      ? Cpu
      : type === 'devops'
      ? Server
      : type === 'ai-track'
      ? GraduationCap
      : MessageSquare;

  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0"
      style={{ backgroundColor: `${color}18`, color }}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
};

export const Experience: React.FC<ExperienceProps> = ({
  timeline = TIMELINE,
  onOpenResume,
  onNavigate,
}) => {
  const [activeId, setActiveId] = useState<string>(timeline[0]?.id || TIMELINE[0].id);

  return (
    <section id="experience" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="w-12 h-1 bg-gradient-to-r from-[#DC143C] via-[#0F52BA] to-[#50C878] rounded-full mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              Education, Mentorship &amp; Engineering Track
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1.5">
              Verified progression across Agentic AI mentorship, DevOps infrastructure, and Deep
              Learning labs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => (onNavigate ? onNavigate('/resume') : onOpenResume())}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-[#0F52BA]/40 hover:border-[#50C878] transition-all duration-300 self-start sm:self-auto cursor-pointer"
          >
            <span>View Full Interactive CV (/resume)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#50C878] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Timeline Track + Cards */}
        <div className="relative">
          <div className="hidden lg:block absolute top-3 left-10 right-10 h-[1px] bg-gradient-to-r from-[#0F52BA]/60 via-[#50C878]/50 to-[#DC143C]/60" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => {
              const isSelected = activeId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => setActiveId(item.id)}
                  className="relative pt-0 lg:pt-8 cursor-pointer group"
                >
                  {/* Node Dot on Desktop Track */}
                  <div
                    className={`hidden lg:flex absolute top-1.5 left-6 w-3.5 h-3.5 rounded-full items-center justify-center transition-transform duration-300 ${
                      isSelected ? 'scale-125' : 'group-hover:scale-110'
                    }`}
                    style={{
                      backgroundColor: item.accentColor,
                      boxShadow: `0 0 12px ${item.accentColor}`,
                    }}
                  />

                  <div
                    className={`h-full p-5 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-white dark:bg-white/[0.05] border-[#0F52BA]/60 shadow-[0_0_30px_-10px_rgba(15,82,186,0.3)]'
                        : 'bg-white/80 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <TimelineIcon type={item.type} color={item.accentColor} />
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono text-[#0F52BA] dark:text-[#50C878]">
                          {item.period}
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white leading-snug">
                          {item.institution}
                        </h3>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {item.program}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {item.summary}
                    </p>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2"
                      >
                        <ul className="space-y-1.5">
                          {item.highlights.map((hl, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: item.accentColor }}
                              />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.skills.slice(0, 4).join(' · ')}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
