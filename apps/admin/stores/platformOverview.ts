import type { PlatformPlan, TrendPoint } from '@/types/platform'

export const usePlatformOverviewStore = defineStore('platformOverview', () => {
  const activeStores = ref(2184)
  const mrr = ref(486300)
  const gmv = ref(18420000)
  const openAbuseCases = ref(7)

  const trend = ref<TrendPoint[]>([
    { label: 'Jun', gmv: 9800000, mrr: 281000 },
    { label: 'Jul', gmv: 11200000, mrr: 318000 },
    { label: 'Aug', gmv: 12900000, mrr: 352000 },
    { label: 'Sep', gmv: 14100000, mrr: 401000 },
    { label: 'Oct', gmv: 16700000, mrr: 447000 },
    { label: 'Nov', gmv: 18420000, mrr: 486300 },
  ])

  const planDistribution = ref<{ plan: PlatformPlan; stores: number }[]>([
    { plan: 'free', stores: 1210 },
    { plan: 'trial', stores: 318 },
    { plan: 'starter', stores: 436 },
    { plan: 'growth', stores: 172 },
    { plan: 'enterprise', stores: 48 },
  ])

  return { activeStores, mrr, gmv, openAbuseCases, trend, planDistribution }
})
