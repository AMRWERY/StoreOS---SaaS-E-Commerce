import type { EcoDelivery } from '@/types/ecosystem'

export const useEcoWebhookLogStore = defineStore('ecoWebhookLog', () => {
  const deliveries = ref<EcoDelivery[]>([
    {
      id: 'dl_9f21', event: 'order.created', endpoint: 'https://erp.example.eg/hooks/orders', attempts: 1, statusCode: 200, status: 'delivered', time: '2026-11-12 09:14:02',
      request: '{\n  "event": "order.created",\n  "data": { "id": "ORD-10492", "total": 1850, "currency": "EGP" }\n}',
      response: '{\n  "ok": true\n}',
    },
    {
      id: 'dl_9f20', event: 'order.paid', endpoint: 'https://erp.example.eg/hooks/orders', attempts: 3, statusCode: 502, status: 'retrying', time: '2026-11-12 09:10:41',
      request: '{\n  "event": "order.paid",\n  "data": { "id": "ORD-10491", "total": 940, "currency": "EGP" }\n}',
      response: '{\n  "error": "Bad Gateway"\n}',
    },
    {
      id: 'dl_9f1e', event: 'product.updated', endpoint: 'https://sync.example.eg/inbound', attempts: 5, statusCode: 500, status: 'failed', time: '2026-11-12 08:02:19',
      request: '{\n  "event": "product.updated",\n  "data": { "id": "P-221", "stock": 12 }\n}',
      response: '{\n  "error": "Internal Server Error"\n}',
    },
    {
      id: 'dl_9f1a', event: 'customer.created', endpoint: 'https://crm.example.eg/webhook', attempts: 1, statusCode: 201, status: 'delivered', time: '2026-11-11 21:47:55',
      request: '{\n  "event": "customer.created",\n  "data": { "id": "C-884", "name": "Mona Ibrahim" }\n}',
      response: '{\n  "id": "lead_55"\n}',
    },
  ])
  const schedule = [
    { attempt: 1, delay: '0s' },
    { attempt: 2, delay: '1m' },
    { attempt: 3, delay: '5m' },
    { attempt: 4, delay: '30m' },
    { attempt: 5, delay: '2h' },
  ]

  function retry(id: string) {
    const d = deliveries.value.find((x) => x.id === id)
    if (!d) return
    d.attempts += 1
    d.status = 'delivered'
    d.statusCode = 200
  }
  function replay(id: string) {
    const d = deliveries.value.find((x) => x.id === id)
    if (!d) return
    deliveries.value.unshift({ ...d, id: `${d.id}_r${deliveries.value.length}`, attempts: 1, status: 'delivered', statusCode: 200, time: '2026-11-12 10:00:00' })
  }

  return { deliveries, schedule, retry, replay }
})
