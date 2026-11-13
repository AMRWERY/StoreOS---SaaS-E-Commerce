import type { CatxMetafield, CatxMetafieldValue } from '@/types/catalogDepth'

export const useCatxMetafieldsStore = defineStore('catxMetafields', () => {
  const metafields = ref<CatxMetafield[]>([
    { id: 'MF-01', name: 'بلد المنشأ', namespace: 'specs', key: 'origin', type: 'text', owner: 'products', required: true },
    { id: 'MF-02', name: 'الوزن بالجرام', namespace: 'specs', key: 'weight_g', type: 'number', owner: 'products', required: false },
    { id: 'MF-03', name: 'تاريخ الصلاحية', namespace: 'specs', key: 'expiry', type: 'date', owner: 'products', required: false },
    { id: 'MF-04', name: 'صالح للهدايا', namespace: 'marketing', key: 'giftable', type: 'boolean', owner: 'products', required: false },
    { id: 'MF-05', name: 'دليل الاستخدام', namespace: 'docs', key: 'manual_pdf', type: 'file', owner: 'products', required: false },
    { id: 'MF-06', name: 'الخامات', namespace: 'specs', key: 'materials', type: 'list', owner: 'collections', required: false },
    { id: 'MF-07', name: 'رقم الهوية الضريبية', namespace: 'billing', key: 'tax_id', type: 'text', owner: 'customers', required: false },
  ])

  const values = ref<CatxMetafieldValue[]>([
    { id: 'V1', product: 'قميص قطن مصري', metafieldId: 'MF-01', value: 'مصر' },
    { id: 'V2', product: 'قميص قطن مصري', metafieldId: 'MF-02', value: '240' },
    { id: 'V3', product: 'عسل سيوة طبيعي', metafieldId: 'MF-01', value: 'سيوة' },
    { id: 'V4', product: 'عسل سيوة طبيعي', metafieldId: 'MF-03', value: '2027-06-01' },
    { id: 'V5', product: 'حقيبة جلد القاهرة', metafieldId: 'MF-04', value: 'true' },
  ])

  function add(payload: Omit<CatxMetafield, 'id'>) {
    metafields.value.unshift({ id: `MF-${String(metafields.value.length + 1).padStart(2, '0')}`, ...payload })
  }

  return { metafields, values, add }
})
