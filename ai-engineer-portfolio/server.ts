import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  PERSONAL_INFO,
  PROJECTS,
  ARTICLES,
  TIMELINE,
  SKILL_GROUPS,
  ENDORSEMENTS,
  buildKnowledgeChunks,
} from './src/data/portfolioData';
import {
  retrieveKnowledgeChunks,
  searchSiteContent,
  executeMcpTool,
} from './src/utils/portfolioLogic';
import {
  RetrievedSource,
  KnowledgeChunk,
  ProjectCaseStudy,
  ArticlePost,
  TimelineItem,
  SkillGroup,
  ContactSubmissionItem,
  NewsletterSubscriber,
  AdminSiteSettings,
} from './src/types/portfolio';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));

// Initialize Google GenAI client (server-side only)
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface ChatLogEntry {
  id: string;
  query: string;
  timestamp: string;
  sources: string[];
  feedback?: 'up' | 'down';
}

interface PersistentCmsStore {
  personalInfo: typeof PERSONAL_INFO;
  projects: ProjectCaseStudy[];
  articles: ArticlePost[];
  timeline: TimelineItem[];
  skillGroups: SkillGroup[];
  endorsements: typeof ENDORSEMENTS;
  customChunks: KnowledgeChunk[];
  settings: AdminSiteSettings;
  chatLogs: ChatLogEntry[];
  messages: ContactSubmissionItem[];
  subscribers: NewsletterSubscriber[];
  lastIndexedAt: string;
}

const DATA_DIR = path.resolve(__dirname, 'data');
const CMS_STORE_PATH = path.resolve(DATA_DIR, 'cms-store.json');

function createDefaultStore(): PersistentCmsStore {
  return {
    personalInfo: structuredClone(PERSONAL_INFO),
    projects: structuredClone(PROJECTS),
    articles: structuredClone(ARTICLES),
    timeline: structuredClone(TIMELINE),
    skillGroups: structuredClone(SKILL_GROUPS),
    endorsements: structuredClone(ENDORSEMENTS),
    customChunks: [],
    settings: {
      available: PERSONAL_INFO.available,
      statusText: PERSONAL_INFO.status,
      model: 'gemini-3.8-flash',
      systemPromptNote:
        'Prioritize concise, citation-grounded answers referencing Maimoon Amin case studies, timeline, and skills.',
      newsletterEnabled: true,
    },
    chatLogs: [
      {
        id: 'seed-log-1',
        query: 'What has Maimoon shipped with LangGraph and CrewAI?',
        timestamp: new Date(Date.now() - 3600_000 * 5).toISOString(),
        sources: ['Case Study: AI-Learning-Career-Coach (Personalized AI Learning & Career Coach)'],
        feedback: 'up',
      },
      {
        id: 'seed-log-2',
        query: 'How does the Agentic-Review-Architecture pipeline work?',
        timestamp: new Date(Date.now() - 3600_000 * 2).toISOString(),
        sources: [
          'Case Study: Agentic-Review-Architecture (Agent Flow — Multi-Agent Orchestration System)',
        ],
        feedback: 'up',
      },
    ],
    messages: [
      {
        id: 'seed-msg-1',
        name: 'Elena Rostova (VP Engineering)',
        email: 'elena@autonomous-labs.io',
        company: 'Autonomous Labs',
        engagementType: 'Multi-Agent Architecture Consulting',
        budgetOrTimeline: 'Q1 Launch · 8-Week Advisory',
        message:
          'Impressed by your LangGraph + CrewAI orchestration and Celery critique loop architecture. Would love to discuss an agentic workflow audit.',
        status: 'new',
        timestamp: new Date(Date.now() - 86400_000).toISOString(),
      },
    ],
    subscribers: [
      {
        id: 'sub-seed-1',
        email: 'principal.architect@vectorops.dev',
        subscribedAt: new Date(Date.now() - 86400_000 * 3).toISOString(),
        source: '/writing',
      },
    ],
    lastIndexedAt: new Date().toISOString(),
  };
}

function loadCmsStore(): PersistentCmsStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(CMS_STORE_PATH)) {
      const raw = fs.readFileSync(CMS_STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        ...createDefaultStore(),
        ...parsed,
      };
    }
  } catch (err) {
    console.warn('Could not read cms-store.json, initializing defaults:', err);
  }
  const initial = createDefaultStore();
  saveCmsStore(initial);
  return initial;
}

function saveCmsStore(store: PersistentCmsStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CMS_STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write cms-store.json:', err);
  }
}

let cmsStore: PersistentCmsStore = loadCmsStore();
let indexedChunks: KnowledgeChunk[] = buildKnowledgeChunks(cmsStore);

