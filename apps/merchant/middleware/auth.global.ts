const PROTECTED_PREFIXES = ['/dashboard', '/onboarding']
const AUTH_ROUTES = ['/auth/login', '/auth/register']
/** Preview visitors have no account yet, so account setup stays sign-in only. */
const GUEST_BLOCKED_PREFIXES = ['/onboarding']

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, isGuest, hasFeature, canWrite } = useAuth()
  const { openGate } = useAuthGate()
  const localePath = useLocalePath()

  const path = stripLocale(to.path)

  const isProtected = PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + '/'))
  const isAuthRoute = AUTH_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

  // Authenticated user on auth routes → dashboard
  if (isAuthenticated.value && isAuthRoute) {
    return navigateTo(localePath('/dashboard'), { replace: true })
  }

  if (isAuthenticated.value || !isProtected) return

  // Signed-out visitor in preview mode → allow the unlocked dashboard routes only
  if (isGuest.value) {
    const isBlocked = GUEST_BLOCKED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + '/'))

    if (!isBlocked) {
      const feature = featureForPath(path)
      const allowed = !feature || (feature.endsWith(':write') ? canWrite.value : hasFeature(feature))
      if (allowed) return

      // Locked route reached directly (typed URL, bookmark) → bounce home and explain why
      openGate(feature ?? undefined)
      return navigateTo(localePath('/dashboard'), { replace: true })
    }
  }

  // Unauthenticated user trying to access protected route → login
  return navigateTo(localePath('/auth/login'), { replace: true })
})
