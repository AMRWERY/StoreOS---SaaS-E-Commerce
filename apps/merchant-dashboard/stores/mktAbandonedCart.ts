import type { RecoveryStep } from '@/types/marketing'

export const useMktAbandonedCartStore = defineStore('mktAbandonedCart', () => {
  const steps = ref<RecoveryStep[]>([
    { id: 'step-1', channel: 'whatsapp', delayHours: 1, enabled: true, couponPct: 0, template: 'Hi {{name}}, you left something in your cart. Complete your order here: {{cart_link}}' },
    { id: 'step-2', channel: 'email', delayHours: 24, enabled: true, couponPct: 10, template: 'Still thinking it over, {{name}}? Here is 10% off to finish your order: {{cart_link}}' },
    { id: 'step-3', channel: 'sms', delayHours: 72, enabled: false, couponPct: 0, template: 'Last call {{name}}! Your cart is waiting: {{cart_link}}' },
  ])
  const stats = ref({ abandoned: 412, recovered: 68, revenue: 54300 })

  return { steps, stats }
})
