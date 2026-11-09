# Implementation Plan: Full-Stack AI Engineer Portfolio & Centralized Admin Console

## 1. Architectural Overview & Single Source of Truth

We will upgrade the portfolio of **Maimoon (Moon) Amin (`M. Maimoon`)** into a **content-driven full-stack digital product** where the Public Portfolio, Printable Résumé, Machine-Readable Feeds (`/llms.txt`, `/mcp`, `/rss.xml`, `/sitemap.xml`), and Citation-Grounded RAG Assistant all read from a **synchronized, file-backed CMS datastore (`data/cms-store.json`)** seeded from `src/data/portfolioData.ts`.

### Core Synchronization Flow
1. **Persistent File-Backed Store (`data/cms-store.json`)**:
   - Automatically initialized from `src/data/portfolioData.ts` on first boot.
   - Any create, update, or delete action in the Private Admin Console (`/admin/*`) atomically writes to `data/cms-store.json`, rebuilds the RAG knowledge chunks and vector embeddings, and immediately updates `GET /api/portfolio` (consumed by the React frontend) as well as `/llms.txt`, `/sitemap.xml`, `/rss.xml`, and `/mcp`.
   - Includes one-click JSON export and reset-to-defaults in `/admin/settings`.

---

## 2. Public Website Information Architecture & New Sections

### A. Complete Sitemap & Route Hierarchy
- `/` — **Home**:
  1. **Hero**: 3D Faceted Gemstone (`#0B0B0B` Obsidian, `#0F52BA` Sapphire, `#50C878` Emerald, `#DC143C` Crimson), live availability badge driven by `/admin/settings`, headline *"I build LLM/RAG/agent systems."*, primary CTA **Hire Me / Consult** (`/contact`), secondary CTA **Ask My AI** (`/ai`).
  2. **Capabilities & Proof Bar**: Multi-Agent Orchestration, Hybrid RAG & Vector Memory, Inference & Serving, Eval/Guardrails & DevOps.
  3. **Experience & Education Timeline**: Interactive timeline cards with deep link to `/resume`.
  4. **Featured Work**: Filterable case-study cards linking to `/work/[slug]`.
  5. **Inline AI Assistant Teaser (New)**: Interactive homepage section with 3 suggested prompts that launch a live streaming RAG answer directly or expand into `/ai`.
  6. **Latest Writing**: MDX blog/research cards linking to `/writing/[slug]`.
  7. **Peer & Mentorship Endorsements / Recommendations (New)**: Verified engineering focus & mentorship highlights.
  8. **About & Role Compatibility Check**: Interactive skill matcher + grouped skills matrix (zero progress bars).
  9. **CTA Band + Inline Newsletter Capture**: Direct conversion path to `/contact` and `/newsletter`.
- `/work` & `/work/[slug]` — **Case Studies**:
  - URL-driven `?tag=all|agents|rag|infra|oss` filtering, `Problem → Constraints → Architecture → Implementation → Results`, interactive pipeline trace simulator, sticky TOC, and **"Ask AI about this case study"** (`/ai?context=work:<slug>`).
- `/writing`, `/writing/[slug]`, `/writing/tags/[tag]`, `/writing/series/[slug]`, & `/writing/page/[n]` — **MDX Blog & Archives**:
  - Featured post hero, search & tag filters, pagination, dedicated tag archive (`/writing/tags/[tag]`), series hub (`/writing/series/[slug]`), sticky TOC, copyable code blocks, callouts, and **"Ask AI about this post"** (`/ai?context=post:<slug>`).
- `/about` & `/resume` — **Story, Timeline & Interactive CV**:
  - Full biography, timeline, grouped skills without progress bars, skill-filtered CV, **"Ask AI if I fit your role"**, and clean `@media print` PDF stylesheet (`/resume.pdf`).
- `/contact` & `/contact/thanks` — **Hiring & Consulting Funnel**:
  - Live availability status, timezone (`PKT UTC+5`), direct contact channels (`ideal.rhel@gmail.com`, `03153208241`), honeypot + rate-limited form submitting to `POST /api/contact`, discovery call slot selector, and FAQ.
