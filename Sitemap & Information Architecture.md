You need a **personal AI-engineer portfolio that behaves like a small full-stack product**, not a static résumé or template. In one sentence:

> A production-grade, open-source **Next.js personal site** owned by a commercially active AI/ML/LLM engineer, with an **embedded RAG chatbot grounded in the site’s own projects, experience, and writing**, plus a **blog/case-study system** and clear **hire-me / consulting / product** signals.

Here’s the concrete “kind of website” it must be:

## 1. Core identity
- **Personal portfolio + professional landing page** for one AI engineer.
- Not a generic template, not a student project, not a pure GitHub profile.
- Owner must show **verifiable commercial activity**: employment, consulting, freelancing, or product revenue.

## 2. Must-have pages / sections
- **Home / hero** with a sharp positioning statement: “I build LLM/RAG/agent systems” + hire/consult CTA.
- **Experience / work history** with real companies and dates.
- **Projects / case studies** with problem → architecture → results.
- **Blog / research / essays** — published on-site, ideally MDX.
- **About / contact** with commercial signals: “open to roles,” “available for consulting,” or product links.
- **AI assistant chat widget** available site-wide.

## 3. The RAG chatbot is non-negotiable
It must:
- Retrieve from the site’s **own data**: projects, experience, blog posts, case studies.
- Answer visitor questions **accurately and with citations/sources**.
- Be embedded as a chat UI, not just a link to ChatGPT.
- Ideally expose an API route or Server Action, and optionally an MCP server.

Typical stack: **Next.js App Router + TypeScript + Postgres/pgvector or Upstash Vector + OpenAI/Gemini embeddings + Vercel AI SDK**.

## 4. Full-stack Next.js requirement
- Frontend and backend in one Next.js app.
- Use **API routes or Server Actions** for chat, retrieval, contact, admin/content.
- Database for embeddings and content.
- Auth/admin if you want a CMS.

## 5. Open-source and reusable
- Public GitHub repo.
- **Reusable license** (MIT/Apache-2.0) so others can download and customize.
- README with setup, env vars, architecture, and RAG indexing instructions.

## 6. Design bar
- **Polished, minimalist, modern, interactive.**
- Fast, responsive, accessible.
- Custom enough to feel like a product, not a bought theme.
- Strong typography, restrained palette, subtle motion, clear CTAs.

## 7. Commercial/hiring platform signals
- Clear “Hire me,” “Work with me,” or “Consulting” path.
- Case studies that prove business impact.
- Downloadable CV generated from the same data.
- Testimonials, client logos, or product revenue links where possible.

## Minimum viable version
If you’re building one, the smallest qualifying version is:

1. Next.js App Router site with Home, Experience, Projects, Blog, Contact.
2. MDX blog + project case studies.
3. Postgres/pgvector storing embeddings of all site content.
4. `/api/chat` route using Vercel AI SDK + retrieval + citations.
5. Floating chat widget.
6. Public GitHub repo with MIT license and setup docs.
7. Clear hire/consult CTA and verifiable commercial history.

So the “kind of website” is: **open-source full-stack Next.js AI portfolio + RAG assistant + content platform + hiring funnel** — all in one.

---
***
---

# Sitemap & Information Architecture — AI Engineer Portfolio (Next.js + RAG)

Below is the complete IA: **(A)** global navigation model → **(B)** full sitemap tree → **(C)** section-by-section hierarchy for every page → **(D)** cross-cutting best practices → **(E)** the machine/technical layer (sitemap.xml, llms.txt, MCP, APIs).

---

## A. Global navigation model

**Primary nav (5 items — within the 5±2 rule):**

| Order | Label | URL |
|---|---|---|
| 1 | Work | `/work` |
| 2 | Writing | `/writing` |
| 3 | About | `/about` |
| 4 | Résumé | `/resume` |
| 5 | Hire me (CTA button) | `/contact` |

**Persistent utilities (header right):** `⌘K` command palette / search · theme toggle · **"Ask AI"** button (opens chat) · mobile hamburger.
**Footer (4 columns):** Navigate · Content · Elsewhere (GitHub, LinkedIn, X) · Legal/Colophon + newsletter + availability badge.
**Global overlay:** RAG chat widget (floating on desktop, bottom-sheet on mobile, deep-linkable to `/ai`).

**Depth rule:** every important page reachable in **≤ 3 clicks** from `/`. No level-4 URLs.

---

## B. Full sitemap tree

