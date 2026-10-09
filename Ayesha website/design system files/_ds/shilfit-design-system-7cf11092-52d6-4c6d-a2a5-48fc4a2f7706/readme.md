# ShilFit Design System

ShilFit is a direct-to-consumer supplement brand selling **100% pure Himalayan shilajit resin**, sourced from high-altitude rock formations in **Gilgit-Baltistan, Pakistan**, PCSIR lab-tested batch by batch, and fulfilled in the USA. The product line is a single SKU in two label variants — *Shilajit (For Him)* in black-and-gold and *Shilajit (For Her)* in rose — sold at $100 a jar, plus multi-jar bundles.

There is exactly one surface: a long-scroll desktop marketing page. Everything in this system is derived from it.

## Sources

- **`shilfit.fig`** — attached Figma file, mounted read-only. One page (`Page-1`) containing six frames:
  - `Desktop - 1` (node `1:2`, 1920 × 8546) — the entire landing page. This is the design system.
  - `4-1`, `5-1`, `Shilajit for Her-Box 1`, `Shilajit for Her-Box 2` — loose product/resin bitmaps.
  - `screencapture-…index-html…` — a full-page screenshot of an earlier HTML build, pasted in for reference.
- No codebase, brand guidelines, deck or written tone-of-voice document was provided.

**The file defines zero Figma Components, zero Variable collections and zero shared Text Styles.** Everything below was measured off the raw nodes of `Desktop - 1`; the component library is an intentional distillation, documented under *Intentional additions*.

---

## CONTENT FUNDAMENTALS

**Voice: clinical proof, not hype.** ShilFit sells a folk remedy by leading with laboratory evidence. Almost every claim is followed by a certifier, a percentage, or a place name — "PCSIR-Certified", "80% Fulvic Complex", "16,000+ feet", "Lead & Arsenic Free". Nothing is promised in absolutes; the copy hedges with *supports*, *may help*, *aids*, *helps maintain*.

**Person.** Third person for the product ("ShilFit is 100% pure Himalayan shilajit resin"), second person for the reader's body and actions ("Scan the QR code on your packaging", "your cells' energy centers"). Never first person — the brand has no "we".

**Casing.**
- Section titles are Title Case: *What Is ShilFit?*, *The Ancient Ritual*, *Quality You Can Verify*, *Real Results*.
- Eyebrows, filter chips and footer column heads are ALL CAPS: *HIMALAYAN ORIGIN*, *CLINICS & MDS*, *THE SCIENCE*, *KEY WORDS:*.
- Product names run all caps in the card: *RELIEF FROM JOINT PAIN SHILAJIT (FOR HER)*.
- SEO keyword chips are all lowercase: *fulvic acid shilajit*, *heavy metal free shilajit*.
- The brand is written **ShilFit** — capital S, capital F. The CTA in the file is spelled *Order Shilafit Now* (lowercase "a", one word) and the label art reads *ShilFit*; this inconsistency is in the source, and the CTA string is reproduced verbatim in the UI kit.

**Sentence shape.** Headlines are 2-5 words. Body paragraphs are one or two long, information-dense sentences — the file's longest is 47 words. Benefit blurbs are exactly one sentence.

**Punctuation.** A middot separates paired claims: *Government Lab Certified • PCSIR Certificate*, *Original • Certified • Tested • PCSIR*. Testimonials are wrapped in curly double quotes. No exclamation marks anywhere except the footer's *Follow Our Socials!*.

**No emoji.** Not one, anywhere in the file. Do not introduce them.

**Sample copy, verbatim from the file:**
> *Pure Himalayan **SHILAJIT** Verified by Science*
> *Sourced from high-altitude rock formations in Gilgit-Baltistan, Pakistan. Lab-tested batch by batch for maximum purity and fulfilled.*
> *"When recommending shilajit resin, heavy metal testing is paramount. ShilFit's PCSIR verification ensures clinical-grade purity and consistent fulvic acid concentration."* — Dr. Aris Thorne, MD

**Known typos in the source** (kept in the UI kit for fidelity, worth fixing in production): *pure himaliyan resin*, *organic himaliyan mountains*, *Iconic Trace Minerals* (should read "Ionic"), *Certifies* (should read "Certified").

---

## VISUAL FOUNDATIONS

**Palette.** A warm near-black page (`rgb(13,12,10)`) carrying one accent: a soft honey gold, `rgb(255,197,103)`. A second gold, `rgb(238,197,131)`, appears only as the 4px section rule; a tan, `rgb(196,164,132)`, appears only at 12% opacity as the chip wash; a deep maroon lives only inside the logo. Everything else is white at 100/70/40%. There is no blue, no green, no red — no semantic status colour system exists, because the design has no state to signal.

