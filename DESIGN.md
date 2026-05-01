# Nerudek — Design System & Brand Guidelines

> Source: nerudekudek_design_principles.txt — brand design conversation with Zawa.
> Claude MUST follow this document when implementing UI.

---

## 1. Brand Identity

Nerudek — Polish fashion influencer evolving toward **Fashion + Photography + Technology + Vibe Coding + Agentic AI**.

Brand combines: femininity, elegance, modernity, unexpectedness.

**Goal**: Elegant, ultra-modern site. Building tension between fashion, body, and code.

**Inspirations**: Terminal in pink; high-end fashion galleries; Minority Report interfaces; glassmorphism + light grain.

---

## 2. Logo

- Preserve existing logo — only ultra-subtle refinement.
- Do NOT change shape or core symbolism.
- Logotype: geometric, elegant (modern classic inspired by Didot, with digital details).
- Allowed: subtle cut or "pixel" detail as nod to AI/vibe coding.

---

## 3. Color System

All colors MUST be design tokens in `packages/ui/src/tokens/` — never hardcode hex.

| # | Name | HEX | Usage |
|---|------|-----|-------|
| 1 | Powder Blush | `#FFF0F0` | Main page background |
| 2 | Warm Ivory | `#F9F6F0` | Section/card backgrounds |
| 3 | Rose Dust | `#E8B4B4` | Blob, glassmorphism |
| 4 | Fuchsia Ember | `#C75B7A` | Primary accent / hover / CTA |
| 5 | Deep Mauve | `#8C4A5E` | Headings / dark logo |
| 6 | Slate Whisper | `#6B6B6B` | Body text / UI |
| 7 | Mist Grey | `#D1D1D1` | Lines, borders, disabled |
| 8 | Ice Teal | `#B8D4E3` | Tech accent (AI, interactive) |

**Rules**:
- Never pure white — always `#FFF0F0` or `#F9F6F0`.
- Never pure black text — always `#6B6B6B` or `#8C4A5E`.
- `#C75B7A` max 15% of page surface.
- `#B8D4E3` only in interactive elements.
- WCAG contrast verified.

---

## 4. Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | **Syne** | Black, Bold, SemiBold |
| Body / UI | **Inter** | Regular, Medium, Light |
| Tech | **JetBrains Mono** | Regular, Light |

### Scale

| Level | Font | Weight | Size | Color | Margin-bottom |
|-------|------|--------|------|-------|---------------|
| H1 | Syne | Black | 64–96px | `#8C4A5E` | 32px |
| H2 | Syne | Bold | 36–48px | `#8C4A5E` | 24px |
| H3 | Syne | SemiBold | 24–30px | `#C75B7A` | 16px |
| Body | Inter | Regular | 16–18px | `#6B6B6B` | — |
| UI / Nav | Inter | Medium | 14–16px | `#6B6B6B` | — |
| Terminal | JetBrains Mono | Regular | 14–16px | `#B8D4E3` | — |
| Dates / Codes | JetBrains Mono | Light | 12px | `#B8D4E3` | — |

Line heights: Body `1.7`, UI `1.5`, Terminal `1.4`, Headings `1.1–1.2`.

---

## 5. Style Guide (8 Rules)

**Rule 1 — Heading Hierarchy**: Use scale consistently. Never skip levels. H1 only in hero.

**Rule 2 — Colors**: Backgrounds `#FFF0F0`/`#F9F6F0`. Body `#6B6B6B`. Accent `#C75B7A` (max 15%). Tech `#B8D4E3` (interactive only).

**Rule 3 — Buttons**:
- Primary: bg `#C75B7A`, radius `12px`, Inter Medium 16px white, padding `14px 32px`.
- Hover: gradient to `#E8B4B4`, shadow `0 4px 20px rgba(199,91,122,0.3)`.
- Ghost: transparent, border `1.5px #C75B7A`, text `#C75B7A`, hover fills.

