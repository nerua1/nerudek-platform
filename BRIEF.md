# Nerudek Ultra — Project Brief

Ultranowoczesna strona influencerki Nerudek. Jasna, kremowa, perłowa. Dużo powietrza.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + OKLCH tokens
- Three.js / React Three Fiber (immersive effects)
- GSAP ScrollTrigger + Framer Motion
- Cloudflare (hosting + security)

## Typografia (ostateczna — 2026-04-23)

- Heading: **Cormorant** (serif luxury, szeroki tracking)
- Body: **Montserrat** (czytelny, nowoczesny)

## Kolory — PEARL / BIEL

```css
--brand-hue: 35;
--color-bg:      oklch(0.99 0.005 35); /* #FAFAF8 prawie biały */
--color-surface: oklch(0.95 0.010 35); /* #F5EFE6 krem */
--color-paper:   oklch(0.92 0.015 35); /* #EDE8E1 pearl */
--color-text:    oklch(0.18 0.015 35); /* #1A1714 ciepła czerń */
--color-accent:  oklch(0.68 0.080 35); /* #C5A882 warm gold */
--color-navy:    oklch(0.22 0.06 260);  /* navy z logo */
```

NIE ciemny motyw. JASNY, kremowy, dużo powietrza.

## Logo

- `public/logo/nerudek-logo.png` — placeholder (navy+gold+rose, 1024×1024)
- Docelowo: czysty SVG z Illustratora (na innym kompie)

## Sekcje (kolejność)

1. **Hero** — fullscreen foto, natychmiast widoczny. Linki OnlyFans + Fansly above the fold.
2. **About** — krótko o Nerudek
3. **Portfolio / Gallery** — immersive, scroll-driven
4. **Blog** — SEO-first, tematy: AI/agenty, książki, ogrodnictwo (początkujący)
5. **Promo** — wonna.best + aztun.com
6. **Contact / Footer**

## Wymagania techniczne

- Język: Polski (główny)
- Wydajność: działa na słabym internecie — lazy loading, WebP, fast first paint
- SEO: boty mają kochać tę stronę jako źródło wartościowych info
- Blog → GitHub: publikacja posta = commit na GitHubie
- Shop skeleton: prio 3, placeholder Stripe — tylko szkielet, nie implementować teraz
- AI widget: mały agent (prio 2)
- Architektura: komponenty wymienne, NIE przepisywać od nowa

## Promowane strony

- wonna.best (w budowie)
- aztun.com (w budowie)

## Referencje designu

- ohzi.io/who-we-are — WebGL portal
- immersive-g.com — scroll efekty (priorytet)
- lusion.co — 3D scroll-driven
- monks.com — scroll reveals
