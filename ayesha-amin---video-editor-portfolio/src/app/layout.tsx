import type { Metadata } from 'next';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const metadata: Metadata = {
  title: 'Ayesha Amin | Professional Video Editor & Storyteller',
  description:
    'High-retention video editor portfolio featuring cinematic showreels, short-form reels, services accordion, why-me bento grid, testimonials, and integrated content management dashboard.',
  openGraph: {
    title: 'Ayesha Amin | Professional Video Editor & Storyteller',
    description:
      'High-retention video editor portfolio featuring cinematic showreels, short-form reels, services accordion, why-me bento grid, testimonials, and integrated content management dashboard.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayesha Amin | Professional Video Editor & Storyteller',
    description:
      'High-retention video editor portfolio featuring cinematic showreels, short-form reels, services accordion, why-me bento grid, testimonials, and integrated content management dashboard.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-[#bbbbbb] font-sans antialiased selection:bg-[#e22718] selection:text-white overflow-x-hidden" suppressHydrationWarning>
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
