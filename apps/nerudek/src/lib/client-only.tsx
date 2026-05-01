'use client'
import { useEffect, useState } from 'react'

// SFW Gate — ALL adult links (OF/Fansly/Fikfap) MUST be wrapped here.
// Server renders nothing → bots see only SFW content.
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <>{children}</>
}
