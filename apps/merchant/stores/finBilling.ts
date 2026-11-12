import type { SubscriptionInvoice } from '@/types/insights'

export const useFinBillingStore = defineStore('finBilling', () => {
  const usage = ref({ orders: 612, skus: 214, members: 2 })
  const invoices = ref<SubscriptionInvoice[]>([
    { id: 'INV-2611', period: '2026-11', net: 499, status: 'due', issuedAt: '2026-11-01' },
    { id: 'INV-2610', period: '2026-10', net: 499, status: 'failed', issuedAt: '2026-10-01' },
    { id: 'INV-2609', period: '2026-09', net: 499, status: 'paid', issuedAt: '2026-09-01' },
    { id: 'INV-2608', period: '2026-08', net: 499, status: 'paid', issuedAt: '2026-08-01' },
  ])
  const card = ref({ brand: 'Visa', last4: '4242', expiry: '08/27' })
  const planPrices: Record<string, number> = { guest: 0, free: 0, trial: 0, starter: 499, growth: 1299, enterprise: 3999 }

  function updateCard(last4: string, expiry: string) {
    card.value = { brand: 'Visa', last4, expiry }
    invoices.value = invoices.value.map((i) => (i.status === 'failed' ? { ...i, status: 'due' as const } : i))
  }

  return { usage, invoices, card, planPrices, updateCard }
})
