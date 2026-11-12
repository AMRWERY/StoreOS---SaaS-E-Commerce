import type { Supplier } from '@/types/catalogOps'

export const useCatalogSuppliersStore = defineStore('catalogSuppliers', () => {
  const suppliers = ref<Supplier[]>([
    { id: 'SUP-01', name: 'النيل للتوريدات', contact: 'أحمد سليمان', phone: '+20 100 123 4567', city: 'Cairo', leadDays: 5, status: 'active' },
    { id: 'SUP-02', name: 'الدلتا للجملة', contact: 'منى عبد الله', phone: '+20 111 765 4321', city: 'Mansoura', leadDays: 7, status: 'active' },
    { id: 'SUP-03', name: 'مصر للمنسوجات', contact: 'خالد إبراهيم', phone: '+20 122 555 0198', city: 'Mahalla', leadDays: 10, status: 'active' },
    { id: 'SUP-04', name: 'الإسكندرية للتعبئة', contact: 'هبة رضا', phone: '+20 109 333 2211', city: 'Alexandria', leadDays: 4, status: 'inactive' },
  ])

  function add(s: Omit<Supplier, 'id' | 'status'>) {
    suppliers.value.unshift({ ...s, id: `SUP-${String(suppliers.value.length + 1).padStart(2, '0')}`, status: 'active' })
  }

  return { suppliers, add }
})
