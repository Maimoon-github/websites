import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

/**
 * Predefined Storefront Auto-Layout Shell.
 * Provides the consistent header, announcement banner, auto-layout main viewport, and footer.
 */
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-raka-snow text-raka-ink">
      {/* Predefined Top Announcement Bar */}
      <AnnouncementBar />

      {/* Predefined Fixed Navigation Header */}
      <Header />

      {/* Main Viewport with Fluid Auto-Layout */}
      <main className="flex-1 flex flex-col w-full">{children}</main>

      {/* Predefined Footer with Trust Strip & Rakaposhi Divider */}
      <Footer />
    </div>
  );
}
