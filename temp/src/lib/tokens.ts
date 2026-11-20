/**
 * RAKA Brand Design System · v1.2
 * Source: Design-TOKEN/README.md
 * Aligned to raka.pk (Light Theme)
 */

export const RAKA_COLORS = {
  // Base Palette
  snow: '#F6F0E8',
  paper: '#FFFFFF',
  copper: '#CF8F63',
  ink: '#14110F',
  alpenglow: '#E7A98A',

  // Supporting Palette
  linen: '#EDE3D6',
  sand: '#E4D8CA',
  alpenglowTint: '#F8E1D4',
  copperWash: '#F3E2D5',
  copperDeep: '#8E5530',
  taupe: '#6E6157',
  bark: '#3A322C',
  ember: '#C2412D',

  // Status
  success: { text: '#2F6B4F', bg: '#E6F0E9' },
  warning: { text: '#7A4F0C', bg: '#F7EBD6' },
  error: { text: '#B3261E', bg: '#F8E3E0' },
} as const;

export const RAKA_FONTS = {
  display: "'Libre Caslon Condensed', Georgia, serif",
  interface: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
  urdu: "'Noto Nastaliq Urdu', serif",
} as const;

export const RAKA_SPACING = {
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '24px',
  space6: '32px',
  space7: '48px',
  space8: '64px',
  space9: '96px',
  space10: '128px',
} as const;

export const RAKA_RADII = {
  none: '0px',
  crisp: '2px',
  card: '6px',
  capsule: '9999px',
} as const;

export const RAKA_SHADOWS = {
  e0: 'none',
  e1: '0 1px 2px rgba(20,17,15,0.06), 0 2px 8px rgba(20,17,15,0.05)',
  e2: '0 12px 32px rgba(20,17,15,0.10)',
  e3: '0 24px 64px rgba(20,17,15,0.16)',
} as const;

export const RAKA_MOTION = {
  easeSilk: 'cubic-bezier(0.2, 0.7, 0.2, 1.0)',
  durationFast: '150ms',
  durationBase: '250ms',
  durationSlow: '450ms',
  durationStory: '700ms',
} as const;

export const RAKA_GRID = {
  mobile: { cols: 4, gutter: 16, margin: 20 },
  tablet: { cols: 8, gutter: 20, margin: 32 },
  laptop: { cols: 12, gutter: 24, margin: 48 },
  desktop: { cols: 12, gutter: 24, margin: 80, maxContent: 1280 },
} as const;
