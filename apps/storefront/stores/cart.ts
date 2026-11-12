import { DISCOUNT_CODES, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from '@/data/shop-data'
import type { CartItem, CartLine } from '@/types/shop'

export const useCartStore = defineStore('shop-cart', () => {
  const catalog = useCatalogStore()

  // Cookies are readable on the server too, so the cart renders identically
  // on SSR and after hydration. Only ids and quantities are stored.
  const lines = useCookie<CartLine[]>('storeos-cart', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })
  const couponCode = useCookie<string>('storeos-coupon', { default: () => '', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' })
  const drawerOpen = ref(false)

  const items = computed<CartItem[]>(() =>
    (lines.value ?? []).flatMap((line) => {
      const product = catalog.products.find(p => p.id === line.productId)
      const variant = product?.variants.find(v => v.id === line.variantId)
      if (!product || !variant) return []
      return [{ ...line, product, variant, unitPrice: variant.price, lineTotal: variant.price * line.qty }]
    }),
  )

  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((n, i) => n + i.lineTotal, 0))
  const coupon = computed(() => DISCOUNT_CODES[couponCode.value] ? { code: couponCode.value, ...DISCOUNT_CODES[couponCode.value]! } : null)
  const discount = computed(() => (coupon.value?.type === 'percent' ? Math.round(subtotal.value * coupon.value.value / 100) : 0))
  const baseShipping = computed(() => (!items.value.length || subtotal.value >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING))
  const shipping = computed(() => (coupon.value?.type === 'shipping' ? 0 : baseShipping.value))
  const total = computed(() => Math.max(0, subtotal.value - discount.value + shipping.value))
  const freeShippingRemaining = computed(() => Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal.value))
  const freeShippingProgress = computed(() => Math.min(100, Math.round(subtotal.value / FREE_SHIPPING_THRESHOLD * 100)))

  function add(productId: string, variantId: string, qty = 1) {
    const stock = catalog.getProduct(catalog.products.find(p => p.id === productId)?.handle ?? '')?.variants.find(v => v.id === variantId)?.stock ?? 0
    const next = [...lines.value]
    const existing = next.find(l => l.variantId === variantId)
    if (existing) existing.qty = Math.min(stock || existing.qty + qty, existing.qty + qty)
    else next.push({ productId, variantId, qty: Math.min(qty, stock || qty) })
    lines.value = next
    drawerOpen.value = true
  }

  function setQty(variantId: string, qty: number) {
    if (qty <= 0) return remove(variantId)
    lines.value = lines.value.map(l => (l.variantId === variantId ? { ...l, qty: Math.min(qty, 20) } : l))
  }

  function remove(variantId: string) {
    lines.value = lines.value.filter(l => l.variantId !== variantId)
  }

  function clear() {
    lines.value = []
    couponCode.value = ''
  }

  /** Returns true when the code is valid and applied. */
  function applyCoupon(code: string) {
    const normalized = code.trim().toUpperCase()
    if (!DISCOUNT_CODES[normalized]) return false
    couponCode.value = normalized
    return true
  }

  function removeCoupon() {
    couponCode.value = ''
  }

  return {
    lines, items, count, subtotal, coupon, discount, shipping, baseShipping, total, drawerOpen,
    freeShippingRemaining, freeShippingProgress, add, setQty, remove, clear, applyCoupon, removeCoupon,
  }
})
