import type { AutoDiscount } from '@/types/catalogOps'

export const useCatalogAutoDiscountsStore = defineStore('catalogAutoDiscounts', () => {
  const discounts = ref<AutoDiscount[]>([
    { id: 'AD-01', name: 'خصم الجمعة البيضاء', type: 'percentage', value: 25, eligibility: 'all', combinable: false, startsAt: '2026-11-27', endsAt: '2026-11-30', status: 'scheduled' },
    { id: 'AD-02', name: 'شحن مجاني فوق 1000 ج.م', type: 'free_shipping', value: 0, eligibility: 'min_subtotal', combinable: true, startsAt: '2026-10-01', endsAt: '2026-12-31', status: 'active' },
    { id: 'AD-03', name: 'خصم عملاء VIP', type: 'fixed', value: 150, eligibility: 'segment', combinable: true, startsAt: '2026-09-01', endsAt: '2026-12-01', status: 'active' },
    { id: 'AD-04', name: 'اشترِ 2 واحصل على 1', type: 'bxgy', value: 0, eligibility: 'all', combinable: false, startsAt: '2026-08-01', endsAt: '2026-09-01', status: 'expired' },
  ])

  function add(d: Omit<AutoDiscount, 'id' | 'status'>) {
    discounts.value.unshift({ ...d, id: `AD-${String(discounts.value.length + 1).padStart(2, '0')}`, status: 'active' })
  }

  return { discounts, add }
})
