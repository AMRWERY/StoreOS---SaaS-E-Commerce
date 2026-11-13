import type { AbandonedCheckout, DraftOrder } from '@/types/operations'

export const useDraftOrdersStore = defineStore('draftOrders', () => {
  const drafts = ref<DraftOrder[]>([
    { id: 'D-301', customer: 'Sara Mostafa', items: 3, total: 2450, status: 'open', createdAt: '2026-11-12' },
    { id: 'D-300', customer: 'Walk-in (phone order)', items: 1, total: 530, status: 'invoice_sent', createdAt: '2026-11-11' },
    { id: 'D-298', customer: 'Omar Hassan', items: 5, total: 7800, status: 'completed', createdAt: '2026-11-09' },
  ])

  const abandoned = ref<AbandonedCheckout[]>([
    { id: 'AC-512', customer: 'Hana Youssef', contact: '+20 111 555 0178', items: 2, total: 960, stage: 'payment', recovered: false, abandonedAt: '2026-11-12' },
    { id: 'AC-511', customer: 'Guest', contact: 'guest@example.com', items: 1, total: 340, stage: 'shipping', recovered: false, abandonedAt: '2026-11-12' },
    { id: 'AC-509', customer: 'Tarek Salah', contact: '+20 122 555 0102', items: 4, total: 4100, stage: 'cart', recovered: true, abandonedAt: '2026-11-10' },
  ])

  function removeDraft(id: string) {
    drafts.value = drafts.value.filter((d) => d.id !== id)
  }
  function markRecovered(id: string) {
    const a = abandoned.value.find((x) => x.id === id)
    if (a) a.recovered = true
  }

  return { drafts, abandoned, removeDraft, markRecovered }
})
