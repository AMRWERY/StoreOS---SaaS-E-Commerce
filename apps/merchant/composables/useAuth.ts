import type { Plan, PlanConfig } from '../types/auth'

/**
 * Features a signed-out visitor may explore via "Start free trial" on the login page.
 * Everything omitted here is gated behind `useAuthGate().requireAuth()`.
 * Writing is never allowed in preview — see `canWrite` below.
 */
export const GUEST_FEATURES = ['dashboard', 'orders', 'products'] as const

export const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
  guest: {
    label: 'Preview',
    color: 'indigo',
    maxOrders: 0,
    maxSkus: 0,
    maxMembers: 0,
    features: [...GUEST_FEATURES],
  },
  trial: {
    label: 'Free Trial',
    color: 'orange',
    maxOrders: 50,
    maxSkus: 50,
    maxMembers: 1,
    features: ['dashboard', 'orders', 'products', 'customers', 'inventory', 'settings', 'profile'],
  },
  free: {
    label: 'Free',
    color: 'gray',
    maxOrders: 50,
    maxSkus: 50,
    maxMembers: 1,
    features: ['dashboard', 'orders', 'products', 'customers', 'inventory', 'settings', 'profile'],
  },
  starter: {
    label: 'Starter',
    color: 'blue',
    maxOrders: 1000,
    maxSkus: 500,
    maxMembers: 3,
    features: ['dashboard', 'orders', 'products', 'customers', 'inventory', 'analytics', 'coupons', 'settings', 'profile'],
  },
  growth: {
    label: 'Growth',
    color: 'indigo',
    maxOrders: null,
    maxSkus: null,
    maxMembers: 10,
    features: ['dashboard', 'orders', 'products', 'customers', 'inventory', 'analytics', 'coupons', 'staff', 'settings', 'profile', 'builder'],
  },
  enterprise: {
    label: 'Enterprise',
    color: 'violet',
    maxOrders: null,
    maxSkus: null,
    maxMembers: null,
    features: ['dashboard', 'orders', 'products', 'customers', 'inventory', 'analytics', 'coupons', 'staff', 'settings', 'profile', 'builder'],
  },
}

const PLAN_TRIAL_DAYS: Partial<Record<Plan, number>> = {
  trial: 14,
  starter: 14,
  growth: 14,
  enterprise: 14,
}

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false)
  const plan = useState<Plan>('plan', () => 'free')
  const trialDaysLeft = useState<number>('trialDaysLeft', () => 14)

  const planConfig = computed(() => PLAN_CONFIGS[plan.value])
  /** Signed-out visitor exploring the dashboard with sample data. */
  const isGuest = computed(() => !isAuthenticated.value && plan.value === 'guest')
  const isTrial = computed(() => plan.value === 'trial' || (trialDaysLeft.value > 0 && !['free', 'guest'].includes(plan.value) && !isPaid.value))
  const isPaid = computed(() => ['starter', 'growth', 'enterprise'].includes(plan.value))
  /** Preview visitors may browse but never create, edit, delete or export. */
  const canWrite = computed(() => !isGuest.value)

  const hasFeature = (feature: string): boolean => {
    return planConfig.value.features.includes(feature)
  }

  const login = () => {
    isAuthenticated.value = true
    if (plan.value === 'guest') plan.value = 'free'
  }

  const register = (selectedPlan: Plan = 'trial') => {
    isAuthenticated.value = true
    plan.value = selectedPlan
    trialDaysLeft.value = PLAN_TRIAL_DAYS[selectedPlan] ?? 0
  }

  const logout = () => {
    isAuthenticated.value = false
    plan.value = 'free'
    trialDaysLeft.value = 0
  }

  /** Enter the signed-out dashboard preview (login page → "Start free trial"). */
  const startGuestPreview = () => {
    isAuthenticated.value = false
    plan.value = 'guest'
    trialDaysLeft.value = 0
  }

  const exitGuestPreview = () => {
    plan.value = 'free'
  }

  return {
    isAuthenticated,
    plan,
    trialDaysLeft,
    planConfig,
    isGuest,
    isTrial,
    isPaid,
    canWrite,
    hasFeature,
    login,
    register,
    logout,
    startGuestPreview,
    exitGuestPreview,
  }
}
