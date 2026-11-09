/**
 * @fileoverview Defines the core data models for the Content Management Store (CMS).
 * All public, administrative, and RAG-related data flows from this centralized store.
 * Extends/complements src/types/portfolio.ts.
 */

// --- Admin & Site Configuration ---
export interface AdminSettings {
  available: boolean;
  statusText: string;
  model: 'gemini-3.8-flash' | string;
  systemPromptNote: string;
  newsletterEnabled: boolean;
}

// --- Content Entities ---

/**
 * Defines a single Case Study or Project.
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  techStack: string[];
  tags: string[]; // e.g., 'RAG', 'Agents', 'Infra', 'OSS'
  year: number;
  problem: string; // Detailed problem statement
  constraints: string; // Design trade-offs
  architecture: string; // Description or link to diagram
  implementation: string; // Details
  results: { metric: string; value: string; impact: string }[]; // Before/After metrics
  liveLink?: string;
  repoLink?: string;
  isOSS: boolean;
}

/**
 * Defines a single technical article or blog post.
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO 8601 date
  readingTime: string; // e.g., "8 min read"
  tags: string[];
  seriesSlug?: string; // For series hubs
  mdxBodyContent: string; // The raw MDX content string
  imageUrl?: string;
}

/**
 * Defines a timeline entry for Experience or Education.
 */
export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string; // Company or University name
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (can be null/present)
  description: string;
  isMentorship?: boolean;
}

// --- External Integrations & Feeds ---

/**
 * Defines an endorsement or recommendation.
 */
export interface Endorsement {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string; // The actual testimonial text
}

/**
 * Defines a subscription record for the newsletter.
 */
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string; // ISO 8601 date
}

// --- Central Store ---

/**
 * The single source of truth for the entire portfolio application.
 * All public pages and the Admin Console read from this state.
 */
export interface CmsStore {
  // Profile & Hero Information
  profile: {
    name: string;
    headline: string; // "I build LLM/RAG/agent systems."
    summary: string;
    availableFor: 'full-time' | 'contract' | 'advisory'; // Drives hiring CTA
    location: string;
    contactEmail: string;
    phone: string;
    // ... other profile fields
  };
  
  adminSettings: AdminSettings;
  
  // Content Collections
  projects: Project[];
  articles: Article[];
  timeline: TimelineEntry[];
  endorsements: Endorsement[];
  
  // Subscriptions & Feeds
  newsletterSubscribers: NewsletterSubscriber[];
}

/**
 * The final, full state object for the application context.
 */
export type PortfolioData = {
  cmsStore: CmsStore;
  // Add other derived state here, e.g., search indices, RAG chunk metadata
};