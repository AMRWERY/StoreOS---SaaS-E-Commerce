import type { FailedJob, ProviderHealth, QueueStat } from '@/types/platform'

export const usePlatformHealthStore = defineStore('platformHealth', () => {
  const providers = ref<ProviderHealth[]>([
    { id: 'paymob', name: 'Paymob', icon: 'ph:credit-card', status: 'healthy', latencyMs: 212, uptime: 99.98 },
    { id: 'stripe', name: 'Stripe', icon: 'ph:stripe-logo', status: 'healthy', latencyMs: 148, uptime: 99.99 },
    { id: 'bosta', name: 'Bosta', icon: 'ph:truck', status: 'degraded', latencyMs: 940, uptime: 98.7 },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'ph:whatsapp-logo', status: 'healthy', latencyMs: 305, uptime: 99.9 },
    { id: 'email', name: 'Email (SES)', icon: 'ph:envelope-simple', status: 'down', latencyMs: 0, uptime: 96.2 },
  ])

  const failedJobs = ref<FailedJob[]>([
    { id: 'job_8812', kind: 'webhook', provider: 'Bosta', store: 'Nile Threads', error: 'HTTP 504 gateway timeout', attempts: 5, failedAt: '2026-11-12 09:41' },
    { id: 'job_8811', kind: 'email', provider: 'Email (SES)', store: 'Delta Electronics', error: 'Connection refused', attempts: 3, failedAt: '2026-11-12 09:12' },
    { id: 'job_8807', kind: 'webhook', provider: 'Paymob', store: 'Alex Spice House', error: 'Invalid HMAC signature', attempts: 2, failedAt: '2026-11-12 08:30' },
    { id: 'job_8799', kind: 'sync', provider: 'WhatsApp', store: 'Habiba Beauty', error: 'Template not approved', attempts: 4, failedAt: '2026-11-11 22:05' },
  ])

  const queues = ref<QueueStat[]>([
    { name: 'order-events', depth: 128, processing: 12, failed24h: 4, oldestSeconds: 9 },
    { name: 'email-dispatch', depth: 2410, processing: 0, failed24h: 188, oldestSeconds: 1260 },
    { name: 'shipping-sync', depth: 534, processing: 6, failed24h: 31, oldestSeconds: 240 },
    { name: 'webhook-delivery', depth: 77, processing: 9, failed24h: 12, oldestSeconds: 14 },
  ])

  const retry = (id: string) => {
    failedJobs.value = failedJobs.value.filter((j) => j.id !== id)
  }

  return { providers, failedJobs, queues, retry }
})
