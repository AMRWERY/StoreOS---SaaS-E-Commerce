import type { ExchangeStatus, FulfilExchange } from '@/types/fulfillment'

export const useFulfilExchangesStore = defineStore('fulfilExchanges', () => {
  const exchanges = ref<FulfilExchange[]>([
    { id: 'EXC-204', orderId: 'ORD-8841', customer: 'Sara Mostafa', returnedItem: 'Cotton T-shirt Black M', replacementItem: 'Cotton T-shirt Black L', priceDiff: 0, status: 'requested', createdAt: '2026-11-12' },
    { id: 'EXC-203', orderId: 'ORD-8790', customer: 'Omar Hassan', returnedItem: 'White Sneakers 42', replacementItem: 'White Sneakers 43', priceDiff: 0, status: 'shipped', createdAt: '2026-11-10' },
    { id: 'EXC-201', orderId: 'ORD-8702', customer: 'Nour Adel', returnedItem: 'Leather Bag Brown', replacementItem: 'Leather Bag Black XL', priceDiff: 350, status: 'completed', createdAt: '2026-11-07' },
    { id: 'EXC-199', orderId: 'ORD-8650', customer: 'Karim Fathy', returnedItem: 'Denim Jacket L', replacementItem: 'Denim Jacket M', priceDiff: -120, status: 'completed', createdAt: '2026-11-04' },
  ])

  function create(input: Omit<FulfilExchange, 'id' | 'status' | 'createdAt'>) {
    const next = Math.max(...exchanges.value.map((e) => Number(e.id.replace(/\D/g, ''))), 200) + 1
    exchanges.value.unshift({ ...input, id: `EXC-${next}`, status: 'requested', createdAt: '2026-11-12' })
  }

  function setStatus(id: string, status: ExchangeStatus) {
    const e = exchanges.value.find((x) => x.id === id)
    if (e) e.status = status
  }

  return { exchanges, create, setStatus }
})
