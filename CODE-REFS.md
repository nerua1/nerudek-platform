# Nerudek — Reusable Code References

> Source code from prototype iterations in `~/Downloads/www/`.
> These are Vite+React prototypes adapted into the Next.js 15 monorepo.

---

## ⚡ DESIGN DECISIONS — Review Session 2026-04-24

Tomek reviewed all 15 prototypes live. Below is the definitive component selection.

### Rejected entirely (do not reference)
- **3001** `propozycja 1` — trash (photos usable, logo carousel usable)
- **3002** `Swietne kolory` — trash
- **3003** `!!!GALERIA!` — trash
- **3004** `Lasnie zakodowana galeria` — trash

### Component Selection Matrix

| # | Component | Source (port) | Rating | Notes |
|---|-----------|---------------|--------|-------|
| 1 | **Modal: przezroczysta szklana ramka** | 3007 | 10/10 ★ | Jasna przezroczysta ramka jaśniejsza od reszty tła — najlepsza ramka modala |
| 2 | **Modal age/premium** | 3011 | 10/10 ★ | Najładniejszy modal ogółem — jasna strona, gdyby ramka wychodziła spod ramki (layered) byłoby idealne |
| 3 | **Galeria: mix okrągłe + zaokrąglone ramki** | 3006 | 10/10 ★ | Ramy przeplatane — różne kształty sąsiadujących zdjęć |
| 4 | **Miniaturki galerii** | 3006 | 10/10 ★ | Immersive Gallery i Visual Archive = ten sam komponent, dwa zdjęcia jako seed |
| 5 | **Blob pod zdjęciem (hero blob)** | 3007 | 9/10 | Fajny ale trochę leniwy i mały — wzmocnić reaktywność myszy + prędkość morph |
| 6 | **Blob pod galerią (tło sekcji)** | 3008 | 9/10 | Świetny kształt, "brudny" kolor → wymienić na paletę rose/pink; dodać pulsowanie + reakcję myszy |
| 7 | **Blob duży jako tło sekcji** | 3014 | 9/10 | Bardzo ciekawy kształt, za dużo ciemności — rozjaśnić, użyć pod galerią lub about |
| 8 | **Karuzela klientów: zatrzymuje się** | 3014 | 9/10 ★ | Auto-scroll, zatrzymuje się co kilka kliknięć — najlepsza implementacja |
| 9 | **Social ikonki z poświatą** | 3007 | 8/10 | Najeżdżając: ikonka się pogrubia + generuje poświatę na chwilę |
| 10 | **Gallery hover: powiększanie zdjęć** | 3008 | 8/10 | Najeżdżając na sekcję galerii zdjęcia się powiększają; zjeżdżając kondensują |
| 11 | **Hero: obraz w owalu** | 3010 | 8/10 | Zdjęcie w owalu jak w oryginalnym projekcie |
| 12 | **Hero: 2 bloby (tło + klawisze)** | 3010 | 8/10 | Jeden blob w tle, drugi na obszarze przycisków |
| 13 | **Galeria: kwadraty z zaokrąglonymi narożnikami** | 3010 | 8/10 ★ | Lepsze niż koła (koła = chaos), lepsze niż nierówne prostokąty |
| 14 | **Social + Support sekcja** | 3010 | 8/10 | Bardzo ładna sekcja jako całość |
| 15 | **Mgielka hero → sekcja** | 3008 | 7/10 | Przy scrollowaniu z hero na następną sekcję pojawia się mgielka która znika |
| 16 | **Karuzela klientów** | 3013 | 7/10 | Ładna alternatywa |
| 17 | **FAQ schludny** | 3011/3013 | 7/10 | Ładnie wygląda, dodać smaczek immersji |
| 18 | **Technology: okienko dynamiczne** | 3009 | 7/10 | Czarne okienko w końcu coś robi; Creativity/Precision/Vibe reagują (zastosowanie TBD) |
| 19 | **About: ciekawe wejście scroll** | 3008 | 7/10 | Sposób pojawienia się sekcji about był interesujący |
| 20 | **Hero zaokrąglenia + tło reagujące** | 3005 | 6/10 | Zaokrąglenia hero + zdjęć w galerii; tło gdyby reagowało mocniej na mysz byłoby świetne |
| 21 | **Mini blob dekoracyjny** | 3012/3014 | 6/10 | Małe bloby jako dekoracje sekcji |
| 22 | **Gallery 2: pionowy lightbox** | 3009 | 7/10 | Dobrze zakodowany lightbox — brakuje pętli + nawigacji miniaturek |

