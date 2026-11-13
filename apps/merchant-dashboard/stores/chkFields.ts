import type { CheckoutField } from '@/types/checkoutExtras'

export const useChkFieldsStore = defineStore('chkFields', () => {
  const fields = ref<CheckoutField[]>([
    { id: 'f-gift', labelEn: 'Gift message', labelAr: 'رسالة الهدية', type: 'textarea', required: false, placement: 'notes', codOnly: false, enabled: true, options: [] },
    { id: 'f-delivery', labelEn: 'Delivery notes', labelAr: 'ملاحظات التوصيل', type: 'textarea', required: false, placement: 'shipping', codOnly: false, enabled: true, options: [] },
    { id: 'f-tax', labelEn: 'Tax ID', labelAr: 'الرقم الضريبي', type: 'text', required: false, placement: 'contact', codOnly: false, enabled: false, options: [] },
    { id: 'f-time', labelEn: 'Preferred delivery time', labelAr: 'وقت التوصيل المفضل', type: 'select', required: true, placement: 'shipping', codOnly: true, enabled: true, options: ['Morning', 'Afternoon', 'Evening'] },
    { id: 'f-terms', labelEn: 'I agree to the return policy', labelAr: 'أوافق على سياسة الاسترجاع', type: 'checkbox', required: true, placement: 'payment', codOnly: false, enabled: true, options: [] },
  ])

  function save(field: CheckoutField) {
    const i = fields.value.findIndex((f) => f.id === field.id)
    if (i >= 0) fields.value[i] = field
    else fields.value.push({ ...field, id: `f-${Date.now()}` })
  }
  function remove(id: string) {
    fields.value = fields.value.filter((f) => f.id !== id)
  }
  function move(id: string, dir: -1 | 1) {
    const i = fields.value.findIndex((f) => f.id === id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= fields.value.length) return
    const next = [...fields.value]
    const a = next[i]!
    next[i] = next[j]!
    next[j] = a
    fields.value = next
  }
  function toggle(id: string) {
    const f = fields.value.find((x) => x.id === id)
    if (f) f.enabled = !f.enabled
  }

  return { fields, save, remove, move, toggle }
})
