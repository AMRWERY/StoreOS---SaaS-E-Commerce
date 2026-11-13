import type { CatxCustomerNote, CatxCustomerTag, CatxTagColor } from '@/types/catalogDepth'

export const useCatxCustomerTagsStore = defineStore('catxCustomerTags', () => {
  const tags = ref<CatxCustomerTag[]>([
    { id: 'TG-01', name: 'VIP', color: 'purple', customers: 148 },
    { id: 'TG-02', name: 'جملة', color: 'info', customers: 36 },
    { id: 'TG-03', name: 'يفضل الدفع عند الاستلام', color: 'warning', customers: 412 },
    { id: 'TG-04', name: 'مشكلة في الدفع', color: 'danger', customers: 9 },
  ])

  const notes = ref<CatxCustomerNote[]>([
    { id: 'NT-01', customer: 'منى عبد الله', note: 'تفضل التوصيل بعد الساعة 5 مساءً.', author: 'Salma', date: '2026-11-11' },
    { id: 'NT-02', customer: 'كريم السيد', note: 'طلب فاتورة ضريبية لكل طلب.', author: 'Amr', date: '2026-11-09' },
    { id: 'NT-03', customer: 'هالة إبراهيم', note: 'تم الاتفاق على استبدال المنتج التالف.', author: 'Salma', date: '2026-11-05' },
  ])

  function addTag(name: string, color: CatxTagColor) {
    tags.value.push({ id: `TG-${String(tags.value.length + 1).padStart(2, '0')}`, name, color, customers: 0 })
  }
  function renameTag(id: string, name: string) {
    const tag = tags.value.find((x) => x.id === id)
    if (tag && name.trim()) tag.name = name.trim()
  }
  function removeTag(id: string) {
    tags.value = tags.value.filter((x) => x.id !== id)
  }
  function addNote(customer: string, note: string) {
    notes.value.unshift({ id: `NT-${String(notes.value.length + 1).padStart(2, '0')}`, customer, note, author: 'Amr', date: '2026-11-12' })
  }

  return { tags, notes, addTag, renameTag, removeTag, addNote }
})
