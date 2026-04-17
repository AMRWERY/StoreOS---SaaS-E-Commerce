import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore('storefront-cart', () => {
  const cartItems = ref<CartItem[]>([
    { id: 1, name: 'Vector Runner Pro', category: 'Footwear', meta: 'Color: Carbon Red / Size: 42', price: 189.00, quantity: 1, image: '/img/product-05.avif' },
    { id: 2, name: 'Chrono Series X', category: 'Accessories', meta: 'Variant: Midnight Steel', price: 299.00, quantity: 2, image: '/img/product-06.avif' },
    { id: 3, name: 'Sonic Bloom Headset', category: 'Electronics', meta: 'Color: Obsidian Black', price: 299.00, quantity: 1, image: '/img/product-07.avif' },
  ])

  const totalItems = computed(() => cartItems.value.reduce((acc, item) => acc + item.quantity, 0))
  const subtotal = computed(() => cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0))
  const total = computed(() => subtotal.value)

  function updateQuantity(id: number, delta: number) {
    const item = cartItems.value.find(i => i.id === id)
    if (item) {
      const next = item.quantity + delta
      if (next > 0) item.quantity = next
    }
  }

  function removeItem(id: number) {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }

  function addItem(item: Omit<CartItem, 'quantity'> & { quantity?: number }) {
    const existing = cartItems.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += item.quantity ?? 1
    } else {
      cartItems.value.push({ ...item, quantity: item.quantity ?? 1 })
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  return { cartItems, totalItems, subtotal, total, updateQuantity, removeItem, addItem, clearCart }
})
