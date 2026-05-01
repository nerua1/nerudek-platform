/**
 * Spacing tokens — 4px base grid
 */

export const spacing = {
  0:   "0",
  px:  "1px",
  0.5: "0.125rem",
  1:   "0.25rem",
  2:   "0.5rem",
  3:   "0.75rem",
  4:   "1rem",
  5:   "1.25rem",
  6:   "1.5rem",
  8:   "2rem",
  10:  "2.5rem",
  12:  "3rem",
  16:  "4rem",
  20:  "5rem",
  24:  "6rem",
  32:  "8rem",
  40:  "10rem",
  48:  "12rem",
  64:  "16rem",
} as const;

export const radii = {
  none: "0",
  sm:   "0.25rem",
  md:   "0.5rem",
  lg:   "1rem",
  xl:   "1.5rem",
  full: "9999px",
} as const;

export const shadows = {
  sm:   "0 1px 2px 0 oklch(0.35 0.02 35 / 0.06), 0 1px 3px 0 oklch(0.35 0.02 35 / 0.04)",
  md:   "0 4px 6px -1px oklch(0.35 0.02 35 / 0.06), 0 2px 4px -2px oklch(0.35 0.02 35 / 0.04)",
  lg:   "0 10px 15px -3px oklch(0.35 0.02 35 / 0.06), 0 4px 6px -4px oklch(0.35 0.02 35 / 0.04)",
  xl:   "0 20px 25px -5px oklch(0.35 0.02 35 / 0.06), 0 8px 10px -6px oklch(0.35 0.02 35 / 0.04)",
  glow: "0 0 24px 0 oklch(0.68 0.080 35 / 0.25)", // accent glow for luxury hover states
} as const;

export const zIndices = {
  base:    0,
  raised:  10,
  sticky:  20,
  overlay: 30,
  modal:   40,
  toast:   100,
} as const;

export const transitions = {
  fast:   "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base:   "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow:   "600ms cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;
