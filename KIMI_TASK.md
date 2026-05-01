# KIMI TASK — nerudek-platform
> Written by Claude 2026-04-23. Kimi picks this up and executes fully autonomously.
> Read CLAUDE.md and WORK_STATE.md first, then execute all tasks below.

---

## Context

This is a luxury influencer platform monorepo. nerudek.com is the flagship app.
Owner: Tomek. Claude handles architecture/core, Kimi handles implementation volume + audits.

**Project root**: `/Users/nerucb1/Documents/PROJEKTY/STRONA/nerudek-ultra/`

### Stack
- Next.js 15 App Router + TypeScript strict
- Tailwind CSS v4 (CSS `@theme` blocks — NOT tailwind.config.ts)
- next-intl v4 for i18n (EN primary, PL secondary)
- pnpm workspaces + Turborepo

### Design tokens (all in globals.css @theme and packages/ui/src/tokens/)
```
--color-bg      oklch(0.99 0.005 35)   /* almost white */
--color-surface oklch(0.95 0.010 35)   /* cream */
--color-paper   oklch(0.92 0.015 35)   /* pearl */
--color-ink     oklch(0.18 0.015 35)   /* warm black */
--color-muted   oklch(0.55 0.020 35)   /* warm gray */
--color-gold    oklch(0.68 0.080 35)   /* warm gold accent */
--color-line    oklch(0.82 0.015 35)   /* divider */
--color-navy    oklch(0.22 0.060 260)  /* from logo */
--color-rose    oklch(0.75 0.080 15)   /* from logo */
font-serif: Cormorant | font-sans: Montserrat
```

### Sections to build (from BRIEF.md)
1. **Hero** — fullscreen photo, links to OnlyFans + Fansly ABOVE THE FOLD (client-side only, bots never see)
2. **About** — short bio, elegant
3. **Gallery** — scroll-driven portfolio
4. **Blog** — SEO-optimized articles
5. **Promo** — wonna.best + aztun.com sister sites
6. **Footer**

### Critical rules
- Platform links (OnlyFans, Fansly) — **client-side ONLY**, mark with `'use client'`, NEVER in server HTML
- All user-facing strings through `t()` from next-intl
- TypeScript strict — no `any`, no `as unknown`
- Use CSS custom properties from `--color-*` — never hardcode hex
- `next/image` for all images, declare width+height always
- Accessibility: semantic HTML, ARIA labels, keyboard navigation

---

## FILES ALREADY DONE BY CLAUDE (do not rewrite)

```
packages/ui/src/tokens/colors.ts      ← OKLCH tokens
packages/ui/src/tokens/typography.ts  ← font scale, weights
packages/ui/src/tokens/spacing.ts     ← spacing, radii, transitions
packages/seo/src/site-config.ts       ← SiteConfig interface
packages/seo/src/metadata.ts          ← buildMetadata()
packages/seo/src/jsonld.ts            ← JSON-LD builders
packages/seo/src/llms.ts              ← llms.txt generator
apps/nerudek/site.config.ts           ← brand config + platform links
apps/nerudek/src/app/globals.css      ← Tailwind v4 @theme done
apps/nerudek/src/i18n/routing.ts      ← defineRouting done
```

---

## KIMI TASKS — execute all in order

### TASK 1: Audit packages/ui and packages/seo
Read the files, fix any issues:
- Type safety issues
- Missing exports
- Edge cases in `buildMetadata` (what if ogImage missing, what if description too long)
- JSON-LD validity (test mentally against schema.org)
- Are all token values correct for a pearl/white luxury aesthetic?

### TASK 2: next.config.ts (apps/nerudek)

Read current: `apps/nerudek/next.config.ts`

Rewrite to add next-intl plugin. Use `createNextIntlPlugin` from `next-intl/plugin`:

```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl({ /* next config */ });
```

Also add to next config:
- `images.formats: ['image/avif', 'image/webp']`
- `images.remotePatterns` for any CDN you anticipate
- Proper `experimental` settings for Next.js 15

### TASK 3: i18n request config (apps/nerudek/src/i18n/request.ts)

Create the server-side request config for next-intl v4:

```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

### TASK 4: middleware.ts (apps/nerudek/src)

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### TASK 5: Root layout (apps/nerudek/src/app/layout.tsx)

Minimal root layout:
- Loads Google Fonts (Cormorant + Montserrat) via `<link>` preconnect + stylesheet
- Sets `<html lang>` dynamically (passed as prop)
- Imports globals.css
- NO IntlProvider here (that goes in [locale]/layout)
- JSON-LD script tag with buildRootJsonLd from @platform/seo
- OpenGraph metadata export using buildMetadata from @platform/seo

```tsx
import type { Metadata } from 'next';
import { buildMetadata, buildRootJsonLd } from '@platform/seo';
import { siteConfig } from '../../site.config';
import './globals.css';

