import type {
  SandboxDelivery,
  SandboxScope,
  SandboxStore,
  SandboxTheme,
  SandboxToken,
  SandboxWebhook,
} from '@/types/platformOps'

const NOW = '2026-11-12 10:40'

export const usePlatformSandboxStore = defineStore('platformSandbox', () => {
  const stores = ref<SandboxStore[]>([
    { id: 'sbx_201', name: 'dawn-dev-cairo', createdAt: '2026-11-01', resetAt: '2026-11-09', theme: 'dawn', status: 'active' },
    { id: 'sbx_202', name: 'noor-rtl-qa', createdAt: '2026-10-22', resetAt: '', theme: 'noor', status: 'active' },
    { id: 'sbx_203', name: 'souq-checkout-test', createdAt: '2026-09-30', resetAt: '2026-10-18', theme: 'souq', status: 'archived' },
  ])

  const tokens = ref<SandboxToken[]>([
    { id: 'tok_1', name: 'CI theme deploy', prefix: 'sos_test_a41f', scopes: ['themes:read', 'themes:write'], createdAt: '2026-10-12', revoked: false },
    { id: 'tok_2', name: 'Local dev - Omar', prefix: 'sos_test_9c02', scopes: ['themes:read', 'stores:read'], createdAt: '2026-09-28', revoked: true },
  ])

  const webhooks = ref<SandboxWebhook[]>([
    { id: 'wh_1', url: 'https://hooks.example.com/storeos/orders', event: 'order.created', enabled: true },
    { id: 'wh_2', url: 'https://hooks.example.com/storeos/payments', event: 'payment.captured', enabled: false },
  ])

  const deliveries = ref<SandboxDelivery[]>([
    { id: 'd_2', at: '2026-11-11 18:02', event: 'order.created', code: 200 },
    { id: 'd_1', at: '2026-11-11 17:48', event: 'payment.captured', code: 500 },
  ])

  const createStore = (name: string, theme: SandboxTheme) => {
    stores.value.unshift({ id: `sbx_${204 + stores.value.length - 3}`, name, createdAt: '2026-11-12', resetAt: '', theme, status: 'active' })
  }
  const reset = (id: string) => {
    const target = stores.value.find((s) => s.id === id)
    if (target) {
      target.resetAt = '2026-11-12'
      target.status = 'active'
    }
  }
  const createToken = (name: string, scopes: SandboxScope[]): string => {
    const prefix = `sos_test_${Math.random().toString(16).slice(2, 6)}`
    tokens.value.unshift({ id: `tok_${tokens.value.length + 1}`, name, prefix, scopes, createdAt: '2026-11-12', revoked: false })
    return `${prefix}${Math.random().toString(16).slice(2, 14)}`
  }
  const revokeToken = (id: string) => {
    const target = tokens.value.find((tk) => tk.id === id)
    if (target) target.revoked = true
  }
  const sendTest = (id: string) => {
    const hook = webhooks.value.find((w) => w.id === id)
    if (!hook) return
    deliveries.value.unshift({ id: `d_${deliveries.value.length + 1}`, at: NOW, event: hook.event, code: hook.enabled ? 200 : 410 })
  }

  return { stores, tokens, webhooks, deliveries, createStore, reset, createToken, revokeToken, sendTest }
})
