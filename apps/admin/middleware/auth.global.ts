const PUBLIC_ROUTES = ['/auth', '/auth/register']

// The operator console is a mock-data control plane with no auth backend yet,
// so /platform/* is reachable directly. The legacy merchant-style dashboard
// still sits behind the old in-memory auth guard.
const PLATFORM_PREFIX = '/platform'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  const localePath = useLocalePath()

  const path = to.path.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/'

  if (path === PLATFORM_PREFIX || path.startsWith(`${PLATFORM_PREFIX}/`)) return

  // Admin entry points land on the platform console.
  if (path === '/' || path === '/dashboard') {
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
