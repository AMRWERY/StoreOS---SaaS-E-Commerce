import type { OrderEvent, OrderNote, RefundPayload } from '@/types/fulfillment'

export const useFulfilOrderDetailStore = defineStore('fulfilOrderDetail', () => {
  const events = ref<Record<string, OrderEvent[]>>({})
  const notes = ref<Record<string, OrderNote[]>>({})
  const refunded = ref<Record<string, number>>({})

  /** Seeds demo history the first time an order is opened. */
  function ensure(orderId: string) {
    if (events.value[orderId]) return
    events.value[orderId] = [
      { id: 'e4', type: 'confirmed', actor: 'Sarah J.', at: '2026-10-24 11:30' },
      { id: 'e3', type: 'note', actor: 'Sarah J.', at: '2026-10-24 10:50', note: 'Customer requested express shipping.' },
      { id: 'e2', type: 'paid', actor: 'system', at: '2026-10-24 10:46', note: 'ch_3Nle...8Zkz' },
      { id: 'e1', type: 'created', actor: 'system', at: '2026-10-24 10:45' },
    ]
    notes.value[orderId] = [
      { id: 'n2', text: 'Customer requested express shipping as they need it before the weekend.', author: 'Sarah J.', at: '2026-10-24 10:50' },
      { id: 'n1', text: 'Payment confirmed via Stripe (ch_3Nle...8Zkz)', author: 'system', at: '2026-10-24 10:45' },
    ]
  }

  function addNote(orderId: string, text: string) {
    ensure(orderId)
    const at = '2026-11-12 12:00'
    const id = `${Date.now()}`
    notes.value[orderId]!.unshift({ id: `n-${id}`, text, author: 'You', at })
    events.value[orderId]!.unshift({ id: `e-${id}`, type: 'note', actor: 'You', at, note: text })
  }

  function addRefund(orderId: string, payload: RefundPayload) {
    ensure(orderId)
    refunded.value[orderId] = (refunded.value[orderId] ?? 0) + payload.total
    events.value[orderId]!.unshift({
      id: `e-refund-${Date.now()}`,
      type: 'refund',
      actor: 'You',
      at: '2026-11-12 12:00',
      note: payload.total.toFixed(2),
    })
  }

  return { events, notes, refunded, ensure, addNote, addRefund }
})
