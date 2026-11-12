/**
 * Mock operator session for the platform console.
 *
 * There is no auth backend yet: the session is just a cookie holding the operator's email so the
 * route guard (middleware/auth.global.ts) works on both server and client and survives a reload.
 * Replace `signIn` / `signOut` with real API calls (and a server-verified session) later — the
 * guard and the UI only depend on `isOperator`.
 */
export const usePlatformAuth = () => {
  const session = useCookie<string | null>('platform_operator', {
    default: () => null,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  const isOperator = computed(() => !!session.value)
  const operatorEmail = computed(() => session.value ?? '')
  const operatorName = computed(() => operatorEmail.value.split('@')[0] ?? '')
  const operatorInitials = computed(() => operatorName.value.slice(0, 2).toUpperCase() || 'OP')

  const signIn = (email: string) => {
    session.value = email.trim().toLowerCase()
  }
  const signOut = () => {
    session.value = null
  }

  return { isOperator, operatorEmail, operatorName, operatorInitials, signIn, signOut }
}
