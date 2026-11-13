import type { Collection } from '@/types/operations'

export const useCollectionsStore = defineStore('collections', () => {
  const collections = ref<Collection[]>([
    { id: 'COL-001', title: 'Summer Essentials', type: 'manual', products: 24, status: 'active', updatedAt: '2026-11-08' },
    { id: 'COL-002', title: 'Low Stock Under $50', type: 'automated', products: 12, rule: 'price < 50 AND stock < 10', status: 'active', updatedAt: '2026-11-10' },
    { id: 'COL-003', title: 'New Arrivals', type: 'automated', products: 31, rule: 'tag = new', status: 'active', updatedAt: '2026-11-11' },
    { id: 'COL-004', title: 'Black Friday', type: 'manual', products: 0, status: 'draft', updatedAt: '2026-11-12' },
  ])

  function addCollection(c: Pick<Collection, 'title' | 'type' | 'rule'>) {
    collections.value.unshift({
      id: `COL-${String(collections.value.length + 1).padStart(3, '0')}`,
      products: 0,
      status: 'draft',
      updatedAt: new Date().toISOString().slice(0, 10),
      ...c,
    })
  }
  function removeCollection(id: string) {
    collections.value = collections.value.filter((c) => c.id !== id)
  }

  return { collections, addCollection, removeCollection }
})
