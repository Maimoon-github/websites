'use client';

import React, { useEffect } from 'react';
import { X, Download, Mail, ExternalLink, Award, Briefcase, GraduationCap, Wrench } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ayesha Amin Curriculum Vitae"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl my-auto bg-[#0a0a0a] border border-[#3c3c3c] shadow-2xl flex flex-col overflow-hidden text-white animate-scale-in"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#262626] bg-[#050505]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#e22718]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#e6e6e6]">
              Curriculum Vitae · Ayesha Amin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#3c3c3c] hover:border-white text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#e22718]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV modal"
              className="w-8 h-8 border border-[#3c3c3c] hover:border-[#e22718] hover:text-[#e22718] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Body Content */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6 font-light text-xs sm:text-sm text-[#bbbbbb]">
          {/* Header Identity */}
          <div className="border-b border-[#262626] pb-5 space-y-1.5">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              Ayesha Amin
            </h2>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#e22718]">
              Senior Creative Video Editor & Post-Production Lead
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#7e7e7e] pt-1">
              <span>{data.contact.email}</span>
              <span>·</span>
              <span>{data.contact.whatsappDisplay}</span>
              <span>·</span>
              <span>{data.contact.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#e22718]" />
              Executive Summary
            </h3>
            <p className="text-sm leading-relaxed">
              Results-obsessed video editor with 5+ years of experience leading end-to-end post-production for high-profile YouTube creators, direct-to-consumer ecommerce brands, and digital marketing agencies. Proven track record of generating over 150M+ organic views by applying retention-first pacing, sound design psychology, and Hollywood-grade color grading.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#e22718]" />
              Technical & Creative Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#111] border border-[#262626]">
                <strong className="text-white block mb-1 uppercase font-semibold">Editing Software</strong>
                Adobe Premiere Pro, DaVinci Resolve Studio, Final Cut Pro, Frame.io
              </div>
              <div className="p-3 bg-[#111] border border-[#262626]">
                <strong className="text-white block mb-1 uppercase font-semibold">Motion Graphics & VFX</strong>
                Adobe After Effects, Boris FX, Mocha Pro Tracking, Kinetic Typography
              </div>
              <div className="p-3 bg-[#111] border border-[#262626]">
                <strong className="text-white block mb-1 uppercase font-semibold">Audio & Color</strong>
                Fairlight Audio EQ, Adobe Audition, Foley Stems, Color Space Transforms, Film Emulation (Kodak 2383)
              </div>
              <div className="p-3 bg-[#111] border border-[#262626]">
                <strong className="text-white block mb-1 uppercase font-semibold">Content Strategy</strong>
                First 3-Second Hook Engineering, Pattern Interrupts, Loop Transitions, High-CTR Thumbnail Design
              </div>
            </div>
          </div>

          {/* Experience Highlights */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#e22718]" />
              Professional Experience
            </h3>

            <div className="space-y-4 divide-y divide-[#1a1a1a]">
              <div className="pt-2 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-white uppercase font-display">
                    Lead Video Editor & Content Architect · Independent Practice
                  </h4>
                  <span className="text-xs font-mono text-[#7e7e7e]">2022 – Present</span>
                </div>
                <p className="text-xs text-[#e22718] font-semibold">Remote · Global Client Roster</p>
                <ul className="list-disc pl-5 text-xs text-[#bbbbbb] space-y-1 pt-1">
                  <li>Managed full post-production pipelines for 6 YouTube channels with 2.8M+ combined subscribers.</li>
                  <li>Engineered short-form viral cuts for TikTok and Reels, driving 150M+ impressions and multiple 4M+ view reels.</li>
                  <li>Built customized multi-track sound design templates that boosted average watch duration by up to 175%.</li>
                </ul>
              </div>

              <div className="pt-3 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-white uppercase font-display">
                    Senior Video Editor & Colorist · HyperScale Creative Agency
                  </h4>
                  <span className="text-xs font-mono text-[#7e7e7e]">2020 – 2022</span>
                </div>
                <p className="text-xs text-[#e22718] font-semibold">Lahore, Pakistan</p>
                <ul className="list-disc pl-5 text-xs text-[#bbbbbb] space-y-1 pt-1">
                  <li>Delivered over 250+ commercial ad cuts for direct-to-consumer ecommerce and SaaS brand clients.</li>
                  <li>Executed 3-variant hook testing sets for performance marketing campaigns achieving an average ROAS of 3.4x.</li>
                  <li>Standardized in-house color grading node trees in DaVinci Resolve, accelerating team delivery times by 30%.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-2 pt-2 border-t border-[#262626]">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#e22718]" />
              Education & Certifications
            </h3>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <strong className="text-white block font-semibold">B.Sc. in Media Studies & Digital Arts</strong>
                <span className="text-[#7e7e7e]">National College of Arts (NCA)</span>
              </div>
              <span className="text-xs font-mono text-[#7e7e7e]">Certified DaVinci Resolve Colorist</span>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-[#262626] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#7e7e7e]">Ready to discuss a project or retainer?</span>
            <a
              href="#contact"
              onClick={() => onClose()}
              className="px-6 py-2.5 bg-[#c8200f] hover:bg-[#e22718] text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Contact Ayesha Directly →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
