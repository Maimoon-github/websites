'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, addToast } = usePortfolio();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Short-Form Viral Reels (9:16)',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please share a brief note about your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    addToast('Your inquiry has been received! Ayesha will respond within 24 hours.', 'success');

    setFormData({
      name: '',
      email: '',
      projectType: 'Short-Form Viral Reels (9:16)',
      budget: '$1,000 - $3,000',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-12 sm:py-16 lg:py-20 bg-[#0a0a0a] border-t border-[#262626] relative"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 mb-6 sm:mb-8">
          <div className="flex items-center gap-3.5">
            <span className="text-[#e22718] font-bold text-sm sm:text-base font-mono">08</span>
            <span className="w-8 h-[1px] bg-[#3c3c3c]" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#e6e6e6]">
              Start a Project
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[0.92] max-w-4xl [text-wrap:balance]">
            LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER
          </h2>
        </div>

        {/* 2-Column Split: Direct Channels on Left / Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Direct Outreach & WhatsApp */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <p className="text-xs sm:text-sm text-[#bbbbbb] font-light leading-relaxed">
              Have an upcoming launch, need a high-retention short-form overhaul, or looking for an experienced editor for your YouTube channel? Reach out directly or complete the project inquiry form.
            </p>

            <div className="space-y-3 pt-3 border-t border-[#262626]">
              {/* Direct Email Card */}
              <a
                href={`mailto:${contact.email}`}
                className="p-3.5 bg-[#111111] border border-[#262626] hover:border-[#e22718] transition-all duration-300 ease-spring hover:-translate-y-0.5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#e22718] group-hover:bg-[#c8200f] group-hover:text-white transition-all duration-300 ease-overshoot group-hover:scale-110">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7e7e7e] block">
                      Direct Email
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white group-hover:text-[#e22718] transition-colors break-all">
                      {contact.email}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#7e7e7e] group-hover:text-white group-hover:translate-x-1 transition-transform duration-200 uppercase font-bold tracking-wider hidden sm:inline">
                  Send Mail →
                </span>
              </a>

              {/* WhatsApp Chat Card */}
              <a
                href={`https://wa.me/${contact.whatsappIntl.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-[#111111] border border-[#262626] hover:border-[#e22718] transition-all duration-300 ease-spring hover:-translate-y-0.5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#e22718] group-hover:bg-[#c8200f] group-hover:text-white transition-all duration-300 ease-overshoot group-hover:scale-110">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7e7e7e] block">
                      WhatsApp Quick Chat
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white group-hover:text-[#e22718] transition-colors">
                      {contact.whatsappDisplay}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#7e7e7e] group-hover:text-white group-hover:translate-x-1 transition-transform duration-200 uppercase font-bold tracking-wider hidden sm:inline">
                  Open Chat ↗
                </span>
              </a>
            </div>

            {/* Availability info note */}
            <div className="p-3 bg-[#141414] border-l-2 border-[#e22718] text-xs text-[#9a9a9a] leading-relaxed">
              <span className="font-bold text-white block uppercase tracking-wider mb-0.5">
                Current Availability:
              </span>
              {contact.availability}. Responses are typically sent within 12–24 business hours.
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 bg-[#050505] border border-[#262626] p-4 sm:p-6 lg:p-7 shadow-2xl">
            {isSuccess ? (
              <div className="py-8 flex flex-col items-center text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-full bg-[#3ec46d]/10 border border-[#3ec46d] flex items-center justify-center text-[#3ec46d]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-white tracking-tight">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs text-[#9a9a9a] max-w-md font-light leading-relaxed">
                  Thank you for reaching out! Ayesha has received your project briefing and will review your requirements shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 px-4 py-2 border border-[#3c3c3c] text-xs font-bold uppercase tracking-widest text-white hover:border-white transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-[#e6e6e6]">
                      Your Name <span className="text-[#e22718]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full h-10 px-3 bg-[#141414] border ${
                        errors.name ? 'border-[#ff6a55]' : 'border-[#3c3c3c]'
                      } text-white text-xs sm:text-sm focus:border-white focus:outline-none transition-colors rounded-none`}
                    />
                    {errors.name && <p className="text-xs text-[#ff6a55]">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-[#e6e6e6]">
                      Email Address <span className="text-[#e22718]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full h-10 px-3 bg-[#141414] border ${
                        errors.email ? 'border-[#ff6a55]' : 'border-[#3c3c3c]'
                      } text-white text-xs sm:text-sm focus:border-white focus:outline-none transition-colors rounded-none`}
                    />
                    {errors.email && <p className="text-xs text-[#ff6a55]">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Project Type Select */}
                  <div className="space-y-1">
                    <label htmlFor="contact-type" className="text-xs font-bold uppercase tracking-widest text-[#e6e6e6]">
                      Project Type
                    </label>
                    <select
                      id="contact-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs sm:text-sm focus:border-white focus:outline-none rounded-none cursor-pointer"
                    >
                      <option value="Short-Form Viral Reels (9:16)">Short-Form Viral Reels (9:16)</option>
                      <option value="YouTube Long-Form & Documentary">YouTube Long-Form & Documentary</option>
                      <option value="Commercial / Paid Ad Campaign">Commercial / Paid Ad Campaign</option>
                      <option value="Monthly Editing Retainer">Monthly Editing Retainer</option>
                      <option value="Color Grading & Sound Design Only">Color Grading & Sound Design Only</option>
                      <option value="Other Custom Post-Production">Other Custom Post-Production</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-1">
                    <label htmlFor="contact-budget" className="text-xs font-bold uppercase tracking-widest text-[#e6e6e6]">
                      Estimated Budget
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full h-10 px-3 bg-[#141414] border border-[#3c3c3c] text-white text-xs sm:text-sm focus:border-white focus:outline-none rounded-none cursor-pointer"
                    >
                      <option value="Under $1,000">Under $1,000 (Individual Video)</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000 (Batch or Ad Spot)</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000 (Monthly Retainer)</option>
                      <option value="$5,000+">$5,000+ (Comprehensive Brand Pipeline)</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-[#e6e6e6]">
                    Project Details & Timeline <span className="text-[#e22718]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    placeholder="Tell me about your channel or brand, footage quantity, reference links, and target delivery deadline..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full p-3 bg-[#141414] border ${
                      errors.message ? 'border-[#ff6a55]' : 'border-[#3c3c3c]'
                    } text-white text-xs sm:text-sm focus:border-white focus:outline-none transition-colors rounded-none resize-y`}
                  />
                  {errors.message && <p className="text-xs text-[#ff6a55]">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#c8200f] hover:bg-[#e22718] active:bg-[#a81a0c] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 ease-spring active:scale-[0.98] hover:shadow-lg hover:shadow-[#e22718]/30 flex items-center justify-between px-4 sm:px-5 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting Details...' : 'Send Project Inquiry'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
