<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Instructions & Development Guidelines

## 1. Project Overview & Technology Stack
- **Framework:** Next.js 16.4.x (App Router, Turbopack enabled)
- **UI Runtime:** React 19.3.x
- **Language:** TypeScript 5.x (Strict mode enabled)
- **Styling:** Tailwind CSS v4.x (`@tailwindcss/turbopack`, CSS-first configuration via `@import "tailwindcss"` and `@theme inline` in `globals.css`)
- **Primary Instruction File:** `AGENTS.md` is the single source of truth for AI agents. Do not generate redundant rule files (e.g., `GEMINI.md`, `CLAUDE.md`).
- **Planned Stack (Pending Approval):** Motion, GSAP, Three.js, React Three Fiber, and Drei.

## 2. Existing Directory Structure
```text
raka-website/
├── public/                       # Static public assets (SVGs, icons, images)
├── src/
│   └── app/                      # Next.js App Router root
│       ├── favicon.ico
│       ├── globals.css           # Tailwind CSS v4 entry point & theme definitions
│       ├── layout.tsx            # Root layout, Google Fonts (Geist), metadata
│       └── page.tsx              # Starter homepage component
├── AGENTS.md                     # Agent instructions & Next.js auto-managed rule block
├── eslint.config.mjs             # Flat ESLint 9 configuration
├── next-env.d.ts                 # Next.js TypeScript declarations (auto-managed)
├── next.config.ts                # Next.js configuration with Turbopack CSS loaders
├── package.json                  # Project manifest and scripts
├── package-lock.json
├── README.md                     # Default project documentation
└── tsconfig.json                 # TypeScript compiler configuration (@/* path alias)
```

## 3. Coding Conventions & Standards
- **Server Components by Default:** Keep components as React Server Components (RSC) unless client-side state, event listeners, or browser APIs are strictly required. Add `"use client"` at the top of client component files.
- **Path Aliasing:** Use `@/*` to reference modules under `src/*` (e.g., `@/components/...`, `@/lib/...`). Avoid relative traversal paths like `../../`.
- **TypeScript Discipline:** Maintain strict type safety. Do not use `any`. Provide explicit types/interfaces for component props, async loaders, and utility functions.
- **Tailwind CSS v4 Usage:**
  - Configure design tokens (colors, font variables, radii) directly in `src/app/globals.css` using `@theme` or `@theme inline`.
  - Do NOT create `tailwind.config.ts`, `tailwind.config.js`, or `postcss.config.mjs` (avoid duplicate/conflicting configurations with Tailwind v4).
- **File Hygiene:** Avoid modifying or deleting existing working files unless requested. Keep the Next.js `<!-- BEGIN:nextjs-agent-rules -->` block intact at the top of this file.

## 4. Development Commands
All commands should be executed from within the `raka-website` directory:
- **Start Development Server:** `npm run dev`
- **Run Type Check:** `npx tsc --noEmit`
- **Run ESLint:** `npm run lint`
- **Build Production Bundle:** `npm run build`
- **Run Production Server:** `npm start`

## 5. Architectural Constraints for Future Phases
When approval is granted to introduce animation and 3D libraries:
- **Three.js & React Three Fiber (R3F):**
  - WebGL canvases rely on browser DOM globals (`window`, `HTMLCanvasElement`) and must never be rendered during SSR.
  - Always encapsulate R3F canvases in dynamic client components using `next/dynamic` with `{ ssr: false }`.
  - Always dispose geometries, materials, and textures when unmounting canvas scenes.
- **Motion & GSAP:**
  - Components using Motion must declare `"use client"`.
  - GSAP animations and plugins (such as `ScrollTrigger`) must run inside client contexts. Ensure proper cleanup via `@gsap/react`'s `useGSAP` or explicit `useEffect` cleanup routines to prevent memory leaks during hot reloads.
- **Dependency Management:**
  - Avoid duplicate animation libraries or conflicting utility packages.
  - Verify React 19 peer-dependency compatibility before installing external packages.

## 6. AI-Assisted Development Workflow
1. **Analyze First:** Inspect existing project state and configurations before proposing changes.
2. **Minimal & Incremental Edits:** Make surgical, well-defined modifications. Never overwrite working code unnecessarily.
3. **Continuous Verification:** After code changes, verify that `npm run lint` and `npx tsc --noEmit` pass with zero errors.
4. **Transparent Reporting:** Report every file created, updated, or removed with a clear explanation of changes.
