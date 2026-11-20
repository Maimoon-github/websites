# RAKA Brand Storefront & Commerce Platform

> **Full-Stack Next.js Project Architecture & Auto-Layout Engine**  
> **Brand:** RAKA (Named after Mount Rakaposhi, Gilgit-Baltistan, Pakistan)  
> **Design Tokens Source of Truth:** [`Design-TOKEN/README.md`](./Design-TOKEN/README.md)  
> **Design System Version:** 1.2 · Light Theme (Aligned to `raka.pk`)  
> **Target Launch:** 1 December 2026 · Lahore, Pakistan

---

## 1. Project Overview

This repository hosts the full-stack Next.js project for the **RAKA** hair care brand website. It translates the daylight summit aesthetic of Mount Rakaposhi (**snow-bright grounds**, **warm copper accents**, and **delicate alpenglow**) into a responsive, accessible digital storefront.

The architecture separates layout primitives, design tokens, and UI components from application business logic, establishing a **predefined layout and auto-layout engine** that governs every page and element on the site.

---

## 2. Best-Practice Full-Stack Directory Hierarchy

```
websites/
├── Design-TOKEN/                       # Master Design Token exports & artboard sources
│   ├── README.md                       # Comprehensive Design System & Token Specification
│   ├── 01 Brand foundations-html/      # Brand origins, ethos, signature motifs
│   ├── 02 Color-html/                  # 14 color swatches, 60-30-10 distribution, WCAG 2.1 matrix
│   ├── 03 Typography-html/             # Display (Caslon), UI (Manrope), Urdu font scales
│   ├── 04 Spacing, grid, shape, motion-html/ # 4px scale, 4-tier grid, crisp radii, silk motion
│   ├── 05 Components-html/             # Buttons, inputs, badges, chips, toast, product cards
│   └── 06 Imagery, icons, voice-html/  # 12 core SVGs, photography rules, honest brand voice
├── public/
│   └── brand/                          # Brand assets (logos, bottle imagery)
│       ├── raka-logo.webp              # Master brand emblem in capsule frame
│       └── hair-fall-control-oil.jpg   # Product shot (200ml pump bottle with gold collar)
├── src/
│   ├── app/                            # Next.js App Router (Full-Stack Routing)
│   │   ├── globals.css                 # CSS variables, resets, and auto-layout utilities
│   │   ├── layout.tsx                  # Root HTML document, Google Fonts, global metadata
│   │   ├── (storefront)/               # Public store route group
│   │   │   ├── layout.tsx              # Predefined storefront shell (Announcement + Header + Footer)
│   │   │   ├── page.tsx                # Clean architectural root view using auto-layout
│   │   │   ├── loading.tsx             # Signature Rakaposhi ridge outline loader
│   │   │   ├── not-found.tsx           # Brand-voiced 404 handler
│   │   │   └── error.tsx               # Brand-voiced error boundary
│   │   └── api/                        # Backend Serverless API Handlers
│   │       ├── health/route.ts         # System health & version endpoint
│   │       ├── products/route.ts       # Product catalog & inventory feed
│   │       ├── cart/route.ts           # Cart session & item management
│   │       ├── orders/route.ts         # Checkout processing & Pakistan COD confirmation
│   │       └── newsletter/route.ts     # First Circle sign-up (+92 validation)
│   ├── components/
│   │   ├── layout/                     # Auto-layout & Predefined Shell Primitives
│   │   │   ├── AnnouncementBar.tsx     # Linen announcement banner (Launch date notice)
│   │   │   ├── Header.tsx              # Fixed navigation header with 44px action targets
│   │   │   ├── Footer.tsx              # 3-column Trust Strip, Ridge divider & legal links
│   │   │   ├── Container.tsx           # Responsive auto-layout wrapper (20/32/48/80px gutters)
│   │   │   ├── Grid.tsx                # 4/8/12 column grid & 2/3/4 product auto-layout
│   │   │   ├── Stack.tsx               # Flexbox auto-layout stack (VStack / HStack)
│   │   │   └── Section.tsx             # Standardized vertical rhythm section container
│   │   ├── ui/                         # Design Token UI Primitives
│   │   │   ├── Button.tsx              # Ink buy, Copper join, Outline explore (52/44px)
│   │   │   ├── Input.tsx               # 48px input with 2px Copper Deep focus & +92 PK mode
│   │   │   ├── Badge.tsx               # 11px uppercase bold tags (New, First Circle, Offer)
│   │   │   ├── Chip.tsx                # Capsule 9999px filter chips with aria-pressed states
│   │   │   ├── Card.tsx                # 6px radius cards with ink-tinted elevation (e0-e3)
│   │   │   └── Toast.tsx               # Dark Ink surface, 4-second auto-dismiss notification
│   │   └── icons/                      # 12 Core Brand SVG Icons (Round caps/joins, 1.5px stroke)
│   │       ├── index.ts                # Icon registry & Rakaposhi ridge divider
│   │       ├── BagIcon.tsx             # Shopping bag
│   │       ├── SearchIcon.tsx          # Storefront search
│   │       ├── AccountIcon.tsx         # User profile
│   │       ├── WishlistIcon.tsx        # Heart
│   │       ├── OilDropIcon.tsx         # Treatment oil drop
│   │       ├── BotanicalIcon.tsx       # Plant leaf
│   │       ├── DeliveryIcon.tsx        # Shipping van
│   │       ├── CashOnDeliveryIcon.tsx  # Banknote COD
│   │       ├── ReturnsIcon.tsx         # Circular returns
│   │       ├── WhatsAppIcon.tsx        # Direct customer messaging
│   │       ├── MountainIcon.tsx        # Rakaposhi peak outline
│   │       └── SparkleIcon.tsx         # Logo 4-point flare (Only filled icon)
│   ├── lib/
│   │   ├── tokens.ts                   # Exported TypeScript token constants
│   │   ├── utils.ts                    # cn() class merging utility (clsx + tailwind-merge)
│   │   ├── db/                         # Database connection abstraction layer
│   │   └── validations/                # Input validation schemas (PK mobile numbers, forms)
│   └── types/
│       └── index.ts                    # TypeScript types for layout, UI, and commerce
├── next.config.mjs                     # Next.js runtime configuration
├── tailwind.config.ts                  # Tailwind config mapping all RAKA design tokens
├── postcss.config.mjs                  # PostCSS plugins
├── tsconfig.json                       # TypeScript compiler options & `@/*` alias
└── package.json                        # Project scripts and dependencies
```

---

## 3. Design Tokens & Auto-Layout Configuration

The project implements the tokens specified in [`Design-TOKEN/README.md`](./Design-TOKEN/README.md):

### 1. Auto-Layout Responsive Containers (`Container.tsx`)
Auto-layout handles screen margins dynamically across 4 standard viewport tiers:
- **Mobile (0–599px):** `padding-left: 20px; padding-right: 20px;` (4 columns)
- **Tablet (600–1023px):** `padding-left: 32px; padding-right: 32px;` (8 columns)
- **Laptop (1024–1279px):** `padding-left: 48px; padding-right: 48px;` (12 columns)
- **Desktop (1280px+):** `padding-left: 80px; padding-right: 80px; max-width: 1280px;` (12 columns)

### 2. Auto-Layout Product Grids (`Grid.tsx`)
When `<Grid responsiveProductGrid>` is enabled, product listing cards arrange themselves automatically:
- **Mobile:** `grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;` (2 across)
- **Tablet:** `grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;` (3 across)
- **Desktop:** `grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px;` (4 across)

### 3. Auto-Layout Vertical Rhythm (`Section.tsx`)
Page sections automatically apply standardized vertical spacing:
- **Mobile:** `padding-top: 64px; padding-bottom: 64px;` (`space-8`)
- **Tablet:** `padding-top: 96px; padding-bottom: 96px;` (`space-9`)
- **Desktop:** `padding-top: 128px; padding-bottom: 128px;` (`space-10`)

### 4. Color Palette Tokens (`tailwind.config.ts` & `globals.css`)
- **Snowfield (`#F6F0E8` / `bg-raka-snow`):** Page ground (58% of viewport)
- **Paper (`#FFFFFF` / `bg-raka-paper`):** Card containers & product sweeps (22%)
- **Ink (`#14110F` / `text-raka-ink`, `bg-raka-ink`):** Typography & primary buy CTA (10%)
- **Copper (`#CF8F63` / `bg-raka-copper`):** Identity accent & join buttons (6%)
- **Alpenglow (`#E7A98A` / `bg-raka-alpenglow`):** Playful highlights (4%)
- **Copper Deep (`#8E5530` / `text-raka-copper-deep`):** WCAG AA-compliant copper text, links, and active focus rings.

---

## 4. UI/UX Rules & Accessibility Guardrails

1. **Strict Contrast Compliance:** Never use `#CF8F63` or `#E7A98A` for text on light ground (they fail WCAG contrast). Always use **Copper Deep (`#8E5530`)** for colored text.
2. **No Dark Sections:** Full-width containers must never have black or dark background fills. Ink is strictly reserved for text, the primary buy button, and the 4-second notification toast.
3. **Single Filled Button Rule:** Each screen/view contains at most **one** solid filled action button.
4. **Touch Target Safety:** All interactive elements (buttons, inputs, chips, icons) are clamped to a minimum bounding box of **44×44px**.
5. **Pakistani Localization:**
   - Phone input includes fixed `+92` country code and 10-digit validation.
   - Prices formatted with PKR tabular numerals (`Rs [PRICE]`).
   - Post-purchase trust strip prominently features Cash On Delivery (COD) and nationwide shipping.
6. **Honest Claims:** No fabricated star ratings, review counts, or "Bestseller" badges until verified transactions exist.

---

## 5. Development & Verification

### Prerequisites
- Node.js ≥ 20.x (Node 24 LTS verified)
- npm ≥ 10.x

### Scripts
```bash
# Start Next.js development server
npm run dev

# Run TypeScript type verification
npm run type-check

# Compile production build
npm run build

# Start production server
npm start
```
