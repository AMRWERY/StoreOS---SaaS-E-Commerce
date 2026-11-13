import type { CatxScheduledChange, ScheduleAction, ScheduleChannel } from '@/types/catalogDepth'

export const useCatxSchedulingStore = defineStore('catxScheduling', () => {
  const changes = ref<CatxScheduledChange[]>([
    { id: 'SCH-01', product: 'مجموعة رمضان', action: 'publish', at: '2026-11-20 09:00', channel: 'all', status: 'pending' },
    { id: 'SCH-02', product: 'قميص قطن مصري', action: 'unpublish', at: '2026-11-25 23:59', channel: 'online', status: 'pending' },
    { id: 'SCH-03', product: 'عسل سيوة طبيعي', action: 'publish', at: '2026-11-14 12:00', channel: 'pos', status: 'pending' },
    { id: 'SCH-04', product: 'حقيبة جلد القاهرة', action: 'publish', at: '2026-11-05 10:00', channel: 'online', status: 'done' },
    { id: 'SCH-05', product: 'سجادة خان الخليلي', action: 'unpublish', at: '2026-11-08 08:00', channel: 'all', status: 'cancelled' },
  ])

  const upcoming = computed(() =>
    changes.value.filter((c) => c.status === 'pending').sort((a, b) => a.at.localeCompare(b.at)),
  )

  function add(payload: { product: string; action: ScheduleAction; at: string; channel: ScheduleChannel }) {
    changes.value.unshift({ id: `SCH-${String(changes.value.length + 1).padStart(2, '0')}`, status: 'pending', ...payload })
  }

  function cancel(id: string) {
    const c = changes.value.find((x) => x.id === id)
    if (c) c.status = 'cancelled'
  }

  return { changes, upcoming, add, cancel }
})
