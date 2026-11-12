import type { StatusComponent, StatusComponentKey, StatusDay, StatusLevel } from '@/types/platformOps'

/** Deterministic 90-day history so SSR and client render identically. */
const buildDays = (seed: number, degradedAt: number[], downAt: number[]): StatusDay[] =>
  Array.from({ length: 90 }, (_, i) => {
    if (downAt.includes(i)) return 'down'
    if (degradedAt.includes(i)) return 'degraded'
    // a little extra noise from a cheap LCG, kept rare
    return (i * 7919 + seed * 104729) % 97 === 0 ? 'degraded' : 'up'
  })

const uptimeOf = (days: StatusDay[]): number => {
  const score = days.reduce((sum, d) => sum + (d === 'up' ? 1 : d === 'degraded' ? 0.9 : 0), 0)
  return Math.round((score / days.length) * 10000) / 100
}

const make = (key: StatusComponentKey, status: StatusLevel, seed: number, degradedAt: number[], downAt: number[]): StatusComponent => {
  const days = buildDays(seed, degradedAt, downAt)
  return { key, status, days, uptime: uptimeOf(days) }
}

export const usePlatformStatusPageStore = defineStore('platformStatusPage', () => {
  const components = ref<StatusComponent[]>([
    make('dashboard', 'operational', 1, [40], [16]),
    make('storefront', 'operational', 2, [4, 5], []),
    make('checkout', 'operational', 3, [70], []),
    make('payments', 'degraded', 4, [89, 22], []),
    make('webhooks', 'operational', 5, [58, 59], []),
    make('messaging', 'operational', 6, [31], []),
  ])

  const overall = computed<StatusLevel>(() => {
    if (components.value.some((c) => c.status === 'outage')) return 'outage'
    if (components.value.some((c) => c.status === 'degraded')) return 'degraded'
    return 'operational'
  })

  return { components, overall }
})
