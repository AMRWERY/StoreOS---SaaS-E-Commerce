const PUBLIC_ROUTES = ['/auth/login', '/auth/register']

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  const localePath = useLocalePath()

  const path = to.path.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/'

  const isPublic = PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

  if (!isAuthenticated.value && !isPublic) {
    return navigateTo(localePath('/auth/login'), { replace: true })
  }

  if (isAuthenticated.value && isPublic) {
    return navigateTo(localePath('/dashboard'), { replace: true })
  }
})
