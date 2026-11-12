import type { EcoNotFound, EcoRedirect } from '@/types/ecosystem'

export const useEcoRedirectsStore = defineStore('ecoRedirects', () => {
  const redirects = ref<EcoRedirect[]>([
    { id: 'r1', from: '/old-shop', to: '/products', type: 301, hits: 1284 },
    { id: 'r2', from: '/sale-ramadan', to: '/collections/ramadan', type: 302, hits: 342 },
    { id: 'r3', from: '/p/leather-bag-old', to: '/products/leather-bag', type: 301, hits: 97 },
  ])
  const notFounds = ref<EcoNotFound[]>([
    { path: '/collections/summer-2025', hits: 212, lastSeen: '2026-11-12' },
    { path: '/products/wireless-mouse-x', hits: 88, lastSeen: '2026-11-11' },
    { path: '/blog/eid-offers', hits: 41, lastSeen: '2026-11-10' },
  ])

  function add(from: string, to: string, type: 301 | 302) {
    redirects.value.unshift({ id: `r${Date.now()}${redirects.value.length}`, from, to, type, hits: 0 })
  }
  function remove(id: string) {
    redirects.value = redirects.value.filter((r) => r.id !== id)
  }
  function fixNotFound(path: string, to: string, type: 301 | 302 = 301) {
    add(path, to, type)
    notFounds.value = notFounds.value.filter((n) => n.path !== path)
  }
  function importCsv(count: number) {
    for (let i = 0; i < count; i++) add(`/imported-${i + 1}`, '/products', 301)
  }

  return { redirects, notFounds, add, remove, fixNotFound, importCsv }
})