**Rule 4 — Glassmorphism**:
- bg `rgba(255,240,240,0.6)` + `backdrop-filter: blur(20px)`
- border `1px solid rgba(255,255,255,0.3)`
- shadow `0 8px 32px rgba(0,0,0,0.05)`
- Usage: blob, gallery cards, modals, sticky nav

**Rule 5 — Spacing**: 8-point grid. Sections `120px` desktop / `64px` mobile. Cards `32px` padding. Hero `48px` spacing.

**Rule 6 — Hero Blob**: Organic, fluid, opacity `0.3–0.5`. Color `#E8B4B4` → `#B8D4E3`. Size 60–80% viewport. Reacts to cursor. 3 premium windows inside. Click → modal.

**Rule 7 — Gallery**: 3/2/1 columns, gap `24px`. Thumbnails `4:5`, radius `16px`. Hover: lift `-6px`, border `#E8B4B4`. Click 1: medium card. Click 2: fullscreen carousel.

**Rule 8 — Tech Section**: bg `#F9F6F0` gradient. Terminal `#1A1A1A`, border `#B8D4E3`, text JetBrains Mono `#B8D4E3`. Max 30% page area.

---

## 6. Page Structure

### Homepage (Recommended)
1. **Hero** — `100vh`, bg `#FFF0F0`. Photo right (60%, 4:5). Blob left (~40%). 3 premium windows. Ghost CTA below.
2. **Gallery** — full-width, bg `#F9F6F0`, padding `120px`. H2 "Visual Archive". 3-col grid.
3. **Tech** — bg `#FFF0F0`. H2 "Agentic Playground". Terminal / agent viz / sliders.
4. **FAQ** — bg `#F9F6F0`, padding `80px`. 5–7 accordions.
5. **Bio** — bg `#FFF0F0`, padding `120px`. Photo + dimensions / bio + stats tiles.
6. **Social** — bg `#F9F6F0`, padding `80px`. Icons + support buttons.

### Blog / AI (Subpage #1)
- 2-col (70/30). Post cards / sidebar.
- H1 "AI Chronicles" — Syne Black 48px `#8C4A5E`.

### Full Bio + Contact (Subpage #2)
- 2-col (40/60). Extended bio + 6 stats tiles + 3 CTAs.

### Private Links (Age-Gated)
- H1 "Private Access". Modal: glassmorphism card, "Are you 18 or older?" Yes/No.

---

## 7. Layout Variants

**A — Classic Blob Central** (Recommended): Blob central behind photo. Gallery → tech → FAQ → bio → social.

**B — Tech First**: Hero 50/50. Tech section immediately after hero. Gallery lower.

**C — Gallery as Hero**: Fullscreen carousel hero. Blob bottom-right (~25%).

---

## 8. External Links (CRITICAL)

OnlyFans, Fansly, etc.:
- Client-side ONLY — NEVER in server HTML
- Age-gate modal required
- Client components with `onClick`
- URLs in `site.config.ts`, never static markup

---

## 9. Checklist

- [ ] All colors from tokens — no hardcoded hex
- [ ] Typography follows scale
- [ ] 8-point grid spacing
- [ ] Glassmorphism matches Rule 4
- [ ] Buttons match Rule 3
- [ ] External links client-side only
- [ ] All strings via `next-intl` `t()`
- [ ] `next/image` with lazy loading
- [ ] Semantic HTML, ARIA, keyboard nav
- [ ] Mobile responsive

---

## 10. Detailed Section Specifications (v2 — Updated 2026-04-23)

Based on reference designs and prototype code analysis. These specs override any previous conflicts.

### 10.1 Hero — Blob + Photo + Logo

