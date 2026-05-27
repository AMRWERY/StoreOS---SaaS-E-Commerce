/**
 * `/dashboard/builder` → `/dashboard/builder/home` (preserves locale prefix).
 * Guards: unauthenticated → login, no builder feature (trial/free/starter) → billing.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, hasFeature } = useAuth()
  const localePath = useLocalePath()

  if (!isAuthenticated.value) {
    return navigateTo(localePath('/auth/login'), { replace: true })
  }

  if (!hasFeature('builder')) {
    return navigateTo(localePath('/dashboard/settings/billing-and-plan'), { replace: true })
  }

  const n = to.path.replace(/\/$/, '')
  if (/\/dashboard\/builder$/.test(n)) {
    return navigateTo(`${n}/home`, { replace: true })
  }
})
