import type { PlatformTone } from '@/types/platform'

const MERCHANT_STATUS: Record<string, PlatformTone> = { active: 'success', trial: 'warning', suspended: 'danger' }
const PLAN: Record<string, PlatformTone> = { trial: 'warning', free: 'neutral', starter: 'info', growth: 'brand', enterprise: 'purple' }
const SEVERITY: Record<string, PlatformTone> = { low: 'neutral', medium: 'yellow', high: 'warning', critical: 'danger' }
const ABUSE_STATUS: Record<string, PlatformTone> = { open: 'warning', investigating: 'info', escalated: 'purple', suspended: 'danger', cleared: 'success' }
const PROVIDER: Record<string, PlatformTone> = { healthy: 'success', degraded: 'warning', down: 'danger' }
const TICKET: Record<string, PlatformTone> = { open: 'warning', pending: 'info', resolved: 'success' }
const PRIORITY: Record<string, PlatformTone> = { low: 'neutral', normal: 'info', high: 'danger' }

export const usePlatformTones = () => {
  const pick = (map: Record<string, PlatformTone>, key: string): PlatformTone => map[key] ?? 'neutral'
  return {
    merchantStatus: (k: string) => pick(MERCHANT_STATUS, k),
    plan: (k: string) => pick(PLAN, k),
    severity: (k: string) => pick(SEVERITY, k),
    abuseStatus: (k: string) => pick(ABUSE_STATUS, k),
    provider: (k: string) => pick(PROVIDER, k),
    ticket: (k: string) => pick(TICKET, k),
    priority: (k: string) => pick(PRIORITY, k),
  }
}
