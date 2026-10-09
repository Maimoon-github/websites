'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { FilmGrain } from '@/components/layout/FilmGrain';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyChooseMeSection } from '@/components/sections/WhyChooseMeSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { VideoLightbox } from '@/components/modals/VideoLightbox';
import { BlogPostModal } from '@/components/modals/BlogPostModal';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ToastContainer } from '@/components/ui/ToastContainer';

export default function Home() {
  const { isAdminOpen } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#bbbbbb] selection:bg-[#e22718] selection:text-white overflow-x-hidden">
      {/* Cinematic Film Grain Organic Texture Overlay */}
      <FilmGrain />

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ServicesSection />
        <WhyChooseMeSection />
        <TestimonialsSection />
        <StatsSection />
        <FaqSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Lightboxes & Modals */}
      <VideoLightbox />
      <BlogPostModal />
      <ToastContainer />

      {/* In-Browser Admin CMS Dashboard */}
      {isAdminOpen && <AdminDashboard />}
    </div>
  );
}
