import type { Stat, Coupon } from '@/types/coupons'

export const useCouponsStore = defineStore('coupons', () => {
  const isPanelOpen = ref(false)

  const stats = ref<Stat[]>([
    { label: 'ACTIVE COUPONS', value: '1,284', trend: '+12%' },
    { label: 'TOTAL REDEMPTIONS', value: '42,901', trend: null },
    { label: 'REVENUE GENERATED', value: '$ 840k', trend: null },
  ])

  const coupons = ref<Coupon[]>([
    { code: 'SUMMER24', type: 'PERCENTAGE', value: '15%', minOrder: '$ 500', usage: 45, color: 'bg-indigo-500' },
    { code: 'WELCOME50', type: 'FIXED', value: '$ 50', minOrder: '-', usage: 72, color: 'bg-orange-500' },
    { code: 'OLD_COOB', type: 'PERCENTAGE', value: '10%', minOrder: '$ 300', usage: 12, color: 'bg-indigo-500' },
    { code: 'FLASH30', type: 'PERCENTAGE', value: '30%', minOrder: '$ 200', usage: 88, color: 'bg-emerald-500' },
    { code: 'FREESHIP', type: 'SHIPPING', value: 'Free', minOrder: '$ 100', usage: 55, color: 'bg-sky-500' },
    { code: 'VIP2026', type: 'FIXED', value: '$ 150', minOrder: '$ 1,000', usage: 24, color: 'bg-purple-500' },
  ])

  function addCoupon(coupon: Coupon) {
    coupons.value.unshift(coupon)
  }

  return { isPanelOpen, stats, coupons, addCoupon }
})
