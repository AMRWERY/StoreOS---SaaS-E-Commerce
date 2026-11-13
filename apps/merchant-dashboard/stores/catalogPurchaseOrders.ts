import type { PurchaseOrder, PurchaseOrderStatus } from '@/types/catalogOps'

export const useCatalogPurchaseOrdersStore = defineStore('catalogPurchaseOrders', () => {
  const orders = ref<PurchaseOrder[]>([
    { id: 'PO-2041', supplier: 'النيل للتوريدات', expectedAt: '2026-11-18', items: 120, total: 48500, status: 'ordered' },
    { id: 'PO-2040', supplier: 'الدلتا للجملة', expectedAt: '2026-11-15', items: 60, total: 21300, status: 'partial' },
    { id: 'PO-2038', supplier: 'مصر للمنسوجات', expectedAt: '2026-11-08', items: 200, total: 76000, status: 'received' },
    { id: 'PO-2042', supplier: 'النيل للتوريدات', expectedAt: '2026-11-25', items: 35, total: 9800, status: 'draft' },
  ])

  function add(o: { supplier: string; expectedAt: string; items: number; total: number }) {
    orders.value.unshift({ ...o, id: `PO-${2043 + orders.value.length - 4}`, status: 'draft' })
  }

  function setStatus(id: string, status: PurchaseOrderStatus) {
    const o = orders.value.find((x) => x.id === id)
    if (o) o.status = status
  }

  return { orders, add, setStatus }
})
