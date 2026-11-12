import type {
  ConfigPlan,
  PlatformGeneralConfig,
  PlatformMaintenance,
  PlatformProviderConfig,
  PlatformRateLimit,
} from '@/types/platformOps'

export const usePlatformConfigStore = defineStore('platformConfig', () => {
  const general = ref<PlatformGeneralConfig>({
    name: 'StoreOS',
    supportEmail: 'support@storeos.shop',
    locale: 'ar',
    currency: 'EGP',
    trialDays: 14,
  })

  const planFees = ref<Record<ConfigPlan, number>>({ free: 3.5, starter: 2.9, growth: 2.2, enterprise: 1.5 })
  const codFee = ref(12)

  const rateLimits = ref<PlatformRateLimit[]>([
    { key: 'storefrontApi', perMinute: 600 },
    { key: 'adminApi', perMinute: 300 },
    { key: 'webhooks', perMinute: 120 },
    { key: 'checkout', perMinute: 60 },
    { key: 'login', perMinute: 10 },
  ])

  const providers = ref<PlatformProviderConfig[]>([
    { id: 'paymob', name: 'Paymob', kind: 'payment', enabled: true },
    { id: 'fawry', name: 'Fawry', kind: 'payment', enabled: true },
    { id: 'valu', name: 'valU', kind: 'payment', enabled: true },
    { id: 'paytabs', name: 'PayTabs', kind: 'payment', enabled: false },
    { id: 'bosta', name: 'Bosta', kind: 'shipping', enabled: true },
    { id: 'aramex', name: 'Aramex', kind: 'shipping', enabled: true },
    { id: 'mylerz', name: 'Mylerz', kind: 'shipping', enabled: false },
  ])

  const maintenance = ref<PlatformMaintenance>({
    enabled: false,
    messageEn: 'StoreOS is undergoing scheduled maintenance. We will be back shortly.',
    messageAr: 'يخضع StoreOS لصيانة مجدولة. سنعود قريباً.',
  })

  return { general, planFees, codFee, rateLimits, providers, maintenance }
})
