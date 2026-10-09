'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Menu, X, Settings, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, isAdminOpen, setIsAdminOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'work', 'services', 'why', 'testimonials', 'faq', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about', num: '01' },
    { label: 'Work', href: '#work', id: 'work', num: '02' },
    { label: 'Services', href: '#services', id: 'services', num: '03' },
    { label: 'Why Me', href: '#why', id: 'why', num: '04' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials', num: '05' },
    { label: 'FAQ', href: '#faq', id: 'faq', num: '06' },
    { label: 'Blog', href: '#blog', id: 'blog', num: '07' },
    { label: 'Contact', href: '#contact', id: 'contact', num: '08' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/90 border-b border-[#262626] backdrop-blur-md shadow-2xl py-3'
            : 'bg-transparent border-b border-transparent py-4.5 sm:py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between gap-6">
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-white text-base tracking-wider font-extrabold uppercase font-display focus:outline-none"
            aria-label="Ayesha Amin, home"
          >
            <span className="w-2 h-2 bg-[#e22718] transition-transform duration-300 group-hover:scale-125" />
            <span className="text-lg sm:text-xl text-white font-extrabold tracking-tight group-hover:text-[#e22718] transition-colors">
              {data.site.logoText}
            </span>
          </a>

          {/* Zone 2: Navigation links */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-7 text-[14px] font-normal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 text-[14px] font-normal tracking-[0.5px] transition-colors duration-200 group ${
                    isActive ? 'text-white' : 'text-[#bbbbbb] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#e22718] transition-all duration-300 origin-left ${
                      isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Admin CMS toggle + Hire CTA + Mobile Hamburger) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Admin CMS Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded-none transition-colors ${
                isAdminOpen
                  ? 'bg-[#1a1a1a] text-[#f4b400] border-[#f4b400]'
                  : 'bg-transparent text-[#9a9a9a] border-[#3c3c3c] hover:border-white hover:text-white'
              }`}
              title="Toggle CMS Dashboard"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdminOpen ? 'Close CMS' : 'Admin CMS'}</span>
            </button>

            {/* Hire Me Crimson CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center justify-center gap-2 h-[42px] px-[20px] bg-[#c8200f] hover:bg-[#e22718] active:bg-[#a81a0c] text-white text-[13px] font-bold tracking-[1.5px] uppercase transition-all duration-300 ease-spring active:scale-[0.97] hover:-translate-y-[1px] shadow-lg shadow-[#c8200f]/20 hover:shadow-[#e22718]/40 will-change-transform"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4 hidden sm:inline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden flex items-center justify-center w-10 h-10 border border-[#3c3c3c] text-white hover:border-white transition-colors bg-[#0a0a0a]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Modal */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Top Row with Close Button */}
          <div className="flex items-center justify-between border-b border-[#262626] pb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#e22718]" />
              <span className="text-2xl font-extrabold text-white font-display uppercase tracking-wider">
                {data.site.logoText}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 flex items-center justify-center border border-[#3c3c3c] text-white hover:border-[#e22718] hover:text-[#e22718] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Links */}
          <nav className="my-8 flex flex-col divide-y divide-[#1a1a1a]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-4 flex items-baseline justify-between text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight hover:text-[#e22718] transition-colors group"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono font-normal text-[#7e7e7e] group-hover:text-[#e22718]">
                  {link.num}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-[#7e7e7e]">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center bg-[#c8200f] text-white font-bold tracking-widest uppercase"
            >
              Start a Project
            </a>
            <div className="flex items-center gap-6">
              {data.site.social.slice(0, 4).map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors uppercase text-xs tracking-wider"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
