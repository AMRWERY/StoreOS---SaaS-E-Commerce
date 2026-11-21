import type { OpsSavedView } from '@/types/platformTools'

/**
 * Saved filter views keyed by page (e.g. 'orders', 'products', 'customers').
 * In-memory only; resets on reload.
 */
export const useSavedViewsStore = defineStore('savedViews', () => {
  const byPage = ref<Record<string, OpsSavedView[]>>({})
  const activeByPage = ref<Record<string, string>>({})

  const viewsFor = (page: string): OpsSavedView[] => {
    return byPage.value[page] ?? []
  }

  const saveCurrent = (page: string, name: string, filters: Record<string, string>) => {
    if (!name.trim()) return
    const view: OpsSavedView = { id: `${page}-${Date.now()}`, name: name.trim(), filters: { ...filters } }
    byPage.value[page] = [...viewsFor(page), view]
    activeByPage.value[page] = view.id
  }

  const apply = (page: string, view: OpsSavedView) => {
    activeByPage.value[page] = view.id
  }

  const remove = (page: string, id: string) => {
    byPage.value[page] = viewsFor(page).filter((v) => v.id !== id)
    if (activeByPage.value[page] === id) activeByPage.value[page] = ''
  }

  return { byPage, activeByPage, viewsFor, saveCurrent, apply, remove }
})
