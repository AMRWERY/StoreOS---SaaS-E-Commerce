import type { Bundle, MktProduct, UpsellRule } from '@/types/marketing'

export const useMktBundlesStore = defineStore('mktBundles', () => {
  const products: MktProduct[] = [
    { id: 'p1', name: 'Cotton Abaya', price: 1450 },
    { id: 'p2', name: 'Silk Hijab', price: 380 },
    { id: 'p3', name: 'Leather Sandals', price: 920 },
    { id: 'p4', name: 'Argan Oil Set', price: 540 },
    { id: 'p5', name: 'Oud Perfume 50ml', price: 1100 },
    { id: 'p6', name: 'Gift Box', price: 150 },
  ]
  const bundles = ref<Bundle[]>([
    { id: 'BND-01', name: 'Modest Starter Kit', items: [{ productId: 'p1', qty: 1 }, { productId: 'p2', qty: 2 }], price: 1999, stock: 24, status: 'active' },
    { id: 'BND-02', name: 'Self-care Gift Set', items: [{ productId: 'p4', qty: 1 }, { productId: 'p5', qty: 1 }, { productId: 'p6', qty: 1 }], price: 1650, stock: 12, status: 'active' },
    { id: 'BND-03', name: 'Summer Pair', items: [{ productId: 'p3', qty: 1 }, { productId: 'p2', qty: 1 }], price: 1200, stock: 0, status: 'draft' },
  ])
  const rules = ref<UpsellRule[]>([
    { id: 'UP-1', triggerId: 'p1', offeredId: 'p2', placement: 'product' },
    { id: 'UP-2', triggerId: 'p5', offeredId: 'p6', placement: 'cart' },
    { id: 'UP-3', triggerId: 'p4', offeredId: 'p5', placement: 'post_purchase' },
  ])

  const productName = (id: string) => products.find((p) => p.id === id)?.name ?? id
  const bundleSum = (b: Pick<Bundle, 'items'>) =>
    b.items.reduce((s, i) => s + (products.find((p) => p.id === i.productId)?.price ?? 0) * i.qty, 0)

  function addBundle(b: Omit<Bundle, 'id'>) {
    bundles.value.unshift({ id: `BND-${String(bundles.value.length + 1).padStart(2, '0')}`, ...b })
  }
  function addRule(r: Omit<UpsellRule, 'id'>) {
    rules.value.push({ id: `UP-${rules.value.length + 1}`, ...r })
  }
  function removeRule(id: string) {
    rules.value = rules.value.filter((r) => r.id !== id)
  }

  return { products, bundles, rules, productName, bundleSum, addBundle, addRule, removeRule }
})
