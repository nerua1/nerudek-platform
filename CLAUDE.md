# nerudek-platform — Agent Instructions

## Project

Influencer platform monorepo. nerudek.com is the first app; wonna.best and aztun.com come later using the same packages.

**Owner**: Tomek (nerucb1)  
**Primary agent**: Claude (architecture, design system, core)  
**Secondary agent**: Kimi (implementation, content, volume work)  
**Audit agent**: Kimi (audits Claude's code before any design review)

## Working Style

- **Quality over speed.** Never write "good enough" code.
- **Save to files immediately.** Every completed unit of work goes to disk — no half-finished files.
- **WORK_STATE.md is the source of truth.** Always update it after completing a task.
- **Read WORK_STATE.md first** at the start of every session.

## Architecture

```
packages/ui     → @platform/ui    — design tokens, shared components
packages/seo    → @platform/seo   — metadata, JSON-LD, llms.txt
packages/core   → @platform/core  — i18n, blog engine, auth utilities
apps/nerudek    → nerudek.com     — Next.js 15 app
apps/wonna      → wonna.best      — scaffold only
apps/aztun      → aztun.com       — scaffold only
```

## Rules

1. TypeScript strict mode — no `any`, no `as unknown`
2. All colors from `@platform/ui` tokens — never hardcode hex/rgb in components
3. External platform links (OF, Fansly) — client-side only, NEVER in server HTML
4. i18n via next-intl — every user-facing string goes through `t()`
5. Accessibility: semantic HTML, ARIA where needed, keyboard-navigable
6. Performance: `next/image` for all images, `loading="lazy"` by default

## Handoff Protocol

When Claude finishes a chunk:
1. Update `WORK_STATE.md` — mark task complete, write what was done
2. Run `pnpm typecheck` — must pass before handoff
3. Note in WORK_STATE what Kimi should do next (audit, extend, or implement)

When Kimi finishes:
1. Update `WORK_STATE.md` — mark task complete, note any issues found
2. Claude picks up from WORK_STATE on next session

## Key Files

- `WORK_STATE.md` — current progress, tasks, agent assignments
- `BRIEF.md` — design decisions, stack, references
- `DESIGN.md` — brand design system: colors, typography, components, layouts. MANDATORY READ before any UI work.
- `CODE-REFS.md` — reusable code from prototypes (Blob3D, Gallery, Terminal, etc.)
- `apps/nerudek/site.config.ts` — brand config (single source of truth for nerudek.com)
- `packages/ui/src/tokens/` — all design tokens
