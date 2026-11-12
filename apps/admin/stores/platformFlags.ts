import type { PlatformFlag } from '@/types/platform'

export const usePlatformFlagsStore = defineStore('platformFlags', () => {
  const flags = ref<PlatformFlag[]>([
    { key: 'checkout_v2', enabled: true, rollout: 60, targetPlan: 'growth', environment: 'production' },
    { key: 'whatsapp_order_updates', enabled: true, rollout: 100, targetPlan: 'starter', environment: 'production' },
    { key: 'ai_product_descriptions', enabled: false, rollout: 10, targetPlan: 'enterprise', environment: 'staging' },
    { key: 'bosta_auto_dispatch', enabled: true, rollout: 35, targetPlan: 'all', environment: 'production' },
    { key: 'storefront_arabic_seo', enabled: true, rollout: 100, targetPlan: 'all', environment: 'production' },
    { key: 'bulk_import_v3', enabled: false, rollout: 0, targetPlan: 'growth', environment: 'staging' },
  ])

  return { flags }
})
