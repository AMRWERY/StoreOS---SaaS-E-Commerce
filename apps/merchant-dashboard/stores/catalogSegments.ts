import type { CustomerSegment, SegmentRule } from '@/types/catalogOps'

export const useCatalogSegmentsStore = defineStore('catalogSegments', () => {
  const segments = ref<CustomerSegment[]>([
    { id: 'SEG-01', name: 'عملاء VIP', rules: [{ field: 'total_spent', operator: 'gt', value: '10000' }], customers: 148, status: 'active' },
    { id: 'SEG-02', name: 'عملاء جدد', rules: [{ field: 'orders_count', operator: 'eq', value: '1' }], customers: 612, status: 'active' },
    { id: 'SEG-03', name: 'القاهرة والجيزة', rules: [{ field: 'city', operator: 'eq', value: 'Cairo' }, { field: 'orders_count', operator: 'gt', value: '2' }], customers: 391, status: 'active' },
    { id: 'SEG-04', name: 'عملاء غير نشطين', rules: [{ field: 'last_order_days', operator: 'gt', value: '90' }], customers: 274, status: 'draft' },
  ])

  function add(name: string, rules: SegmentRule[]) {
    segments.value.unshift({
      id: `SEG-${String(segments.value.length + 1).padStart(2, '0')}`,
      name,
      rules,
      customers: Math.floor(40 + Math.random() * 300),
      status: 'active',
    })
  }

  return { segments, add }
})