- `/ai` — **Full-Page Grounded RAG Assistant**:
  - Streaming SSE responses with inline clickable `[Source: Title](/url)` citations, collapsible retrieved chunks drawer with RRF scores, 👍/👎 feedback telemetry, and context scoping (`?context=...`).
- `/search`, `/now`, `/uses`, `/colophon`, & `/newsletter` — **Supporting Signal Pages**:
  - `/newsletter`: Subscribe form (`POST /api/newsletter`) + technical dispatch archive.
  - `/colophon`: Live system architecture documentation + interactive `/mcp` JSON-RPC 2.0 tool tester.

---

## 3. Centralized Private Admin Console (`/admin/*`)

Protected by passkey/session authentication and marked `noindex` / `Disallow: /admin`:

1. `/admin/dashboard` — **Overview & Chat Analytics**:
   - KPI cards (Indexed RAG Chunks, Total Chat Conversations, Helpful Rating %, Contact Leads, Newsletter Subscribers).
   - Recent chat query logs, unanswered/downvoted query review, and quick links to all workspaces.
2. `/admin/content` — **Full Content Manager (CRUD)**:
   - **Profile & Hero Editor**: Update name, headline, subheadline, summary, email, phone, location, and availability details.
   - **Projects & Case Studies CRUD**: Create, edit, or delete case studies (title, slug, category, summary, tech stack, metrics, problem, constraints, architecture, code snippet, and results).
   - **Writing / MDX Posts CRUD**: Create, edit, or delete technical articles (title, slug, category, series, tags, headings, and MDX body).
   - **Timeline & Skills CRUD**: Add, edit, or remove education/mentorship timeline entries and skill groups.
3. `/admin/knowledge` — **RAG Knowledge Base & Vector Index**:
   - Inspect all generated & custom knowledge chunks, source URLs, keyword tags, and 64-d normalized vector embeddings (`pgvector` / `Qdrant` / RRF format).
   - Add custom knowledge chunks, delete custom chunks, and trigger full corpus re-indexing (`POST /api/admin/reindex`).
4. `/admin/messages` — **Contact & Newsletter Inbox**:
   - View, mark as read/replied, or delete contact form inquiries and view newsletter subscribers.
5. `/admin/settings` — **Models, System Prompt & Site Configuration**:
   - Configure active Gemini model (`gemini-3.8-flash`), customize the RAG system prompt template, toggle live availability status & hero badge text, export the full `cms-store.json` backup, or reset to factory defaults.

---

## 4. Implementation & Verification Sequence

1. **Data & Persistence Layer**:
   - Create `src/types/cms.ts` (or extend `src/types/portfolio.ts`) for `CmsStore`, `NewsletterSubscriber`, `EndorsementItem`, and `AdminSettings`.
   - Upgrade `server.ts` with atomic file persistence (`data/cms-store.json`), `GET /api/portfolio`, `POST /api/revalidate`, `POST /api/newsletter`, and full `/api/admin/*` CRUD endpoints for Profile, Projects, Articles, Timeline, Skills, Knowledge Chunks, Messages, and Settings.
2. **Dynamic Frontend Context & Components**:
   - Create `src/context/PortfolioContext.tsx` so all public pages (`Hero`, `Experience`, `Projects`, `Articles`, `AboutSkills`, `ResumeView`, `ContactSection`) read live data from the synchronized store and reflect Admin edits immediately without page reloads.
   - Build `src/components/AdminConsole.tsx` implementing the 5 dedicated `/admin/*` workspaces (`/admin/dashboard`, `/admin/content`, `/admin/knowledge`, `/admin/messages`, `/admin/settings`).
   - Add `/writing/tags/[tag]`, `/writing/series/[slug]`, `/newsletter`, and the Home AI Teaser + Recommendations sections in `src/App.tsx`.
3. **Self-Correction & Verification**:
   - Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` (`dist/` output), and verify end-to-end Admin CRUD → Public Portfolio & RAG synchronization.
