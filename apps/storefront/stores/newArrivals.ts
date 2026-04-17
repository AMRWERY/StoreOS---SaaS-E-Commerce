import { defineStore } from 'pinia'
import type { NewArrivalProduct } from '@/types/new-arrivals'

export const useNewArrivalsStore = defineStore('storefront-new-arrivals', () => {
  const selectedFilter = ref('All Categories')
  const viewMode = ref<'grid' | 'list'>('grid')

  const categories = ref(['All Categories', 'Hardware', 'Apparel', 'Accessories', 'Optics'])

  const products = ref<NewArrivalProduct[]>([
    { id: 'K-9021', name: 'Linear Modular Rack v2', category: 'Hardware', price: 8400, image: '/img/product-01.avif', badge: { text: 'NEW BATCH', type: 'new' }, timestamp: '2024.04.10' },
    { id: 'K-9022', name: 'AeroStep Pro Runner', category: 'Apparel', price: 2150, oldPrice: 3200, image: '/img/product-02.avif', badge: { text: '30% OFF', type: 'sale' }, timestamp: '2024.04.08' },
    { id: 'K-9023', name: 'Sonic-X Tactical Buds', category: 'Accessories', price: 1890, image: '/img/product-03.avif', badge: { text: 'LIMITED', type: 'limited' }, timestamp: '2024.04.05' },
    { id: 'K-9024', name: 'Spectra Prime Lens', category: 'Optics', price: 12400, image: '/img/product-04.avif', timestamp: '2024.04.01' },
    { id: 'K-9025', name: 'Vector Carbon Wallet', category: 'Accessories', price: 750, image: '/img/product-05.avif', badge: { text: 'NEW', type: 'new' }, timestamp: '2024.03.28' },
    { id: 'K-9026', name: 'Origin Glass Vase', category: 'Hardware', price: 1200, image: '/img/product-06.avif', timestamp: '2024.03.25' },
    { id: 'K-9027', name: 'Stealth Tactical Jacket', category: 'Apparel', price: 3400, image: '/img/product-07.avif', badge: { text: 'NEW', type: 'new' }, timestamp: '2024.03.22' },
    { id: 'K-9028', name: 'Monolith Watch Stand', category: 'Accessories', price: 580, image: '/img/product-08.avif', timestamp: '2024.03.19' },
    { id: 'K-9029', name: 'Pro-X 50mm Lens', category: 'Optics', price: 9800, image: '/img/product-09.avif', badge: { text: 'LIMITED', type: 'limited' }, timestamp: '2024.03.15' },
  ])

  const filteredProducts = computed(() => {
    if (selectedFilter.value === 'All Categories') return products.value
    return products.value.filter(p => p.category === selectedFilter.value)
  })

  function onLoadMore() {
    // future: fetch next page
  }

  return { selectedFilter, viewMode, categories, products, filteredProducts, onLoadMore }
})