---

### Galeria — czego brakuje wszędzie (must implement)

We wszystkich prototypach galeria jest niekompletna. Wzorzec który musi być w monorepo:

1. **Miniaturki po lewej**: scrollowane pionowo w górę i dół, w pętli (infinite loop)
2. **Duże zdjęcie po prawej**: przejście między zdjęciami w pętli (infinite)
3. **Klik na duże zdjęcie**: otwiera fullscreen, można scrollować dalej w pętli
4. **Wzorzec**: zakodowane poprawnie w v5 (`nerudek-v5/`) — sprawdzić tamtą implementację
5. **Grid galerii**: kwadraty z zaokrąglonymi narożnikami (NIE koła — chaotyczne)
6. **Hover na miniaturkę**: powiększenie (nie otwieranie modala)

---

### UX Patterns do zaimplementowania (nie ma ich w prototypach)

#### A. Page Peel / Paper Curl — Hero CTA Buttons
**Zatwierdzony obrazek**: `~/Downloads/Zrzut ekranu 2026-04-24 o 01.31.35.png`

Efekt: strona/kartka która się odwija jak skórka owocu, pod nią zdjęcie.
Buttony OF/Fansly ułożone jako warstwy na sobie (stacked layers).
Najeżdżając: warstwa się "odkleją" pokazując fragment zdjęcia.

```css
/* Aproximation of page curl */
transform-origin: left center;
transform: perspective(1500px) rotateY(var(--curl-angle));
/* Shader/clip-path approach preferred */
```

