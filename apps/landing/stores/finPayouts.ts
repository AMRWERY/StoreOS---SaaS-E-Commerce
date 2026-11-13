import type { FeeStatement, Payout } from '@/types/insights'

export const useFinPayoutsStore = defineStore('finPayouts', () => {
  const available = ref(48250)
  const pending = ref(21480)
  const nextPayoutDate = ref('2026-11-15')
  const payouts = ref<Payout[]>([
    { id: 'PO-2611-03', date: '2026-11-10', amount: 36400, orders: 58, fees: 1820, status: 'inTransit' },
    { id: 'PO-2611-02', date: '2026-11-05', amount: 41250, orders: 66, fees: 2060, status: 'paid' },
    { id: 'PO-2610-05', date: '2026-10-29', amount: 29800, orders: 47, fees: 1490, status: 'failed' },
    { id: 'PO-2610-04', date: '2026-10-22', amount: 38900, orders: 61, fees: 1945, status: 'paid' },
  ])
  const statements = ref<FeeStatement[]>([
    { id: 'FS-2610', period: '2026-10', gmv: 312000, fee: 9360, issuedAt: '2026-11-01' },
    { id: 'FS-2609', period: '2026-09', gmv: 268500, fee: 8055, issuedAt: '2026-10-01' },
    { id: 'FS-2608', period: '2026-08', gmv: 241000, fee: 7230, issuedAt: '2026-09-01' },
  ])
  /** Order value by payment type, last 30 days. */
  const split = ref({ cod: 187400, online: 124600 })

  return { available, pending, nextPayoutDate, payouts, statements, split }
})
