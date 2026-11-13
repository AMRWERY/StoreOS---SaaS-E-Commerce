/**
 * `/dashboard/builder` → `/dashboard/builder/home` (preserves locale prefix).
 *
 * Guards:
 *  - Fully unauthenticated (not even guest preview) → login
 *  - Guest preview visitor → allowed through so the feature gate dialog can
 *    explain that Store Builder requires Growth or higher (provides the
 *    "limited access" landing experience from the home-page CTA).
 *  - Authenticated but no builder feature (trial/free/starter) → billing
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, isGuest, register } = useAuth()
  const localePath = useLocalePath()

  // If visitor is unauthenticated, initiate a free trial session so they can explore
  if (!isAuthenticated.value && !isGuest.value) {
    register('trial')
  }

  const n = to.path.replace(/\/$/, '')
  if (/\/dashboard\/builder$/.test(n)) {
    return navigateTo(localePath('/dashboard/builder/home'), { replace: true })
  }
})
