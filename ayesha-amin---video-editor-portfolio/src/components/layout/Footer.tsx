'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { contact, site } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About Me', href: '#about' },
    { label: 'Selected Work', href: '#work' },
    { label: 'Services & Scope', href: '#services' },
    { label: 'Why Work With Me', href: '#why' },
    { label: 'Client Testimonials', href: '#testimonials' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Articles & Case Studies', href: '#blog' },
    { label: 'Start a Project', href: '#contact' },
  ];

  return (
    <footer className="border-t border-[#3c3c3c] bg-[#050505] text-[#9a9a9a]">
      {/* Massive Call-to-Action Headline Banner */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 py-10 sm:py-14 lg:py-16 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#e22718]" aria-hidden="true" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#e6e6e6]">
            Get In Touch
          </span>
        </div>

        <a
          href={`mailto:${contact.email}`}
          className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight leading-[0.9] hover:text-[#e22718] transition-colors break-all [text-wrap:balance]"
        >
          {contact.email}
        </a>

        <div className="w-full h-[2px] bg-[#e22718] my-1" aria-hidden="true" />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <a
            href={`https://wa.me/${contact.whatsappIntl.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-[#e22718] transition-colors"
          >
            <span>WhatsApp Quick Response: {contact.whatsappDisplay}</span>
            <ArrowUpRight className="w-4 h-4 text-[#e22718]" />
          </a>

          <span className="text-xs uppercase font-mono tracking-widest text-[#7e7e7e]">
            {contact.location}
          </span>
        </div>
      </div>

      {/* Middle Links Grid & Brand Centering */}
      <div className="border-t border-[#262626]">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Col 1: Brand Wordmark & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#e22718]" />
              <span className="text-xl font-extrabold text-white font-display uppercase tracking-wider">
                {site.logoText}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#7e7e7e] font-light leading-relaxed">
              Professional video editing and motion design focused on audience retention, viral hooks, and cinematic commercial delivery.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] block">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Links & Case Studies */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] block">
              Explore
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Channels */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6e6e6] block">
              Social Channels
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {site.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7e7e7e]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="border-t border-[#1a1a1a] py-4.5">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#7e7e7e]">
            © {new Date().getFullYear()} Ayesha Amin. All rights reserved. Video editor portfolio & creative direction.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#e22718] transition-all duration-300 ease-spring active:scale-95 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-[#e22718] transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
