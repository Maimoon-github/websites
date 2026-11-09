import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  Menu,
  X,
  ArrowRight,
  Search,
  Sun,
  Moon,
  Sparkles,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCommandPalette: () => void;
  onOpenAssistant: (initialPrompt?: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: 'Work', path: '/work' },
  { label: 'Writing', path: '/writing' },
  { label: 'About', path: '/about' },
  { label: 'Résumé', path: '/resume' },
  { label: 'Hire Me', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenCommandPalette,
  onOpenAssistant,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <>
      {/* First focusable element in DOM: Accessibility Skip-to-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0F52BA] focus:text-white focus:font-semibold focus:shadow-xl"
      >
        Skip to content
      </a>

      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#0F52BA] via-[#50C878] to-[#DC143C] no-print"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
          isScrolled
            ? 'bg-white/85 dark:bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 py-3 shadow-lg shadow-black/5 dark:shadow-black/50'
            : 'bg-white/60 dark:bg-[#0B0B0B]/50 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo: Maimoon Amin */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F52BA] via-[#50C878] to-[#DC143C] p-[1.5px] shadow-md shadow-[#0F52BA]/20">
              <div className="w-full h-full bg-white dark:bg-[#0B0B0B] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-base tracking-tighter bg-gradient-to-r from-[#0F52BA] via-[#50C878] to-[#DC143C] bg-clip-text text-transparent">
                  M
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 dark:text-white tracking-tight text-sm sm:text-base group-hover:text-[#0F52BA] dark:group-hover:text-[#50C878] transition-colors">
                {PERSONAL_INFO.shortName}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                {PERSONAL_INFO.formalName} · Agentic AI
              </span>
            </div>
          </a>

          {/* Primary 5-Item Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-white/[0.06]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#0F52BA] to-[#50C878] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Utilities: Command Palette (⌘K), Theme Toggle, Ask AI, Let's Talk */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 rounded-lg transition-colors"
              title="Open Command Palette & Search (⌘K or Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#141418] text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-white/10">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 rounded-lg transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Obsidian Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#0F52BA]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenAssistant()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] bg-[#0F52BA]/10 dark:bg-[#50C878]/10 hover:bg-[#0F52BA]/15 dark:hover:bg-[#50C878]/20 border border-[#0F52BA]/25 dark:border-[#50C878]/30 rounded-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>

            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
              className="relative group inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white rounded-full bg-[#0B0B0B] dark:bg-[#111115] border border-[#0F52BA]/60 hover:border-[#50C878] transition-all duration-300 shadow-[0_0_20px_-5px_rgba(15,82,186,0.5)]"
            >
              <span>Let’s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#50C878] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-white/10"
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-white/10"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#0F52BA]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-white/10"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Sheet Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-[#0F52BA]/15 text-[#0F52BA] dark:text-white border-l-2 border-[#50C878]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/ai');
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#0F52BA] dark:text-[#50C878] rounded-xl border border-[#0F52BA]/30 dark:border-[#50C878]/30 bg-[#0F52BA]/10 dark:bg-[#50C878]/10"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask My AI (/ai)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/resume');
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-[#0F52BA] to-[#50C878]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Interactive CV</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
