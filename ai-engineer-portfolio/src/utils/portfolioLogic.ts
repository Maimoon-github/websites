import {
  ProjectCaseStudy,
  ProjectCategory,
  KnowledgeChunk,
  RetrievedSource,
} from '../types/portfolio';
import {
  PERSONAL_INFO,
  PROJECTS,
  ARTICLES,
  TIMELINE,
  SKILL_GROUPS,
  KNOWLEDGE_CHUNKS,
} from '../data/portfolioData';

/**
 * Filter and search projects by category and query
 */
export function filterProjects(
  projects: ProjectCaseStudy[],
  category: ProjectCategory,
  query: string = ''
): ProjectCaseStudy[] {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'all' ||
      (category === 'oss' ? Boolean(project.githubUrl) : project.category === category);

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const matchesTitle = project.title.toLowerCase().includes(normalizedQuery);
    const matchesSubtitle = project.subtitle.toLowerCase().includes(normalizedQuery);
    const matchesSummary = project.summary.toLowerCase().includes(normalizedQuery);
    const matchesStack = project.techStack.some((tech) =>
      tech.toLowerCase().includes(normalizedQuery)
    );
    const matchesTags = project.categoryLabel.toLowerCase().includes(normalizedQuery);

    return matchesTitle || matchesSubtitle || matchesSummary || matchesStack || matchesTags;
  });
}

/**
 * Tokenize text into normalized alphanumeric terms
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/**
 * Compute character trigram cosine similarity for fuzzy semantic matching
 */
function computeTrigramSimilarity(a: string, b: string): number {
  const cleanA = a.toLowerCase().slice(0, 500);
  const cleanB = b.toLowerCase().slice(0, 500);
  if (!cleanA || !cleanB) return 0;

  const trigrams = (str: string) => {
    const set = new Set<string>();
    for (let i = 0; i <= str.length - 3; i++) {
      set.add(str.slice(i, i + 3));
    }
    return set;
  };

  const setA = trigrams(cleanA);
  const setB = trigrams(cleanB);
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersection = 0;
  for (const gram of setA) {
    if (setB.has(gram)) intersection++;
  }
  return intersection / Math.sqrt(setA.size * setB.size);
}

/**
 * Hybrid RAG retrieval using Reciprocal Rank Fusion (BM25 lexical + n-gram semantic + context scope boost)
 */
export function retrieveKnowledgeChunks(
  query: string,
  chunks: KnowledgeChunk[] = KNOWLEDGE_CHUNKS,
  topK: number = 4,
  contextScope?: string
): RetrievedSource[] {
  const queryTerms = tokenize(query);

  // Score each chunk lexically and semantically
  const lexicalScores = chunks.map((chunk) => {
    const contentLower = `${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')}`.toLowerCase();
    let score = 0;

    for (const term of queryTerms) {
      if (chunk.keywords.some((k) => k.includes(term) || term.includes(k))) {
        score += 3.5;
      }
      if (chunk.title.toLowerCase().includes(term)) {
        score += 2.5;
      }
      if (contentLower.includes(term)) {
        score += 1.2;
      }
    }

    // Context deep-link boost (e.g., work:agentic-review-architecture or post:slug)
    if (contextScope) {
      const [, slugPart] = contextScope.split(':');
      if (slugPart && chunk.slug.includes(slugPart)) {
        score += 10;
      }
    }

    return { chunk, score };
  });

  const semanticScores = chunks.map((chunk) => {
    const sim = computeTrigramSimilarity(query, `${chunk.title} ${chunk.keywords.join(' ')} ${chunk.content}`);
    let boost = 0;
    if (contextScope) {
      const [, slugPart] = contextScope.split(':');
      if (slugPart && chunk.slug.includes(slugPart)) boost = 0.5;
    }
    return { chunk, score: sim + boost };
  });

  // Sort for Reciprocal Rank Fusion (k = 60)
  const sortedLexical = [...lexicalScores].sort((a, b) => b.score - a.score);
  const sortedSemantic = [...semanticScores].sort((a, b) => b.score - a.score);

  const fused = chunks.map((chunk) => {
    const lexRank = sortedLexical.findIndex((item) => item.chunk.id === chunk.id) + 1;
    const semRank = sortedSemantic.findIndex((item) => item.chunk.id === chunk.id) + 1;
    const lexRaw = lexicalScores.find((item) => item.chunk.id === chunk.id)?.score || 0;
    const rrf = 1 / (60 + lexRank) + 1 / (60 + semRank) + (lexRaw > 0 ? 0.01 * lexRaw : 0);

    return {
      id: chunk.id,
      title: chunk.title,
      url: chunk.url,
      sourceType: chunk.sourceType,
      score: Math.min(0.99, Math.round((0.78 + rrf * 4.5) * 100) / 100),
      snippet: chunk.content.slice(0, 240) + (chunk.content.length > 240 ? '...' : ''),
      rawRrf: rrf,
    };
  });

  return fused
    .sort((a, b) => b.rawRrf - a.rawRrf)
    .slice(0, topK)
    .map(({ rawRrf, ...rest }) => rest);
}

