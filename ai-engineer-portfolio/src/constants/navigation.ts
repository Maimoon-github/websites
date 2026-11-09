import { ProjectCategory } from '@/types/portfolio';

export const PRIMARY_NAV_LINKS = [
  { label: 'Work', path: '/work' },
  { label: 'Writing', path: '/writing' },
  { label: 'About', path: '/about' },
  { label: 'Résumé', path: '/resume' },
  { label: 'Hire Me', path: '/contact' },
] as const;

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'agents', label: 'Multi-Agent Systems' },
  { id: 'rag', label: 'RAG & MCP' },
  { id: 'infra', label: 'Backend & Infra' },
  { id: 'oss', label: 'Open Source' },
];

export const SUGGESTED_RAG_PROMPTS = [
  'Tell me about Agentic-Review-Architecture',
  'How does AI-Learning-Career-Coach use LangGraph & CrewAI?',
  'What vector databases & LLM stacks does Maimoon use?',
  'Is Maimoon available for remote AI engineering roles?',
] as const;
