import type { CatxSeoAuditRow } from '@/types/catalogDepth'

export const useCatxSeoAuditStore = defineStore('catxSeoAudit', () => {
  const rows = ref<CatxSeoAuditRow[]>([
    { id: 'P-101', title: 'قميص قطن مصري', score: 92, missing: [] },
    { id: 'P-102', title: 'عسل سيوة طبيعي', score: 74, missing: ['image'] },
    { id: 'P-103', title: 'حقيبة جلد القاهرة', score: 48, missing: ['description', 'image'] },
    { id: 'P-104', title: 'سجادة خان الخليلي', score: 61, missing: ['description'] },
    { id: 'P-105', title: 'زيت أرجان', score: 30, missing: ['title', 'description', 'handle'] },
    { id: 'P-106', title: 'شاي كرك فاخر', score: 85, missing: ['image'] },
  ])

  const average = computed(() =>
    rows.value.length ? Math.round(rows.value.reduce((s, r) => s + r.score, 0) / rows.value.length) : 0,
  )

  return { rows, average }
})