```
/                                   Home
├── /work                           Work index (case studies)
│   ├── /work/[slug]                Case study detail
│   └── /work?tag=rag|agents|infra  Filtered view (query param, not a page)
├── /writing                        Blog / research index
│   ├── /writing/[slug]             Post detail
│   ├── /writing/tags/[tag]         Tag archive
│   ├── /writing/page/[n]           Pagination
│   └── /writing/series/[slug]      Series hub
├── /about                          About / story
│   └── /about#experience           Anchor (summary timeline)
├── /resume                         Interactive résumé
│   └── /resume.pdf                 Static download (generated)
├── /contact                        Hire / consult
│   └── /contact/thanks             Post-submit confirmation
├── /ai                             Full-page "Ask my AI" (RAG chat)
├── /search                         Site search (Work + Writing + Pages)
├── /now                            What I'm doing now (optional)
├── /uses                           Stack / setup (optional, strong signal)
├── /colophon                       How this site is built (doubles as proof)
├── /newsletter                     Subscribe + archive (optional)
│
├── /admin                          Protected · noindex
│   ├── /admin/dashboard            Chat analytics, unanswered queries
│   ├── /admin/content              Posts / case studies / experience CRUD
│   ├── /admin/knowledge            RAG sources, chunk status, reindex
│   ├── /admin/messages             Contact submissions
│   └── /admin/settings             Models, prompts, availability flag
│
└── Utility / machine layer
    ├── /404  /500  /offline
    ├── /sitemap.xml  /robots.txt
    ├── /rss.xml  /feed.xml
    ├── /llms.txt  /llms-full.txt
    ├── /api/chat  /api/search  /api/contact  /api/revalidate
    ├── /mcp                        Public MCP endpoint (JSON-RPC)
    └── /.well-known/security.txt
```

---

## C. Per-page hierarchy (section order)

### 1. `/` — Home
1. **Hero** — name, one-line positioning ("I build production RAG & agent systems"), availability badge, primary CTA *Hire me*, secondary *Ask my AI*.
2. **Proof bar** — company/client logos or "shipped at".
3. **Featured work** — 3 case-study cards → `/work/[slug]`.
4. **Capabilities** — LLM · RAG · agents · evals · inference infra.
5. **AI assistant teaser** — inline chat demo with 3 suggested prompts.
6. **Latest writing** — 3 posts → `/writing/[slug]`.
7. **Testimonials / recommendations**.
8. **CTA band** — hire/consult + newsletter.
9. **Footer**.

### 2. `/work` — Work index
1. Page header + intro (what kinds of problems).
2. **Filter chips** — All / RAG / Agents / Infra / Open source (**URL-driven**, shareable).
3. Case-study grid (card: title, one-line impact metric, stack tags, year).
4. **Open-source** strip → GitHub.
5. CTA → `/contact`.
6. Footer.

### 3. `/work/[slug]` — Case study
1. **Breadcrumb** — Home › Work › Title.
2. Title, role, timeline, stack, status, links (live / repo).
3. **TL;DR impact metrics** (before/after numbers).
4. Problem & context.
5. Constraints & trade-offs.
6. Architecture (diagram + explanation).
7. Implementation details.
8. Results / measured outcomes.
9. Lessons learned.
10. Related work (2–3 cards).
11. CTA band.
12. **Sticky TOC** (desktop) + share.

### 4. `/writing` — Blog index
1. Header + one-line description.
2. **Featured post** (hero card).
3. Search input + tag filter.
4. Post list/grid (date, reading time, tags).
5. Pagination → `/writing/page/[n]`.
6. Series highlights.
7. Newsletter inline.
8. CTA.

### 5. `/writing/[slug]` — Post
1. **Breadcrumb**.
2. Title, date, reading time, tags, author chip.
3. **Sticky TOC** (auto from headings).
4. MDX body — code blocks with copy, callouts, footnotes/citations, images with captions.
5. **"Ask AI about this post"** → deep-links `/ai?context=post:<slug>` (chat pre-scoped to this post).
6. Related posts.
7. Author bio card.
8. Share + newsletter.

### 6. `/writing/tags/[tag]` & `/writing/series/[slug]`
1. Breadcrumb.
2. Tag/series header + count + description.
3. Post list (chronological).
4. Cross-links to sibling tags.
5. CTA.

### 7. `/about`
1. Intro / bio (short, human).
2. **Timeline** — roles & milestones (summary; full detail on `/resume`).
3. Skills matrix (grouped, no "progress bars").
4. Selected achievements.
5. Speaking · podcasts · OSS.
6. Personal section (optional, humanising).
7. CTA → `/contact`.

### 8. `/resume`
1. Header + **Download PDF** + **"Ask AI if I fit your role"**.
2. Summary.
3. Experience (detailed, filterable by skill).
4. Skills / tools.
5. Education & certifications.
6. Print stylesheet (clean PDF).
7. CTA.

