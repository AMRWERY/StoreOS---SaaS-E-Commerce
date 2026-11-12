// Legacy merchant-style sign-in (/auth) is kept as-is. The register / add-first-product pages were
// removed from the admin app: it is an operator console, not a merchant onboarding surface.
const PUBLIC_ROUTES = ['/auth', '/privacy', '/terms']

// The operator console is guarded by a mock operator session (composables/usePlatformAuth.ts) until
// a real auth backend exists. /platform/login is the only public page under /platform.
const PLATFORM_PREFIX = '/platform'
const PLATFORM_LOGIN = '/platform/login'
const STATUS_PREFIX = '/status'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  const { isOperator } = usePlatformAuth()
  const localePath = useLocalePath()

  const path = to.path.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/'

  if (path === PLATFORM_PREFIX || path.startsWith(`${PLATFORM_PREFIX}/`)) {
    if (path === PLATFORM_LOGIN) {
      // Already signed in → straight to the console.
      return isOperator.value ? navigateTo(localePath('/platform'), { replace: true }) : undefined
    }
    if (!isOperator.value) {
      return navigateTo(
        { path: localePath(PLATFORM_LOGIN), query: { redirect: path } },
        { replace: true },
      )
    }
    return
  }

  // Public status page: reachable by logged-out visitors, never redirected.
  if (path === STATUS_PREFIX || path.startsWith(`${STATUS_PREFIX}/`)) return

  // Admin entry points land on the platform console (which sends logged-out visitors to its login).
  if (path === '/') {
    return navigateTo(localePath('/platform'), { replace: true })
  }

  const isPublic = PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

  if (!isAuthenticated.value && !isPublic) {
    return navigateTo(localePath('/auth'), { replace: true })
  }

  if (isAuthenticated.value && isPublic) {
    return navigateTo(localePath('/platform'), { replace: true })
  }
})
