/**
 * Locale-stripped dashboard paths mapped to the plan feature they require.
 * Longest prefix wins, so `/dashboard/orders/order-form` resolves before `/dashboard/orders`.
 * Used by `auth.global.ts` and the sidebar so a typed URL is gated the same as a click.
 */
export const ROUTE_FEATURES: Array<{ prefix: string; feature: string }> = [
  { prefix: '/dashboard/orders/order-form', feature: 'orders:write' },
  { prefix: '/dashboard/products/product-form', feature: 'products:write' },
  { prefix: '/dashboard/inventory', feature: 'inventory' },
  { prefix: '/dashboard/customers', feature: 'customers' },
  { prefix: '/dashboard/analytics', feature: 'analytics' },
  { prefix: '/dashboard/coupons', feature: 'coupons' },
  { prefix: '/dashboard/builder', feature: 'builder' },
  { prefix: '/dashboard/settings', feature: 'settings' },
  { prefix: '/dashboard/user-profile', feature: 'profile' },
  { prefix: '/dashboard/orders', feature: 'orders' },
  { prefix: '/dashboard/products', feature: 'products' },
  { prefix: '/dashboard', feature: 'dashboard' },
]

/** Strip the `@nuxtjs/i18n` `prefix` strategy locale segment (`/en/...`, `/ar/...`). */
export const stripLocale = (path: string): string =>
  path.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, '') || '/'

/** The feature a dashboard path requires, or `null` when it is not gated. */
export const featureForPath = (path: string): string | null =>
  ROUTE_FEATURES.find(({ prefix }) => path === prefix || path.startsWith(prefix + '/'))?.feature ?? null