### 9. `/contact` — Hire / consult
1. Header: what I'm available for (full-time · contract · advisory).
2. Availability, timezone, engagement model (rate band optional).
3. **Contact form** → Server Action (validation, honeypot, rate limit) → `/contact/thanks`.
4. **Book a call** (Cal.com embed).
5. FAQ (typical engagements, lead time).
6. Alternative channels — email, LinkedIn, X.

### 10. `/ai` — Ask my AI
1. Header: what it knows + data sources (projects, experience, writing) + last-indexed date.
2. Full-page chat (streaming, citations inline).
3. **Suggested prompt chips** ("What has he shipped with RAG?", "Is he available for contract?").
4. **Sources drawer** — retrieved chunks with links.
5. Feedback (👍/👎) → feeds `/admin/dashboard`.
6. Privacy note + "escalate to human" → `/contact`.
7. Empty/fallback state → contact.

### 11. `/search`
1. Search input (autofocus, `⌘K` target).
2. Facets by content type.
3. Grouped results — Work · Writing · Pages.
4. Empty state with suggestions.

### 12. `/now`, `/uses`, `/colophon`, `/newsletter`
- `/now` — current focus, updated date.
- `/uses` — hardware, editor, models, stack (high-signal for AI engineers).
- `/colophon` — Next.js version, DB/vector store, embedding model, chat architecture; **doubles as portfolio evidence**.
- `/newsletter` — subscribe + archive.

### 13. `/admin/*` (protected, `noindex`, `robots: disallow`)
- **Dashboard** — conversations, top unanswered queries, conversion to contact.
- **Content** — MDX posts, case studies, experience entries.
- **Knowledge** — RAG sources list, chunk counts, reindex button, failed ingestions.
- **Messages** — contact submissions.
- **Settings** — model/provider, system prompt, availability toggle (drives hero badge).

---

## D. Cross-cutting best practices

| Area | Rule |
|---|---|
| **Depth** | ≤ 3 clicks; flat URLs; no `/work/category/sub/x`. |
| **Header** | Persistent, identical order everywhere; active state on current section; skip-to-content link first in DOM. |
| **Mobile** | Hamburger → full-screen sheet with the *same order* as desktop; chat as bottom-sheet, never covering the CTA. |
| **Breadcrumbs** | On every page at depth ≥ 2 (`/work/[slug]`, `/writing/[slug]`, tags, series). |
| **TOC** | Sticky on long-form (case studies, posts, résumé); scroll-spy. |
| **Command palette** | `⌘K` → pages, posts, projects, and "ask AI" as first action. |
| **Filter state** | Always URL-driven (`?tag=rag`) so views are shareable and back-button-safe. |
| **CTAs** | Every page ends with a hire/consult CTA band — consistent conversion path. |
| **Chat** | Global widget + `/ai` full page + **context deep links** (`?context=post:<slug>`, `?context=work:<slug>`). |
| **Metadata** | Per-page `title`, `description`, canonical, OG image (generated), JSON-LD (`Person`, `BlogPosting`, `SoftwareSourceCode`). |
| **Accessibility** | Landmarks, focus rings, ARIA live region for streaming chat, WCAG 2.1 AA contrast, reduced-motion. |
| **Performance** | RSC by default, client components only for chat/filters; `next/image`; static generation for posts/case studies. |
| **Indexing** | `noindex` on `/admin`, `/api`, `/search`, `/contact/thanks`, `/ai` (optional); canonical tags everywhere. |
| **Errors** | Branded `/404` with search + top links; `/500` with contact fallback. |

---

## E. Machine-readable & technical layer

| Endpoint | Purpose |
|---|---|
| `/sitemap.xml` | Auto-generated from content DB; excludes admin/api. |
| `/robots.txt` | Allow public, disallow `/admin`, `/api`, `/search`. |
| `/rss.xml` + `/feed.xml` | Blog feeds (RSS + Atom). |
| `/llms.txt` + `/llms-full.txt` | Markdown site map for LLM crawlers — **strong signal on an AI portfolio**. |
| `/api/chat` | Streaming RAG endpoint (Vercel AI SDK) with citations. |
| `/api/search` | Hybrid keyword + vector search. |
| `/api/contact` | Form Server Action handler (rate-limited). |
| `/mcp` | Public MCP server exposing `search_content`, `get_case_study`, `get_experience`, `check_availability` — lets recruiters query you programmatically. |
| `/opengraph-image` | Dynamic OG per page/post. |
| `/.well-known/security.txt` | Contact for disclosures. |

---

### The one-line architecture summary

> **Flat 3-level tree · 5-item primary nav · global RAG chat as a cross-cutting layer (not a page) · every content type is a first-class collection with index → detail → tag/series · conversion CTA at the end of every page · admin + machine layer separated and `noindex`ed.**
