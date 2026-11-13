import type { CatxSellingPlan, CatxSubscriber, PlanInterval, SubscriberStatus } from '@/types/catalogDepth'

export const useCatxSubscriptionsStore = defineStore('catxSubscriptions', () => {
  const plans = ref<CatxSellingPlan[]>([
    { id: 'PLN-01', name: 'عسل شهري', interval: 'monthly', discount: 10, products: 3, subscribers: 84, price: 290 },
    { id: 'PLN-02', name: 'قهوة أسبوعية', interval: 'weekly', discount: 5, products: 5, subscribers: 126, price: 180 },
    { id: 'PLN-03', name: 'صندوق العناية الفصلي', interval: 'quarterly', discount: 15, products: 8, subscribers: 41, price: 850 },
  ])

  const subscribers = ref<CatxSubscriber[]>([
    { id: 'SUB-01', customer: 'منى عبد الله', planId: 'PLN-01', nextBilling: '2026-12-01', status: 'active' },
    { id: 'SUB-02', customer: 'كريم السيد', planId: 'PLN-02', nextBilling: '2026-11-15', status: 'active' },
    { id: 'SUB-03', customer: 'هالة إبراهيم', planId: 'PLN-03', nextBilling: '2027-01-10', status: 'paused' },
    { id: 'SUB-04', customer: 'أحمد حسن', planId: 'PLN-02', nextBilling: '2026-11-18', status: 'cancelled' },
    { id: 'SUB-05', customer: 'سارة محمود', planId: 'PLN-01', nextBilling: '2026-11-28', status: 'active' },
  ])

  const intervalFactor: Record<PlanInterval, number> = { weekly: 4.33, monthly: 1, quarterly: 1 / 3 }

  const mrr = computed(() =>
    Math.round(
      subscribers.value
        .filter((s) => s.status === 'active')
        .reduce((sum, s) => {
          const plan = plans.value.find((p) => p.id === s.planId)
          return plan ? sum + plan.price * intervalFactor[plan.interval] : sum
        }, 0),
    ),
  )

  function addPlan(payload: { name: string; interval: PlanInterval; discount: number; price: number }) {
    plans.value.unshift({ id: `PLN-${String(plans.value.length + 1).padStart(2, '0')}`, products: 0, subscribers: 0, ...payload })
  }

  function setStatus(id: string, status: SubscriberStatus) {
    const s = subscribers.value.find((x) => x.id === id)
    if (s) s.status = status
  }

  return { plans, subscribers, mrr, addPlan, setStatus }
})
