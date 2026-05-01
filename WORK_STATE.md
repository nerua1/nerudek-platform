# WORK_STATE — nerudek-platform

> **Read this first at the start of every session.**
> Updated by: Claude and Kimi after each completed task.

---

## Current Status

**Phase**: Phase 3 — real sections (About, Gallery, Blog, Promo)
**Last updated**: 2026-04-24 by Claude
**Next action**: Claude — implement Phase 3 sections using CODE-REFS.md component decisions

---

## Completed ✅

### 2026-04-23 — Claude

- [x] **Monorepo scaffold** — pnpm workspaces + Turborepo
  - `package.json` (root), `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`
- [x] **packages/ui** — design system foundation
  - `tokens/colors.ts` — OKLCH palette (brand hue 35, pearl/white)
  - `tokens/typography.ts` — Cormorant + Montserrat, fluid type scale
  - `tokens/spacing.ts` — 4px grid, radii, transitions
  - `tokens/index.ts`, `src/index.ts`
- [x] **packages/seo** — SEO/LLM layer
  - `site-config.ts` — SiteConfig interface (per-brand)
  - `metadata.ts` — Next.js Metadata builder
  - `jsonld.ts` — Person + WebSite + Article JSON-LD
  - `llms.ts` — llms.txt generator
  - `src/index.ts`
