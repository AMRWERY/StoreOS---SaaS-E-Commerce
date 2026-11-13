import type { ChannelKey, FeedIssue, SalesChannel } from '@/types/insights'

export const useChanChannelsStore = defineStore('chanChannels', () => {
  const channels = ref<SalesChannel[]>([
    { key: 'google', name: 'Google Merchant Center', icon: 'ph:google-logo-bold', status: 'connected', products: 184, lastSync: '2026-11-12 09:40', errors: 3, publish: { products: true, inventory: true, prices: true } },
    { key: 'meta', name: 'Meta Catalog', icon: 'ph:meta-logo-bold', status: 'connected', products: 176, lastSync: '2026-11-12 09:15', errors: 1, publish: { products: true, inventory: true, prices: false } },
    { key: 'tiktok', name: 'TikTok Shop', icon: 'ph:tiktok-logo-bold', status: 'error', products: 62, lastSync: '2026-11-10 18:02', errors: 5, publish: { products: true, inventory: false, prices: false } },
    { key: 'whatsapp', name: 'WhatsApp Catalog', icon: 'ph:whatsapp-logo-bold', status: 'connected', products: 120, lastSync: '2026-11-12 08:50', errors: 0, publish: { products: true, inventory: true, prices: true } },
    { key: 'noon', name: 'Noon', icon: 'ph:storefront-bold', status: 'disconnected', products: 0, lastSync: null, errors: 0, publish: { products: false, inventory: false, prices: false } },
    { key: 'jumia', name: 'Jumia', icon: 'ph:shopping-bag-bold', status: 'disconnected', products: 0, lastSync: null, errors: 0, publish: { products: false, inventory: false, prices: false } },
  ])
  const issues = ref<FeedIssue[]>([
    { id: 'FI-1', product: 'Cotton Oversized Hoodie', channel: 'google', issue: 'missingGtin', severity: 'error' },
    { id: 'FI-2', product: 'Leather Crossbody Bag', channel: 'google', issue: 'imageSmall', severity: 'warning' },
    { id: 'FI-3', product: 'Linen Summer Shirt', channel: 'meta', issue: 'priceMismatch', severity: 'error' },
    { id: 'FI-4', product: 'Silver Pendant Necklace', channel: 'tiktok', issue: 'missingCategory', severity: 'error' },
    { id: 'FI-5', product: 'Canvas Sneakers', channel: 'tiktok', issue: 'noStock', severity: 'warning' },
    { id: 'FI-6', product: 'Wool Scarf', channel: 'google', issue: 'shortTitle', severity: 'info' },
  ])

  function find(key: ChannelKey) {
    return channels.value.find((c) => c.key === key)
  }
  function connect(key: ChannelKey) {
    const c = find(key)
    if (!c) return
    c.status = 'connected'
    c.errors = 0
    c.lastSync = '2026-11-12 10:00'
    if (!c.products) c.products = 120
  }
  function disconnect(key: ChannelKey) {
    const c = find(key)
    if (!c) return
    c.status = 'disconnected'
    c.products = 0
    c.errors = 0
    c.lastSync = null
    c.publish = { products: false, inventory: false, prices: false }
    issues.value = issues.value.filter((i) => i.channel !== key)
  }
  function syncNow(key: ChannelKey) {
    const c = find(key)
    if (c && c.status !== 'disconnected') {
      c.lastSync = '2026-11-12 10:00'
      if (c.status === 'error') c.status = 'connected'
    }
  }

  return { channels, issues, connect, disconnect, syncNow }
})
