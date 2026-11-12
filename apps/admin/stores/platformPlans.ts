import type { PlanEntitlement, PlatformPlan } from '@/types/platform'

export const PLATFORM_FEATURES = [
  'dashboard', 'orders', 'products', 'inventory', 'settings', 'profile',
  'customers', 'analytics', 'payments', 'shipping', 'notifications',
  'coupons', 'builder', 'staff', 'api',
] as const

export const PLATFORM_PLANS: PlatformPlan[] = ['trial', 'free', 'starter', 'growth', 'enterprise']

const FREE = ['dashboard', 'orders', 'products', 'inventory', 'settings', 'profile']
const STARTER = [...FREE, 'customers', 'analytics', 'payments', 'shipping', 'notifications']
const GROWTH = [...STARTER, 'coupons', 'builder', 'staff']
const ENTERPRISE = [...GROWTH, 'api']

export const usePlatformPlansStore = defineStore('platformPlans', () => {
  const plans = ref<PlanEntitlement[]>([
    { plan: 'trial', priceEgp: 0, maxOrders: 50, maxSkus: 50, maxStaff: 1, features: [...FREE] },
    { plan: 'free', priceEgp: 0, maxOrders: 50, maxSkus: 50, maxStaff: 1, features: [...FREE] },
    { plan: 'starter', priceEgp: 299, maxOrders: 1000, maxSkus: 500, maxStaff: 3, features: STARTER },
    { plan: 'growth', priceEgp: 799, maxOrders: null, maxSkus: null, maxStaff: 10, features: GROWTH },
    { plan: 'enterprise', priceEgp: 2499, maxOrders: null, maxSkus: null, maxStaff: null, features: ENTERPRISE },
  ])

  const limitFor = (plan: PlatformPlan) => plans.value.find((p) => p.plan === plan)

  return { plans, limitFor }
})
