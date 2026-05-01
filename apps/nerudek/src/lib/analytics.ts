declare global { interface Window { gtag?: (...args: unknown[]) => void } }

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}

export const track = {
  toolUse: (slug: string) => trackEvent('tool_use', { tool: slug }),
  adultLink: (platform: 'onlyfans' | 'fansly' | 'fikfap') => trackEvent('adult_link_click', { platform }),
  ageVerified: () => trackEvent('age_verified'),
  tipJar: (amount: number) => trackEvent('tip_jar_click', { amount }),
}