function syncAndPersistStore() {
  cmsStore.lastIndexedAt = new Date().toISOString();
  indexedChunks = buildKnowledgeChunks(cmsStore);
  saveCmsStore(cmsStore);
}

const contactRateLimit = new Map<string, number>();

function buildSystemInstruction(retrievedSources: RetrievedSource[], contextScope?: string): string {
  const info = cmsStore.personalInfo;
  const contextText = retrievedSources
    .map((s, i) => `[Source ${i + 1}: "${s.title}" (${s.url})]\n${s.snippet}`)
    .join('\n\n');

  return `You are the official Grounded RAG AI Assistant on the personal portfolio of ${info.name} (${info.formalName}), ${info.role}.
Your job is to answer questions from engineering leaders, recruiters, and consulting clients accurately, concisely, and strictly grounded in verified portfolio data. Never fabricate companies, credentials, or degrees.

Admin System Prompt Directive: ${cmsStore.settings.systemPromptNote}

Verified Candidate Facts:
- Name: ${info.name} (${info.formalName}) — ${info.role}
- Location: ${info.location}
- Email: ${info.email} | Phone: ${info.phone}
- LinkedIn: ${info.socials.linkedinHandle} | GitHub: ${info.socials.githubHandle}
- Languages: English, Urdu
- Current Status: ${cmsStore.settings.statusText} (${cmsStore.settings.available ? 'Available for full-time roles & consulting' : 'Currently booked'})
- Case Studies (${cmsStore.projects.length}):
${cmsStore.projects.map((p, i) => `  ${i + 1}. ${p.title} (/work/${p.slug}): ${p.summary}`).join('\n')}
- Timeline (${cmsStore.timeline.length}):
${cmsStore.timeline.map((t) => `  * ${t.period}: ${t.institution} — ${t.program}`).join('\n')}

${contextScope ? `Active Page Context Scope: ${contextScope}\n` : ''}
Retrieved Portfolio Context Chunks:
${contextText}

Citation Rule:
Always include inline citations in the format [Source: Title](/url) when referencing projects, skills, essays, or timeline items. Keep answers crisp (2-3 short paragraphs or bullet points).`;
}

function generateGroundedRagFallback(query: string, sources: RetrievedSource[]): string {
  const q = query.toLowerCase();
  const info = cmsStore.personalInfo;

  if (q.includes('review') || q.includes('django') || q.includes('celery') || q.includes('agent flow')) {
    return `**Agentic-Review-Architecture (Agent Flow)** is a production-ready multi-agent orchestration pipeline built by ${info.name} using **Django**, **Celery**, **Redis**, **PostgreSQL**, and **Google Gemini** [Source: Agentic-Review-Architecture](/work/agentic-review-architecture).

**Architecture & Loop:**
- **4 Specialized Agents**: Collaboratively executes a *Planner*, *Writer*, *Editor*, and *Quality-Reviewer* agent loop.
- **Asynchronous Execution**: Long-running iterative critique-refinement loops run inside non-blocking Celery workers with **Langfuse** trace observability and **Guardrails AI** schema checks [Source: Asynchronous Multi-Agent Critique Loops](/writing/asynchronous-multi-agent-critique-loops-django-celery-gemini).`;
  }

  if (q.includes('coach') || q.includes('langgraph') || q.includes('crewai') || q.includes('ollama')) {
    return `**AI-Learning-Career-Coach** is a production-grade multi-agent platform that delivers adaptive learning paths and career coaching [Source: AI-Learning-Career-Coach](/work/ai-learning-career-coach).

**Key Engineering Decisions:**
- **Hybrid Orchestration**: Combines **LangGraph** (macro-level cyclic workflow state machine) with **CrewAI** (collaborative diagnostic and curriculum agent teams) and **Pydantic AI** typed contracts.
- **100% Local Inference**: Runs against a locally-served **Ollama** LLM with **Qdrant** vector memory for complete data privacy and zero cloud token cost [Source: Orchestrating LangGraph & CrewAI](/writing/orchestrating-langgraph-and-crewai-with-local-ollama).`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('vector') || q.includes('qdrant') || q.includes('vllm') || q.includes('nixos')) {
    return `${info.shortName}'s technical stack spans autonomous agent orchestration, local/cloud inference, vector retrieval, and reproducible DevOps [Source: Technical Skills & Stack Matrix](/resume):

${cmsStore.skillGroups.map((g) => `- **${g.category}**: ${g.skills.join(', ')}`).join('\n')} [Source: Uses & Setup](/uses).`;
  }

  if (q.includes('education') || q.includes('timeline') || q.includes('dsaamp') || q.includes('ammar') || q.includes('kodekloud') || q.includes('alnafi')) {
    return `Here is ${info.name}'s verified education and mentorship timeline [Source: Interactive Résumé](/resume):

${cmsStore.timeline.map((t) => `- **${t.period} — ${t.institution}**: *${t.program}* — ${t.summary}`).join('\n')}`;
  }

  if (q.includes('hire') || q.includes('contact') || q.includes('available') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('contract')) {
    return `${info.name} is currently **${cmsStore.settings.statusText}** for full-time Agentic AI / LLM Engineering roles, contract multi-agent development, and technical advisory [Source: ${info.shortName} Profile](/contact).

- **Location**: ${info.location}
- **Direct Email**: \`${info.email}\`
- **Phone / WhatsApp**: \`${info.phone}\`
- **LinkedIn**: \`${info.socials.linkedinHandle}\` · **GitHub**: \`${info.socials.githubHandle}\`

You can send a message directly on the [Hire / Consult page](/contact).`;
  }

  const topSource = sources[0];
  return `**${info.name}** (\`${info.formalName}\`) is an **${info.role}** based in ${info.location} specializing in **LangGraph**, **CrewAI**, **AutoGen**, hybrid **RAG** (**Qdrant**, **Pinecone**, **Milvus**), and resilient serving (**FastAPI**, **Django**, **Celery**, **vLLM**, **Ollama**, **NixOS**) [Source: ${topSource?.title || 'Profile Overview'}](${topSource?.url || '/about'}).

**Featured Case Studies:**
${cmsStore.projects.map((p, i) => `${i + 1}. **${p.title}**: ${p.summary} [Source: Case Study](/work/${p.slug})`).join('\n')}`;
}

