import type { EcoPosCartLine, EcoPosProduct } from '@/types/ecosystem'

export const useEcoPosStore = defineStore('ecoPos', () => {
  const products: EcoPosProduct[] = [
    { id: 'p1', name: 'Leather Bag', barcode: '6221000010011', price: 950, icon: 'ph:handbag-bold' },
    { id: 'p2', name: 'Wallet', barcode: '6221000010028', price: 220, icon: 'ph:wallet-bold' },
    { id: 'p3', name: 'Sunglasses', barcode: '6221000010035', price: 480, icon: 'ph:sunglasses-bold' },
    { id: 'p4', name: 'Cotton T-Shirt', barcode: '6221000010042', price: 260, icon: 'ph:t-shirt-bold' },
    { id: 'p5', name: 'Sneakers', barcode: '6221000010059', price: 1350, icon: 'ph:sneaker-bold' },
    { id: 'p6', name: 'Watch', barcode: '6221000010066', price: 1800, icon: 'ph:watch-bold' },
    { id: 'p7', name: 'Perfume 100ml', barcode: '6221000010073', price: 720, icon: 'ph:drop-bold' },
    { id: 'p8', name: 'Cap', barcode: '6221000010080', price: 150, icon: 'ph:baseball-cap-bold' },
  ]
  const customers = ['Sara Mostafa', 'Omar Hassan', 'Nour Adel']
  const cart = ref<EcoPosCartLine[]>([])
  const held = ref<EcoPosCartLine[][]>([])

  function add(p: EcoPosProduct) {
    const line = cart.value.find((l) => l.id === p.id)
    if (line) line.qty += 1
    else cart.value.push({ id: p.id, name: p.name, price: p.price, qty: 1 })
  }
  function setQty(id: string, qty: number) {
    if (qty <= 0) {
      cart.value = cart.value.filter((l) => l.id !== id)
      return
    }
    const line = cart.value.find((l) => l.id === id)
    if (line) line.qty = qty
  }
  function hold() {
    if (!cart.value.length) return
    held.value.push(cart.value)
    cart.value = []
  }
  function resume(index: number) {
    const next = held.value.splice(index, 1)[0]
    if (!next) return
    // Park the current sale instead of discarding it.
    if (cart.value.length) held.value.push(cart.value)
    cart.value = next
  }
  function clear() {
    cart.value = []
  }

  return { products, customers, cart, held, add, setQty, hold, resume, clear }
})
