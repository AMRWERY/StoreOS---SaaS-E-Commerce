const PROTECTED_PREFIXES = ['/dashboard', '/auth/add-first-product']
const AUTH_ROUTES = ['/auth', '/auth/register']
/** Preview visitors have no account yet, so account setup stays sign-in only. */
const GUEST_BLOCKED_PREFIXES = ['/auth/add-first-product']
const UPGRADE_ROUTE = '/dashboard/settings/billing-and-plan'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, isGuest, hasFeature, canWrite } = useAuth()
  const { openGate } = useAuthGate()
  const localePath = useLocalePath()

  const path = stripLocale(to.path)

  const isProtected = PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + '/'))
  // `/auth/add-first-product` lives under `/auth` but is the signed-in onboarding step, so it
  // must not count as an auth route (otherwise a new merchant is bounced past onboarding).
  const isAuthRoute =
    !isProtected && AUTH_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

  // Authenticated user on auth routes → dashboard
  if (isAuthenticated.value && isAuthRoute) {
    return navigateTo(localePath('/dashboard'), { replace: true })
  }

  if (!isProtected) return


  const feature = featureForPath(path)
  const allowsFeature = () =>
    !feature || (feature.endsWith(':write') ? canWrite.value : hasFeature(feature))

  // Signed-in merchant → the plan decides which dashboard tabs are reachable
  if (isAuthenticated.value) {
    if (allowsFeature() || path === UPGRADE_ROUTE) return

    // Locked by plan → send them where they can upgrade
    return navigateTo(
      localePath(hasFeature('settings') ? UPGRADE_ROUTE : '/dashboard'),
      { replace: true },
    )
  }

  // Signed-out visitor in preview mode → allow the unlocked dashboard routes only
  if (isGuest.value) {
    const isBlocked = GUEST_BLOCKED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + '/'))

    if (!isBlocked) {
      if (allowsFeature()) return

      // Locked route reached directly (typed URL, bookmark) → bounce home and explain why
      openGate(feature ?? undefined)
      return navigateTo(localePath('/dashboard'), { replace: true })
    }

    // Account-only routes (e.g. onboarding) → explain why via the sign-up prompt, not a bare login page.
    openGate()
    return navigateTo(localePath('/dashboard'), { replace: true })
  }

  // Unauthenticated user trying to access protected route → login
  return navigateTo(localePath('/auth'), { replace: true })
})
