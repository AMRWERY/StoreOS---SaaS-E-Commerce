import type { Affiliate, AffiliatePayout, AffiliateStatus } from '@/types/marketing'

export const useMktAffiliatesStore = defineStore('mktAffiliates', () => {
  const affiliates = ref<Affiliate[]>([
    { id: 'AF-01', name: 'ياسمين طارق', code: 'YASMEEN10', clicks: 1840, orders: 96, commission: 10, earnings: 14200, status: 'approved' },
    { id: 'AF-02', name: 'عمر سعيد', code: 'OMAR-S', clicks: 920, orders: 41, commission: 8, earnings: 5300, status: 'approved' },
    { id: 'AF-03', name: 'ليلى حسام', code: 'LAYLA25', clicks: 0, orders: 0, commission: 10, earnings: 0, status: 'pending' },
    { id: 'AF-04', name: 'مصطفى جمال', code: 'MOSTAFA5', clicks: 310, orders: 2, commission: 5, earnings: 180, status: 'blocked' },
  ])
  const settings = reactive({ defaultCommission: 10, cookieDays: 30, minPayout: 500, autoApprove: false })
  const payouts = ref<AffiliatePayout[]>([
    { id: 'PO-301', affiliate: 'ياسمين طارق', amount: 6200, date: '2026-10-01', method: 'wallet', status: 'paid' },
    { id: 'PO-302', affiliate: 'عمر سعيد', amount: 2100, date: '2026-10-01', method: 'bank', status: 'paid' },
    { id: 'PO-303', affiliate: 'ياسمين طارق', amount: 8000, date: '2026-11-01', method: 'wallet', status: 'pending' },
  ])

  function setStatus(id: string, status: AffiliateStatus) {
    const a = affiliates.value.find((x) => x.id === id)
    if (a) a.status = status
  }

  return { affiliates, settings, payouts, setStatus }
})