export const metadata: Metadata = buildMetadata({ site: siteConfig });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Google Fonts — preconnect first for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildRootJsonLd(siteConfig) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### TASK 6: Locale layout (apps/nerudek/src/app/[locale]/layout.tsx)

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'pl')) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
```

### TASK 7: Home page shell (apps/nerudek/src/app/[locale]/page.tsx)

Scaffold with section imports (components not built yet → use placeholder divs with TODO comments):

```tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  return (
    <main>
      {/* TODO: <HeroSection /> */}
      <section id="hero" style={{ minHeight: '100dvh' }} aria-label="Hero" />
      {/* TODO: <AboutSection /> */}
      <section id="about" aria-label="About" />
      {/* TODO: <GallerySection /> */}
      <section id="gallery" aria-label="Gallery" />
      {/* TODO: <BlogSection /> */}
      <section id="blog" aria-label="Blog" />
      {/* TODO: <PromoSection /> */}
      <section id="promo" aria-label="Sister sites" />
    </main>
  );
}
```

### TASK 8: Translation files

Create `apps/nerudek/src/i18n/messages/en.json` with ALL UI strings for:
- nav: Home, About, Gallery, Blog, Contact, language switcher label
- hero: tagline, cta_primary (OnlyFans), cta_secondary (Fansly), scroll_hint
- about: title, subtitle, body text (placeholder "Fashion model, content creator, AI enthusiast...")
- gallery: title, subtitle, load_more, view_on_platforms
- blog: title, subtitle, read_more, categories (ai, photography, garden, lifestyle)
- promo: title, sister_sites label, coming_soon
- footer: rights, privacy, contact
- modal: age_title, age_body, age_confirm, age_deny, age_session_note
- common: loading, error, back, close

Create `apps/nerudek/src/i18n/messages/pl.json` — Polish translations of every key.

### TASK 9: tsconfig for apps/nerudek

Read `apps/nerudek/tsconfig.json` and update to extend `../../tsconfig.base.json`,
include proper path aliases for `@/*` → `./src/*`.

### TASK 10: Navbar component (apps/nerudek/src/components/Navbar.tsx)

Full server component with client island for locale switcher:
- Logo: `next/image` loading `nerudek-logo.png` from public/logo/
- Nav links: Home, About, Gallery, Blog — use next-intl `Link`
- Locale switcher: EN | PL toggle — client component
- Mobile: hamburger menu (details/summary or client state)
- Fixed top, backdrop-luxury blur on scroll
- Accessible: `<nav>` with aria-label, skip-to-content link

### TASK 11: Footer component (apps/nerudek/src/components/Footer.tsx)

- Minimal, elegant
- Logo small
- Copyright © {year} Nerudek
- Links: Privacy, Contact
- Sister sites: wonna.best, aztun.com (with "coming soon" badge)
- Social links section (placeholder, empty for now)

### TASK 12: Seed blog articles

Create 3 MDX files in `apps/nerudek/src/content/posts/`:
- `vibe-coding-ai-tools.mdx` — AI tools for creators (EN + frontmatter with date, title, description, tags)
- `fashion-photography-posing.mdx` — posing techniques (EN)
- `garden-beginners-guide.mdx` — beginner's garden (EN)

Each must have frontmatter: `title`, `description`, `publishedAt` (ISO date), `tags: string[]`, `locale: "en"`.
Content should be 300-500 words, SEO-optimized, citeable by AI (include definitions, short lists, facts).

### TASK 13: Hero section (apps/nerudek/src/components/sections/HeroSection.tsx)

`'use client'` component:
- Fullscreen (`min-h-dvh`) with cover photo background
- Photo: use `next/image` with `fill` + `object-cover`, priority={true}
- Source: pick best from `/Users/nerucb1/Documents/PROJEKTY/STRONA/nerudek-v5/assets/img/` (about.jpg or similar)
- Copy photo to `apps/nerudek/public/images/`
- Overlay: subtle gradient (transparent top → pearl 60% bottom)
- ABOVE THE FOLD — two CTA buttons: OnlyFans + Fansly
  - These are client-only, wrapped in dynamic import with `ssr: false`
  - Or use `useEffect` + state to render after mount
  - Both link to `platformLinks.onlyfans` and `platformLinks.fansly` from site.config.ts
  - Each button triggers age verification modal before redirect
- Logo and nav are ABOVE hero in the DOM (navbar is fixed)
- Scroll indicator at bottom (animated chevron or text "scroll")

### TASK 14: Age verification modal (apps/nerudek/src/components/AgeModal.tsx)

`'use client'` component:
- Checks `sessionStorage.getItem('age-verified')`
- If not set, shows modal on first platform link click
- Design: cream background, Cormorant heading "18+", body text, two buttons
- "Yes, I'm 18+" → sets sessionStorage + proceeds to redirect
- "No, leave" → redirects to google.com
- Accessible: focus trap, Escape closes, aria-modal, role="dialog"
- Links never appear in server HTML — all handled client-side

### TASK 15: Update WORK_STATE.md

Mark everything you completed. Leave notes for Claude in Agent Notes section.
Note any issues found during audit (Task 1).

---

## Photo assets location

```
/Users/nerucb1/Documents/PROJEKTY/STRONA/nerudek-v5/assets/img/
  about.jpg          ← main about/hero photo
  about2.jpg
  hero-bg.jpg
  WEB0.jpg
  WEB1.png
  IMG_7634.jpeg
  IMG_7777.jpeg
  clients/           ← client-0..14.png
```

Copy needed photos to `apps/nerudek/public/images/` using Bash cp.

## Platform links (from site.config.ts)

```ts
onlyfans: "https://tinyurl.com/nerudek7"
fansly:   "https://tinyurl.com/nerudek4"
```

---

## After all tasks: run typecheck

```bash
cd /Users/nerucb1/Documents/PROJEKTY/STRONA/nerudek-ultra
pnpm -F @platform/nerudek typecheck
```

Fix any TypeScript errors before marking complete.

---

## Quality bar

- No `any` types
- All components have proper TypeScript props interfaces
- All images have `alt`, `width`/`height` or `fill` with parent position:relative
- No hardcoded hex colors — use CSS custom properties
- All interactive elements have aria labels
- Mobile-first CSS
