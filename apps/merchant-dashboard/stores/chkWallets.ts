import type { WalletProvider } from '@/types/checkoutExtras'

export const useChkWalletsStore = defineStore('chkWallets', () => {
  const testMode = ref(true)
  const oneClick = ref(true)

  const providers = ref<WalletProvider[]>([
    { id: 'apple_pay', kind: 'express', icon: 'ph:apple-logo-bold', connection: 'connected', enabled: true, minAmount: 50, maxAmount: 50000, feePercent: 2.5, plans: [], enabledPlans: [] },
    { id: 'google_pay', kind: 'express', icon: 'ph:google-logo-bold', connection: 'connected', enabled: true, minAmount: 50, maxAmount: 50000, feePercent: 2.5, plans: [], enabledPlans: [] },
    { id: 'vodafone_cash', kind: 'wallet', icon: 'ph:device-mobile-bold', connection: 'connected', enabled: true, minAmount: 20, maxAmount: 30000, feePercent: 1.5, plans: [], enabledPlans: [] },
    { id: 'orange_cash', kind: 'wallet', icon: 'ph:device-mobile-bold', connection: 'pending', enabled: false, minAmount: 20, maxAmount: 30000, feePercent: 1.5, plans: [], enabledPlans: [] },
    { id: 'valu', kind: 'bnpl', icon: 'ph:calendar-check-bold', connection: 'connected', enabled: true, minAmount: 500, maxAmount: 100000, feePercent: 4, plans: [3, 6, 12], enabledPlans: [3, 6] },
    { id: 'sympl', kind: 'bnpl', icon: 'ph:calendar-check-bold', connection: 'not_connected', enabled: false, minAmount: 300, maxAmount: 60000, feePercent: 3.5, plans: [3, 6], enabledPlans: [3] },
    { id: 'contact', kind: 'bnpl', icon: 'ph:calendar-check-bold', connection: 'not_connected', enabled: false, minAmount: 1000, maxAmount: 200000, feePercent: 5, plans: [3, 6, 12], enabledPlans: [6, 12] },
  ])

  function byKind(kind: WalletProvider['kind']) {
    return providers.value.filter((p) => p.kind === kind)
  }
  function connect(id: string) {
    const p = providers.value.find((x) => x.id === id)
    if (p) p.connection = 'connected'
  }
  function togglePlan(id: string, months: number) {
    const p = providers.value.find((x) => x.id === id)
    if (!p) return
    p.enabledPlans = p.enabledPlans.includes(months)
      ? p.enabledPlans.filter((m) => m !== months)
      : [...p.enabledPlans, months].sort((a, b) => a - b)
  }

  return { testMode, oneClick, providers, byKind, connect, togglePlan }
})
