/**
 * Lazy loaders for storefront renderers, keyed by section type.
 * `product_detail` → components/storefront/sections/section-product-detail.vue
 */
const loaders = import.meta.glob('../components/storefront/sections/section-*.vue')

export const getSectionLoader = (type: string) => {
  return loaders[`../components/storefront/sections/section-${type.replace(/_/g, '-')}.vue`]
}