// Public Synchronized Portfolio Data Endpoint (Single Source of Truth for Frontend)
app.get('/api/portfolio', (_req, res) => {
  res.json({
    personalInfo: {
      ...cmsStore.personalInfo,
      status: cmsStore.settings.statusText,
      available: cmsStore.settings.available,
    },
    projects: cmsStore.projects,
    articles: cmsStore.articles,
    timeline: cmsStore.timeline,
    skillGroups: cmsStore.skillGroups,
    endorsements: cmsStore.endorsements,
    settings: cmsStore.settings,
    chunksCount: indexedChunks.length,
    lastIndexedAt: cmsStore.lastIndexedAt,
  });
});

// Shared RAG streaming handler for /api/chat and /api/assistant/chat
async function handleRagChat(req: express.Request, res: express.Response) {
  const {
    message: rawMessage,
    messages = [],
    conversationHistory = [],
    contextScope,
  } = req.body || {};

  const historyList =
    Array.isArray(messages) && messages.length > 0 ? messages : conversationHistory;
  const latestUserMsg =
    rawMessage ||
    (Array.isArray(historyList) && historyList.length > 0
      ? historyList[historyList.length - 1]?.text
      : '');

  if (!latestUserMsg || typeof latestUserMsg !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const retrievedSources = retrieveKnowledgeChunks(latestUserMsg, indexedChunks, 4, contextScope);
  const logId = `chat-${Date.now()}`;
  cmsStore.chatLogs.unshift({
    id: logId,
    query: latestUserMsg,
    timestamp: new Date().toISOString(),
    sources: retrievedSources.map((s) => s.title),
  });
  saveCmsStore(cmsStore);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  if (typeof (res as any).flushHeaders === 'function') {
    (res as any).flushHeaders();
  }

  // First emit retrieved sources metadata
  res.write(`data: ${JSON.stringify({ sources: retrievedSources, logId })}\n\n`);

  if (!aiClient) {
    const fallbackText = generateGroundedRagFallback(latestUserMsg, retrievedSources);
    const chunks = fallbackText.split(' ');
    for (let i = 0; i < chunks.length; i++) {
      const piece = (i === 0 ? '' : ' ') + chunks[i];
      res.write(`data: ${JSON.stringify({ text: piece })}\n\n`);
      await new Promise((r) => setTimeout(r, 8));
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  try {
    const contents: any[] = [];
    const priorHistory = Array.isArray(historyList) ? historyList.slice(-5, -1) : [];
    for (const msg of priorHistory) {
      if ((msg.role === 'user' || msg.role === 'model') && msg.text) {
        contents.push({
          role: msg.role,
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: latestUserMsg }],
    });

    const responseStream = await aiClient.models.generateContentStream({
      model: cmsStore.settings.model || 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: buildSystemInstruction(retrievedSources, contextScope),
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch {
    const fallback = generateGroundedRagFallback(latestUserMsg, retrievedSources);
    res.write(`data: ${JSON.stringify({ text: fallback })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}

app.post('/api/chat', handleRagChat);
app.post('/api/assistant/chat', handleRagChat);

// Feedback telemetry endpoint
app.post('/api/feedback', (req, res) => {
  const { logId, messageId, feedback, rating } = req.body || {};
  const targetId = logId || messageId;
  const resolvedRating = feedback || rating;
  const entry = cmsStore.chatLogs.find((c) => c.id === targetId) || cmsStore.chatLogs[0];
  if (entry && (resolvedRating === 'up' || resolvedRating === 'down')) {
    entry.feedback = resolvedRating;
    saveCmsStore(cmsStore);
  }
  res.json({ ok: true });
});

// Hybrid keyword + vector search endpoint
app.get('/api/search', (req, res) => {
  const q = String(req.query.q || '');
  const results = searchSiteContent(q);
  const ragChunks = retrieveKnowledgeChunks(q || 'Maimoon Amin', indexedChunks, 6);
  res.json({
    query: q,
    ...results,
    ragChunks,
  });
});

// Contact form endpoint with honeypot and rate-limit
app.post('/api/contact', (req, res) => {
  const {
    name,
    email,
    company,
    projectType,
    engagementType,
    budget,
    budgetOrTimeline,
    message,
    website_honeypot,
    website_url,
  } = req.body || {};

  if (website_honeypot || website_url) {
    res.status(200).json({ success: true, message: 'Received.' });
    return;
  }

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'local');
  const lastTime = contactRateLimit.get(clientIp) || 0;
  if (Date.now() - lastTime < 1500) {
    res.status(429).json({ error: 'Please wait a moment before submitting another inquiry.' });
    return;
  }
  contactRateLimit.set(clientIp, Date.now());

  const newSub: ContactSubmissionItem = {
    id: `msg-${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim(),
    company: company ? String(company).trim() : undefined,
    engagementType: String(engagementType || projectType || 'Agentic AI Consulting'),
    budgetOrTimeline:
      budgetOrTimeline || budget ? String(budgetOrTimeline || budget).trim() : undefined,
    message: String(message).trim(),
    status: 'new',
    timestamp: new Date().toISOString(),
  };

  cmsStore.messages.unshift(newSub);
  saveCmsStore(cmsStore);

  res.json({
    success: true,
    submissionId: newSub.id,
    message:
      'Thank you! Your message has been received by Maimoon (Moon) Amin. Expect a personal reply within 24 hours.',
  });
});

// Newsletter subscription endpoint
app.post('/api/newsletter', (req, res) => {
  const { email, source = '/newsletter' } = req.body || {};
  if (!email || !String(email).includes('@')) {
    res.status(400).json({ error: 'Valid email address is required.' });
    return;
  }
  const normalized = String(email).trim().toLowerCase();
  const exists = cmsStore.subscribers.some((s) => s.email.toLowerCase() === normalized);
  if (!exists) {
    cmsStore.subscribers.unshift({
      id: `sub-${Date.now()}`,
      email: normalized,
      subscribedAt: new Date().toISOString(),
      source: String(source),
    });
    saveCmsStore(cmsStore);
  }
  res.json({
    ok: true,
    subscribersCount: cmsStore.subscribers.length,
    message: 'Subscribed to Maimoon Amin’s Agentic AI & RAG architecture dispatches.',
  });
});

// ============================================================================
// CENTRALIZED ADMIN CONSOLE API (/api/admin/*)
// ============================================================================

app.get('/api/admin/state', (_req, res) => {
  const upvotes = cmsStore.chatLogs.filter((c) => c.feedback === 'up').length;
  const downvotes = cmsStore.chatLogs.filter((c) => c.feedback === 'down').length;
  res.json({
    personalInfo: cmsStore.personalInfo,
    projects: cmsStore.projects,
    articles: cmsStore.articles,
    timeline: cmsStore.timeline,
    skillGroups: cmsStore.skillGroups,
    endorsements: cmsStore.endorsements,
    statusText: cmsStore.settings.statusText,
    available: cmsStore.settings.available,
    chunkCount: indexedChunks.length,
    chunksCount: indexedChunks.length,
    lastReindexedAt: cmsStore.lastIndexedAt,
    lastIndexedAt: cmsStore.lastIndexedAt,
    chunks: indexedChunks,
    chatLogs: cmsStore.chatLogs.slice(0, 50),
    messages: cmsStore.messages,
    subscribers: cmsStore.subscribers,
    settings: cmsStore.settings,
    metrics: {
      totalChats: cmsStore.chatLogs.length,
      upvotes,
      downvotes,
      topQueries: cmsStore.chatLogs.slice(0, 15).map((c) => ({
        id: c.id,
        query: c.query,
        count: 1,
        feedback: c.feedback,
        sources: c.sources,
        timestamp: c.timestamp,
      })),
      contactsCount: cmsStore.messages.length,
      subscribersCount: cmsStore.subscribers.length,
      contacts: cmsStore.messages.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        company: c.company,
        projectType: c.engagementType,
        budgetOrTimeline: c.budgetOrTimeline,
        message: c.message,
        status: c.status,
        createdAt: c.timestamp,
      })),
    },
    counts: {
      projects: cmsStore.projects.length,
      articles: cmsStore.articles.length,
      timeline: cmsStore.timeline.length,
      skillGroups: cmsStore.skillGroups.length,
      subscribers: cmsStore.subscribers.length,
    },
  });
});

// 1. Update Candidate Profile & Hero Info
app.put('/api/admin/profile', (req, res) => {
  const updates = req.body || {};
  cmsStore.personalInfo = {
    ...cmsStore.personalInfo,
    ...updates,
    socials: {
      ...cmsStore.personalInfo.socials,
      ...(updates.socials || {}),
    },
  };
  if (updates.status) {
    cmsStore.settings.statusText = String(updates.status);
  }
  syncAndPersistStore();
  res.json({ ok: true, personalInfo: cmsStore.personalInfo, chunksCount: indexedChunks.length });
});

// 2. Projects / Case Studies CRUD
app.post('/api/admin/projects', (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.summary) {
    res.status(400).json({ error: 'Project title and summary are required.' });
    return;
  }
  const slug =
    body.slug ||
    String(body.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const newProject: ProjectCaseStudy = {
    id: slug,
    slug,
    title: String(body.title).trim(),
    subtitle: String(body.subtitle || 'Production AI Engineering System').trim(),
    category: body.category || 'agents',
    categoryLabel: String(body.categoryLabel || 'Multi-Agent System'),
    year: String(body.year || '2025'),
    role: String(body.role || 'Lead Agentic AI Architect'),
    status: String(body.status || 'Production-Ready'),
    summary: String(body.summary).trim(),
    techStack: Array.isArray(body.techStack)
      ? body.techStack
      : String(body.techStack || 'Python, LangGraph, FastAPI, Docker')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
    metrics: Array.isArray(body.metrics)
      ? body.metrics
      : [
          { label: 'Architecture', value: 'Multi-Agent Graph' },
          { label: 'Observability', value: 'Langfuse Traces' },
          { label: 'Deployment', value: 'Docker / NixOS' },
        ],
    problem: String(body.problem || body.summary),
    constraints: Array.isArray(body.constraints)
      ? body.constraints
      : ['Strict schema validation via Pydantic AI & Guardrails AI', 'Deterministic retry limits'],
    architecture: body.architecture || {
      overview: String(body.architectureOverview || body.summary),
      components: Array.isArray(body.components)
        ? body.components
        : ['Orchestration State Graph', 'Hybrid Vector Memory', 'Evaluation Gate'],
      dataFlow: String(
        body.dataFlow || 'Client Request → State Graph → Tool Execution → Verified Output'
      ),
    },
    implementation: body.implementation || {
      challenges: String(body.challenges || 'Coordinating multi-step reasoning deterministically.'),
      solutions: String(body.solutions || 'Enforced typed Pydantic contracts at every node.'),
    },
    results: body.results || {
      impact: Array.isArray(body.impact)
        ? body.impact
        : ['Delivered verifiable production reliability and full trace observability.'],
      takeaways: String(body.takeaways || 'Typed contracts prevent cascading agent errors.'),
    },
    demoType: body.demoType || 'agent-flow',
    githubUrl: String(body.githubUrl || 'https://github.com/Maimoon-github'),
  };

  cmsStore.projects = [newProject, ...cmsStore.projects.filter((p) => p.slug !== slug)];
  syncAndPersistStore();
  res.json({ ok: true, project: newProject, projects: cmsStore.projects });
});

app.put('/api/admin/projects/:slug', (req, res) => {
  const { slug } = req.params;
  const idx = cmsStore.projects.findIndex((p) => p.slug === slug || p.id === slug);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  const existing = cmsStore.projects[idx];
  const updates = req.body || {};
  const updated: ProjectCaseStudy = {
    ...existing,
    ...updates,
    techStack: Array.isArray(updates.techStack)
      ? updates.techStack
      : typeof updates.techStack === 'string'
      ? updates.techStack
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : existing.techStack,
  };
  cmsStore.projects[idx] = updated;
  syncAndPersistStore();
  res.json({ ok: true, project: updated, projects: cmsStore.projects });
});

app.delete('/api/admin/projects/:slug', (req, res) => {
  const { slug } = req.params;
  cmsStore.projects = cmsStore.projects.filter((p) => p.slug !== slug && p.id !== slug);
  syncAndPersistStore();
  res.json({ ok: true, projects: cmsStore.projects });
});

// 3. Writing / MDX Articles CRUD
app.post('/api/admin/articles', (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.content) {
    res.status(400).json({ error: 'Article title and MDX content are required.' });
    return;
  }
  const slug =
    body.slug ||
    String(body.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const tags = Array.isArray(body.tags)
    ? body.tags
    : String(body.tags || 'LangGraph, RAG, Agents')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

  // Extract ## headings from MDX content automatically
  const extractedHeadings = String(body.content)
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.replace('## ', '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return { id, text };
    });

  const newArticle: ArticlePost = {
    id: slug,
    slug,
    title: String(body.title).trim(),
    subtitle: String(body.subtitle || body.summary || 'Technical Architecture Essay').trim(),
    date: String(body.date || 'November 2025'),
    readTime: String(body.readTime || '6 min read'),
    category: String(body.category || 'Agents & Orchestration'),
    series: String(body.series || 'Production Agentic Systems'),
    summary: String(body.summary || String(body.content).slice(0, 180)).trim(),
    tags,
    headings:
      extractedHeadings.length > 0
        ? extractedHeadings
        : [{ id: 'overview', text: 'Architecture Overview' }],
    content: String(body.content),
  };

  cmsStore.articles = [newArticle, ...cmsStore.articles.filter((a) => a.slug !== slug)];
  syncAndPersistStore();
  res.json({ ok: true, article: newArticle, articles: cmsStore.articles });
});

app.put('/api/admin/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const idx = cmsStore.articles.findIndex((a) => a.slug === slug || a.id === slug);
  if (idx === -1) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  const existing = cmsStore.articles[idx];
  const updates = req.body || {};
  const updated: ArticlePost = {
    ...existing,
    ...updates,
    tags: Array.isArray(updates.tags)
      ? updates.tags
      : typeof updates.tags === 'string'
      ? updates.tags
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean)
      : existing.tags,
  };
  cmsStore.articles[idx] = updated;
  syncAndPersistStore();
  res.json({ ok: true, article: updated, articles: cmsStore.articles });
});

app.delete('/api/admin/articles/:slug', (req, res) => {
  const { slug } = req.params;
  cmsStore.articles = cmsStore.articles.filter((a) => a.slug !== slug && a.id !== slug);
  syncAndPersistStore();
  res.json({ ok: true, articles: cmsStore.articles });
});

// 4. Timeline & Skills CRUD
app.post('/api/admin/timeline', (req, res) => {
  const body = req.body || {};
  if (!body.institution || !body.program) {
    res.status(400).json({ error: 'Institution and program are required.' });
    return;
  }
  const id = `timeline-${Date.now()}`;
  const newItem: TimelineItem = {
    id,
    institution: String(body.institution).trim(),
    program: String(body.program).trim(),
    roleOrTrack: String(body.roleOrTrack || body.program).trim(),
    period: String(body.period || '2025').trim(),
    location: String(body.location || 'Remote').trim(),
    type: body.type || 'mentorship',
    summary: String(body.summary || '').trim(),
    highlights: Array.isArray(body.highlights)
      ? body.highlights
      : String(body.highlights || body.summary || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
    skills: Array.isArray(body.skills)
      ? body.skills
      : String(body.skills || 'LangGraph, Python')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
    accentColor: String(body.accentColor || '#0F52BA'),
  };
  cmsStore.timeline.unshift(newItem);
  syncAndPersistStore();
  res.json({ ok: true, timeline: cmsStore.timeline });
});

app.delete('/api/admin/timeline/:id', (req, res) => {
  const { id } = req.params;
  cmsStore.timeline = cmsStore.timeline.filter((t) => t.id !== id);
  syncAndPersistStore();
  res.json({ ok: true, timeline: cmsStore.timeline });
});

app.put('/api/admin/skills', (req, res) => {
  const { skillGroups } = req.body || {};
  if (Array.isArray(skillGroups)) {
    cmsStore.skillGroups = skillGroups;
    syncAndPersistStore();
  }
  res.json({ ok: true, skillGroups: cmsStore.skillGroups });
});

// 5. Custom RAG Knowledge Chunks & Re-Indexing
app.post('/api/admin/content', (req, res) => {
  const { title, subtitle, summary, tags, content } = req.body || {};
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required.' });
    return;
  }

  const slug = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const chunkId = `chunk-custom-${Date.now()}`;
  const parsedTags = Array.isArray(tags)
    ? tags.map((t) => String(t).trim()).filter(Boolean)
    : String(tags || 'AI, Agents')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

  const newChunk: KnowledgeChunk = {
    id: chunkId,
    sourceType: 'writing',
    slug,
    title: `Knowledge: ${String(title).trim()}`,
    url: `/writing`,
    content: `${title}. ${subtitle || ''} Summary: ${summary || ''} ${content}`,
    keywords: [slug, ...parsedTags.map((t) => t.toLowerCase()), 'custom', 'rag'],
  };

  cmsStore.customChunks.unshift(newChunk);
  syncAndPersistStore();

  res.json({
    ok: true,
    chunk: newChunk,
    chunksCount: indexedChunks.length,
  });
});

app.delete('/api/admin/content/:id', (req, res) => {
  const { id } = req.params;
  cmsStore.customChunks = cmsStore.customChunks.filter((c) => c.id !== id);
  syncAndPersistStore();
  res.json({
    ok: true,
    chunksCount: indexedChunks.length,
  });
});

const handleReindex = (_req: express.Request, res: express.Response) => {
  syncAndPersistStore();
  res.json({
    ok: true,
    chunksCount: indexedChunks.length,
    lastIndexedAt: cmsStore.lastIndexedAt,
  });
};

app.post('/api/admin/reindex', handleReindex);
app.post('/api/revalidate', handleReindex);

// 6. Messages Inbox Management
app.patch('/api/admin/messages/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const msg = cmsStore.messages.find((m) => m.id === id);
  if (msg && (status === 'new' || status === 'read' || status === 'replied')) {
    msg.status = status;
    saveCmsStore(cmsStore);
  }
  res.json({ ok: true, messages: cmsStore.messages });
});

