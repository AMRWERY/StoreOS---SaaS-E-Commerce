import type { Product } from '@storeos/ui/types/v-product-card'

export const useProductsStore = defineStore('products', () => {
  const activeFilter = ref('All')
  const viewMode = ref<'grid' | 'list'>('grid')
  const currentPage = ref(1)
  const perPage = ref(6)

  const filters = ref(['All', 'Active', 'Draft', 'Out of Stock', 'Low Stock'])

  const products = ref<Product[]>([
    { id: 1, name: 'Studio One Headphones', price: '249.00', category: 'ELECTRONICS', status: 'active', stock: 28, image: '/img/product-04.avif' },
    { id: 2, name: 'Chronos Minimal White', price: '129.00', category: 'FASHION', status: 'low_stock', stock: 3, image: '/img/product-05.avif' },
    { id: 3, name: 'Aviator Series II', price: '89.00', category: 'FASHION', status: 'out_of_stock', stock: 0, image: '/img/product-01.avif' },
    { id: 4, name: 'Lumine Essence Kit', price: '56.00', category: 'BEAUTY', status: 'active', stock: 112, image: '/img/product-06.avif' },
    { id: 5, name: 'Nordic Oak Chair', price: '320.00', category: 'FURNITURE', status: 'inactive', stock: 8, image: '/img/product-07.avif' },
    { id: 6, name: 'Carbon Night Edition', price: '458.00', category: 'FASHION', status: 'low_stock', stock: 2, image: '/img/product-08.avif' },
    { id: 7, name: 'Pixel Click Pro', price: '75.00', category: 'ELECTRONICS', status: 'active', stock: 45, image: '/img/product-09.avif' },
    { id: 8, name: 'Capture X100', price: '1,199.00', category: 'ELECTRONICS', status: 'out_of_stock', stock: 4, image: '/img/product-010.avif' },
    { id: 9, name: 'Pro-X Wireless Headset', price: '199.00', category: 'ELECTRONICS', status: 'active', stock: 16, image: '/img/product-02.avif' },
    { id: 10, name: 'Mechanical Deck V3', price: '159.00', category: 'PERIPHERALS', status: 'low_stock', stock: 3, image: '/img/product-03.avif' },
  ])

  const filteredProducts = computed(() => {
    if (activeFilter.value === 'All') return products.value
    const map: Record<string, string> = {
      'Active': 'active',
      'Draft': 'draft',
      'Out of Stock': 'out_of_stock',
      'Low Stock': 'low_stock',
    }
    return products.value.filter(p => p.status === map[activeFilter.value])
  })

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return filteredProducts.value.slice(start, start + perPage.value)
  })

  return {
    activeFilter, viewMode, currentPage, perPage,
    filters, products, filteredProducts, paginatedProducts
  }
})
