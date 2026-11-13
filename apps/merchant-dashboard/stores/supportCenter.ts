import type { HelpArticle, SupportTicket } from '@/types/platformTools'

export const useSupportCenterStore = defineStore('supportCenter', () => {
  const articles = ref<HelpArticle[]>([
    { id: 'art-1', title: 'Connect Paymob and accept cards', topic: 'payments', minutes: 4 },
    { id: 'art-2', title: 'Set up shipping zones for Egyptian governorates', topic: 'shipping', minutes: 6 },
    { id: 'art-3', title: 'Confirm cash on delivery orders faster', topic: 'orders', minutes: 3 },
    { id: 'art-4', title: 'Import products from a CSV file', topic: 'products', minutes: 5 },
    { id: 'art-5', title: 'Point your own domain to your store', topic: 'settings', minutes: 7 },
  ])
  const tickets = ref<SupportTicket[]>([
    { id: 'TKT-2041', subject: 'Paymob webhook not firing', priority: 'high', status: 'open', updatedAt: '2026-11-12' },
    { id: 'TKT-2030', subject: 'Invoice VAT number change', priority: 'normal', status: 'pending', updatedAt: '2026-11-09' },
    { id: 'TKT-2011', subject: 'Domain SSL certificate', priority: 'low', status: 'resolved', updatedAt: '2026-11-02' },
  ])

  function createTicket(subject: string, priority: SupportTicket['priority']) {
    const n = 2042 + tickets.value.length
    tickets.value.unshift({ id: `TKT-${n}`, subject, priority, status: 'open', updatedAt: '2026-11-12' })
  }

  return { articles, tickets, createTicket }
})
