const DAILY_LIMIT = 3
const WINDOW_MS = 24 * 60 * 60 * 1000

interface Entry { count: number; resetAt: number }

export function checkRateLimit(toolSlug: string): { allowed: boolean; remaining: number; resetAt: number } {
  if (typeof window === 'undefined') return { allowed: true, remaining: DAILY_LIMIT, resetAt: 0 }
  const key = `rate_${toolSlug}`
  const raw = localStorage.getItem(key)
  const now = Date.now()
  let entry: Entry = raw ? JSON.parse(raw) : { count: 0, resetAt: now + WINDOW_MS }
  if (now > entry.resetAt) entry = { count: 0, resetAt: now + WINDOW_MS }
  if (entry.count >= DAILY_LIMIT) return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  entry.count++
  localStorage.setItem(key, JSON.stringify(entry))
  return { allowed: true, remaining: DAILY_LIMIT - entry.count, resetAt: entry.resetAt }
}
