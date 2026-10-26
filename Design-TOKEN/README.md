# RAKA Brand Website — Design System & Token Specification
> **Version:** 1.2 · Light Theme (Aligned to `raka.pk`)  
> **Brand:** RAKA (Named after Rakaposhi, Gilgit-Baltistan, Pakistan)  
> **Target Launch:** 1 December 2026 · Lahore, Pakistan  
> **Engineering Purpose:** Production reference manual and token registry for constructing the Raka e-commerce brand website.

---

## Table of Contents
1. [System Overview & Framework Methodology](#1-system-overview--framework-methodology)
2. [Directory Architecture & Folder References](#2-directory-architecture--folder-references)
3. [Module 01: Brand Foundations](#module-01-brand-foundations)
4. [Module 02: Color Architecture & Accessibility](#module-02-color-architecture--accessibility)
5. [Module 03: Typography System](#module-03-typography-system)
6. [Module 04: Spacing, Grid, Shape & Motion](#module-04-spacing-grid-shape--motion)
7. [Module 05: Core UI Components & Patterns](#module-05-core-ui-components--patterns)
8. [Module 06: Imagery, Iconography & Brand Voice](#module-06-imagery-iconography--brand-voice)
9. [Web Construction Guide: Production CSS & Tailwind Tokens](#9-web-construction-guide-production-css--tailwind-tokens)
10. [Engineering Checklist & Quality Gates](#10-engineering-checklist--quality-gates)

---

## 1. System Overview & Framework Methodology

The RAKA Design System translates the geographic and aesthetic character of **Mount Rakaposhi** into a high-performance digital e-commerce storefront. The visual language mirrors the mountain peak in morning light: **snow-bright fields**, **warm copper accents**, and a touch of **alpenglow**. It bridges clinical transparency with editorial warmth: clean enough to read every ingredient, styled like a luxury editorial.

### Engineering Analysis Pattern
The design token system has been analyzed and structured following the 9-stage engineering pattern:
$$\text{Understand} \longrightarrow \text{Decompose} \longrightarrow \text{Design} \longrightarrow \text{Implement} \longrightarrow \text{Validate} \longrightarrow \text{Test} \longrightarrow \text{Review} \longrightarrow \text{Observe} \longrightarrow \text{Improve}$$

| Stage | Website Construction Focus |
|---|---|
| **Understand** | Brand ethos, audience (modern Pakistani women, Gen Z grown-up), e-commerce objectives, and cultural nuance. |
| **Decompose** | Extract atomic design elements from visual mockups (`.dc.html` artboards, assets, and metadata). |
| **Design** | Map atomic values to formal CSS tokens, responsive breakpoints, layout rules, and component states. |
| **Implement** | Build modular, accessible web components (buttons, cards, forms, drawers, toasts). |
| **Validate** | Verify WCAG 2.1 AA/AAA color contrast, responsive behavior across 4 breakpoints, and touch targets (≥44px). |
| **Test** | Conduct cross-browser rendering tests, screen reader accessibility (`aria-*`), and network payload checks. |
| **Review** | Audit code against brand rules (single filled button per view, one italic copper word per headline, authentic badges only). |
| **Observe** | Monitor Web Vitals (LCP, CLS, FID), conversion funnel events, and user drop-offs. |
| **Improve** | Iteratively refine component performance, asset loading strategies, and localized checkout flows. |

---

## 2. Directory Architecture & Folder References

The `Design-TOKEN/` workspace contains six core token directories. Each folder includes a standalone preview artboard (`*.dc.html`), design runtime (`support.js`, `vendor/`), and exported brand media assets (`assets/`).

```
Design-TOKEN/
├── README.md                                    # Master Token Documentation (This file)
├── 01 Brand foundations-html/                   # Brand narrative, positioning, signature motifs
│   ├── Main.dc.html                             # Visual preview artboard
│   ├── README.md                                # Reference mockup disclaimer
│   └── assets/
│       └── b6150d91f238ad3ba77b3eb0b4d2b484.webp # Master RAKA brand mark & capsule emblem
├── 02 Color-html/                               # Color swatches, proportions, WCAG matrix
│   ├── Color.dc.html                            # Visual preview artboard
│   └── README.md                                # Reference mockup disclaimer
├── 03 Typography-html/                          # Font scale, hierarchy, line heights, Urdu
│   ├── Typography.dc.html                       # Visual preview artboard
│   └── README.md                                # Reference mockup disclaimer
├── 04 Spacing, grid, shape, motion-html/        # 4px scale, responsive grid, radii, silk motion
│   ├── Layout.dc.html                           # Visual preview artboard
│   └── README.md                                # Reference mockup disclaimer
├── 05 Components-html/                          # UI components: buttons, forms, cards, toasts
│   ├── Components.dc.html                       # Visual preview artboard
│   ├── README.md                                # Reference mockup disclaimer
│   └── assets/
│       ├── 1590e816abe17cfd8e9d1d883693f433.jpg # Hair Fall Control Treatment Oil bottle asset
│       └── b6150d91f238ad3ba77b3eb0b4d2b484.webp # Brand mark (nav size)
└── 06 Imagery, icons, voice-html/               # Photography do/don't, 12 SVGs, tone of voice
    ├── Imagery.dc.html                          # Visual preview artboard
    ├── README.md                                # Reference mockup disclaimer
    └── assets/
        └── 1590e816abe17cfd8e9d1d883693f433.jpg # Product macro sweep asset
```

---

## Module 01: Brand Foundations
📁 **Directory:** [`01 Brand foundations-html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/01%20Brand%20foundations-html)  
📄 **Mockup Reference:** [`Main.dc.html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/01%20Brand%20foundations-html/Main.dc.html)  
🖼️ **Assets:** [`assets/b6150d91f238ad3ba77b3eb0b4d2b484.webp`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/01%20Brand%20foundations-html/assets/b6150d91f238ad3ba77b3eb0b4d2b484.webp) (240×240px with alpha)

### 1. Brand Narrative & Positioning
- **Etymology:** Named after **Rakaposhi**, the prominent summit in Gilgit-Baltistan, Pakistan.
- **Atmosphere:** Daylight summit aesthetic — snow-bright ground, warm copper highlights, and delicate alpenglow.
- **Positioning Spectrum:**
  - Modern (over Traditional)
  - Sensory & Refined (over Loud or Clinical)
  - Playful yet Serious
  - *"Premium without being pretentious. Youthful without looking childish."*

### 2. Four Core Design Pillars
1. **Light & Open:** Snow ground (`#F6F0E8`), pure paper cards (`#FFFFFF`), generous whitespace. Warmth is introduced via authentic photography rather than heavy background fills.
2. **Copper Leads:** A single copper element dominates each view — either the primary CTA or the single focal headline word.
3. **Say What It Does:** Complete ingredient transparency, application directions, pricing in PKR, and clear delivery terms. Zero unproven medical claims.
4. **A Wink of Play:** Expressive italic Caslon flourishes, alpenglow pastel highlights, and tactile tap-response animations.

### 3. Signature Brand Motifs
| Motif | Visual Element | Implementation Rule | Code Representation |
|---|---|---|---|
| **The Ridge** | Mountain summit vector | Rakaposhi's outline used as a divider or loading indicator. **Max once per page**. | `<path d="M1 27 L12 14 L17 18 L27 4 L33 11 L37 8 L47 27" stroke="#CF8F63" fill="none" />` |
| **The Capsule** | Pill shape with full curvature | Derived from logo frame. Applied to hero photo masks and concern filter tags. | `border-radius: 9999px;` or `clip-path: inset(0 round 9999px);` |
| **The Sparkle** | Four-point flare | Derived from logo star. Highlights new arrivals and launch badges. **Never used as an all-over repeating pattern**. | `<path d="M12 2C12 8 16 12 22 12C16 12 12 16 12 22C12 16 8 12 2 12C8 12 12 8 12 2Z" fill="#E7A98A" />` |
| **The Italic Turn** | Condensed italic serif | Single emphasized copper word inside a sans-serif headline. | `<h1>Raise the <em class="text-raka-copper-deep italic">standard.</em></h1>` |

---

## Module 02: Color Architecture & Accessibility
📁 **Directory:** [`02 Color-html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/02%20Color-html)  
📄 **Mockup Reference:** [`Color.dc.html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/02%20Color-html/Color.dc.html)

### 1. Palette Specification & Token Mapping

#### Core Palette (Primary Brand Surface)
| Token Name | Hex Code | CSS Variable | Semantic Application |
|---|---|---|---|
| **Snowfield** | `#F6F0E8` | `--raka-snow` | Master page background (Default body ground) |
| **Paper** | `#FFFFFF` | `--raka-paper` | Card containers, product shot backdrops, modal surfaces |
| **Copper** | `#CF8F63` | `--raka-copper` | Brand identity accent, secondary button backgrounds, rules |
| **Ink** | `#14110F` | `--raka-ink` | Primary text, primary CTA button, footer border rules |
| **Alpenglow** | `#E7A98A` | `--raka-alpenglow` | Playful highlight, lifestyle accent, active tag borders |

#### Supporting Palette (Functional & Sub-surfaces)
| Token Name | Hex Code | CSS Variable | Semantic Application |
|---|---|---|---|
| **Linen** | `#EDE3D6` | `--raka-linen` | Alternate section background, announcement banner ground |
| **Sand** | `#E4D8CA` | `--raka-sand` | Hairline dividers, card borders (1px), disabled button fills |
| **Alpenglow Tint** | `#F8E1D4` | `--raka-alpenglow-tint`| Concern card surface, playful micro-surfaces, badge fill |
| **Copper Wash** | `#F3E2D5` | `--raka-copper-wash` | Active filter chip ground, item hover states |
| **Copper Deep** | `#8E5530` | `--raka-copper-deep` | High-contrast copper text, hyperlinks, active focus rings |
| **Taupe** | `#6E6157` | `--raka-taupe` | Secondary metadata, captions, disabled text, field labels |
| **Bark** | `#3A322C` | `--raka-bark` | High-readability body copy on Paper cards |
| **Ember** | `#C2412D` | `--raka-ember` | Special promotional offers, discount badges only |

#### Status Palette
| Semantic State | Text / Icon Hex | Background Hex | Use Case |
|---|---|---|---|
| **Success** | `#2F6B4F` | `#E6F0E9` | Order confirmation, in-stock notice, success alerts |
| **Warning** | `#7A4F0C` | `#F7EBD6` | Low inventory warnings, cart expiration warnings |
| **Error** | `#B3261E` | `#F8E3E0` | Form validation errors, checkout transaction failures |

### 2. Surface Distribution Rule (60-30-10 Rule)
On any typical page view, color proportions must adhere to:
- **Snowfield (`#F6F0E8`):** **58%** (Dominant surface canvas)
- **Paper (`#FFFFFF`):** **22%** (Product modules & cards)
- **Ink (`#14110F`):** **10%** (Typography & primary buy CTA only)
- **Copper (`#CF8F63`):** **6%** (Focal accents, join actions)
- **Alpenglow (`#E7A98A`):** **4%** (Playful micro-touches)

> [!CRITICAL]
> **No dark page sections:** The Raka brand website never uses dark or black section backgrounds. Ink (`#14110F`) is strictly reserved for typography, the primary action button, and subtle dividing rules.

### 3. WCAG 2.1 Contrast & Accessibility Matrix
| Text Token | Background Token | Contrast Ratio | WCAG Compliance | Implementation Guidance |
|---|---|---|---|---|
| **Ink** (`#14110F`) | **Snowfield** (`#F6F0E8`) | **16.6:1** | **AAA** Pass | Standard page copy & headings |
| **Bark** (`#3A322C`) | **Paper** (`#FFFFFF`) | **12.6:1** | **AAA** Pass | Card descriptions & directions |
| **Taupe** (`#6E6157`) | **Snowfield** (`#F6F0E8`) | **5.3:1** | **AA** Pass | Secondary captions & dates |
| **Copper Deep** (`#8E5530`) | **Snowfield** (`#F6F0E8`) | **5.3:1** | **AA** Pass | Colored headings & inline links |
| **Ink** (`#14110F`) | **Copper** (`#CF8F63`) | **7.0:1** | **AAA** Pass | Secondary action button text |
| **Paper** (`#FFFFFF`) | **Ink** (`#14110F`) | **18.8:1** | **AAA** Pass | Primary "Add to bag" button text |
| **Ink** (`#14110F`) | **Alpenglow Tint** (`#F8E1D4`) | **15.0:1** | **AAA** Pass | Badge copy & concern card body |
| **Paper** (`#FFFFFF`) | **Ember** (`#C2412D`) | **5.1:1** | **AA** Pass | Launch offer badge text |
| **Copper** (`#CF8F63`) | **Snowfield** (`#F6F0E8`) | **2.4:1** | **FAIL** (Decor only) | ⚠️ **DO NOT USE FOR TEXT**. Only fills & SVGs > 24px. |
| **Alpenglow** (`#E7A98A`) | **Snowfield** (`#F6F0E8`) | **1.8:1** | **FAIL** (Never) | ⚠️ **NEVER USE FOR TEXT**. Only graphic fills. |

---

## Module 03: Typography System
📁 **Directory:** [`03 Typography-html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/03%20Typography-html)  
📄 **Mockup Reference:** [`Typography.dc.html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/03%20Typography-html/Typography.dc.html)

### 1. Font Family Architecture
- **Display Font:** `Libre Caslon Condensed` (Weight 400 + Italic)
  - Source: Google Fonts (OFL)
  - Purpose: Editorial headlines, hero banners, campaign statements, large product names, big numeral counters (≥32px).
  - Constraint: **Never** used for buttons, interactive form fields, or body paragraphs.
- **Interface & Body Font:** `Manrope` (Weights 400, 500, 600, 700)
  - Source: Google Fonts (OFL)
  - Purpose: UI navigation, body copy, product cards, prices, form inputs, button labels.
  - Geometry: Open modern geometric sans-serif; maintains crisp legibility down to 12px on mobile displays.
- **Urdu Font:** `Noto Nastaliq Urdu` (Weights 400, 700)
  - Source: Google Fonts (OFL)
  - Purpose: Dedicated Urdu campaign slogans and regional statements.
  - Note: Requires approximately **2× the line height** of Latin text to avoid descender clipping. Roman Urdu remains in `Manrope`.

### 2. Complete Typographic Token Scale
| Token | Desktop Size / Mobile Size | Weight | Line Height | Tracking | Font Family | Use Case |
|---|---|---|---|---|---|---|
| `display-xl` | 112px / 60px | 400 | 0.95 | -0.015em (-1.5%) | Libre Caslon Condensed | Hero launch headlines |
| `display` | 86px / 48px | 400 | 1.00 | -0.015em (-1.5%) | Libre Caslon Condensed | Section splash headers |
| `h1` | 64px / 40px | 400 | 1.05 | -0.010em (-1.0%) | Libre Caslon Condensed | Primary page headers |
| `h2` | 48px / 32px | 400 | 1.10 | 0.000em (0%) | Libre Caslon Condensed | Content section titles |
| `h3` | 22px / 19px | 600 | 1.30 | -0.005em (-0.5%) | Manrope | Drawer titles, card group heads |
| `title` | 17px / 16px | 600 | 1.40 | 0.000em (0%) | Manrope | Product card titles |
| `body-l` | 18px / 17px | 400 | 1.60 | 0.000em (0%) | Manrope | Intro lead paragraphs |
| `body` | 16px / 16px | 400 | 1.60 | 0.000em (0%) | Manrope | Standard product description |
| `small` | 14px / 14px | 400 | 1.50 | 0.000em (0%) | Manrope | Disclaimers, volume, subtext |
| `eyebrow` | 12px / 12px | 600 (Caps) | 1.20 | +0.160em (+16%) | Manrope | Section tags, categories |
| `price` | 20px / 18px | 700 | 1.20 | Tabular nums | Manrope | Product pricing in PKR |
| `button` | 15px / 15px | 600 | 1.00 | +0.040em (+4%) | Manrope | Interactive button labels |

### 3. Typographic Editorial Rules
1. **The Italic Copper Turn:** Exactly *one word* per headline is set in italic Caslon and colored in Copper Deep (`#8E5530`). Never italicize a full sentence.
2. **Sentence Case Rule:** All headlines, button labels, and navigation links use standard sentence case (e.g., "Add to bag", "Join the First Circle"). All-caps is strictly limited to `eyebrow` tags and product badges.
3. **Measure & Legibility:** Body copy must be clamped to 45–70 characters per line (`max-width: 60ch`). The minimum body size on mobile is strictly 16px.

---

## Module 04: Spacing, Grid, Shape & Motion
📁 **Directory:** [`04 Spacing, grid, shape, motion-html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/04%20Spacing, grid, shape, motion-html)  
📄 **Mockup Reference:** [`Layout.dc.html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/04%20Spacing, grid, shape, motion-html/Layout.dc.html)

### 1. Spacing Scale (4px Base Grid)
| Token | Pixel Value | Rem Equivalent | Common Layout Application |
|---|---|---|---|
| `space-1` | 4px | 0.25rem | Icon to label gap, inline badge margin |
| `space-2` | 8px | 0.50rem | Inside chips, tight vertical stacks |
| `space-3` | 12px | 0.75rem | Title to price offset, micro gap |
| `space-4` | 16px | 1.00rem | Mobile screen gutter, input padding |
| `space-5` | 24px | 1.50rem | Card internal padding, desktop gutter |
| `space-6` | 32px | 2.00rem | Space between form groups |
| `space-7` | 48px | 3.00rem | Heading to content container gap |
| `space-8` | 64px | 4.00rem | Section vertical gap on mobile |
| `space-9` | 96px | 6.00rem | Section vertical gap on tablet |
| `space-10` | 128px | 8.00rem | Section vertical gap on desktop |

### 2. Responsive Breakpoint & Grid Hierarchy
```
Mobile (0–599px)       :  4 Col | Gutter: 16px | Margin: 20px | Product Grid: 2 Across
Tablet (600–1023px)    :  8 Col | Gutter: 20px | Margin: 32px | Product Grid: 3 Across
Laptop (1024–1279px)   : 12 Col | Gutter: 24px | Margin: 48px | Product Grid: 4 Across
Desktop (1280px+)      : 12 Col | Gutter: 24px | Margin: 80px | Content Max: 1280px
```
- **Bleed Rule:** Hero banners and atmospheric landscape photography run full bleed (`width: 100vw`); all typography, product grids, and interface controls stay bounded within the container margins.

### 3. Corner Radius Geometry
| Token | Value | Target UI Elements |
|---|---|---|
| `radius-none` | `0px` | Full-bleed hero banners, edge-to-edge section dividers |
| `radius-crisp` | `2px` | Interactive buttons, text inputs, swatches, badges |
| `radius-card` | `6px` | Product cards, navigation bar shell, modal sheets, drawer boxes |
| `radius-capsule` | `9999px` | Single feature image mask per page, concern filter chips |

### 4. Elevation & Ink-Tinted Shadows
All shadows are tinted with **Ink (`rgba(20, 17, 15, ...)`)** rather than neutral grey, preserving organic warmth.
- **`e0` (Flat):** `border: 1px solid var(--raka-sand, #E4D8CA); box-shadow: none;` (Baseline state for most cards)
- **`e1` (Hover):** `box-shadow: 0 1px 2px rgba(20,17,15,0.06), 0 2px 8px rgba(20,17,15,0.05);`
- **`e2` (Floating Menus):** `box-shadow: 0 12px 32px rgba(20,17,15,0.10);` (Sticky buy bar, drop-down menus)
- **`e3` (Overlays & Modals):** `box-shadow: 0 24px 64px rgba(20,17,15,0.16);` (Bag drawer, confirmation modals, toast)

### 5. Motion Tokens & Physics
- **Silk Easing Curve:** `cubic-bezier(0.2, 0.7, 0.2, 1.0)`
- **Durations:**
  - `fast` (150ms): Hover triggers, button press feedback, toggle states.
  - `base` (250ms): Accordion open/collapse, product thumbnail swap.
  - `slow` (450ms): Slide-out cart drawer, sticky bar entry, scroll reveals.
  - `story` (700ms): Hero brand reveal and launch transitions.
- **Scroll Reveal Choreography:** Elements rise `24px` with opacity fade:
  ```css
  @keyframes rakaReveal {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  ```
- **Accessibility Directive:** Under `@media (prefers-reduced-motion: reduce)`, translations are removed entirely; elements perform pure opacity fades.

---

## Module 05: Core UI Components & Patterns
📁 **Directory:** [`05 Components-html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/05%20Components-html)  
📄 **Mockup Reference:** [`Components.dc.html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/05%20Components-html/Components.dc.html)  
🖼️ **Assets:**
- [`assets/b6150d91f238ad3ba77b3eb0b4d2b484.webp`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/05%20Components-html/assets/b6150d91f238ad3ba77b3eb0b4d2b484.webp) (Nav Brandmark, 52×52px)
- [`assets/1590e816abe17cfd8e9d1d883693f433.jpg`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/05%20Components-html/assets/1590e816abe17cfd8e9d1d883693f433.jpg) (Treatment Oil Bottle, 893×1600px)

### 1. Button System
- **Touch Target Rule:** Standard height is **52px (Large)** and **44px (Medium)**; touch targets never drop below 44px.
- **Single Filled Button Rule:** Only **one** solid filled button is permitted in a single viewport.

| Variant | Background | Text Color | Border | State Styling |
|---|---|---|---|---|
| **Primary Buy** | `#14110F` (Ink) | `#FFFFFF` (Paper) | None | Hover: `#2B2420`; Focus: `outline: 2px solid #8E5530; outline-offset: 3px` |
| **Membership / Join**| `#CF8F63` (Copper) | `#14110F` (Ink) | None | Hover: `#B87B52`; Focus: `outline: 2px solid #8E5530; outline-offset: 3px` |
| **Secondary Explore**| Transparent | `#14110F` (Ink) | `1px solid #14110F` | Hover: `background: #F3E2D5`; Focus: outline ring |
| **Disabled / Sold Out**| `#E4D8CA` (Sand) | `#6E6157` (Taupe) | None | `cursor: not-allowed; opacity: 1;` |

### 2. Form Inputs & Regional Mobile Formatting
- **Standard Text Input:** Height 48px, background `#FFFFFF`, border `1px solid #E4D8CA`, border-radius `2px`, padding `0 14px`, font Manrope 16px.
- **Focus State:** `border: 2px solid #8E5530` (Copper Deep) — high contrast, no standard blue outlines.
- **Pakistan Phone Input:**
  - Prefix container: fixed `+92` country code pill in `#FFFFFF` with `#E4D8CA` border.
  - Number input: placeholder `331 7000000` (10-digit format).
  - Validation message: *"Enter a 10-digit mobile number."*
- **Checkbox:** 20×20px, `accent-color: #14110F`, paired with 14px Manrope label: *"Send me a WhatsApp message on launch day. One message, nothing else."*

### 3. Filter Chips
- **Geometry:** Height 44px, padding `0 20px`, capsule border-radius `999px`.
- **Default:** Background `#FFFFFF`, border `1px solid #E4D8CA`, text `#14110F`, font Manrope 14px weight 500.
- **Active / Pressed (`aria-pressed="true"`):** Background `#F3E2D5` (Copper wash), border `1px solid #CF8F63`.

### 4. Badges & Compliance Rules
- **Typography:** 11px uppercase, font-weight 700, letter-spacing `0.14em`, padding `6px 10px`, border-radius `2px`.
- **Badges Catalog:**
  - `New`: Background `#14110F`, Text `#FFFFFF`.
  - `First Circle`: Background `#F8E1D4`, Text `#14110F`, paired with inline Copper Deep sparkle icon.
  - `Launch offer`: Background `#C2412D` (Ember), Text `#FFFFFF`.
  - Specification tags (`200 ml`, `Silicone free`): Background `#FFFFFF`, border `1px solid #E4D8CA`, text `#3A322C`.
- **Trust Integrity Rule:** **No fake social proof**. Under no circumstances should "Bestseller", star ratings, or fabricated review counts be displayed until verified sales and customer reviews are recorded.

### 5. Header, Toast & Commerce Card Patterns
- **Announcement Bar:** Background Linen (`#EDE3D6`), Ink text, 12px uppercase, letter-spacing `0.12em`: `"Launching 1 December 2026 · Lahore, Pakistan"`.
- **Cart Notification Toast:**
  - The **single permitted dark Ink surface** on the website (`background: #14110F`, text `#FFFFFF`, border-radius `6px`, shadow `e3`).
  - Contains checkmark icon in `#CF8F63`, text `"Added to your bag"`, and `"View bag"` link in `#E7A98A`.
  - Anchored at viewport bottom; auto-dismisses after exactly **4 seconds**.
- **Product Card (`4:5` ratio):**
  - Outer shell: Paper ground (`#FFFFFF`), 1px Sand border (`#E4D8CA`), 6px radius.
  - Image backdrop: Soft warm grey (`#EEEAE5`), 320px image container, top-left badge.
  - Meta stack: Category in Copper Deep (`#8E5530`, 11px uppercase), Title in Ink (`16px`, weight 600), key botanical ingredients (`13px`, Taupe), price in PKR tabular nums (`18px`, weight 700), and 44×44px square add-to-bag action.
- **Trust Strip Module (Post-Purchase Assurance):**
  - 3-column responsive card row in `#FFFFFF` with `1px solid #E4D8CA`:
    1. *Delivery across Pakistan* (`[X to Y working days]`)
    2. *Cash on delivery* (`[confirm before launch]`)
    3. *Made in Pakistan* (`For our hair, water and weather`)

---

## Module 06: Imagery, Iconography & Brand Voice
📁 **Directory:** [`06 Imagery, icons, voice-html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/06%20Imagery, icons, voice-html)  
📄 **Mockup Reference:** [`Imagery.dc.html`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/06%20Imagery, icons, voice-html/Imagery.dc.html)  
🖼️ **Assets:** [`assets/1590e816abe17cfd8e9d1d883693f433.jpg`](file:///home/maimoon-amin/Antigravity%20code/websites/Design-TOKEN/06%20Imagery, icons, voice-html/assets/1590e816abe17cfd8e9d1d883693f433.jpg)

### 1. Photography Art Direction

#### Three Permitted Subjects
1. **Product Photography (4:5 Crop):** Soft natural daylight on a warm grey sweep. Bottle pump collar catches a single clean gold highlight.
2. **People & Lifestyle (2:3 Capsule or 3:2 Editorial):** Real adult Pakistani women, authentic laughter, natural skin texture with unretouched pores. One hero subject per page masked inside the signature capsule frame.
3. **Place & Landscape (16:9 or 3:2 Wide):** Karakoram / Rakaposhi landscapes captured at sunrise with snow and warm alpenglow. Used solely for origin narrative sections; **never positioned behind product copy**.

#### Photography Do's and Don'ts
| Do | Don't |
|---|---|
| Bright, warm color grading with lifted, soft shadows | Before-and-after split screens or regrowth comparisons |
| Oil texture macros: golden drop on fingertip, light refracting through pump bottle | Clinical scalp close-ups, bald patches, or shed hair clumps |
| Hands captured mid-ritual: parting hair, gentle massaging, wide-tooth combing | Dark, moody grading or stark black studio backdrops |
| Diverse Pakistani hair representation: curls, waves, straight, thick, fine | Text baked directly into photography; synthetic AI hair textures |

#### Standard Image Aspect Ratios
- `4:5`: E-commerce product listing and detail photography.
- `9:16`: Vertical video reels and social customer stories.
- `3:2`: Editorial storytelling and ingredients background.
- `2:3`: Signature capsule portrait masks.
- `16:9`: Full-width desktop landscape banners.

### 2. Iconography Specification (12 Core Brand SVGs)
- **Geometry:** 24×24px canvas, 1.5px stroke width (1.6px in buttons, 1.8px in small controls), round line-caps (`stroke-linecap="round"`), round line-joins (`stroke-linejoin="round"`).
- **Coloring:** Ink (`#14110F`) by default; Copper Deep (`#8E5530`) for key feature icons.
- **The Sparkle Rule:** The sparkle is the **only filled icon**; all other icons are linear stroke drawings.
- **Accessibility:** Every icon used without adjacent label text must include an explicit `role="img"` and `aria-label`.

```html
<!-- 1. Bag (Shopping Cart) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Bag">
  <path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>
</svg>

<!-- 2. Search -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" role="img" aria-label="Search">
  <circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>
</svg>

<!-- 3. Account -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" role="img" aria-label="Account">
  <circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>
</svg>

<!-- 4. Wishlist (Heart) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Wishlist">
  <path d="M12 21s-7-4.35-9-9a5.5 5.5 0 0 1 9.5-4 5.5 5.5 0 0 1 9.5 4c-2 4.65-9 9-9 9z"/>
</svg>

<!-- 5. Oil Drop -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Oil drop">
  <path d="M12 3C8 8 6 12 6 15a6 6 0 0 0 12 0c0-3-2-7-6-12z"/>
</svg>

<!-- 6. Botanical (Leaf) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Botanical">
  <path d="M20 4c-8 0-14 6-14 14 8 0 14-6 14-14z"/><path d="M6 18c3-3 7-5 11-7"/>
</svg>

<!-- 7. Delivery Van -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Delivery">
  <path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>
</svg>

<!-- 8. Cash On Delivery -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Cash on delivery">
  <rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="2.5"/>
</svg>

<!-- 9. Returns (Circular Arrows) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Returns">
  <path d="M4 12a8 8 0 0 1 14.9-4M20 12a8 8 0 0 1-14.9 4"/><path d="M18 4v4h4M6 20v-4H2"/>
</svg>

<!-- 10. WhatsApp Chat -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="WhatsApp chat">
  <path d="M12 21a9 9 0 0 1-4.5-1.2L3 21l1.3-4.3A9 9 0 1 1 12 21z"/><path d="M9 10a4 4 0 0 0 5 5l1.5-1.5"/>
</svg>

<!-- 11. Mountain (Rakaposhi Peak) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14110F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Mountain">
  <path d="M3 20h18"/><path d="M5 20l5-9 3 4 3-6 3 11"/>
</svg>

<!-- 12. Sparkle (The Only Filled Icon) -->
<svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Sparkle, new">
  <path d="M12 2C12 8 16 12 22 12C16 12 12 16 12 22C12 16 8 12 2 12C8 12 12 8 12 2Z" fill="#8E5530"/>
</svg>
```

### 3. Voice on Screen & Microcopy Standards
Raka speaks with **clarity, warmth, and specificity**. We communicate cosmetic benefits honestly and avoid hyperbolic medical claims.

| User Context | What We Say (Raka Voice) | What We Avoid (Forbidden) |
|---|---|---|
| **Efficacy Statement** | *"For stronger, healthier-looking hair."* | ❌ *"Guaranteed regrowth in 30 days."* |
| **Normalizing Shedding** | *"Some shedding is normal. Here is what isn't."* | ❌ *"Say goodbye to hair fall forever!"* |
| **Empty Shopping Cart** | *"Your bag is empty. The ritual starts here."* | ❌ *"Oops! Nothing to see here."* |
| **Phone Number Validation**| *"That number looks short. Mobiles have 10 digits after +92."* | ❌ *"Invalid input."* |
| **Form Submission Prompt** | *"Send me a WhatsApp message on launch day. One message, nothing else."* | ❌ *"Subscribe to our VIP marketing list."* |

---

## 9. Web Construction Guide: Production CSS & Tailwind Tokens

To implement the Raka website, copy and integrate these production-ready tokens into your stylesheet or frontend configuration.

### 1. Production `tokens.css`
```css
/* ==========================================================================
   RAKA BRAND DESIGN SYSTEM · V1.2
   Aliged to raka.pk · Light Theme Only
   ========================================================================== */

:root {
  /* Surface & Base Colors */
  --raka-snow: #F6F0E8;
  --raka-paper: #FFFFFF;
  --raka-ink: #14110F;
  --raka-copper: #CF8F63;
  --raka-alpenglow: #E7A98A;

  /* Supporting Palette */
  --raka-linen: #EDE3D6;
  --raka-sand: #E4D8CA;
  --raka-alpenglow-tint: #F8E1D4;
  --raka-copper-wash: #F3E2D5;
  --raka-copper-deep: #8E5530;
  --raka-taupe: #6E6157;
  --raka-bark: #3A322C;
  --raka-ember: #C2412D;

  /* Status Colors */
  --raka-success-text: #2F6B4F;
  --raka-success-bg: #E6F0E9;
  --raka-warning-text: #7A4F0C;
  --raka-warning-bg: #F7EBD6;
  --raka-error-text: #B3261E;
  --raka-error-bg: #F8E3E0;

  /* Typography Font Families */
  --font-display: 'Libre Caslon Condensed', Georgia, serif;
  --font-interface: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-urdu: 'Noto Nastaliq Urdu', serif;

  /* Spacing Scale (4px Base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* Corner Radii */
  --radius-none: 0px;
  --radius-crisp: 2px;
  --radius-card: 6px;
  --radius-capsule: 9999px;

  /* Elevation Shadows (Ink Tinted) */
  --shadow-e0: none;
  --shadow-e1: 0 1px 2px rgba(20, 17, 15, 0.06), 0 2px 8px rgba(20, 17, 15, 0.05);
  --shadow-e2: 0 12px 32px rgba(20, 17, 15, 0.10);
  --shadow-e3: 0 24px 64px rgba(20, 17, 15, 0.16);

  /* Motion & Easing */
  --ease-silk: cubic-bezier(0.2, 0.7, 0.2, 1.0);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 450ms;
  --duration-story: 700ms;
}

/* Global Reset & Base Application */
body {
  margin: 0;
  background-color: var(--raka-snow);
  color: var(--raka-ink);
  font-family: var(--font-interface);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--raka-copper-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--duration-fast) var(--ease-silk);
}

a:hover {
  color: var(--raka-ink);
}

/* The Signature Italic Turn */
.raka-italic-turn {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--raka-copper-deep);
}

/* Accessible Focus States */
button:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid var(--raka-copper-deep);
  outline-offset: 3px;
}
```

### 2. Tailwind CSS Configuration Preset (`tailwind.config.js`)
```javascript
module.exports = {
  theme: {
    screens: {
      tablet: '600px',
      laptop: '1024px',
      desktop: '1280px',
    },
    extend: {
      colors: {
        raka: {
          snow: '#F6F0E8',
          paper: '#FFFFFF',
          ink: '#14110F',
          copper: '#CF8F63',
          alpenglow: '#E7A98A',
          linen: '#EDE3D6',
          sand: '#E4D8CA',
          'alpenglow-tint': '#F8E1D4',
          'copper-wash': '#F3E2D5',
          'copper-deep': '#8E5530',
          taupe: '#6E6157',
          bark: '#3A322C',
          ember: '#C2412D',
          success: { text: '#2F6B4F', bg: '#E6F0E9' },
          warning: { text: '#7A4F0C', bg: '#F7EBD6' },
          error: { text: '#B3261E', bg: '#F8E3E0' },
        },
      },
      fontFamily: {
        display: ['"Libre Caslon Condensed"', 'Georgia', 'serif'],
        interface: ['Manrope', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '24px',
        'space-6': '32px',
        'space-7': '48px',
        'space-8': '64px',
        'space-9': '96px',
        'space-10': '128px',
      },
      borderRadius: {
        crisp: '2px',
        card: '6px',
        capsule: '9999px',
      },
      boxShadow: {
        e1: '0 1px 2px rgba(20,17,15,0.06), 0 2px 8px rgba(20,17,15,0.05)',
        e2: '0 12px 32px rgba(20,17,15,0.10)',
        e3: '0 24px 64px rgba(20,17,15,0.16)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.2, 0.7, 0.2, 1.0)',
      },
    },
  },
};
```

---

## 10. Engineering Checklist & Quality Gates

Before pushing code or publishing storefront features, test against this quality gate:

- [ ] **Contrast Verification:** Ensure all text in copper tones uses **Copper Deep (`#8E5530`)**. Never use `#CF8F63` or `#E7A98A` as text colors.
- [ ] **No Dark Sections:** Verify that no full-width containers or sections have dark or black background fills.
- [ ] **Touch Target Safety:** Ensure all interactive buttons and chip components have a minimum touch bounding box of **44×44px**.
- [ ] **Single Filled Button:** Ensure that each viewport/screen contains **at most one** filled action button.
- [ ] **Responsive Grid Check:** Confirm product displays are 2-across on mobile, 3-across on tablet, and 4-across on desktop.
- [ ] **Pakistani Regional Formats:** Confirm mobile inputs include `+92` formatting, prices are formatted in PKR (`Rs [PRICE]`), and COD trust information is prominent.
- [ ] **Accessible SVGs:** Ensure all 12 icons have either `aria-hidden="true"` (when labeled) or `role="img" aria-label="..."` (when standalone).
- [ ] **Honest Claims:** Confirm there are no fake review counts, star ratings, or unverified medical hair growth claims.
- [ ] **Reduced Motion Support:** Verify that entrance animations respect `@media (prefers-reduced-motion: reduce)` by switching to pure fades.
