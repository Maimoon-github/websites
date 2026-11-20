import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '600px',
      laptop: '1024px',
      desktop: '1280px',
    },
    extend: {
      colors: {
        raka: {
          snow: '#F6F0E8',
          paper: '#FFFFFF',
          ink: '#14110F',
          copper: '#CF8F63',
          alpenglow: '#E7A98A',
          linen: '#EDE3D6',
          sand: '#E4D8CA',
          'alpenglow-tint': '#F8E1D4',
          'copper-wash': '#F3E2D5',
          'copper-deep': '#8E5530',
          taupe: '#6E6157',
          bark: '#3A322C',
          ember: '#C2412D',
          success: {
            text: '#2F6B4F',
            bg: '#E6F0E9',
          },
          warning: {
            text: '#7A4F0C',
            bg: '#F7EBD6',
          },
          error: {
            text: '#B3261E',
            bg: '#F8E3E0',
          },
        },
      },
      fontFamily: {
        display: ['"Libre Caslon Condensed"', 'Georgia', 'serif'],
        interface: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '24px',
        'space-6': '32px',
        'space-7': '48px',
        'space-8': '64px',
        'space-9': '96px',
        'space-10': '128px',
      },
      borderRadius: {
        crisp: '2px',
        card: '6px',
        capsule: '9999px',
      },
      boxShadow: {
        e1: '0 1px 2px rgba(20,17,15,0.06), 0 2px 8px rgba(20,17,15,0.05)',
        e2: '0 12px 32px rgba(20,17,15,0.10)',
        e3: '0 24px 64px rgba(20,17,15,0.16)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.2, 0.7, 0.2, 1.0)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '450ms',
        story: '700ms',
      },
      maxWidth: {
        'content-max': '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
