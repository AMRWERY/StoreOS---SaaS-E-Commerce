const PROTECTED_PREFIXES = ['/dashboard', '/onboarding']
const AUTH_ROUTES = ['/auth/login', '/auth/register']

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  const localePath = useLocalePath()

  const path = to.path.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/'

  const isProtected = PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + '/'))
  const isAuthRoute = AUTH_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

  // Unauthenticated user trying to access protected route → login
  if (!isAuthenticated.value && isProtected) {
    return navigateTo(localePath('/auth/login'), { replace: true })
  }

  // Authenticated user on auth routes → dashboard
  if (isAuthenticated.value && isAuthRoute) {
    return navigateTo(localePath('/dashboard'), { replace: true })
  }
})
