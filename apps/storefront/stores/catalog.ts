import { CATEGORIES, COLLECTIONS, PRODUCTS } from '@/data/shop-data'
import type { Product } from '@/types/shop'

export type CatalogSort = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'

export interface CatalogQuery {
  collection?: string
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
  /** option key -> selected values (match any) */
  options?: Record<string, string[]>
  sort?: CatalogSort
}

export const useCatalogStore = defineStore('shop-catalog', () => {
  const products = ref<Product[]>(PRODUCTS)
  const categories = ref(CATEGORIES)
  const collections = ref(COLLECTIONS)

  const featured = computed(() => products.value.filter(p => p.collections.includes('best-sellers')).slice(0, 4))
  const newArrivals = computed(() => products.value.filter(p => p.isNew))

  const isInStock = (p: Product) => p.variants.some(v => v.stock > 0)
  const getProduct = (handle: string) => products.value.find(p => p.handle === handle)
  const getCollection = (handle: string) => collections.value.find(c => c.handle === handle)
  const getCategory = (handle: string) => categories.value.find(c => c.handle === handle)
  const related = (p: Product, limit = 4) =>
    products.value.filter(x => x.id !== p.id && x.category === p.category)
      .concat(products.value.filter(x => x.id !== p.id && x.category !== p.category))
      .slice(0, limit)

  function priceBounds() {
    const prices = products.value.map(p => p.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }

  function search(q: CatalogQuery, locale: 'en' | 'ar' = 'en'): Product[] {
    let list = products.value.slice()
    if (q.collection && q.collection !== 'all') list = list.filter(p => p.collections.includes(q.collection!))
    if (q.category) list = list.filter(p => p.category === q.category)
    if (q.search?.trim()) {
      const needle = q.search.trim().toLowerCase()
      list = list.filter(p =>
        p.title.en.toLowerCase().includes(needle)
        || p.title.ar.includes(needle)
        || p.description[locale].toLowerCase().includes(needle)
        || p.category.includes(needle))
    }
    if (q.minPrice !== undefined) list = list.filter(p => p.price >= q.minPrice!)
    if (q.maxPrice !== undefined) list = list.filter(p => p.price <= q.maxPrice!)
    if (q.inStockOnly) list = list.filter(isInStock)
    for (const [key, vals] of Object.entries(q.options ?? {})) {
      if (!vals.length) continue
      list = list.filter(p => p.variants.some(v => vals.includes(v.options[key] ?? '')))
    }
    switch (q.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'newest': list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
    }
    return list
  }

  /** Filterable option facets (key -> values) across the given products. */
  function facets(list: Product[]) {
    const map = new Map<string, { key: string; label: Product['title']; values: Map<string, Product['title']> }>()
    for (const p of list) {
      for (const o of p.options) {
        if (!map.has(o.key)) map.set(o.key, { key: o.key, label: o.label, values: new Map() })
        for (const v of o.values) map.get(o.key)!.values.set(v.value, v.label)
      }
    }
    return [...map.values()].map(f => ({
      key: f.key,
      label: f.label,
      values: [...f.values.entries()].map(([value, label]) => ({ value, label })),
    }))
  }

  return { products, categories, collections, featured, newArrivals, isInStock, getProduct, getCollection, getCategory, related, priceBounds, search, facets }
})