app.delete('/api/admin/messages/:id', (req, res) => {
  const { id } = req.params;
  cmsStore.messages = cmsStore.messages.filter((m) => m.id !== id);
  saveCmsStore(cmsStore);
  res.json({ ok: true, messages: cmsStore.messages });
});

// 7. Site & AI Settings + Backup Export / Factory Reset
app.post('/api/admin/settings', (req, res) => {
  const { available, statusText, model, systemPromptNote, newsletterEnabled } = req.body || {};
  if (typeof available === 'boolean') cmsStore.settings.available = available;
  if (typeof statusText === 'string' && statusText.trim()) {
    cmsStore.settings.statusText = statusText.trim();
    cmsStore.personalInfo.status = statusText.trim();
  }
  if (typeof model === 'string' && model.trim()) cmsStore.settings.model = model.trim();
  if (typeof systemPromptNote === 'string') {
    cmsStore.settings.systemPromptNote = systemPromptNote.trim();
  }
  if (typeof newsletterEnabled === 'boolean') {
    cmsStore.settings.newsletterEnabled = newsletterEnabled;
  }
  syncAndPersistStore();
  res.json({ ok: true, settings: cmsStore.settings });
});

app.get('/api/admin/export', (_req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="maimoon-cms-store.json"');
  res.type('application/json').send(JSON.stringify(cmsStore, null, 2));
});

