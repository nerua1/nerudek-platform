export type Locale = "en" | "pl";

export const LOCALES = ["en", "pl"] as const;

export const DEFAULT_LOCALE: Locale = "en";

export function getLocalePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}