**Composition**:
- **Background**: `#FFF0F0` with subtle radial gradient — center brighter, edges drifting toward `#B8D4E3` (very sparingly, almost imperceptible)
- **Photo influencer**: Left side, vertical format (~4:5), face visible, elegant fashion pose. Soft rounded edges (NOT sharp cuts). Filter: `saturate(0.85) brightness(1.05) contrast(1.02)`
- **Photo mask**: Radial gradient mask `radial-gradient(ellipse at 60% 50%, #000 50%, transparent 78%)` — soft vignette blending into background
- **Photo glow overlay**: `radial-gradient(ellipse at 30% 50%, transparent 40%, #FFF0F0 80%)` — seamless blend
- **Blob**: Right side, semi-transparent, glassy, organic fluid shape. Gradient: `#E8B4B4` → very subtle `#B8D4E3`. Size: 60–80% viewport width. Partially overlaps photo but does NOT obscure face — creates depth/layering
- **Blob effects**: "Smear" / motion trail — ghost outlines suggesting movement behind cursor. "Peeled back" effect — part of blob appears "lifted", revealing photo underneath (hover interaction)
- **Spotlight on photo**: Subtle circular lightening suggesting interactive discovery
- **Logo NERUDEK**: Positioned above blob, slightly overlapping it, with subtle glow. 3D metallic style (dark blue + gold). Syne Black, `clamp(48px, 7vw, 110px)`, letter-spacing `0.04em`
- **3 Premium cards**: Inside blob, stacked vertically. Glassmorphism: `rgba(255,255,255,0.45)` + `blur(22px) saturate(1.2)`. Border `1px solid rgba(255,255,255,0.55)`. Shadow: `0 30px 60px -20px rgba(199,91,122,0.25), inset 0 1px 0 rgba(255,255,255,0.7)`. Border-radius `24px`

**Technical**:
- Scroll parallax: photo moves down (`0→80px`), logo moves up (`0→-40px`)
- Mouse tracking: blob rotates + shifts position based on cursor
- Mobile: photo full-width at 45% opacity, blob expands to 110%, cards become 80vw

---

### 10.2 Client Carousel — "Collaborations"

**New section** — placed between Hero and Gallery.

- **Background**: `#F9F6F0`
- **Headline**: "Collaborations" — Syne SemiBold, 24px, `#8C4A5E`
- **Layout**: Horizontal strip of 6–8 logos
- **Style**: All logos in grayscale, one highlighted in full color + slightly larger
- **Animation**: Infinite horizontal scroll (suggests carousel)
- **Cards**: White background, border-radius `16px`, subtle shadow

---

### 10.3 Gallery — Immersive Visual Archive

**Updated specs**:
- **Background**: `#F9F6F0`, padding `120px`
- **Headline**: "Visual Archive" — Syne Bold, 48px, `#8C4A5E`
- **Grid**: 4 columns (desktop), 2 (tablet), 1 (mobile). Gap `18px`. Max-width `1200px`
- **Thumbnails**: 4:5 ratio, border-radius `18px` (updated from 16px)
- **Shadow**: `0 8px 28px -10px rgba(140,74,94,0.25)`
- **Hover**: `transform: scale(1.07)`, `filter: saturate(1.1)`, lift effect
- **Motion cues**: "Blur trail" behind lifted image — suggests kinetic scroll animation
- **Overlay on hover**: Session name in semi-transparent `#8C4A5E`

**3-Stage Interaction**:
1. **Hover**: lift + glow border `#E8B4B4`
2. **Click 1**: Expands to medium card (~520px, 80vw mobile). Glassmorphism: `rgba(255,255,255,0.55)` + `blur(22px)`. Border `1px solid rgba(255,255,255,0.6)`. Shadow `0 30px 80px -20px rgba(199,91,122,0.4)`. Hint text: "click to expand →"
3. **Click 2**: Fullscreen Swiper with Coverflow effect (`rotate: 30, depth: 220, slideShadows: false`). Background `rgba(26,26,26,0.92)`. Close button top-right.

---

### 10.4 Tech Section — "Agentic Playground"

