import type { Subscriber } from '@/types/marketing'

export const useMktSubscribersStore = defineStore('mktSubscribers', () => {
  const subscribers = ref<Subscriber[]>([
    { id: 'SUB-001', contact: 'mona.ibrahim@example.com', source: 'checkout', consent: 'opted_in', subscribedAt: '2026-08-14', tags: ['vip', 'cairo'] },
    { id: 'SUB-002', contact: '+20 100 234 5678', source: 'popup', consent: 'opted_in', subscribedAt: '2026-09-02', tags: ['whatsapp'] },
    { id: 'SUB-003', contact: 'youssef.farouk@example.com', source: 'storefront', consent: 'pending', subscribedAt: '2026-10-21', tags: [] },
    { id: 'SUB-004', contact: 'heba.salem@example.com', source: 'import', consent: 'opted_in', subscribedAt: '2026-07-30', tags: ['alexandria'] },
    { id: 'SUB-005', contact: '+20 111 876 5432', source: 'checkout', consent: 'unsubscribed', subscribedAt: '2026-05-11', tags: ['sms'] },
    { id: 'SUB-006', contact: 'khaled.mansour@example.com', source: 'popup', consent: 'opted_in', subscribedAt: '2026-10-05', tags: ['new'] },
  ])

  function unsubscribe(id: string) {
    const s = subscribers.value.find((x) => x.id === id)
    if (s) s.consent = 'unsubscribed'
  }

  return { subscribers, unsubscribe }
})
