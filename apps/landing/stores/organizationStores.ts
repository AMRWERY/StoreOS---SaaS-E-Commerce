import type { OrgStore } from '@/types/platformTools'

export const useOrganizationStoresStore = defineStore('organizationStores', () => {
  const orgName = ref('Nile Retail Group')
  const membersCount = ref(7)
  const activeStoreId = ref('st-1')
  const stores = ref<OrgStore[]>([
    { id: 'st-1', name: 'Nile Fashion', domain: 'nilefashion.storeos.app', plan: 'growth', role: 'owner' },
    { id: 'st-2', name: 'Cairo Gadgets', domain: 'cairogadgets.storeos.app', plan: 'starter', role: 'admin' },
  ])

  function addStore(name: string, domain: string) {
    stores.value.push({ id: `st-${Date.now()}`, name, domain: `${domain}.storeos.app`, plan: 'free', role: 'owner' })
  }

  return { orgName, membersCount, activeStoreId, stores, addStore }
})