**Updated specs** (less teal, more pink):
- **Background**: `#FFF0F0` with subtle gradient toward `#F9F6F0`
- **Headline**: "Agentic Playground" — Syne Bold, 36px, `#8C4A5E`
- **Layout**: 2-column top (terminal + AI viz), 3 sliders below

**Terminal (left, ~55%)**:
- Dark bg: `#1A1A1A`
- Border-radius: `14px`
- Border: `1px solid rgba(184,212,227,0.25)` (subtle teal — thinner than before)
- Glow: `0 0 22px rgba(184,212,227,0.18)` (very subtle)
- Window bar: 3 dots (red, yellow, green) — macOS style
- Text: JetBrains Mono, `#B8D4E3`, 12px, line-height `1.65`
- Boot sequence: Typewriter animation, 380ms per line. Brand-specific boot lines.
- Command input: `$` prompt in `#C75B7A`, blinking cursor (CSS animation)
- Commands: `analyze`, `help`, `clear`, etc.

**AI Visualization (right, ~45%)**:
- Canvas-based particle network
- Colors: `#C75B7A` (dominant), `#B8D4E3` (minimal accent only)
- Floating points connected by lines — suggests neural network / agent
- Reacts to terminal commands (intensity burst)
- Container: gradient bg `linear-gradient(135deg, rgba(255,255,255,0.4), rgba(232,180,180,0.15))`, border `1px solid rgba(255,255,255,0.5)`, `backdrop-filter: blur(10px)`

**Sliders (bottom, 3 columns)**:
- Vertical sliders: "Creativity", "Precision", "Vibe"
- Track: `4px` wide, `rgba(199,91,122,0.18)`
- Fill: gradient `#C75B7A` → `#E8B4B4`
- Thumb: white circle, `2px solid #C75B7A`, shadow `0 4px 14px -3px rgba(199,91,122,0.6)`
- Height: `160px`

---

### 10.5 FAQ — Accordions

- **Background**: `#F9F6F0`, padding `80px`
- **Headline**: "Frequently Asked" — Syne Bold, 36px, `#8C4A5E`
- **Questions**: 5–7 items, vertical stack
- **Question style**: Inter Medium, 18px, `#8C4A5E`. Icon `+` (changes to `−` when open) in `#C75B7A`
- **Answer**: Inter Regular, 16px, `#6B6B6B`, line-height `1.7`
- **Hover**: bg changes to `#FFF0F0`, border-radius `12px`
- **Animation**: Smooth expand/collapse with `AnimatePresence`
- **Spacing**: `24px` between items

---

### 10.6 Biography + Statistics

- **Background**: `#FFF0F0`, padding `120px`
- **Layout**: 2 columns (desktop)

**Left (40%)**:
- Portrait photo, 3:4 ratio — same model as hero but different crop
- Caption: "Height: 172cm | Measurements: 88-62-90" — Inter Light, 14px, `#6B6B6B`

**Right (60%)**:
- H3: "About Nerudek" — Syne SemiBold, 24px, `#C75B7A`
- Bio text: 3–4 paragraphs, Inter Regular, 16px, line-height `1.7`, `#6B6B6B`
- **Stats tiles** (4 in a row):
  - "Followers" — 45K
  - "Engagement Rate" — 8.2%
  - "Posts" — 1,240
  - "Collaborations" — 37
- Tile style: bg `#F9F6F0`, border-radius `16px`, padding `24px`
- Value: Syne Bold, 32px, `#8C4A5E`
- Label: Inter Light, 14px, `#6B6B6B`

---

### 10.7 Social + Support

- **Background**: `#F9F6F0`, padding `80px`
- **Headline**: "Connect & Support" — Syne Bold, 36px, `#8C4A5E`

**Social icons**:
- 4 icons: Instagram, X, TikTok, YouTube
- Color: `#C75B7A`
- Hover: `#E8B4B4` + `scale(1.1)`
- Pulse animation on one icon (concentric rings)
- Anonymous — just symbols, no text labels