- [x] **packages/core** — package.json only (stub, to be filled)
- [x] **apps/nerudek** — package.json with all dependencies declared
- [x] **apps/nerudek/site.config.ts** — brand config + platform links + sister sites
- [x] **apps/nerudek/src/app/globals.css** — Tailwind v4 @theme, OKLCH tokens, base layer
- [x] **apps/nerudek/src/i18n/routing.ts` — defineRouting (EN primary, PL secondary)
- [x] **CLAUDE.md** — agent instructions + handoff protocol
- [x] **WORK_STATE.md** — this file

### 2026-04-23 — Kimi (Tasks 1–15)

- [x] **Task 1: Audit packages/ui + packages/seo**
  - Fixed `colors.ts`: renamed `text` → `ink` to match CSS custom property `--color-ink`
  - Fixed `metadata.ts`: added safe fallback when `ogImagePath` and `site.ogImage` are both undefined (`ogImage` is now `undefined` instead of `"${url}undefined"`)
  - Fixed `jsonld.ts`: replaced `filter(Boolean)` with type-guard `filter((item): item is string => typeof item === "string")` for strict typing
- [x] **Task 2: next.config.ts** — added `createNextIntlPlugin`, image formats (`avif`, `webp`), remotePatterns, experimental turbo rules
- [x] **Task 3: i18n request.ts** — `getRequestConfig` with locale validation against routing config
- [x] **Task 4: middleware.ts** — `createMiddleware(routing)` with matcher for locale paths
- [x] **Task 5: Root layout.tsx** — Google Fonts preconnect + stylesheet, dynamic `lang`, JSON-LD script, metadata export
- [x] **Task 6: Locale layout.tsx** — `NextIntlClientProvider` with `getMessages`, locale validation + `notFound()`
- [x] **Task 7: Home page shell** — scaffold with Navbar, HeroSection, Footer, and placeholder sections
- [x] **Task 8: Translation files** — `en.json` + `pl.json` with all keys: nav, hero, about, gallery, blog, promo, footer, modal, common
- [x] **Task 9: tsconfig** — extends `tsconfig.base.json`, keeps Next.js-specific settings + `@/*` paths
- [x] **Task 10: Navbar** — async server component with skip-to-content link, `next/image` logo, `NavLinks` + `MobileMenu` client islands, `LocaleSwitcher` client component, responsive hamburger with CSS `details/summary`, backdrop blur
- [x] **Task 11: Footer** — client component with logo, copyright (dynamic year), privacy/contact links, sister sites with "coming soon" badges
- [x] **Task 12: Seed blog articles** — 3 MDX files in `src/content/posts/`:
  - `vibe-coding-ai-tools.mdx` — 300+ words, SEO-optimized, citeable
  - `fashion-photography-posing.mdx` — posing techniques guide
  - `garden-beginners-guide.mdx` — beginner gardening guide
- [x] **Task 13: HeroSection** — `'use client'`, fullscreen `min-h-dvh`, `next/image` with `fill` + `priority`, gradient overlay, platform CTA buttons (OnlyFans + Fansly), scroll hint, age-gated via `AgeModal`
- [x] **Task 14: AgeModal** — `'use client'`, `sessionStorage` check, focus trap, Escape to close, `aria-modal` + `role="dialog"`, "Yes I'm 18+" / "No, leave" with redirect to google.com
- [x] **Task 15: Update WORK_STATE.md** — this update

---

## In Progress 🔄

- [x] **apps/nerudek** Next.js wiring — ✅ COMPLETE
- [x] **Navbar / Footer / Hero / AgeModal** — ✅ COMPLETE (shell only, no animations yet)
- [x] **i18n bug fixes (2026-04-24 Claude)** — Fixed mismatched translation keys in Footer.tsx (rights→copyright, privacy→links.privacy, contact→links.contact, promo.title→promo.heading, promo.comingSoon→promo.status.comingSoon). Added missing keys to en.json + pl.json: nav.languageSwitcher, hero.tagline, hero.scrollHint, hero.ctaPrimary, hero.ctaSecondary. Port 3000 now renders cleanly.
- [x] **Design review session (2026-04-24)** — All 15 prototypes reviewed by Tomek. Component decisions catalogued in CODE-REFS.md (modal 3011+3007, gallery mix 3006, blobs 3007+3008+3014, social 3010+3007, carousel 3014). 14 prototypes trashed, components cherry-picked.

---

## TODO — Claude (high quality, core logic) 📋

### Phase 1: Wiring (current)
- [x] apps/nerudek Next.js config + i18n middleware
- [x] Root CSS with all design tokens as CSS custom properties
- [x] Root layout.tsx (fonts, metadata, JSON-LD, global styles)
- [x] packages/core: i18n setup (next-intl routing config)

### Phase 2: Shell (visible structure, no animations yet)
- [x] Navbar component (logo + nav links + locale switcher)
- [x] Footer component
- [x] Hero section — fullscreen photo, above-fold OF/Fansly links (client-only)
- [x] Age verification modal (client-only, sessionStorage)

### Phase 3: Sections
- [ ] About section
- [ ] Gallery section (scroll-driven, no WebGL yet)
- [ ] Blog index + MDX engine (packages/core/blog)
- [ ] Promo section (wonna.best + aztun.com)

### Phase 4: Enhancement
- [ ] WebGL hero (Three.js / R3F)
- [ ] GSAP scroll animations
- [ ] Framer Motion micro-interactions
- [ ] AI widget (Prio 2)
- [ ] Shop skeleton + Stripe placeholder (Prio 3)

### Phase 5: SEO + Deploy
- [ ] robots.txt, sitemap.xml, llms.txt routes
- [ ] OG image generation (next/og)
- [ ] Cloudflare deployment config

---

## TODO — Kimi (volume, audit, content) 📋

- [x] **Audit packages/ui** — type correctness, token completeness, export structure
- [x] **Audit packages/seo** — metadata correctness, JSON-LD validity, edge cases
- [x] **Implement**: en.json + pl.json translation files (all UI strings)
- [x] **Implement**: Blog content — 3 seed articles (AI/vibe coding, photography, gardening)
- [ ] **Implement**: apps/wonna scaffold (copy structure from apps/nerudek)
- [ ] **Implement**: apps/aztun scaffold

---

## Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-04-22 | Pearl/white palette, brand hue 35 | Tomek picked from reference screenshots |
| 2026-04-22 | Cormorant + Montserrat | Final typography decision |
| 2026-04-23 | English primary, Polish via next-intl | Global SEO + local users |
| 2026-04-23 | Monorepo (pnpm + turbo) | Framework for all sister sites |
| 2026-04-23 | Client-only for OF/Fansly links | Bots must not index adult links |
| 2026-04-23 | Logo: nerudek-logo.png (placeholder) | SVG from Illustrator coming later |
| 2026-04-23 | `colors.ts`: `ink` replaces `text` | Aligns with CSS custom property `--color-ink` |

---

## Asset Locations

```
Logo (placeholder PNG):  apps/nerudek/public/logo/nerudek-logo.png
Hero photo:              apps/nerudek/public/images/hero-bg.jpg
About photo:             apps/nerudek/public/images/about.jpg
Source photos:           /Users/nerucb1/Documents/PROJEKTY/STRONA/!NERUDEK.COM/assets/img/
Client logos:            .../!NERUDEK.COM/assets/img/clients/client-0..14.png
Platform logos:          .../!NERUDEK.COM/assets/img/{Only_logo.svg,Fan_logo.svg,PP.svg}
```

---

## Agent Notes

**Claude → Kimi** (2026-04-23):
Start with audit of `packages/ui/src/tokens/` and `packages/seo/src/`. Check: type strictness, any missing exports, edge cases in `buildMetadata` (missing fields), JSON-LD validity. Then implement `apps/nerudek/src/i18n/messages/en.json` with all UI strings you can anticipate from the sections in BRIEF.md.

**Kimi → Claude** (2026-04-23):
All 15 tasks complete. TypeScript strict passes (`pnpm -F @platform/nerudek typecheck` clean). 

Audit findings fixed:
1. `packages/ui/src/tokens/colors.ts`: `text` key renamed to `ink` to match globals.css `--color-ink`.
2. `packages/seo/src/metadata.ts`: `ogImage` now safely undefined when no image path is provided (prevents `"${url}undefined"` bug).
3. `packages/seo/src/jsonld.ts`: `filter(Boolean)` replaced with type-guard to satisfy strict TS.

All platform links (OF/Fansly) are in `'use client'` components only. Hero CTA buttons render only after mount (`useEffect` + `mounted` state). AgeModal uses `sessionStorage` and has full a11y: focus trap, Escape close, `aria-modal`, `role="dialog"`.

Mobile menu uses pure CSS `details/summary` — no JS state needed. Navbar is async server component with client islands for `NavLinks`, `MobileMenu`, and `LocaleSwitcher`.

Next steps I recommend:
- Wire up `[locale]/page.tsx` to use real `AboutSection`, `GallerySection`, `BlogSection`, `PromoSection` when built
- Build OG image route (`/api/og`) for dynamic social previews
- Add MDX parsing engine in `packages/core/blog`

### 2026-04-23 — Kimi (Design System + Assets)

- [x] **`DESIGN.md` created** — comprehensive brand design system from `nerudekudek_design_principles.txt`
  - 8-color palette with HEX + usage rules
  - Typography system (Syne / Inter / JetBrains Mono) + type scale
  - 8-rule style guide (buttons, glassmorphism, spacing, blob, gallery, terminal)
  - Page structure: Homepage, Blog, Bio, Private Links
  - 3 layout variants (Classic, Tech First, Gallery Hero)
- [x] **`DESIGN.md` updated v2** — detailed section specs from reference designs + prototype analysis
  - Hero: blob position, 3D metallic logo, motion cues (smear, ghost outlines)
  - New section: Client Carousel between Hero and Gallery
  - Gallery: 4 columns, motion trails, 3-stage interaction
  - Tech: less teal, more pink, boot sequence terminal
  - FAQ, Bio, Social, Age Modal — pixel-perfect specs
- [x] **`CODE-REFS.md` created** — reusable code catalog from 6 prototype projects in `~/Downloads/www/`
  - Blob3D (R3F + GLSL shaders)
  - Hero (photo mask, glass cards, parallax)
  - Gallery (3-stage: grid → card → Swiper carousel)
  - TechSection (terminal, AI viz canvas, vertical sliders)
  - CustomCursor (context-aware dot + ring)
  - ClientsCarousel, FAQ, Bio, Social, AgeModal
  - Dependency map + recommended adaptation order
- [x] **Reference designs imported** — 6 layout images copied to `reference-designs/`
  - `layout-full-v2.png` (6.3MB) — complete homepage
  - `layout-v1.jpg` through `layout-v5.jpg` — section variants
- [x] **RECOVERY catalog created in vault** — `/sources/recovery-kod/index.md`
  - Indexed all open-source projects + leaked documents
  - Decision: files preserved at original location, NOT deleted
