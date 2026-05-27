export type Plan = 'trial' | 'free' | 'starter' | 'growth' | 'enterprise'

export interface PlanConfig {
  label: string
  color: string
  maxOrders: number | null
  maxSkus: number | null
  maxMembers: number | null
  features: string[]
}

export const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
  trial: {
    label: 'Free Trial',
    color: 'orange',
    maxOrders: 50,
    maxSkus: 50,
    maxMembers: 1,
    features: ['orders', 'products', 'inventory', 'settings'],
  },
  free: {
    label: 'Free',
    color: 'gray',
    maxOrders: 50,
    maxSkus: 50,
    maxMembers: 1,
    features: ['orders', 'products', 'inventory', 'settings'],
  },
  starter: {
    label: 'Starter',
    color: 'blue',
    maxOrders: 1000,
    maxSkus: 500,
    maxMembers: 3,
    features: ['orders', 'products', 'inventory', 'analytics', 'coupons', 'settings'],
  },
  growth: {
    label: 'Growth',
    color: 'indigo',
    maxOrders: null,
    maxSkus: null,
    maxMembers: 10,
    features: ['orders', 'products', 'inventory', 'analytics', 'coupons', 'staff', 'settings', 'builder'],
  },
  enterprise: {
    label: 'Enterprise',
    color: 'violet',
    maxOrders: null,
    maxSkus: null,
    maxMembers: null,
    features: ['orders', 'products', 'inventory', 'analytics', 'coupons', 'staff', 'settings', 'builder'],
  },
}

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false)
  const plan = useState<Plan>('plan', () => 'free')
  const trialDaysLeft = useState<number>('trialDaysLeft', () => 14)

  const planConfig = computed(() => PLAN_CONFIGS[plan.value])
  const isTrial = computed(() => plan.value === 'trial')
  const isPaid = computed(() => ['starter', 'growth', 'enterprise'].includes(plan.value))

  const hasFeature = (feature: string): boolean => {
    return planConfig.value.features.includes(feature)
  }

  const login = () => {
    isAuthenticated.value = true
  }

  const register = () => {
    isAuthenticated.value = true
    plan.value = 'trial'
    trialDaysLeft.value = 14
  }

  const logout = () => {
    isAuthenticated.value = false
    plan.value = 'free'
    trialDaysLeft.value = 0
  }

  return {
    isAuthenticated,
    plan,
    trialDaysLeft,
    planConfig,
    isTrial,
    isPaid,
    hasFeature,
    login,
    register,
    logout,
  }
}
