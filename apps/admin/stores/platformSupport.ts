import type { SupportTicket, TicketStatus } from '@/types/platform'

export const usePlatformSupportStore = defineStore('platformSupport', () => {
  const tickets = ref<SupportTicket[]>([
    { id: 'tkt_5120', store: 'Nile Threads', subject: 'Custom domain SSL not issuing', status: 'open', priority: 'high', assignee: 'Rana Mostafa', createdAt: '2026-11-12', notes: [] },
    {
      id: 'tkt_5118', store: 'Alex Spice House', subject: 'Paymob payouts delayed', status: 'pending', priority: 'normal', assignee: 'Youssef Hany', createdAt: '2026-11-11',
      notes: [{ id: 'tn1', author: 'Youssef Hany', body: 'Waiting on Paymob settlement report.', date: '2026-11-11' }],
    },
    { id: 'tkt_5112', store: 'Habiba Beauty', subject: 'Cannot upgrade from trial to Starter', status: 'open', priority: 'normal', assignee: 'Rana Mostafa', createdAt: '2026-11-10', notes: [] },
    {
      id: 'tkt_5101', store: 'Riyadh Oud', subject: 'Arabic invoice shows wrong currency', status: 'resolved', priority: 'low', assignee: 'Youssef Hany', createdAt: '2026-11-06',
      notes: [{ id: 'tn2', author: 'Youssef Hany', body: 'Fixed via currency override. Confirmed with merchant.', date: '2026-11-07' }],
    },
    { id: 'tkt_5097', store: 'Delta Electronics', subject: 'Need API rate limit increase', status: 'pending', priority: 'high', assignee: 'Amr Mohamed', createdAt: '2026-11-05', notes: [] },
  ])

  const setStatus = (id: string, status: TicketStatus) => {
    const target = tickets.value.find((x) => x.id === id)
    if (target) target.status = status
  }

  const addNote = (id: string, body: string) => {
    const target = tickets.value.find((x) => x.id === id)
    if (target) target.notes.push({ id: `tn${Date.now()}`, author: 'Amr Mohamed', body, date: '2026-11-12' })
  }

  return { tickets, setStatus, addNote }
})
