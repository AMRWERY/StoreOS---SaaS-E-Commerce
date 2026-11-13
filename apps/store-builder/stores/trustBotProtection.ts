import type { BlockedEntry, BlockedEvent, BotProvider, BotToggles, RateLimitRule } from '@/types/trust'

export const useTrustBotProtectionStore = defineStore('trustBotProtection', () => {
  const toggles = ref<BotToggles>({ login: true, registration: true, checkout: false, forms: true })
  const provider = ref<BotProvider>('turnstile')
  const siteKey = ref('0x4AAAAAAABkMYinukE8nzYS')
  const sensitivity = ref(60)

  const rules = ref<RateLimitRule[]>([
    { id: 'l1', route: '/api/auth/login', limit: 10, windowSec: 60, action: 'challenge' },
    { id: 'l2', route: '/api/checkout', limit: 30, windowSec: 60, action: 'throttle' },
    { id: 'l3', route: '/api/newsletter', limit: 5, windowSec: 300, action: 'block' },
  ])

  const blocklist = ref<BlockedEntry[]>([
    { id: 'b1', kind: 'ip', value: '41.130.22.17', addedAt: '2026-11-09' },
    { id: 'b2', kind: 'country', value: 'RU', addedAt: '2026-10-30' },
  ])

  const events = ref<BlockedEvent[]>([
    { id: 'e1', ip: '41.130.22.17', route: '/api/auth/login', reason: 'rate_limit', at: '2026-11-12 09:14:22' },
    { id: 'e2', ip: '196.218.45.9', route: '/api/checkout', reason: 'captcha_failed', at: '2026-11-12 08:51:03' },
    { id: 'e3', ip: '154.239.8.120', route: '/api/newsletter', reason: 'bot_signature', at: '2026-11-11 23:40:57' },
    { id: 'e4', ip: '41.130.22.17', route: '/api/auth/register', reason: 'blocklist', at: '2026-11-11 21:02:10' },
  ])

  function addBlocked(kind: 'ip' | 'country', value: string) {
    const v = value.trim()
    if (!v) return
    blocklist.value.unshift({
      id: `b${Date.now()}`,
      kind,
      value: kind === 'country' ? v.toUpperCase() : v,
      addedAt: new Date().toISOString().slice(0, 10),
    })
  }
  function removeBlocked(id: string) {
    blocklist.value = blocklist.value.filter((b) => b.id !== id)
  }

  return { toggles, provider, siteKey, sensitivity, rules, blocklist, events, addBlocked, removeBlocked }
})
