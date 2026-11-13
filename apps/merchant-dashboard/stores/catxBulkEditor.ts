import type { CatxBulkRow, CatxEditableField } from '@/types/catalogDepth'

const seed = (): CatxBulkRow[] => [
  { id: 'P-101', title: 'قميص قطن مصري', sku: 'SHT-001', price: 450, compareAt: 550, stock: 64, status: 'active', tags: 'قطن، صيف' },
  { id: 'P-102', title: 'عسل سيوة طبيعي', sku: 'HNY-010', price: 320, compareAt: 0, stock: 120, status: 'active', tags: 'طبيعي' },
  { id: 'P-103', title: 'حقيبة جلد القاهرة', sku: 'BAG-204', price: 1250, compareAt: 1500, stock: 18, status: 'draft', tags: 'جلد، هدايا' },
  { id: 'P-104', title: 'سجادة خان الخليلي', sku: 'RUG-330', price: 2800, compareAt: 3200, stock: 7, status: 'active', tags: 'ديكور' },
  { id: 'P-105', title: 'زيت أرجان', sku: 'OIL-077', price: 210, compareAt: 0, stock: 0, status: 'archived', tags: '' },
  { id: 'P-106', title: 'شاي كرك فاخر', sku: 'TEA-015', price: 95, compareAt: 120, stock: 300, status: 'active', tags: 'مشروبات' },
]

const FIELDS: CatxEditableField[] = ['title', 'sku', 'price', 'compareAt', 'stock', 'status', 'tags']

interface UndoEntry {
  id: string
  field: CatxEditableField
  prev: string | number
}

export const useCatxBulkEditorStore = defineStore('catxBulkEditor', () => {
  const rows = ref<CatxBulkRow[]>(seed())
  const original = ref<CatxBulkRow[]>(seed())
  const history = ref<UndoEntry[]>([])

  function isDirty(id: string, field: CatxEditableField) {
    const row = rows.value.find((r) => r.id === id)
    const base = original.value.find((r) => r.id === id)
    return !!row && !!base && row[field] !== base[field]
  }

  const dirtyCount = computed(() =>
    rows.value.reduce((sum, row) => sum + FIELDS.filter((f) => isDirty(row.id, f)).length, 0),
  )

  function setValue(id: string, field: CatxEditableField, value: string | number) {
    const row = rows.value.find((r) => r.id === id) as Record<string, any> | undefined
    if (!row || row[field] === value) return
    history.value.push({ id, field, prev: row[field] })
    row[field] = value
  }

  function undo() {
    const last = history.value.pop()
    if (!last) return
    const row = rows.value.find((r) => r.id === last.id) as Record<string, any> | undefined
    if (row) row[last.field] = last.prev
  }

  function save() {
    original.value = rows.value.map((r) => ({ ...r }))
    history.value = []
  }

  function discard() {
    rows.value = original.value.map((r) => ({ ...r }))
    history.value = []
  }

  return { rows, history, dirtyCount, isDirty, setValue, undo, save, discard }
})
