import type { CatxWaitlistEntry, CatxWaitlistSubscriber } from '@/types/catalogDepth'

export const useCatxWaitlistStore = defineStore('catxWaitlist', () => {
  const entries = ref<CatxWaitlistEntry[]>([
    { id: 'WL-01', product: 'قميص قطن مصري', variant: 'L / أبيض', lastRequest: '2026-11-11', notified: false },
    { id: 'WL-02', product: 'حقيبة جلد القاهرة', variant: 'بني', lastRequest: '2026-11-10', notified: false },
    { id: 'WL-03', product: 'عسل سيوة طبيعي', variant: '500 جم', lastRequest: '2026-11-04', notified: true },
    { id: 'WL-04', product: 'سجادة خان الخليلي', variant: '2×3 م', lastRequest: '2026-11-08', notified: false },
  ])

  const subscribers = ref<CatxWaitlistSubscriber[]>([
    { id: 'WS-01', entryId: 'WL-01', contact: 'mona.abdallah.eg', channel: 'email' },
    { id: 'WS-02', entryId: 'WL-01', contact: '+20 100 555 1234', channel: 'whatsapp' },
    { id: 'WS-03', entryId: 'WL-01', contact: 'karim.sayed.eg', channel: 'email' },
    { id: 'WS-04', entryId: 'WL-02', contact: '+20 111 222 3344', channel: 'whatsapp' },
    { id: 'WS-05', entryId: 'WL-02', contact: 'hala.ibrahim.eg', channel: 'email' },
    { id: 'WS-06', entryId: 'WL-03', contact: '+20 122 777 8899', channel: 'whatsapp' },
    { id: 'WS-07', entryId: 'WL-04', contact: 'ahmed.hassan.eg', channel: 'email' },
  ])

  const countFor = (id: string) => subscribers.value.filter((s) => s.entryId === id).length

  function notifyAll() {
    entries.value.forEach((e) => (e.notified = true))
  }

  return { entries, subscribers, countFor, notifyAll }
})
