/**
 * Site configuration — per-brand overrides
 * Every app (nerudek, wonna, aztun) provides a SiteConfig.
 * The SEO layer uses this to generate metadata, JSON-LD, and llms.txt.
 */

export interface SiteConfig {
  /** Canonical site URL, no trailing slash */
  url: string;
  /** Brand name shown in titles and JSON-LD */
  name: string;
  /** Short tagline for meta description */
  tagline: string;
  /** Default locale (BCP-47) */
  defaultLocale: "en" | "pl";
  /** Supported locales */
  locales: ReadonlyArray<"en" | "pl">;
  /** Owner / Person entity for JSON-LD */
  person: {
    name: string;
    /** Optional: Twitter/X handle with @ */
    twitterHandle?: string | undefined;
    /** Optional: Instagram URL */
    instagramUrl?: string | undefined;
  };
  /** OG / Twitter card image (absolute path from public/) */
  ogImage: string;
  /** Whether to include noindex for bots — set true on dev/staging */
  noIndex?: boolean;
}
