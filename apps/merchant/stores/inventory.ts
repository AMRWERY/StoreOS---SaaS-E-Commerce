import type { StockItem, HistoryLog } from '@/types/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const isAdjustmentModalOpen = ref(false)
  const selectedItem = ref<StockItem | null>(null)
  const currentPage = ref(1)
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  const selectedStatus = ref('Any')

  const stockList = ref<StockItem[]>([
    { id: 1, name: 'Pro-X Wireless Headset', sku: 'PX-7702-BLK', category: 'ELECTRONICS', current: 0, incoming: 24, threshold: 10, lastUpdated: '2h ago', image: '/img/product-02.avif' },
    { id: 2, name: 'Mechanical Deck V3', sku: 'MD-V3-SILV', category: 'PERIPHERALS', current: 3, incoming: 0, threshold: 15, lastUpdated: '5h ago', image: '/img/product-03.avif' },
    { id: 3, name: 'Flow Ergo Mouse', sku: 'FE-MSE-GRY', category: 'PERIPHERALS', current: 82, incoming: 12, threshold: 20, lastUpdated: '1d ago', image: '/img/product-04.avif' },
    { id: 4, name: 'Horizon Smart Display', sku: 'HZ-SD-24', category: 'DISPLAYS', current: 4, incoming: 0, threshold: 5, lastUpdated: '3h ago', image: '/img/product-05.avif' },
    { id: 5, name: 'Vector Ergonomic Chair', sku: 'VC-ERGO-BL', category: 'FURNITURE', current: 12, incoming: 0, threshold: 5, lastUpdated: '2d ago', image: '/img/product-07.avif' },
    { id: 6, name: 'Studio One Headphones', sku: 'SO-HEAD-01', category: 'ELECTRONICS', current: 28, incoming: 0, threshold: 10, lastUpdated: '6h ago', image: '/img/product-04.avif' },
    { id: 7, name: 'Chronos Minimal White', sku: 'CMW-WTCH-02', category: 'ACCESSORIES', current: 3, incoming: 10, threshold: 8, lastUpdated: '1h ago', image: '/img/product-05.avif' },
    { id: 8, name: 'Carbon Night Edition', sku: 'CN-ED-06', category: 'FASHION', current: 2, incoming: 0, threshold: 5, lastUpdated: '4h ago', image: '/img/product-08.avif' },
  ])

  const historyList = ref<HistoryLog[]>([
    { id: 101, date: 'Mar 22, 14:30', product: 'Pro-X Wireless Headset', type: 'Remove', change: -2, newStock: 0, reason: 'Sale', staff: 'Sarah J.' },
    { id: 102, date: 'Mar 22, 10:15', product: 'Mechanical Deck V3', type: 'Set', change: -1, newStock: 3, reason: 'Inventory Audit', staff: 'Mike T.' },
    { id: 103, date: 'Mar 21, 16:45', product: 'Flow Ergo Mouse', type: 'Add', change: 20, newStock: 82, reason: 'Purchase', staff: 'Alice W.' },
    { id: 104, date: 'Mar 20, 09:20', product: 'Horizon Smart Display', type: 'Remove', change: -1, newStock: 4, reason: 'Sale', staff: 'Ethan L.' },
    { id: 105, date: 'Mar 19, 12:00', product: 'Carbon Night Edition', type: 'Set', change: -3, newStock: 2, reason: 'Inventory Audit', staff: 'Sarah J.' },
    { id: 106, date: 'Mar 18, 08:30', product: 'Chronos Minimal White', type: 'Add', change: 5, newStock: 8, reason: 'Purchase', staff: 'Mike T.' },
  ])

  const filteredStockList = computed(() => {
    return stockList.value.filter(item => {
      const query = searchQuery.value.toLowerCase()
      const matchesSearch = item.name.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query)
      const matchesCategory = selectedCategory.value === 'All' || item.category === selectedCategory.value
      let matchesStatus = true
      if (selectedStatus.value === 'Out of Stock') matchesStatus = item.current === 0
      else if (selectedStatus.value === 'Low Stock') matchesStatus = item.current > 0 && item.current <= item.threshold
      else if (selectedStatus.value === 'In Stock') matchesStatus = item.current > item.threshold
      return matchesSearch && matchesCategory && matchesStatus
    })
  })

  const lowStockCount = computed(() => stockList.value.filter(s => s.current > 0 && s.current <= s.threshold).length)
  const outOfStockCount = computed(() => stockList.value.filter(s => s.current === 0).length)

  function openAdjustmentModal(item?: StockItem) {
    selectedItem.value = item ?? filteredStockList.value[0] ?? null
    isAdjustmentModalOpen.value = true
  }

  function handleQuickAdjust(item: StockItem, change: number) {
    item.current = Math.max(0, item.current + change)
  }

  function saveAdjustment(payload: { item: StockItem; type: string; qty: number; reason: string; notes: string }) {
    const prevStock = payload.item.current
    const qty = payload.qty

    if (payload.type === 'Add') {
      payload.item.current += qty
    } else if (payload.type === 'Remove') {
      payload.item.current = Math.max(0, payload.item.current - qty)
    } else if (payload.type === 'Set') {
      payload.item.current = qty
    }

    historyList.value.unshift({
      id: Date.now(),
      date: 'Just now',
      product: payload.item.name,
      type: payload.type,
      change: payload.type === 'Add' ? qty : payload.type === 'Remove' ? -qty : (qty - prevStock),
      newStock: payload.item.current,
      reason: payload.reason,
      staff: 'Current User'
    })

    isAdjustmentModalOpen.value = false
  }

  return {
    isAdjustmentModalOpen, selectedItem, currentPage,
    searchQuery, selectedCategory, selectedStatus,
    stockList, historyList, filteredStockList, lowStockCount, outOfStockCount,
    openAdjustmentModal, handleQuickAdjust, saveAdjustment
  }
})
