import type { AttributionRow, CampaignRow } from '@/types/insights'

export const useRepAttributionStore = defineStore('repAttribution', () => {
  const rows = ref<AttributionRow[]>([
    { source: 'Facebook', medium: 'paid', sessions: 14200, orders: 410, revenue: 286000, spend: 62000 },
    { source: 'Instagram', medium: 'paid', sessions: 11800, orders: 355, revenue: 248500, spend: 48000 },
    { source: 'Google', medium: 'cpc', sessions: 7900, orders: 262, revenue: 191000, spend: 39000 },
    { source: 'Google', medium: 'organic', sessions: 6400, orders: 148, revenue: 104000, spend: 0 },
    { source: 'TikTok', medium: 'paid', sessions: 5200, orders: 96, revenue: 61000, spend: 21000 },
    { source: 'WhatsApp', medium: 'referral', sessions: 1900, orders: 118, revenue: 87500, spend: 0 },
    { source: 'Direct', medium: 'none', sessions: 4800, orders: 91, revenue: 72000, spend: 0 },
  ])
  const campaigns = ref<CampaignRow[]>([
    { id: 'CMP-101', name: 'White Friday 2026', channel: 'Facebook', spend: 38000, revenue: 214000, orders: 301, status: 'active' },
    { id: 'CMP-102', name: 'Ramadan Collection', channel: 'Instagram', spend: 26000, revenue: 143000, orders: 198, status: 'ended' },
    { id: 'CMP-103', name: 'Brand Search Egypt', channel: 'Google', spend: 14500, revenue: 98000, orders: 133, status: 'active' },
    { id: 'CMP-104', name: 'Summer Reels', channel: 'TikTok', spend: 21000, revenue: 61000, orders: 96, status: 'paused' },
  ])

  return { rows, campaigns }
})