**Type.** Montserrat, six weights, in a wide range: 10 · 12 · 13 · 14 · 15 · 16 · 18 · 20 · 22 · 26 · 28 · 30 · 56 px. Display headings are Montserrat **Black (900)** at 56px with -0.02em tracking and 100% line-height — very tight, very heavy. Body copy is Medium (500) at 15px / 1.45. Small caps-style labels are SemiBold (600) at 12px. Poppins Bold appears exactly once, at 70px/100px. Line-height is only ever `100%` or `1.45`.

**Layout.** A fixed 1920px canvas with 388px gutters, giving a 1144px content column. That column splits into two 562px columns with a 20px gap — the single most repeated measurement in the file. Nothing is fixed-position; the nav scrolls away with the page.

**Backgrounds.** Flat near-black. No gradients as decoration — the only gradient in the system is the bottom-heavy black scrim over the hero photo strip. No repeating patterns, no textures, no noise, no hand-drawn illustration. Imagery does the work.

**Cards and surfaces.** This is a *glass* system, not a shadow system. **There is not a single drop shadow in the file.** A card is: a 5%-white wash (`rgba(217,217,217,0.05)`) or 2% for nested cards, a `blur(5.6px)` backdrop filter, and a **1px inset hairline of gold at 50% opacity**. Solid panels use `rgb(17,16,14)` with the same hairline. Depth is communicated entirely by that gold edge.

**Corner radii.** Four values, no others: **15px** (cards, photo frames), **20px** (large product panels, chips, badges, the cart pill, inputs), **50px** (buttons — fully rounded), **50%** (avatars, glow ellipses).

**Borders.** Always 1px, always inset, always gold — at 50% on cards, 30% on chips, 32% on solid badges. No grey borders, no white borders except the 1px hairline dividers between the hero stats.

**Transparency and blur.** `backdrop-filter: blur(5.6px)` on every glass surface — cards, chips, inputs, the filter tabs. Never blur a photograph; blur only the page behind a surface.

**Imagery.** Warm, high-saturation and high-contrast. Three kinds: (1) packshots on pure white — the amber jar with a gold spoon, the retail box with pine cones and river stones; (2) untreated landscape photography of Gilgit-Baltistan — turquoise glacial lake, ochre rock, deep blue sky; (3) editorial lifestyle portraits of clinicians and athletes, cropped hard and darkened under the hero scrim. Nothing is duotoned, desaturated or grain-filtered.

**Buttons.** 50px tall, fully rounded, always with a trailing arrow glyph. Primary is a solid gold fill with 18px Bold black text. The hero uses an inverted white fill with 18px Medium black text. Both are flat — no border, no shadow, no gradient.

**Hover, press and animation.** The source is a static comp, so this system standardises the minimum that matches its character: hover brightens gold fills to `brightness(1.08)` and flips white links to gold; press is `scale(0.985)` with no colour change; transitions are 120ms for transform and 200ms for colour on `cubic-bezier(0.4,0,0.2,1)`. **No bounces, no parallax, no entrance animations, no shadow-lift on hover** — a system with no shadows cannot lift.

**Protection.** Text over photography is protected by a full-width vertical scrim (transparent → 85% → solid black at the bottom of the hero), never by a capsule or a blurred plate.

---

## ICONOGRAPHY

The file contains **four glyphs, total** — there is no icon font, no icon library, no sprite sheet:

| Glyph | Format | Where it's used |
| --- | --- | --- |
| `icon-arrow-right` | PNG, black | Trailing glyph on every CTA button |
| `icon-shield-check` | PNG, gold | Certification rows ("PCSIR Laboratory Certified…") |
| `icon-pin` | PNG, black | Location marker for Gilgit-Baltistan |
| `icon-cart` | SVG, black outline | Nav cart pill |

They share a rounded ~2px stroke with round caps and a 24px optical box — closest public match is **Lucide**, but no substitution was made: all four originals were copied into `assets/` and are rendered through the `Icon` component, which recolours them with a CSS mask.

Everything else that reads as an icon in the comp is either a **photograph in a circle** (the benefit spokes), a **star vector** (ratings), or a **numeral** (the stat tiles). Unicode is used for two things only: the middot `•` as a separator and the star `★` in ratings. **Emoji are never used.**

**Missing:** the file provides no social-media icons even though the footer says "Follow Our Socials!" — `Footer` renders short text labels in glass circles instead. If you have the real marks, drop them in `assets/` and pass them through.

---

## Intentional additions

The Figma file defines **zero** formal components, so every component here is a distillation of a repeated pattern in `Desktop - 1` rather than an extraction of a named symbol. Each maps to a real, repeated element:

