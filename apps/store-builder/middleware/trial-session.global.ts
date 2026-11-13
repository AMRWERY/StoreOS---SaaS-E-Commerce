/**
 * Store Builder is open to everyone with limited trial access, so start a
 * trial session for any visitor that has none yet (drives `hasFeature()` gating).
 */
export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, isGuest, register } = useAuth()
  if (!isAuthenticated.value && !isGuest.value) register('trial')
})
