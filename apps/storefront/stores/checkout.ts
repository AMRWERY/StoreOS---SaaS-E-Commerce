import { MOCK_ORDERS } from '@/data/shop-data'
import type { ShopOrder } from '@/types/shop'

// Orders placed in this session (mock). Lookup also falls back to the seeded demo orders.
export const useShopOrdersStore = defineStore('shop-orders', () => {
  const placed = ref<ShopOrder[]>([])

  const all = computed(() => [...placed.value, ...MOCK_ORDERS])
  const find = (id: string) => all.value.find(o => o.id.toLowerCase() === id.trim().toLowerCase())

  function place(order: ShopOrder) {
    placed.value = [order, ...placed.value]
  }

  function nextOrderId() {
    return `SO-${10500 + placed.value.length + 1}`
  }

  return { placed, all, find, place, nextOrderId }
})
