import type { ReturnRequest, ReturnStatus } from '@/types/operations'

export const useReturnsStore = defineStore('returns', () => {
  const returns = ref<ReturnRequest[]>([
    { id: 'RMA-1042', orderId: 'ORD-8841', customer: 'Sara Mostafa', reason: 'damaged', items: 1, amount: 1250, status: 'requested', createdAt: '2026-11-11' },
    { id: 'RMA-1041', orderId: 'ORD-8790', customer: 'Omar Hassan', reason: 'wrong_item', items: 2, amount: 890, status: 'approved', createdAt: '2026-11-10' },
    { id: 'RMA-1039', orderId: 'ORD-8702', customer: 'Nour Adel', reason: 'changed_mind', items: 1, amount: 430, status: 'received', createdAt: '2026-11-08' },
    { id: 'RMA-1033', orderId: 'ORD-8650', customer: 'Karim Fathy', reason: 'not_as_described', items: 1, amount: 2100, status: 'refunded', createdAt: '2026-11-05' },
    { id: 'RMA-1030', orderId: 'ORD-8611', customer: 'Mona Samir', reason: 'changed_mind', items: 3, amount: 760, status: 'rejected', createdAt: '2026-11-03' },
  ])

  function setStatus(id: string, status: ReturnStatus) {
    const r = returns.value.find((x) => x.id === id)
    if (r) r.status = status
  }

  return { returns, setStatus }
})
