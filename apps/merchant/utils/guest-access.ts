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
  { prefix: '/dashboard/settings/staff-and-permissions', feature: 'staff' },
  { prefix: '/dashboard/settings/payment-gateways', feature: 'payments' },
  { prefix: '/dashboard/settings/shipping-logistics', feature: 'shipping' },
  { prefix: '/dashboard/settings/notification-center', feature: 'notifications' },
  { prefix: '/dashboard/settings/api-and-webhooks', feature: 'api' },
  { prefix: '/dashboard/settings', feature: 'settings' },
  { prefix: '/dashboard/user-profile', feature: 'profile' },
  { prefix: '/dashboard/orders', feature: 'orders' },
  { prefix: '/dashboard/products', feature: 'products' },
  { prefix: '/dashboard/collections', feature: 'products' },
  { prefix: '/dashboard/files', feature: 'products' },
  { prefix: '/dashboard/navigation', feature: 'settings' },
  { prefix: '/dashboard/translations', feature: 'settings' },
  { prefix: '/dashboard/activity', feature: 'settings' },
  { prefix: '/dashboard/automation', feature: 'orders' },
  { prefix: '/dashboard/returns', feature: 'orders' },
  { prefix: '/dashboard/cod', feature: 'orders' },
  { prefix: '/dashboard/gift-cards', feature: 'coupons' },
  { prefix: '/dashboard', feature: 'dashboard' },
]

/** Strip the `@nuxtjs/i18n` `prefix` strategy locale segment (`/en/...`, `/ar/...`). */
export const stripLocale = (path: string): string =>
  path.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, '') || '/'

/** The feature a dashboard path requires, or `null` when it is not gated. */
export const featureForPath = (path: string): string | null =>
  ROUTE_FEATURES.find(({ prefix }) => path === prefix || path.startsWith(prefix + '/'))?.feature ?? null
