import type { CatxPreorderItem, PreorderMode } from '@/types/catalogDepth'

export const useCatxPreordersStore = defineStore('catxPreorders', () => {
  const allowBackorders = ref(true)
  const preorderMessage = ref('هذا المنتج متاح للطلب المسبق وسيتم شحنه فور وصوله.')
  const expectedShipDate = ref('2026-12-15')

  const items = ref<CatxPreorderItem[]>([
    { id: 'PRE-01', product: 'سماعة لاسلكية برو', mode: 'preorder', limit: 200, sold: 148, expectedDate: '2026-12-10', status: 'active' },
    { id: 'PRE-02', product: 'حقيبة جلد القاهرة', mode: 'backorder', limit: 50, sold: 12, expectedDate: '2026-11-30', status: 'active' },
    { id: 'PRE-03', product: 'ساعة ذكية إصدار محدود', mode: 'preorder', limit: 100, sold: 100, expectedDate: '2026-12-20', status: 'ended' },
    { id: 'PRE-04', product: 'سجادة خان الخليلي', mode: 'backorder', limit: 20, sold: 3, expectedDate: '2026-12-05', status: 'paused' },
  ])

  function add(payload: { product: string; mode: PreorderMode; limit: number; expectedDate: string }) {
    items.value.unshift({ id: `PRE-${String(items.value.length + 1).padStart(2, '0')}`, sold: 0, status: 'active', ...payload })
  }

  return { allowBackorders, preorderMessage, expectedShipDate, items, add }
})
