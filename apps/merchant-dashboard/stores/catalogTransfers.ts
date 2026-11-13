import type { StockTransfer, TransferStatus } from '@/types/catalogOps'

export const useCatalogTransfersStore = defineStore('catalogTransfers', () => {
  const locations = ref(['Cairo Warehouse', 'Alexandria Hub', 'Giza Store'])

  const transfers = ref<StockTransfer[]>([
    { id: 'TR-501', from: 'Cairo Warehouse', to: 'Alexandria Hub', items: 80, status: 'in_transit', createdAt: '2026-11-11' },
    { id: 'TR-500', from: 'Cairo Warehouse', to: 'Giza Store', items: 25, status: 'received', createdAt: '2026-11-07' },
    { id: 'TR-499', from: 'Alexandria Hub', to: 'Cairo Warehouse', items: 14, status: 'draft', createdAt: '2026-11-06' },
  ])

  function add(t: { from: string; to: string; items: number }) {
    transfers.value.unshift({ ...t, id: `TR-${502 + transfers.value.length - 3}`, status: 'draft', createdAt: '2026-11-12' })
  }

  function setStatus(id: string, status: TransferStatus) {
    const t = transfers.value.find((x) => x.id === id)
    if (t) t.status = status
  }

  return { locations, transfers, add, setStatus }
})
