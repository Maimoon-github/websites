export type VideoPlatform = 'youtube' | 'reels' | 'tiktok' | 'drive' | 'commercial';

export interface VideoItem {
  id: string;
  title: string;
  platform: VideoPlatform;
  url: string;
  embedUrl: string;
  thumb: string;
  duration?: string;
  views?: string;
  client?: string;
  description?: string;
  vertical?: boolean;
  featured?: boolean;
}

export interface ShowreelReel {
  id: string;
  title: string;
  platformLabel: string;
  embedUrl: string;
  videoSrc?: string;
  thumb?: string;
  vertical: boolean;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  included: string[];
  samples?: string[];
}

export interface WhyItem {
  id: string;
  num: string;
  icon: 'timer' | 'devices' | 'aperture' | 'users' | 'zap' | 'film' | 'sparkles';
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  metric?: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  platform: string;
}

export interface ContactInfo {
  email: string;
  whatsappDisplay: string;
  whatsappIntl: string;
  location: string;
  availability: string;
  formEndpoint?: string;
}

export interface HeroSectionData {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryLabel: string;
  primaryTarget: string;
  secondaryLabel: string;
  secondaryTarget: string;
  bgImage: string;
  bgVideo?: string;
  overlayOpacity: number;
  showSocial: boolean;
}

export interface AboutSectionData {
  label: string;
  heading: string;
  body: string[];
  closing: string;
  buttonLabel: string;
  buttonTarget: string;
  image: string;
  imageAlt: string;
  statsHighlight?: { value: string; label: string };
  skills: { category: string; items: string[] }[];
}

export interface PortfolioData {
  site: {
    siteName: string;
    logoText: string;
    social: SocialLink[];
    headerHeight: number;
    logoWidth: number;
  };
  contact: ContactInfo;
  hero: HeroSectionData;
  about: AboutSectionData;
  showreelReels: ShowreelReel[];
  videos: VideoItem[];
  services: ServiceItem[];
  why: WhyItem[];
  testimonials: TestimonialItem[];
  stats: StatItem[];
  faqs: FaqItem[];
  blog: BlogPost[];
}
