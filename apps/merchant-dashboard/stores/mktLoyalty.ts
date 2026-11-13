import type { LoyaltyMember, LoyaltyTier } from '@/types/marketing'

export const useMktLoyaltyStore = defineStore('mktLoyalty', () => {
  const enabled = ref(true)
  const rules = reactive({ pointsPerEgp: 1, signupBonus: 100, reviewBonus: 25, redeemPointsPerEgp: 10 })
  const referral = reactive({ enabled: true, referrerReward: 100, refereeReward: 50, link: 'https://store.example.com/?ref=YOUR-CODE', count: 37 })
  const tiers = ref<LoyaltyTier[]>([
    { id: 'silver', threshold: 0, discountPct: 0, multiplier: 1 },
    { id: 'gold', threshold: 5000, discountPct: 5, multiplier: 1.5 },
    { id: 'vip', threshold: 15000, discountPct: 10, multiplier: 2 },
  ])
  const members = ref<LoyaltyMember[]>([
    { id: 'LM-101', name: 'منى إبراهيم', tier: 'vip', points: 18450, orders: 24 },
    { id: 'LM-102', name: 'أحمد حسن', tier: 'gold', points: 7200, orders: 11 },
    { id: 'LM-103', name: 'سارة مصطفى', tier: 'gold', points: 5640, orders: 9 },
    { id: 'LM-104', name: 'كريم فتحي', tier: 'silver', points: 1280, orders: 3 },
    { id: 'LM-105', name: 'نور عادل', tier: 'silver', points: 410, orders: 1 },
  ])

  return { enabled, rules, referral, tiers, members }
})
