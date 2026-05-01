/**
 * Design tokens — OKLCH color system
 * These are the canonical values. CSS custom properties are derived from these.
 * Brand hue 35 = warm cream/pearl (Tomek's decision 2026-04-22)
 */

export const brandHue = 35 as const;

export const colors = {
  // Backgrounds
  bg:      "oklch(0.99 0.005 35)",   // #FAFAF8 — almost white
  surface: "oklch(0.95 0.010 35)",   // #F5EFE6 — cream/pearl
  paper:   "oklch(0.92 0.015 35)",   // #EDE8E1 — warm pearl

  // Text
  ink:     "oklch(0.18 0.015 35)",   // #1A1714 — warm black
  muted:   "oklch(0.55 0.020 35)",   // #8B7E74 — warm gray

  // Accents
  accent:  "oklch(0.68 0.080 35)",   // #C5A882 — warm gold
  line:    "oklch(0.82 0.015 35)",   // #D9D0C6 — subtle divider

  // Brand (from logo)
  navy:    "oklch(0.22 0.060 260)",  // navy from logo mark
  rose:    "oklch(0.75 0.080 15)",   // rose from logo mark

  // Interactions
  hoverBg: "oklch(0.90 0.012 35)",
  focus:   "oklch(0.68 0.100 35)",   // accent with higher chroma for a11y

  // Overlays (modals, scrims)
  overlay: "oklch(0.18 0.015 35 / 0.45)", // warm black at 45% opacity
  scrim:   "oklch(0.18 0.015 35 / 0.65)", // darker scrim for age-gate

  // Feedback
  error:   "oklch(0.55 0.18 25)",   // warm red — accessible on cream bg
  success: "oklch(0.55 0.12 145)",  // muted green

  // Shadows (elevation tint — warm, subtle)
  shadow:  "oklch(0.35 0.02 35 / 0.08)",

  // Utility
  white:   "#ffffff",
  black:   "#000000",
} as const;

export type ColorToken = keyof typeof colors;
