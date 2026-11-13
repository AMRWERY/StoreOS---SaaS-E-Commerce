/**
 * Sign-in gate for the signed-out dashboard preview.
 *
 * Any locked interaction routes through `requireAuth()`: it returns `true` when the
 * visitor may proceed, or opens the `<auth-required-dialog>` and returns `false`.
 * State lives in `useState` so route middleware can open the dialog before render.
 */
export function useAuthGate() {
  const { isAuthenticated, isGuest, hasFeature, canWrite } = useAuth()

  const isGateOpen = useState<boolean>('auth-gate-open', () => false)
  /** Feature key of the blocked action — used to look up the dialog copy. */
  const gateFeature = useState<string | null>('auth-gate-feature', () => null)

  const openGate = (feature?: string) => {
    gateFeature.value = feature ?? null
    isGateOpen.value = true
  }

  const closeGate = () => {
    isGateOpen.value = false
    gateFeature.value = null
  }

  /**
   * @param feature  Plan feature key to check (e.g. 'analytics'). Omit for a write action.
   * @returns        `true` when allowed; `false` after opening the sign-in dialog.
   */
  const requireAuth = (feature?: string): boolean => {
    if (isAuthenticated.value) return true

    if (!isGuest.value) {
      openGate(feature)
      return false
    }

    const allowed = feature ? hasFeature(feature) : canWrite.value
    if (!allowed) {
      openGate(feature)
      return false
    }

    return true
  }

  return { isGateOpen, gateFeature, openGate, closeGate, requireAuth }
}
