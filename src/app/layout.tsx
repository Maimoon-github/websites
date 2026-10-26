import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAKA · Purely powerful',
  description: 'Care for Pakistani hair, water and weather. Named after Mount Rakaposhi.',
  icons: {
    icon: '/brand/raka-logo.webp',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F6F0E8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-raka-snow text-raka-ink font-interface antialiased selection:bg-raka-copper-wash selection:text-raka-ink">
        {children}
      </body>
    </html>
  );
}
