import type { Plan, PlanConfig } from '../types/auth'

/**
 * Features a signed-out visitor may explore via "Start free trial" on the login page.
 * Everything omitted here is gated behind `useAuthGate().requireAuth()`.
 * Writing is never allowed in preview — see `canWrite` below.
 */
export const GUEST_FEATURES = ['dashboard', 'orders', 'products'] as const

/**
 * Dashboard access ladder. Each plan adds to the one below it, matching the
 * comparison table in `home-components/pricing.vue`:
 *
 *   tab / feature   guest  free  starter  growth  enterprise
 *   dashboard         ✓     ✓       ✓       ✓         ✓
 *   orders            ✓     ✓       ✓       ✓         ✓
 *   products          ✓     ✓       ✓       ✓         ✓
 *   inventory         ✗     ✓       ✓       ✓         ✓
 *   settings          ✗     ✓       ✓       ✓         ✓
 *   profile           ✗     ✓       ✓       ✓         ✓
 *   customers (CRM)   ✗     ✗       ✓       ✓         ✓
 *   analytics         ✗     ✗       ✓       ✓         ✓
 *   payments          ✗     ✗       ✓       ✓         ✓
 *   shipping          ✗     ✗       ✓       ✓         ✓
 *   notifications     ✗     ✗       ✓       ✓         ✓
 *   coupons           ✗     ✗       ✗       ✓         ✓
 *   builder           ✗     ✗       ✗       ✓         ✓
 *   staff             ✗     ✗       ✗       ✓         ✓
 *   api               ✗     ✗       ✗       ✗         ✓
 *
 * Free stays cash-on-delivery only with no integrations (ROADMAP Phase 1);
 * payment/shipping/notification settings arrive with Starter.
 */
const FREE_FEATURES = [...GUEST_FEATURES, 'inventory', 'settings', 'profile']
const STARTER_FEATURES = [
  ...FREE_FEATURES,
  'customers',
  'analytics',
  'payments',
  'shipping',
  'notifications',
]
const GROWTH_FEATURES = [...STARTER_FEATURES, 'coupons', 'builder', 'staff']
const ENTERPRISE_FEATURES = [...GROWTH_FEATURES, 'api']

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
    features: FREE_FEATURES,
  },
  free: {
    label: 'Free',
    color: 'gray',
    maxOrders: 50,
    maxSkus: 50,
    maxMembers: 1,
    features: FREE_FEATURES,
  },
  starter: {
    label: 'Starter',
    color: 'blue',
    maxOrders: 1000,
    maxSkus: 500,
    maxMembers: 3,
    features: STARTER_FEATURES,
  },
  growth: {
    label: 'Growth',
    color: 'indigo',
    maxOrders: null,
    maxSkus: null,
    maxMembers: 10,
    features: GROWTH_FEATURES,
  },
  enterprise: {
    label: 'Enterprise',
    color: 'violet',
    maxOrders: null,
    maxSkus: null,
    maxMembers: null,
    features: ENTERPRISE_FEATURES,
  },
}

const PLAN_TRIAL_DAYS: Partial<Record<Plan, number>> = {
  trial: 14,
  starter: 14,
  growth: 14,
  enterprise: 14,
}

export const PAID_TIERS: Plan[] = ['starter', 'growth', 'enterprise']

/**
 * Trialling a paid tier is not the same as paying for it: a Starter trial has
 * `plan: 'starter'` with days remaining and no card on file. Keep the two apart or
 * the trial banner disappears for exactly the merchants it is meant to convert.
 */
export const isTrialingPlan = (plan: Plan, trialDaysLeft: number): boolean =>
  // 'guest' and 'free' are never trials, whatever the day counter says — it defaults to 14.
  plan !== 'guest' && plan !== 'free' && (plan === 'trial' || trialDaysLeft > 0)

/** On a paid tier with the trial already over — i.e. actually subscribed. */
export const isPayingPlan = (plan: Plan, trialDaysLeft: number): boolean =>
  PAID_TIERS.includes(plan) && !isTrialingPlan(plan, trialDaysLeft)

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false)
  const plan = useState<Plan>('plan', () => 'free')
  const trialDaysLeft = useState<number>('trialDaysLeft', () => 14)

  const planConfig = computed(() => PLAN_CONFIGS[plan.value])
  /** Signed-out visitor exploring the dashboard with sample data. */
  const isGuest = computed(() => !isAuthenticated.value && plan.value === 'guest')
  const isTrial = computed(() => !isGuest.value && isTrialingPlan(plan.value, trialDaysLeft.value))
  const isPaid = computed(() => isPayingPlan(plan.value, trialDaysLeft.value))
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
