/**
 * Typography tokens
 * Cormorant = headings (luxury serif, wide tracking)
 * Montserrat = body (clean, modern)
 */

export const fonts = {
  heading: "Cormorant, 'Times New Roman', serif",
  body:    "Montserrat, system-ui, sans-serif",
} as const;

export const fontWeights = {
  light:   300,
  regular: 400,
  medium:  500,
  semibold: 600,
} as const;

export const fontSizes = {
  // Fluid type scale (clamp: min, preferred, max)
  "2xs": "clamp(0.625rem, 1.5vw, 0.75rem)",
  xs:    "clamp(0.75rem, 1.8vw, 0.875rem)",
  sm:    "clamp(0.875rem, 2vw, 1rem)",
  base:  "clamp(1rem, 2.2vw, 1.125rem)",
  lg:    "clamp(1.125rem, 2.5vw, 1.25rem)",
  xl:    "clamp(1.25rem, 3vw, 1.5rem)",
  "2xl": "clamp(1.5rem, 4vw, 2rem)",
  "3xl": "clamp(2rem, 5vw, 3rem)",
  "4xl": "clamp(3rem, 7vw, 4.5rem)",
  "5xl": "clamp(4rem, 10vw, 7rem)",
  hero:  "clamp(2.5rem, 10vw, 8rem)", // scaled down min to prevent mobile overflow with display tracking
} as const;

export const letterSpacings = {
  tight:   "-0.02em",
  normal:  "0em",
  wide:    "0.08em",
  wider:   "0.15em",
  widest:  "0.25em",
  display: "0.4em",   // for large heading like "NERUDEK"
} as const;

export const lineHeights = {
  tight:  1.1,
  snug:   1.3,
  normal: 1.6,
  relaxed: 1.8,
} as const;

export const googleFontsUrl =
  "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap";