/**
 * Site-wide search across Work, Writing, and Pages
 */
export function searchSiteContent(query: string) {
  const q = query.trim().toLowerCase();

  const allPages = [
    { title: 'Home', url: '/', description: '3D Gemstone hero, featured case studies, and RAG assistant.' },
    { title: 'Work & Case Studies', url: '/work', description: 'Production multi-agent, RAG, and full-stack AI systems.' },
    { title: 'Technical Writing & Research', url: '/writing', description: 'Essays on LangGraph, CrewAI, Django/Celery, and Qdrant/NixOS.' },
    { title: 'About Maimoon (Moon) Amin', url: '/about', description: 'Biography, education timeline, and grouped skills matrix.' },
    { title: 'Interactive Résumé & CV', url: '/resume', description: 'Filterable curriculum vitae and printable PDF export.' },
    { title: 'Hire / Consult', url: '/contact', description: 'Book a consultation or send a direct hiring inquiry.' },
    { title: 'Ask My AI (Full-Page RAG)', url: '/ai', description: 'Citation-grounded AI assistant with source inspection.' },
    { title: 'Uses & Setup', url: '/uses', description: 'Agent frameworks, inference engines, vector DBs, and NixOS stack.' },
    { title: 'Colophon & MCP Spec', url: '/colophon', description: 'How this portfolio, RAG pipeline, and /mcp server are built.' },
  ];

  if (!q) {
    return {
      work: PROJECTS,
      writing: ARTICLES,
      pages: allPages.slice(0, 6),
    };
  }

  const work = filterProjects(PROJECTS, 'all', q);
  const writing = ARTICLES.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.subtitle.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q))
  );
  const pages = allPages.filter(
    (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );

  return { work, writing, pages };
}

/**
 * Calculate match percentage of Maimoon's skills against user requirements
 */
export function calculateSkillCompatibility(
  requiredKeywords: string[],
  engineerSkills: string[] = SKILL_GROUPS.flatMap((g) => g.skills)
): { score: number; matched: string[]; missing: string[] } {
  if (!requiredKeywords.length) {
    return { score: 100, matched: [], missing: [] };
  }

  const normalizedEngineer = engineerSkills.map((s) => s.toLowerCase());
  const matched: string[] = [];
  const missing: string[] = [];

  for (const keyword of requiredKeywords) {
    const norm = keyword.trim().toLowerCase();
    if (!norm) continue;

    const found = normalizedEngineer.some((s) => s.includes(norm) || norm.includes(s));
    if (found) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  const total = matched.length + missing.length;
  const score = total > 0 ? Math.round((matched.length / total) * 100) : 100;

  return { score, matched, missing };
}

/**
 * Execute public Model Context Protocol (MCP) tools
 */
export function executeMcpTool(toolName: string, args: Record<string, any> = {}) {
  switch (toolName) {
    case 'search_content': {
      const query = String(args.query || '');
      const topK = Number(args.topK) || 4;
      const results = retrieveKnowledgeChunks(query, KNOWLEDGE_CHUNKS, topK);
      return {
        tool: 'search_content',
        query,
        results,
      };
    }
    case 'get_case_study': {
      const slug = String(args.slug || '');
      const project =
        PROJECTS.find((p) => p.slug === slug || p.id === slug) || PROJECTS[0];
      return {
        tool: 'get_case_study',
        caseStudy: project,
      };
    }
    case 'get_experience': {
      return {
        tool: 'get_experience',
        candidate: PERSONAL_INFO.name,
        role: PERSONAL_INFO.role,
        timeline: TIMELINE,
        skills: SKILL_GROUPS,
      };
    }
    case 'check_availability': {
      return {
        tool: 'check_availability',
        name: PERSONAL_INFO.name,
        available: PERSONAL_INFO.available,
        status: PERSONAL_INFO.status,
        location: PERSONAL_INFO.location,
        email: PERSONAL_INFO.email,
        phone: PERSONAL_INFO.phone,
        details: PERSONAL_INFO.availabilityDetails,
      };
    }
    default:
      throw new Error(`Unknown MCP tool: ${toolName}`);
  }
}