app.post('/api/admin/reset', (_req, res) => {
  cmsStore = createDefaultStore();
  syncAndPersistStore();
  res.json({ ok: true, store: cmsStore });
});

// ============================================================================
// PUBLIC MACHINE-READABLE LAYER (/mcp, /llms.txt, /sitemap.xml, /rss.xml)
// ============================================================================

app.get('/mcp', (_req, res) => {
  res.json({
    protocol: 'Model Context Protocol (MCP) JSON-RPC 2.0',
    owner: cmsStore.personalInfo.name,
    role: cmsStore.personalInfo.role,
    endpoint: '/mcp',
    tools: [
      {
        name: 'search_content',
        description: 'Hybrid semantic + keyword search across Maimoon Amin portfolio chunks.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string' }, topK: { type: 'number' } },
          required: ['query'],
        },
      },
      {
        name: 'get_case_study',
        description:
          'Retrieve full Problem -> Constraints -> Architecture -> Implementation -> Results for a case study.',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              enum: cmsStore.projects.map((p) => p.slug),
            },
          },
        },
      },
      {
        name: 'get_experience',
        description:
          'Retrieve Maimoon Amin verified education/mentorship timeline and grouped technical skills.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'check_availability',
        description:
          'Check Maimoon Amin current hiring & consulting availability and direct contact info.',
        inputSchema: { type: 'object', properties: {} },
      },
    ],
  });
});

