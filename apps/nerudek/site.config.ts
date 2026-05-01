import type { SiteConfig } from "@platform/seo";

/**
 * nerudek.com brand configuration
 * Change this file to rebrand — no other files need to change for basic theming.
 */
export const siteConfig: SiteConfig = {
  url: "https://nerudek.com",
  name: "Nerudek",
  tagline: "Model, content creator & AI enthusiast. Explore fashion photography, vibe coding, and digital aesthetics.",
  defaultLocale: "en",
  locales: ["en", "pl"],
  person: {
    name: "Nerudek",
    twitterHandle: undefined,
    instagramUrl: undefined,
  },
  ogImage: "/og/nerudek-og.jpg",
};

/**
 * External platform links
 * These are ONLY referenced in client-side components — never in server-rendered HTML.
 * Bots see none of these.
 */
export const platformLinks = {
  onlyfans: "https://tinyurl.com/nerudek7",
  fansly:   "https://tinyurl.com/nerudek4",
  paypal:   "https://paypal.me/nerudek",
  revolut:  "https://revolut.me/nerudek",
} as const;

/**
 * Sister sites (promoted on nerudek.com)
 */
export const sisterSites = [
  { name: "wonna.best",  url: "https://wonna.best",  status: "coming-soon" as const },
  { name: "aztun.com",   url: "https://aztun.com",   status: "coming-soon" as const },
] as const;
