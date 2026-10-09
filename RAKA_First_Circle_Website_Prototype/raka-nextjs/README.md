# RAKA First Circle — Next.js Production Frontend

**Brand:** RAKA · Purely Powerful  
**Website Destination:** `https://raka.pk/first-circle`  
**Framework:** Next.js 16 (App Router), React 19, TypeScript, Vanilla CSS Design System  
**Design Philosophy:** Near-black, warm champagne gold, ivory cream, editorial typography. Uses official RAKA brand marks. Intentionally preserves all original styling and interactions without product or packaging reveal.

---

## Getting Started

### Prerequisites
- Node.js >= 20.9 (Tested on Node.js v24 LTS)
- npm >= 10.0

### Installation
```bash
cd raka-nextjs
npm install
```

### Running Locally
```bash
# Start local development server
npm run dev
# Open http://localhost:3000 in your browser
```

### Production Build & Launch
```bash
# Validate TypeScript, linting, and compile static production bundle
npm run build

# Start production server
npm run start
```

### Code Quality & Validation
```bash
# Run ESLint validation
npm run lint

# Validate TypeScript compilation
npx tsc --noEmit
```

---

## Project Architecture

```
raka-nextjs/
├── public/
│   ├── brand/
│   │   ├── raka-mark.png           # RAKA brand symbol
│   │   ├── raka-original-logo.jpg   # Brand logo badge (used in footer)
│   │   └── raka-wordmark.png        # Official typography wordmark
│   ├── guides/
│   │   └── raka-7-day-hair-care-guide.pdf  # 7-day care habits PDF guide
│   └── assets/                     # Symlinked/aliased legacy asset paths
├── references/
│   └── previews/                   # Visual acceptance targets
│       ├── desktop-landing.png     # Desktop landing reference (1440x5409)
│       ├── desktop-welcome.png     # Desktop welcome view reference
│       ├── mobile-guide.png        # Mobile guide page reference (390x3890)
│       ├── mobile-landing.png      # Mobile landing reference (390x6201)
│       └── mobile-welcome.png      # Mobile welcome reference (390x6204)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML, Google Fonts (Inter + Bodoni Moda), SEO metadata
│   │   ├── page.tsx                # Homepage route with WebPage JSON-LD schema
│   │   ├── globals.css             # Unified RAKA design system stylesheet
│   │   ├── not-found.tsx           # Branded 404 page
│   │   └── guide/
│   │       └── page.tsx            # Standalone 7-Day Hair Care Habits guide route
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PrototypeRibbon.tsx # Top interactive preview announcement ribbon
│   │   │   ├── Header.tsx          # Sticky glassmorphic header with logo & navigation
│   │   │   └── Footer.tsx          # Branded footer with dynamic year & dialog triggers
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Editorial hero copy, buttons, proof badge
│   │   │   ├── HeroSvg.tsx         # Animated gold halo & mountain lines SVG art
│   │   │   ├── StatementSection.tsx# 01 — OUR THINKING brand story
│   │   │   ├── BenefitsSection.tsx # 02 — INSIDE THE CIRCLE benefit cards
│   │   │   ├── RegistrationSection.tsx # 03 — Layout shell for invitation & form
│   │   │   ├── RegistrationForm.tsx# Client component with PK mobile validation & consent
│   │   │   ├── WelcomeView.tsx     # Client view: crypto referral generation & actions
│   │   │   ├── InvitationSection.tsx# Interstitial brand note section
│   │   │   ├── FaqSection.tsx      # 04 — Accessible native HTML5 accordion FAQ
│   │   │   ├── MobileJoinBar.tsx   # Fixed bottom floating bar on mobile screens
│   │   │   └── HomeClient.tsx      # Client state coordinator for modals & toast
│   │   ├── guide/
│   │   │   ├── GuideHero.tsx       # Care notes hero banner
│   │   │   ├── GuideBody.tsx       # 7 daily routines & PDF download button
│   │   │   └── GuideFooter.tsx     # Minimalist guide page footer
│   │   └── ui/
│   │       ├── PrivacyDialog.tsx   # Accessible HTML5 <dialog> for Privacy Notice
│   │       ├── EmailDialog.tsx     # Stylized stationery dark email preview modal
│   │       └── Toast.tsx           # Accessible notification toast
│   ├── data/
│   │   ├── faqs.ts                 # Structured FAQ content
│   │   ├── benefits.ts             # Structured benefit cards
│   │   └── guideLessons.ts         # Structured 7-day routine lessons
│   ├── lib/
│   │   └── utils.ts                # PK phone normalization, email regex, crypto tokens
│   └── styles/
│       ├── tokens.css              # Custom properties and brand color tokens
│       ├── animations.css          # Keyframes (ring-float, mountain-float)
│       └── guide.css               # Dedicated guide routine styles
├── docs/
│   ├── migration-plan.md           # Migration inventory and architectural spec
│   └── migration-report.md         # Final migration verification report
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration (strict mode)
└── package.json                    # Project scripts & dependencies
```

---

## Route Overview

| Route | Purpose | Rendering | SEO Indexing |
|---|---|---|---|
| `/` | Primary landing page, brand narrative, registration & welcome flow | Server prerendered + Client interactivity | `index, follow` |
| `/guide` | 7 Days to Better Hair-Care Habits routine & PDF download | Server prerendered | `noindex, follow` |
| `/_not-found` | Branded 404 error page | Server prerendered | `noindex` |

---

## Interactive Features Preserved

1. **Pakistani Mobile Normalization**: Accepts `3001234567`, `03001234567`, `923001234567`, `+923001234567` and normalizes to E.164 (`+923001234567`).
2. **Strict Client Validation**: Enforces valid email regex, Pakistani mobile prefixes, required email consent, and privacy notice agreement with accessible aria attributes and inline error messaging.
3. **Incoming Referral Attribution**: Reads incoming `?ref=FC-XXXXXXXX` query parameter and displays an invite indicator banner.
4. **Referral Link Generation**: Generates cryptographically secure `FC-` demo tokens via `window.crypto.getRandomValues`.
5. **Clipboard & Native Sharing**: Supports `navigator.clipboard.writeText` with selection fallback, and `navigator.share` on mobile devices.
6. **Accessible Modals**: Native HTML5 `<dialog>` elements for the draft Privacy Notice and styled Email Preview, supporting backdrop blur, escape key dismissal, and backdrop click dismissal.
7. **Personalized Email Preview**: Displays user's first name in the welcome stationery dialog.
8. **7-Day PDF Download**: Directly downloads the original 29 KB branded `RAKA_7_Day_Hair_Care_Guide.pdf`.
9. **FAQ Accordions**: Native accessible `<details>` and `<summary>` elements with smooth rotating plus icons.
10. **Mobile Sticky Join Bar**: Fixed responsive floating button on viewports under 640px.
