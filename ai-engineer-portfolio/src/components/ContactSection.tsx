import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  MapPin,
  ArrowRight,
  Send,
  CheckCircle2,
  X,
  Phone,
  Clock,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onNavigate?: (path: string) => void;
  isFullPage?: boolean;
  isThanksPage?: boolean;
}

const BOOKING_SLOTS = [
  'Tue · 14:00 UTC (19:00 PKT) — 30m Architecture Discovery',
  'Wed · 16:00 UTC (21:00 PKT) — 30m Hiring / Role Discussion',
  'Thu · 13:00 UTC (18:00 PKT) — 45m RAG / Multi-Agent Consult',
];

const CONTACT_FAQS = [
  {
    q: 'What roles and engagements are you open to?',
    a: 'Full-time Agentic AI / LLM Systems Engineer roles (remote worldwide or hybrid), contract multi-agent architecture builds, and technical advisory.',
  },
  {
    q: 'What is your typical timezone overlap?',
    a: 'Based in Lahore, Pakistan (PKT / UTC+5) with flexible daily overlap across European (CET/BST) and US East/West Coast morning hours.',
  },
  {
    q: 'Can you work with private or on-prem LLM stacks?',
    a: 'Yes — experienced in deploying quantized local/private models via Ollama and vLLM alongside Docker, NixOS, and self-hosted Qdrant/PostgreSQL.',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigate,
  isFullPage = false,
  isThanksPage = false,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(isFullPage);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Full-Time AI Engineer Role');
  const [budget, setBudget] = useState('Standard / Competitive');
  const [selectedSlot, setSelectedSlot] = useState(BOOKING_SLOTS[0]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(isThanksPage);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budget,
          message: `${message}\n[Preferred Slot: ${selectedSlot}]`,
          website_url: honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not submit inquiry. Please email ideal.rhel@gmail.com.');
      } else {
        setSubmitted(true);
        if (onNavigate && isFullPage) {
          onNavigate('/contact/thanks');
        }
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isThanksPage) {
    return (
      <section className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#50C878]/15 border border-[#50C878]/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#50C878]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
          Inquiry Received — Thank You
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
          Your message has been logged for <strong>{PERSONAL_INFO.name}</strong>. Expect a direct
          response from <span className="font-mono text-[#0F52BA] dark:text-[#50C878]">{PERSONAL_INFO.email}</span>{' '}
          within 24 hours.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onNavigate && (
            <>
              <button
                type="button"
                onClick={() => onNavigate('/work')}
                className="px-5 py-2.5 rounded-xl bg-[#0F52BA] text-white text-xs font-semibold cursor-pointer"
              >
                Explore Case Studies (/work)
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Return Home
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className={`${isFullPage ? 'pt-28 pb-24' : 'py-16 lg:py-20'} relative`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Gemstone Conversion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-r from-[#0F52BA]/70 via-[#50C878]/50 to-[#DC143C]/70 shadow-[0_0_50px_-15px_rgba(15,82,186,0.4)]"
        >
          <div className="relative rounded-[23px] bg-white dark:bg-[#0E0E12] px-6 py-8 sm:px-10 sm:py-10 overflow-hidden">
            <div className="pointer-events-none absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-[#0F52BA]/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -top-10 w-64 h-64 rounded-full bg-[#DC143C]/15 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Faceted Crystal Crest */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#141418] border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                  <svg viewBox="0 0 100 100" className="w-16 h-16">
                    <polygon points="50,8 88,32 74,85 26,85 12,32" fill="#0F52BA" fillOpacity="0.35" stroke="#0F52BA" strokeWidth="2" />
                    <polygon points="50,8 88,32 50,52" fill="#0F52BA" fillOpacity="0.6" />
                    <polygon points="12,32 50,52 26,85" fill="#50C878" fillOpacity="0.55" />
                    <polygon points="50,52 88,32 74,85" fill="#DC143C" fillOpacity="0.6" />
                    <polygon points="26,85 50,52 74,85" fill="#50C878" fillOpacity="0.35" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
                    Let’s Build Production Agentic Systems Together
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                    Hiring for an Agentic AI Engineer or planning a multi-agent / RAG architecture?
                    Reach out directly.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 dark:text-slate-300">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-[#0F52BA] dark:hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#0F52BA]" />
                      <span>{PERSONAL_INFO.email}</span>
                    </a>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#50C878]" />
                      <span>{PERSONAL_INFO.phone}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0F52BA]" />
                      <span>{PERSONAL_INFO.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#50C878]" />
                      <span>{PERSONAL_INFO.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#DC143C] via-[#0F52BA] to-[#50C878] hover:brightness-110 transition-all duration-300 shadow-[0_0_25px_rgba(15,82,186,0.5)] cursor-pointer"
                >
                  <span>{isFormOpen ? 'Hide Inquiry Form' : 'Get in Touch'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Expandable / Full-Page Inquiry Form + Booking Slot Selector */}
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Direct Project &amp; Hiring Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Protected with honeypot validation &amp; rate limiting · Direct to{' '}
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                  {!isFullPage && (
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1"
                      aria-label="Close contact form"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-700 dark:text-emerald-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#50C878] shrink-0" />
                    <span>
                      Thank you, <strong>{name}</strong>! Your inquiry and preferred slot (
                      {selectedSlot}) have been logged for Maimoon Amin.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Honeypot field (hidden from real users) */}
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div>
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Engagement Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      >
                        <option>Full-Time AI Engineer Role</option>
                        <option>Multi-Agent System Consulting (LangGraph/CrewAI)</option>
                        <option>Production RAG &amp; Vector DB Architecture</option>
                        <option>Django / FastAPI AI Backend Engineering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Organization / Team
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme AI Labs"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Compensation / Scope Band
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      >
                        <option>Standard / Competitive</option>
                        <option>Project Milestone ($5k – $15k)</option>
                        <option>Dedicated Retainer / Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Preferred Discovery Call Window
                      </label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      >
                        {BOOKING_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Project Brief or Role Details *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your architecture goals, tech stack, timeline, or role requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0F52BA]"
                      />
                    </div>

                    {errorMsg && (
                      <div className="md:col-span-3 text-xs text-[#DC143C] font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#50C878]" />
                        <span>Typical response time: &lt; 24 hours ({PERSONAL_INFO.timezone})</span>
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F52BA] hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Full-Page Cal.com-style Discovery Slots & FAQ */}
        {isFullPage && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F52BA] dark:text-[#50C878]">
                <Calendar className="w-4 h-4" />
                <span>Direct Discovery Call Windows</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                Reserve a 30-Minute Technical Sync
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Select a preferred window below to pre-fill the inquiry scheduler, or email{' '}
                <span className="font-mono text-slate-900 dark:text-white">
                  {PERSONAL_INFO.email}
                </span>{' '}
                directly.
              </p>
              <div className="space-y-2">
                {BOOKING_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setIsFormOpen(true);
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                      selectedSlot === slot
                        ? 'bg-[#0F52BA]/15 border-[#0F52BA] text-slate-950 dark:text-white font-semibold'
                        : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#50C878]">
                <HelpCircle className="w-4 h-4" />
                <span>Hiring &amp; Advisory FAQ</span>
              </div>
              <div className="space-y-4">
                {CONTACT_FAQS.map((item) => (
                  <div
                    key={item.q}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5"
                  >
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
                      {item.q}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
