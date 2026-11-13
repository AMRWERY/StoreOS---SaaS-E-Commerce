import type { AbandonStage, FunnelStep } from '@/types/insights'

export const useRepFunnelStore = defineStore('repFunnel', () => {
  /** 30-day baseline. Other ranges are scaled in the page. */
  const steps = ref<FunnelStep[]>([
    { key: 'sessions', count: 48200 },
    { key: 'productViews', count: 31400 },
    { key: 'addToCart', count: 6850 },
    { key: 'checkout', count: 3120 },
    { key: 'purchase', count: 1480 },
  ])
  const previousSteps = ref<FunnelStep[]>([
    { key: 'sessions', count: 44100 },
    { key: 'productViews', count: 28200 },
    { key: 'addToCart', count: 6120 },
    { key: 'checkout', count: 2790 },
    { key: 'purchase', count: 1290 },
  ])
  const abandonment = ref<AbandonStage[]>([
    { key: 'contact', count: 420 },
    { key: 'shipping', count: 510 },
    { key: 'payment', count: 760 },
    { key: 'review', count: 430 },
  ])

  return { steps, previousSteps, abandonment }
})