Alternatywa B (Image #9 — geometryczne formy):
```
Geometryczne kształty (trapez, ukośny prostokąt)
Po najechaniu: wychyla się fragment zdjęcia z kształtu
Kliknięcie: otwiera modal
```

#### B. Hero Reveal Sequence
Po załadowaniu strony:
1. Pojawiają się buttony OF + Fansly (góra)
2. Pod nimi: zdjęcie leżącej sylwetki Iwony (pełna wysokość)
3. Nadchodzi mgielka/modal — tylko twarz + dekolt widoczny
4. Najeżdżając kursorem: mgielka rozpływa się → sylwetka pełna widoczna
5. Po chwili bez ruchu: mgielka powraca

#### C. Floating Gallery Modal (Image z sesji)
```
Layout: 2 kolumny w modalu
- Lewa: pionowe miniaturki (scrollowane w górę/dół w pętli)
- Prawa: duże zdjęcie (zmienia się po kliknięciu miniaturki lub swipe)
- Ramka: glassmorphism (jaśniejsza od tła) — wzorzec z 3007
- Tło: rozmyte zdjęcia z galerii + blob
```

#### D. Logo — dwa użycia
- **Pełne logo**: postać nogi + tekst "NERUDEK" — header główny
- **Samo słowo "NERUDEK"**: metaliczny tekst — hero section
- **Sama postać nogi**: ikonka — favicon, mobile header
- Plik: `public/logo/nerudek-logo.png` (1024×1024, bez tła)

---

## Source Projects

| Port | Project | Location | Rating | Status |
|------|---------|----------|--------|--------|
| 3000 | **nerudek-ultra** | `~/Documents/PROJEKTY/STRONA/nerudek-ultra/` | — | Monorepo — naprawić hero, reszta sekcji nie renderuje |
| 3001 | propozycja-1 | `~/Downloads/www/nerudek-fashion-ai-mockupp_propozycja 1` | trash | Zachować: photos, logo carousel |
| 3005 | tez-fajne | `~/Downloads/www/!!tez fajne_advanced-interactive-react-layout` | partial | Zaokrąglenia, blob (statyczna grafika → zachować) |
| 3006 | glassmorphism-3d | `~/Downloads/www/!advanced-3d-glassmorphism-layout` | ★★★ | Gallery mix, modal, kolorystyka |
| 3007 | blob-pod-galeria | `~/Downloads/www/!Bardzo fajny blob pod galeria__advanced-interactive-react-layout` | ★★★ | Blob hero, modal ramka 10/10, social poświata |
| 3008 | kolejny-mockup | `~/Downloads/www/!kolejny _nerudek-fashion-ai-mockup` | ★★ | Blob pod galerią, hover powiększenie, mgielka |
| 3009 | blob-pod-faq | `~/Downloads/www/!_ladny blob pod faq_advanced-interactive-react-layout` | ★★ | Gallery lightbox, tech section |
| 3010 | ladny-blob | `~/Downloads/www/ladny blob-advanced-interactive-react-layout` | ★★★ | 2 bloby hero, owal zdjęcie, social+support |
| 3011 | mockup-base | `~/Downloads/www/nerudek-fashion-ai-mockup` | ★★★ | Modal 10/10, jasna strona, FAQ |
| 3012 | mockup-1 | `~/Downloads/www/nerudek-fashion-ai-mockup (1)` | ★ | Mini blob |
| 3013 | mockup-2 | `~/Downloads/www/nerudek-fashion-ai-mockup (2)` | ★★ | Karuzela klientów, czcionki, FAQ |
| 3014 | mockup-4 | `~/Downloads/www/nerudek-fashion-ai-mockup (4)` | ★★ | Duży blob tło, karuzela zatrzymuje się, mini blony |
| 3015 | propozycja-2 | `~/Downloads/www/nerudek-fashion-ai-mockup_propozycja2` | partial | — |

---

## Component Catalog — Zaktualizowany

### 1. Blob — Trzy warianty

#### 1a. Blob Hero (pod zdjęciem)
**Best source**: 3007 `!Bardzo fajny blob pod galeria__`
**Stack**: CSS/SVG lub R3F

Wymagania:
- Organiczny kształt, różowo-teal gradient
- Reaktywny na mysz: obrót + delikatna zmiana kształtu
- Prędkość morphingu: zwiększyć 2× vs. wersji 3007 (był "leniwy")
- Rozmiar: minimum 60% szerokości hero

#### 1b. Blob jako tło sekcji Galerii
**Best source**: 3008 + 3014 (połącz kształt 3014 z paletą 3008)

Wymagania:
- Duży, za galerią lub o sekcją
- Kolor: rose/pink palette (NIE brudny brąz jak w 3008)
- Pulsowanie na idle (co 4-6s)
- Kolor/kształt zmienia się powoli (morphing co 8-12s)
- Reaktywność myszy: delikatna (parallax ±20px)

#### 1c. Mini blob dekoracyjny
**Best source**: 3014 `nerudek-fashion-ai-mockup (4)`

Wymagania:
- Mały (60-100px), float w sekcji
- Jako dekoracja FAQ, between sections
- Animacja idle: slow pulse opacity

---

### 2. Hero Section

**Koncepcja zatwierdzona** (składanka z kilku wersji):
- Tło: gradient rose→cream→teal (cursor-reactive jak w mockup-v1)
- Lewo: tekst NERUDEK (metaliczny), CTA buttons (OF+Fansly) stacked layers
- Centrum: blob hero (3007)
- Prawo/centrum: zdjęcie Iwony w owalu (3010)
- Mgielka reveal: przychodzi po 2s, rozwiewa się na hover (3008 concept)
- Scroll hint na dole

**CTA Buttons** — opcja do wyboru przez Tomka:
- A: Page peel / paper curl (preferowane — screenshot 01.31.35)
- B: Geometryczne formy z reveal zdjęcia (Image #9)
- NIE: proste prostokątne przyciski z border-radius (zbyt generic)

---

### 3. Gallery — Pełna Implementacja

**Grid widok** (zatwierdzone):
- Kwadraty z zaokrąglonymi narożnikami (border-radius ~16-20px)
- NIE koła (chaotyczne, nierównomierne)
- Hover: scale 1.05, saturate, soft shadow
- Layout: 4 kolumny desktop, 2 mobile
- Najeżdżając na sekcję: powiększanie zdjęć (3008), zjeżdżając: kondensacja

**Lightbox/Viewer** (wymagania zaktualizowane):
- 2 kolumny:
  - Lewa: pionowe miniaturki (infinite loop scroll góra/dół)
  - Prawa: duże zdjęcie
- Przejście między zdjęciami: infinite loop (po ostatnim → pierwsze)
- Na dużym zdjęciu click: fullscreen z infinite scroll
- Ramka modala: glassmorphism jaśniejsza od tła (wzorzec 3007, rating 10/10)
- Wzorzec galerii z v5 (`/Users/nerucb1/Documents/PROJEKTY/STRONA/nerudek-v5/`) — sprawdzić lightbox

---

### 4. Modal — Age/Premium Verification

**Best source**: 3011 (modal ogólnie) + 3007 (ramka)

Anatomia modala:
```
[ glassmorphism overlay — rozmazane tło + blob ]
  ┌──────────────────────────────────┐ ← jasna ramka (3007: jaśniejsza od tła)
  │                                  │
  │   Age Verification               │  ← Cormorant Garamond heading
  │   [tekst]                        │
  │                                  │
  │   [ Yes, I'm 18+ ]  [ No ]       │  ← gold + ghost buttons
  │                                  │
  └──────────────────────────────────┘
```

Upgrade: ramka "wychodząca spod ramki" (layered border efekt jak sugerował Tomek)
```css
/* Layered border effect */
box-shadow:
  0 0 0 1px rgba(255,255,255,0.8),     /* inner bright border */
  0 0 0 3px rgba(232,180,180,0.3),     /* mid rose glow */
  0 0 0 6px rgba(255,255,255,0.15);    /* outer soft halo */
```

---

### 5. TechSection — Terminal + AI Viz + Sliders

**Best source**: 3009 (terminal coś robi) + 3007 (więcej życia)

Wymagania:
- Terminal: animowany (typewriter), nie martwy
- AI Viz: canvas particle network — nie statyczny
- Sliders (Creativity/Precision/Vibe): reaktywne, zastosowanie TBD (Tomek: "nie rozumiem zamysłu, ale fajnie reagują")
- Opcja: vertical sliders mogą sterować parametrami bloba hero

---

### 6. ClientsCarousel

**Best source**: 3014 (zatrzymuje się co kilka kliknięć) — najlepsza implementacja
**Backup**: 3013 (ładna alternatywa)

Wymagania:
- Auto-scroll w lewo
- Kliknięcie: zatrzymuje auto-scroll na 2-3s, potem wznawia (3014 behavior)
- Loga: grayscale → na hover: kolor + scale 1.05
- Assets: `client-0..14.png` + `LOGO-ANNEDALES-03.png`

---

### 7. Social Section + Support

**Best source**: 3010 (bardzo ładna jako całość)
**Social icons effect**: 3007 (poświata na hover — pogrubienie + glow)

```css
/* Social icon hover glow (3007 pattern) */
.social-icon:hover {
  filter: drop-shadow(0 0 8px currentColor);
  font-weight: 700; /* lub scale na SVG */
  transition: all 200ms ease;
}
```

---

### 8. FAQ

**Best source**: 3011/3013 (schludny wygląd)
**Upgrade**: dodać smaczek immersji — np. blur+reveal contentu, lub mały blob który pulsuje przy otwieraniu

---

### 9. About Section

**Wymagania**:
- Zdjęcie Iwony: nie statyczne — poddaje się na hover (3D tilt, jak w v5)
- Pojawienie się sekcji: ciekawe (wzorzec 3008)
- Blob w tle: duży, kolorowy (wzorzec 3014 albo 3008)
- Statystyki: followers, engagement, projects, awards

---

### 10. CustomCursor
**Source**: `ladny-blob` (3010)

Zachować: mała kropka + rozszerzający się pierścień, zmiana koloru w zależności od hover target.

---

## Global CSS Effects

### Cursor-Reactive Background
```tsx
// Global radial gradient following mouse — używać jako tło hero + about
const bg = `radial-gradient(
  1100px 900px at ${cursor.x * 100}% ${cursor.y * 100}%,
  #FFF0F0 0%,
  #FFE0E5 35%,
  #B8D4E3 100%
)`;
```

### Section Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.97, filter: "blur(12px)" }}
  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
>
```

### Hero → Section Mist Transition (3008)
```css
/* Pseudo element over hero bottom — fades out on scroll */
.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, var(--color-bg));
  opacity: var(--scroll-progress); /* 0 → 1 as user scrolls */
}
```

---

## Build Order (Updated post-review)

Priority | Component | Source | Complexity
---------|-----------|--------|-----------
P0 | Fix nerudek-ultra (3000) — render all sections | monorepo | medium
P0 | **Modal** (3011 design + 3007 ramka) | 3011+3007 | low
P1 | **Blob hero** | 3007 → R3F | high
P1 | **Blob sekcji** (galeria tło) | 3014 kształt + 3008 kolor | medium
P1 | **Gallery grid** + hover effects | 3006+3008+3010 | high
P1 | **Gallery lightbox** (2-col, infinite loop) | 3009+v5 | high
P2 | **Hero** (owal zdjęcie + blur reveal + CTA) | 3010+3008 | high
P2 | **CTA Buttons** (page peel lub geometryczne) | custom | high
P2 | **ClientsCarousel** (stop on click) | 3014 | low
P3 | **TechSection** (terminal + particles) | 3009+3007 | medium
P3 | **Social** (glow icons) | 3010+3007 | low
P3 | **FAQ** + immersja | 3011+3013 | low
P3 | **About** (3D tilt + blob tło) | 3008+3014+v5 | medium
P4 | **CustomCursor** | 3010 | low
P4 | **Page transitions** (mgielka) | 3008 | low

---

## Dependency Map

```
framer-motion       — hero reveal, modal, section reveals, gallery ✅ (w package.json)
three               — R3F blob ✅
@react-three/fiber  — R3F blob ✅
@react-three/drei   — helpers ✅
gsap + ScrollTrigger — scroll animations ✅
swiper              — gallery carousel (opcjonalnie, można Embla)
```

---

## Asset References

```
Zdjęcia modelki:    /Users/nerucb1/Documents/PROJEKTY/STRONA/!NERUDEK.COM/assets/img/
Client logos:       .../assets/img/clients/client-0..14.png + LOGO-ANNEDALES-03.png
Platform logos:     .../assets/img/Only_logo.svg, Fan_logo.svg, PP.svg
Hero photo:         apps/nerudek/public/images/hero-bg.jpg
Logo PNG:           apps/nerudek/public/logo/nerudek-logo.png (1024×1024, no bg)

UI reference image: ~/Downloads/export_1 (2).jpg — approved layout (hero blob tube + gallery mix + tech)
CTA concept:        ~/Downloads/Zrzut ekranu 2026-04-24 o 01.31.35.png — page peel buttons
Gallery concept:    ~/Downloads/Zrzut ekranu 2026-04-24 o 01.14.35.png — Visual Archive gallery lightbox
```
