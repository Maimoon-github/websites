# RAKA First Circle — Next.js Migration Plan & Inventory

## 1. Migration Overview
This plan specifies the migration of the RAKA First Circle pre-launch website from static HTML/CSS/JS prototype into a modern, production-grade Next.js App Router application with TypeScript and Vanilla CSS.

## 2. Feature & Component Inventory

| Source Item | Source File | Destination Component / File | Behavior & Details | Status |
|-------------|-------------|------------------------------|--------------------|--------|
| Brand Assets | `assets/*` | `public/brand/*`, `public/guides/*` | Wordmark, mark, original logo, and 7-day care guide PDF | Migrated |
| Visual Previews | `previews/*` | `references/previews/*` | 5 visual acceptance screenshots (desktop & mobile) | Migrated |
| Design Tokens & Styles | `styles.css` | `src/styles/tokens.css`, `src/app/globals.css` | Exact color palette, typography, responsive breakpoints | Planned |
| Prototype Banner | `index.html` (L24) | `src/components/layout/PrototypeRibbon.tsx` | Informational ribbon "INTERACTIVE PREVIEW — NO DATA IS SENT OR STORED" | Planned |
| Site Header | `index.html` (L25-38) | `src/components/layout/Header.tsx` | Glassmorphic sticky header, wordmark, nav links, CTA button | Planned |
| Hero Section | `index.html` (L40-81) | `src/components/home/Hero.tsx`, `HeroSvg.tsx` | Animated golden ring/mountain SVG art, typography, scroll indicator | Planned |
| Statement Section | `index.html` (L83-94) | `src/components/home/StatementSection.tsx` | "01 — OUR THINKING", brand philosophy narrative | Planned |
| Benefits Section | `index.html` (L96-106) | `src/components/home/BenefitsSection.tsx` | 3-column benefit cards ("The first word", "The care notes", "A closer connection") | Planned |
| Registration & Form | `index.html` (L108-151), `app.js` | `src/components/home/RegistrationSection.tsx`, `RegistrationForm.tsx` | Form validation, PK phone normalization, honeypot, consent toggles | Planned |
| Welcome Flow | `index.html` (L139-148), `app.js` | `src/components/home/WelcomeView.tsx` | Crypto referral generation, copy link, native share, email preview trigger | Planned |
| Note from RAKA | `index.html` (L153) | `src/components/home/InvitationSection.tsx` | Dark interstitial section with CTA | Planned |
| FAQ Section | `index.html` (L155-162) | `src/components/home/FaqSection.tsx` | Native accessible `<details>` accordion with rotation icon | Planned |
| Footer | `index.html` (L164) | `src/components/layout/Footer.tsx` | Original logo, dynamic current year, privacy dialog trigger, links | Planned |
| Mobile Join Bar | `index.html` (L165) | `src/components/home/MobileJoinBar.tsx` | Fixed bottom bar for small screens (<640px) | Planned |
| Privacy Dialog | `index.html` (L167), `app.js` | `src/components/ui/PrivacyDialog.tsx` | Native `<dialog>` modal with backdrop blur & complete draft text | Planned |
| Email Dialog | `index.html` (L168), `app.js` | `src/components/ui/EmailDialog.tsx` | Dark stationery email preview with personalized name & guide link | Planned |
| Toast System | `index.html` (L169), `app.js` | `src/components/ui/Toast.tsx` | Animated bottom notification on copy/error | Planned |
| 7-Day Guide Page | `guide.html` | `src/app/guide/page.tsx`, `src/components/guide/*` | Standalone guide route, 7 daily routines, PDF download button | Planned |
| PDF Download | `assets/*.pdf` | `public/guides/raka-7-day-hair-care-guide.pdf` | Direct download of branded PDF guide | Migrated |

## 3. Architecture & Tech Decisions
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling**: Vanilla CSS preserving all original classes, design tokens, and media queries. No unnecessary Tailwind or CSS utility overhead.
- **Fonts**: Inter (`var(--sans)`) and Bodoni Moda / Didot (`var(--serif)`) via Google Fonts with complete fallback stacks.
- **Server vs Client**:
  - Server Components for static sections (Header, Hero, Statement, Benefits, Invitation, FAQ, Footer, Guide).
  - Client Components only for stateful interactive elements (RegistrationForm, WelcomeView, Dialogs, Toast).
