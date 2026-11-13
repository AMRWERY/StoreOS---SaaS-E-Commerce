import type { EcoImportSource, EcoStarterTemplate } from '@/types/ecosystem'

export const useEcoImporterStore = defineStore('ecoImporter', () => {
  const sources: EcoImportSource[] = [
    { id: 'shopify', icon: 'ph:shopping-bag-bold' },
    { id: 'woocommerce', icon: 'ph:wordpress-logo-bold' },
    { id: 'csv', icon: 'ph:file-csv-bold' },
    { id: 'sallazid', icon: 'ph:storefront-bold' },
  ]
  const templates: EcoStarterTemplate[] = [
    { id: 'fashion', icon: 'ph:t-shirt-bold', gradient: 'from-danger-dim to-bg-elevated', products: 24, pages: 6 },
    { id: 'electronics', icon: 'ph:cpu-bold', gradient: 'from-info-dim to-bg-elevated', products: 18, pages: 5 },
    { id: 'grocery', icon: 'ph:basket-bold', gradient: 'from-success-dim to-bg-elevated', products: 40, pages: 4 },
    { id: 'beauty', icon: 'ph:flower-lotus-bold', gradient: 'from-warning-dim to-bg-elevated', products: 16, pages: 5 },
  ]
  const fieldMap = [
    { source: 'Title', target: 'title' },
    { source: 'Variant Price', target: 'price' },
    { source: 'Variant SKU', target: 'sku' },
    { source: 'Body (HTML)', target: 'description' },
  ]
  const result = { products: 342, customers: 128, orders: 56, redirects: 18, warnings: 3 }

  return { sources, templates, fieldMap, result }
})
