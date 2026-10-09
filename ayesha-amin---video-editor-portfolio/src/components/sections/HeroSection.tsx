'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Play, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, openVideoLightbox } = usePortfolio();
  const { hero, site, videos } = data;

  const handleWatchShowreel = () => {
    const featured = videos.find((v) => v.featured) || videos[0];
    if (featured) {
      openVideoLightbox(featured);
    } else {
      const workEl = document.getElementById('work');
      workEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo = (target: string) => {
    const id = target.replace('#', '');
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
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-20 pb-8 sm:pb-10 lg:pb-12"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-[#0a0a0a]">
        {hero.bgImage && (
          <img
            src={hero.bgImage}
            alt="Ayesha Amin editing studio workspace background"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          />
        )}
      </div>

      {/* Dark tint overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#050505] pointer-events-none"
        style={{ opacity: (hero.overlayOpacity || 65) / 100 }}
      />

      {/* Atmospheric vignette & gradient fades to seamless black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none bg-radial from-transparent via-transparent to-[#050505]/80"
      />

      {/* Hero Content */}
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col z-10 animate-fade-in-up">
        {/* Eyebrow kicker */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-10 sm:w-12 h-[2px] bg-[#e22718] shrink-0 animate-slide-in-right" aria-hidden="true" />
          <p className="text-[clamp(12px,1vw,14px)] font-bold tracking-[2px] text-[#e6e6e6] uppercase">
            {hero.eyebrow}
          </p>
        </div>

        {/* Massive Main Heading */}
        <h1 className="font-display font-extrabold text-[clamp(39px,7.35vw,129px)] tracking-[-1px] text-white uppercase leading-[0.9] max-w-5xl [text-wrap:balance]">
          {hero.heading}
        </h1>

        {/* Two-Column Alignment: Subtitle & CTA Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end mt-4 sm:mt-6 pt-2">
          <p className="lg:col-span-7 text-[clamp(17px,1.35vw,20px)] text-[#e6e6e6] font-light leading-[1.6] max-w-2xl [text-wrap:pretty]">
            {hero.subheading}
          </p>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleWatchShowreel}
              className="group inline-flex items-center justify-center gap-2.5 h-[50px] sm:h-[52px] px-6 sm:px-7 bg-[#c8200f] hover:bg-[#e22718] active:bg-[#a81a0c] text-white text-[14px] font-bold tracking-[1.5px] uppercase transition-all duration-300 ease-spring active:scale-[0.97] hover:-translate-y-0.5 shadow-xl shadow-[#c8200f]/30 hover:shadow-[#e22718]/45 cursor-pointer will-change-transform"
            >
              <Play className="w-4 h-4 fill-white text-white transition-transform duration-300 group-hover:scale-110" />
              <span>{hero.primaryLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo(hero.secondaryTarget)}
              className="group inline-flex items-center justify-center gap-2.5 h-[50px] sm:h-[52px] px-6 sm:px-7 bg-transparent border border-white/80 hover:bg-white hover:text-[#050505] text-white text-[14px] font-bold tracking-[1.5px] uppercase transition-all duration-300 ease-spring active:scale-[0.97] hover:-translate-y-0.5 cursor-pointer will-change-transform"
            >
              <span>{hero.secondaryLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Social Proof & Platform Links Bar */}
        {hero.showSocial && (
          <div className="mt-8 sm:mt-10 pt-4 border-t border-[#3c3c3c]/80 flex flex-wrap items-center justify-between gap-4 text-[13px] font-bold uppercase tracking-[1.5px] text-[#9a9a9a]">
            <span className="text-[#e22718] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e22718] animate-pulse" />
              Available for New Projects & Channel Retainers
            </span>

            <ul aria-label="Social links" className="flex flex-wrap items-center gap-6 sm:gap-8">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
