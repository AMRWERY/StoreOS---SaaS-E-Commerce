import type { StoreDomain } from '@/types/storeContent'

export const useStoreDomainsStore = defineStore('storeDomains', () => {
  const subdomain = ref('mystore.storeos.app')
  const domains = ref<StoreDomain[]>([
    {
      id: 'd1',
      host: 'shop.mystore.com.eg',
      verification: 'verified',
      ssl: 'active',
      primary: true,
      records: [
        { type: 'CNAME', host: 'shop', value: 'cname.storeos.app' },
        { type: 'TXT', host: '_storeos-verify.shop', value: 'storeos-site-verification=8f3a91c2' },
      ],
    },
    {
      id: 'd2',
      host: 'mystore.net',
      verification: 'pending',
      ssl: 'issuing',
      primary: false,
      records: [
        { type: 'A', host: '@', value: '76.76.21.21' },
        { type: 'TXT', host: '_storeos-verify', value: 'storeos-site-verification=11b7d0e4' },
      ],
    },
    {
      id: 'd3',
      host: 'old-store.com',
      verification: 'failed',
      ssl: 'expired',
      primary: false,
      records: [{ type: 'CNAME', host: 'www', value: 'cname.storeos.app' }],
    },
  ])
  const selectedId = ref('d1')
  const selected = computed(() => domains.value.find((d) => d.id === selectedId.value))

  function add(host: string) {
    const clean = host.trim().toLowerCase()
    if (!clean) return
    const id = `d${Date.now()}`
    domains.value.push({
      id,
      host: clean,
      verification: 'pending',
      ssl: 'issuing',
      primary: false,
      records: [
        { type: 'CNAME', host: 'www', value: 'cname.storeos.app' },
        { type: 'TXT', host: '_storeos-verify', value: `storeos-site-verification=${id.slice(-8)}` },
      ],
    })
    selectedId.value = id
  }
  function setPrimary(id: string) {
    domains.value.forEach((d) => (d.primary = d.id === id))
  }
  function remove(id: string) {
    domains.value = domains.value.filter((d) => d.id !== id)
    if (selectedId.value === id) selectedId.value = domains.value[0]?.id ?? ''
  }

  return { subdomain, domains, selectedId, selected, add, setPrimary, remove }
})
