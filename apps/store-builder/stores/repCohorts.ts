import type { CohortRow } from '@/types/insights'

export const useRepCohortsStore = defineStore('repCohorts', () => {
  const cohorts = ref<CohortRow[]>([
    { cohort: '2026-05', size: 312, retention: [100, 34, 26, 22, 19, 17], ltv: 1840 },
    { cohort: '2026-06', size: 358, retention: [100, 36, 28, 23, 20], ltv: 1710 },
    { cohort: '2026-07', size: 402, retention: [100, 38, 29, 24], ltv: 1625 },
    { cohort: '2026-08', size: 447, retention: [100, 33, 25], ltv: 1480 },
    { cohort: '2026-09', size: 519, retention: [100, 37], ltv: 1210 },
    { cohort: '2026-10', size: 573, retention: [100], ltv: 820 },
  ])

  return { cohorts }
})
