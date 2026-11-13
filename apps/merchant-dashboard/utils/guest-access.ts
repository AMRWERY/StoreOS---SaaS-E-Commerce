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
  { prefix: '/dashboard/payment-links', feature: 'payments' },
  { prefix: '/dashboard/campaigns', feature: 'coupons' },
  { prefix: '/dashboard/loyalty', feature: 'coupons' },
  { prefix: '/dashboard/bundles', feature: 'coupons' },
  { prefix: '/dashboard/affiliates', feature: 'coupons' },
  { prefix: '/dashboard/reviews', feature: 'coupons' },
  { prefix: '/dashboard/channels', feature: 'settings' },
  { prefix: '/dashboard/inbox', feature: 'customers' },
  { prefix: '/dashboard/finance', feature: 'payments' },
  { prefix: '/dashboard/themes', feature: 'builder' },
  { prefix: '/dashboard/blog', feature: 'builder' },
  { prefix: '/dashboard/redirects', feature: 'settings' },
  { prefix: '/dashboard/import', feature: 'settings' },
  { prefix: '/dashboard/apps', feature: 'api' },
  { prefix: '/dashboard/webhooks', feature: 'api' },
  { prefix: '/dashboard/b2b', feature: 'customers' },
  { prefix: '/dashboard/pos', feature: 'orders' },
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