app.post('/mcp', (req, res) => {
  const { jsonrpc = '2.0', method, params = {}, id = null } = req.body || {};

  try {
    if (method === 'initialize') {
      res.json({
        jsonrpc,
        id,
        result: {
          protocolVersion: '2025-03-26',
          serverInfo: {
            name: 'maimoon-amin-portfolio-mcp',
            version: '1.0.0',
          },
          capabilities: { tools: {} },
        },
      });
      return;
    }

    if (method === 'tools/list') {
      res.json({
        jsonrpc,
        id,
        result: {
          tools: [
            { name: 'search_content', description: 'Hybrid search over portfolio knowledge base.' },
            { name: 'get_case_study', description: 'Get detailed architecture & results for a project slug.' },
            { name: 'get_experience', description: 'Get education timeline and grouped skills matrix.' },
            { name: 'check_availability', description: 'Check hiring/consulting availability and contact details.' },
          ],
        },
      });
      return;
    }

    if (method === 'tools/call') {
      const toolName = params.name || params.tool;
      const toolArgs = params.arguments || params.args || {};
      const result = executeMcpTool(toolName, toolArgs);
      res.json({
        jsonrpc,
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          data: result,
        },
      });
      return;
    }

    if (['search_content', 'get_case_study', 'get_experience', 'check_availability'].includes(method)) {
      const result = executeMcpTool(method, params);
      res.json({ jsonrpc, id, result });
      return;
    }

    res.status(400).json({
      jsonrpc,
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  } catch (err: any) {
    res.status(500).json({
      jsonrpc,
      id,
      error: { code: -32000, message: err?.message || 'MCP execution error' },
    });
  }
});

app.get('/llms.txt', (_req, res) => {
  const info = cmsStore.personalInfo;
  res.type('text/plain; charset=utf-8').send(`# ${info.name} (${info.formalName}) — ${info.role}

> ${info.headline} ${info.subheadline}

- Location: ${info.location}
- Email: ${info.email}
- Phone: ${info.phone}
- LinkedIn: ${info.socials.linkedin}
- GitHub: ${info.socials.github}
- Status: ${cmsStore.settings.statusText}
- Languages: English, Urdu
- MCP Endpoint: /mcp (JSON-RPC 2.0)
- Full Corpus: /llms-full.txt

## Summary
${info.summary}

## Case Studies (/work)
${cmsStore.projects.map((p) => `- [${p.title}](/work/${p.slug}): ${p.summary}`).join('\n')}

## Technical Writing (/writing)
${cmsStore.articles.map((a) => `- [${a.title}](/writing/${a.slug}): ${a.summary}`).join('\n')}

## Timeline & Education (/resume)
${cmsStore.timeline.map((t) => `- ${t.period} — ${t.institution}: ${t.program} (${t.summary})`).join('\n')}
`);
});

app.get('/llms-full.txt', (_req, res) => {
  res.type('text/plain; charset=utf-8').send(
    indexedChunks
      .map((c) => `### ${c.title} (${c.url})\nType: ${c.sourceType}\n${c.content}\n`)
      .join('\n---\n\n')
  );
});

app.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const staticUrls = [
    '/',
    '/work',
    '/writing',
    '/about',
    '/resume',
    '/contact',
    '/ai',
    '/uses',
    '/colophon',
    '/now',
    '/newsletter',
  ];
  const workUrls = cmsStore.projects.map((p) => `/work/${p.slug}`);
  const postUrls = cmsStore.articles.map((a) => `/writing/${a.slug}`);
  const tagSet = new Set(cmsStore.articles.flatMap((a) => a.tags));
  const tagUrls = Array.from(tagSet).map((t) => `/writing/tags/${encodeURIComponent(t)}`);
  const allUrls = [...staticUrls, ...workUrls, ...postUrls, ...tagUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;
  res.type('application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /search
Disallow: /contact/thanks

Sitemap: ${baseUrl}/sitemap.xml
`);
});

const handleRss = (req: express.Request, res: express.Response) => {
  const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const info = cmsStore.personalInfo;
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${info.name} — Agentic AI Engineering Writing</title>
    <link>${baseUrl}/writing</link>
    <description>${info.summary}</description>
    ${cmsStore.articles
      .map(
        (a) => `<item>
      <title>${a.title}</title>
      <link>${baseUrl}/writing/${a.slug}</link>
      <description>${a.summary}</description>
      <pubDate>${a.date}</pubDate>
    </item>`
      )
      .join('\n    ')}
  </channel>
</rss>`;
  res.type('application/rss+xml').send(xml);
};

app.get('/rss.xml', handleRss);
app.get('/feed.xml', handleRss);

app.get('/.well-known/security.txt', (_req, res) => {
  res.type('text/plain').send(`Contact: mailto:${cmsStore.personalInfo.email}
Preferred-Languages: en, ur
Policy: https://github.com/Maimoon-github
`);
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    owner: cmsStore.personalInfo.name,
    chunksIndexed: indexedChunks.length,
    available: cmsStore.settings.available,
    statusText: cmsStore.settings.statusText,
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const portNumber = Number(process.env.PORT) || 3000;
  app.listen(portNumber, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${portNumber}`);
  });
}

startServer();
