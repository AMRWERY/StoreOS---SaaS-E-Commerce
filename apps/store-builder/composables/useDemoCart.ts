import type { DemoProduct } from '@/data/demo-catalog'
import { DEMO_PRODUCTS } from '@/data/demo-catalog'

export interface DemoCartLine {
  productId: string
  qty: number
  color?: string
  size?: string
}

/** In-memory demo cart shared by every commerce block (add to cart, cart page, summary). */
export function useDemoCart() {
  const lines = useState<DemoCartLine[]>('builder-demo-cart', () => [
    { productId: 'p1', qty: 1 },
    { productId: 'p3', qty: 2, size: '42' },
  ])
  const coupon = useState<string>('builder-demo-coupon', () => '')

  const items = computed(() =>
    lines.value
      .map((line) => ({
        ...line,
        product: DEMO_PRODUCTS.find((p) => p.id === line.productId) as DemoProduct,
      }))
      .filter((l) => l.product),
  )

  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
  const subtotal = computed(() => items.value.reduce((n, l) => n + l.product.price * l.qty, 0))
  const discount = computed(() => (coupon.value.toUpperCase() === 'WELCOME10' ? subtotal.value * 0.1 : 0))
  const total = computed(() => Math.max(0, subtotal.value - discount.value))

  function add(productId: string, qty = 1, opts: { color?: string; size?: string } = {}) {
    const existing = lines.value.find(
      (l) => l.productId === productId && l.color === opts.color && l.size === opts.size,
    )
    if (existing) existing.qty += qty
    else lines.value.push({ productId, qty, ...opts })
  }

  function setQty(index: number, qty: number) {
    if (!lines.value[index]) return
    if (qty <= 0) lines.value.splice(index, 1)
    else lines.value[index].qty = qty
  }

  function remove(index: number) {
    lines.value.splice(index, 1)
  }

  function applyCoupon(code: string) {
    coupon.value = code.trim()
    return coupon.value.toUpperCase() === 'WELCOME10'
  }

  function clear() {
    lines.value = []
    coupon.value = ''
  }

  return { lines, items, count, subtotal, discount, total, coupon, add, setQty, remove, applyCoupon, clear }
}