- `Icon` — a wrapper so the four loose bitmaps can be tinted and sized consistently. No counterpart in the file.
- `CarouselNav` — the ← → pair under the review grid is drawn as loose vectors; componentised so it can carry handlers.
- `AccentBar` — the 4px `#EEC583` rule, drawn four times as a bare rectangle.
- `Card`, `Pill`, `Button`, `SectionLabel`, `KeywordTag`, `StatTile`, `SpecCard`, `InfoRow` — each appears 3-27 times in the file with identical geometry.

Nothing was invented that the source does not show: there is no Toast, Dialog, Tooltip, Tabs, Switch, Radio or Checkbox in this system, because the design has none.

---

## Index

```
styles.css              root entry — @import list only
tokens/                 colors · typography · spacing · radius · effects · motion · base
assets/                 logo (webp, user-supplied), four glyphs, packshots, landscapes, portraits
components/             the component library (below)
guidelines/             16 foundation specimen cards
ui_kits/                shilfit-site · storefront · content-hub · admin
thumbnail.html          project tile
SKILL.md                Agent Skills entry point
```

### Components

**`components/brand/`** — `Logo`, `Icon`
**`components/core/`** — `Button`, `Pill`, `Card`, `SectionLabel`, `KeywordTag`, `StarRating`, `AccentBar`, `StatTile`
**`components/forms/`** — `EmailCapture`
**`components/navigation/`** — `NavBar`, `TabFilter`, `CarouselNav`, `Footer`
**`components/marketing/`** — `SectionHeading`, `HeroBanner`, `ProductCard`, `BenefitCallout`, `TestimonialCard`, `SpecCard`, `InfoRow`, `PhotoFrame`
**`components/commerce/`** — `PriceTag`, `QuantityStepper`, `ProductTile`, `CartLine`, `OrderSummary`, `CouponField`, `PurchaseOptions`, `StatusBadge`, `ReviewItem`
**`components/content/`** — `ArticleCard`, `AuthorByline`, `Breadcrumb`, `Pagination`, `SearchField`, `TableOfContents`, `CertificateCard`
**`components/admin/`** — `SidebarNav`, `MetricCard`, `DataTable`, `FormField`, `Toggle`, `SeoPanel`, `Modal`, `StatusPill`

Each directory carries a `.card.html` specimen; each component carries a `.d.ts` props contract and a `.prompt.md` usage note.

### UI kits

- **`ui_kits/shilfit-site/`** — the 1920 × 8546 landing page from the Figma file, with a working cart drawer and review filter.
- **`ui_kits/storefront/`** — the `/shop` surface: category filter, product grid, detail popup with purchase options and reviews, cart drawer that converts into checkout and confirmation.
- **`ui_kits/content-hub/`** — the `/blog` surface: featured hero, category filter, article grid, and a full post view with sticky TOC, reading progress and credentialed bylines.
- **`ui_kits/admin/`** — the staff dashboard: overview metrics, orders, posts with the SEO toolkit panel, products, users, media.

Each kit has its own `README.md` covering what is interactive, what is faithful, and what was deliberately left undesigned.

---

## Surfaces beyond the Figma file

The Content & Commerce brief adds two public surfaces plus an admin that the Figma file does not cover. Those UI kits — and the `commerce/`, `content/` and `admin/` component groups supporting them — are **new design work in the established visual language**: same palette, radii, glass surfaces, gold hairlines and type scale, no new colours or effects. Two deliberate departures, both noted in the kit READMEs: page gutters drop from 388px to 120px (shop) and 200px (blog), because listing grids and reading measures need different widths; and long-form body copy steps up to 16px / 1.7.

Modules the brief names but gives no layout for — Analytics, Categories, Comments, Subscriptions, Coupons, Settings — render a stated placeholder in the admin rather than an invented design.

## Caveats

- **Fonts are loaded from Google Fonts.** No font binaries ship inside `shilfit.fig`, so `styles.css` imports Montserrat and Poppins from the Google Fonts CDN. These are the correct families — not substitutes — but if you hold licensed local copies, drop them in and swap the import for `@font-face` rules.
- **One source bitmap was too large to extract** (6.5 MB) and is absent from `assets/`; it backed a decorative photo panel in the benefits section, which now uses `resin-raw.png`.
- **Several source photos are visibly stock placeholders** carrying other brands' watermarks (`photo-bone-health.png` shows a "VitaGlow Calcibon" bottle; `photo-meditation.png` carries a hospital logo). They are copied verbatim because they are what the file uses — replace them before anything ships.
- **The logo files are the user-supplied WebP originals** (`logo-lockup.webp`, `logo-mark.webp`), not the lower-resolution PNG flattened out of the Figma frame.
- **Vertical rhythm is normalised.** The source page positions every section absolutely; the UI kit uses a uniform 120px block padding, which shifts some sections by 20-40px against the original artboard.
