export type ProjectCategory = 'all' | 'agents' | 'rag' | 'infra' | 'oss';

export interface PersonalInfoData {
  name: string;
  shortName: string;
  formalName: string;
  role: string;
  tagline: string;
  headline: string;
  subheadline: string;
  summary: string;
  status: string;
  available: boolean;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  languages: { name: string; proficiency: string }[];
  availabilityDetails: string;
  socials: {
    github: string;
    githubHandle: string;
    linkedin: string;
    linkedinHandle: string;
    email: string;
  };
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'agents' | 'rag' | 'infra' | 'oss';
  categoryLabel: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  constraints: string[];
  architecture: {
    overview: string;
    components: string[];
    dataFlow: string;
  };
  implementation: {
    challenges: string;
    solutions: string;
    codeSnippet?: {
      language: string;
      title: string;
      code: string;
    };
  };
  results: {
    impact: string[];
    takeaways: string;
  };
  demoType: 'agent-flow' | 'career-coach' | 'rag-mcp';
  githubUrl: string;
  liveUrl?: string;
}

export interface TimelineItem {
  id: string;
  institution: string;
  program: string;
  roleOrTrack: string;
  period: string;
  location: string;
  type: 'mentorship' | 'devops' | 'ai-track' | 'communication';
  summary: string;
  highlights: string[];
  skills: string[];
  accentColor: string;
}

export interface ArticlePost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  series?: string;
  summary: string;
  tags: string[];
  headings: { id: string; text: string }[];
  content: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  accentColor: string;
  description: string;
  skills: string[];
}

export interface EndorsementItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
  accentColor: string;
}

export interface KnowledgeChunk {
  id: string;
  sourceType: 'profile' | 'work' | 'writing' | 'timeline' | 'skills' | 'colophon';
  slug: string;
  title: string;
  url: string;
  content: string;
  keywords: string[];
}

export interface RetrievedSource {
  id: string;
  title: string;
  url: string;
  sourceType: string;
  score: number;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  sources?: RetrievedSource[];
  feedback?: 'up' | 'down';
}

export interface ContactSubmissionItem {
  id: string;
  name: string;
  email: string;
  company?: string;
  engagementType: string;
  budgetOrTimeline?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  timestamp: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

export interface AdminSettings {
  available: boolean;
  statusText: string;
  model: string;
  systemPromptNote: string;
  newsletterEnabled: boolean;
}
