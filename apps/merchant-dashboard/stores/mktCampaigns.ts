import type { Campaign } from '@/types/marketing'

export const useMktCampaignsStore = defineStore('mktCampaigns', () => {
  const campaigns = ref<Campaign[]>([
    { id: 'CMP-1042', name: 'Ramadan Offers', channel: 'email', audience: 'VIP customers', date: '2026-03-01', sent: 4200, openRate: 46.8, clickRate: 12.4, revenue: 182500, status: 'sent' },
    { id: 'CMP-1043', name: 'Flash Sale 24h', channel: 'whatsapp', audience: 'Active buyers', date: '2026-03-12', sent: 3100, openRate: 91.2, clickRate: 28.7, revenue: 96400, status: 'sent' },
    { id: 'CMP-1044', name: 'New Arrivals', channel: 'email', audience: 'All subscribers', date: '2026-11-20', sent: 0, openRate: 0, clickRate: 0, revenue: 0, status: 'scheduled' },
    { id: 'CMP-1045', name: 'Win-back 60 days', channel: 'sms', audience: 'Inactive 60d', date: '2026-02-18', sent: 1850, openRate: 0, clickRate: 6.3, revenue: 21800, status: 'sent' },
    { id: 'CMP-1046', name: 'Eid Gift Guide', channel: 'email', audience: 'Cairo customers', date: '', sent: 0, openRate: 0, clickRate: 0, revenue: 0, status: 'draft' },
    { id: 'CMP-1047', name: 'Cart Reminder Promo', channel: 'whatsapp', audience: 'Abandoned carts', date: '2026-11-25', sent: 0, openRate: 0, clickRate: 0, revenue: 0, status: 'scheduled' },
  ])

  function add(c: Omit<Campaign, 'id'>) {
    campaigns.value.unshift({ id: `CMP-${1048 + campaigns.value.length}`, ...c })
  }

  return { campaigns, add }
})