**Support buttons**:
- 3 buttons: anonymous ("Support 1", "Support 2", "Support 3")
- Ghost style: border `#C75B7A`, text `#C75B7A`
- Hover: fill `#C75B7A`, white text
- GitHub button: named, open code

**Note below**:
- "Support my work and get exclusive access to AI experiments, early photosets, and behind-the-scenes content." — Inter Regular, 14px, `#6B6B6B`

---

### 10.8 Age Verification Modal

- **Trigger**: Overlay `rgba(0,0,0,0.4)`
- **Card**: Glassmorphism — `rgba(255,240,240,0.8)` + `blur(20px)`, border-radius `24px`
- **Headline**: "Age Verification" — Syne Bold, 28px, `#8C4A5E`
- **Text**: "Treść przeznaczona dla osób pełnoletnich. Czy masz ukończone 18 lat?" — Inter Regular, 16px, `#6B6B6B`
- **Buttons**:
  - "Tak" — CTA `#C75B7A`, white text
  - "Nie" — ghost, border `#D1D1D1`, text `#6B6B6B`
- **After "Yes"**: List of private links appears
- **No service names**: Zero references to OnlyFans, Fansly, etc. in the modal itself

---

## 11. Reference Designs

Physical files in `reference-designs/`:

| File | Size | Description |
|------|------|-------------|
| `layout-full-v2.png` | 6.3MB | Complete homepage mockup (all sections visible) |
| `layout-v1.jpg` | 1.2MB | Hero + early sections variant |
| `layout-v2.jpg` | 1.1MB | Gallery + tech section variant |
| `layout-v3.jpg` | 503KB | Bio + social section variant |
| `layout-v4.jpg` | 347KB | Mobile/compact variant |
| `layout-v5.jpg` | 475KB | Alternative color treatment |

> These are visual references for Claude to match during implementation. The actual design system (colors, typography, spacing) in sections 1–10 takes precedence over any inconsistencies in the images.

---

## 12. Global Effects & Interactions

### Custom Cursor
- Small colored dot + expanding ring
- Default: `#8C4A5E` dot / `rgba(199,91,122,0.4)` ring (38px)
- Link hover: `#C75B7A` / `rgba(199,91,122,0.7)` ring (56px)
- Media hover: `#B8D4E3` / `rgba(184,212,227,0.8)` ring (64px)
- Hide on touch devices (`pointer: coarse`)

### Cursor-Reactive Background
```
radial-gradient(1100px 900px at [cursor-x]% [cursor-y]%, #FFF0F0 0%, #FFE0E5 35%, #B8D4E3 100%)
```
Ghost offset (mix-blend-soft-light, 70% opacity):
```
radial-gradient(900px 700px at [cursor-x+6]% [cursor-y-4]%, rgba(232,180,180,0.6) 0%, rgba(184,212,227,0.0) 60%)
```

### Scroll-Triggered Reveal
All sections below Hero use:
```
initial: { opacity: 0, scale: 0.97, filter: "blur(12px)" }
whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" }
viewport: { once: true, amount: 0.15 }
transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }
```

---

## 13. Key Differences from Previous Versions

| Element | Design v1 (old) | Current Design v2 |
|---------|-----------------|-------------------|
| Teal accent | Minimal, subtle | Minimal, only as tiny accent |
| Pink | Fresh, elegant | Fresh, juicy, elegant |
| Border radius | 16px | 18–24px (softer, more organic) |
| Modernity | Classic elegance | Elegance + futuristic accents |
| Logo | Visible, integrated | Visible, with glow, above blob |
| Motion cues | None | Ghost outlines, smear, pulse, blur trail |
| Gallery columns | 3 | 4 (desktop) |
| Client carousel | Missing | New section between Hero and Gallery |
