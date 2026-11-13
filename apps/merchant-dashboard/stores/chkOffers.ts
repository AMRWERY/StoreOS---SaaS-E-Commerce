import type { CheckoutOffer, ChkCatalogItem, OfferKind } from '@/types/checkoutExtras'

export const useChkOffersStore = defineStore('chkOffers', () => {
  const products = ref<ChkCatalogItem[]>([
    { value: 'p-case', label: 'Silicone Phone Case', price: 150 },
    { value: 'p-charger', label: 'Fast Charger 30W', price: 350 },
    { value: 'p-buds', label: 'Wireless Earbuds', price: 899 },
    { value: 'p-cable', label: 'Braided USB-C Cable', price: 120 },
    { value: 'p-oud', label: 'Oud Perfume Oil 12ml', price: 475 },
  ])
  const collections = ref<ChkCatalogItem[]>([
    { value: 'c-phones', label: 'Smartphones', price: 0 },
    { value: 'c-audio', label: 'Audio', price: 0 },
    { value: 'c-fragrance', label: 'Fragrance', price: 0 },
  ])

  const offers = ref<CheckoutOffer[]>([
    {
      id: 'of-1', name: 'Case with every phone', kind: 'bump', triggerType: 'collection', trigger: 'Smartphones',
      offeredProductId: 'p-case', discountType: 'percent', discountValue: 20, placement: 'in_checkout',
      views: 4820, conversions: 612, revenue: 73440, enabled: true,
    },
    {
      id: 'of-2', name: 'Charger add-on', kind: 'bump', triggerType: 'product', trigger: 'Wireless Earbuds',
      offeredProductId: 'p-charger', discountType: 'fixed', discountValue: 50, placement: 'in_checkout',
      views: 2150, conversions: 198, revenue: 59400, enabled: true,
    },
    {
      id: 'of-3', name: 'Cable bump over 500', kind: 'bump', triggerType: 'cart_value', trigger: '500',
      offeredProductId: 'p-cable', discountType: 'percent', discountValue: 10, placement: 'in_checkout',
      views: 3310, conversions: 241, revenue: 26028, enabled: false,
    },
    {
      id: 'of-4', name: 'Thank-you oud upsell', kind: 'post_purchase', triggerType: 'cart_value', trigger: '1000',
      offeredProductId: 'p-oud', discountType: 'percent', discountValue: 15, placement: 'thank_you',
      views: 1980, conversions: 143, revenue: 57681, enabled: true,
    },
    {
      id: 'of-5', name: 'Earbuds one-click offer', kind: 'post_purchase', triggerType: 'collection', trigger: 'Smartphones',
      offeredProductId: 'p-buds', discountType: 'fixed', discountValue: 100, placement: 'thank_you',
      views: 1240, conversions: 87, revenue: 69513, enabled: true,
    },
  ])

  const productById = (id: string) => products.value.find((p) => p.value === id)

  function discountedPrice(offer: Pick<CheckoutOffer, 'offeredProductId' | 'discountType' | 'discountValue'>) {
    const base = productById(offer.offeredProductId)?.price ?? 0
    const off = offer.discountType === 'percent' ? (base * offer.discountValue) / 100 : offer.discountValue
    return Math.max(0, Math.round(base - off))
  }

  function byKind(kind: OfferKind) {
    return offers.value.filter((o) => o.kind === kind)
  }

  function addOffer(draft: Omit<CheckoutOffer, 'id' | 'views' | 'conversions' | 'revenue' | 'enabled'>) {
    offers.value.unshift({ ...draft, id: `of-${Date.now()}`, views: 0, conversions: 0, revenue: 0, enabled: true })
  }
  function toggle(id: string) {
    const o = offers.value.find((x) => x.id === id)
    if (o) o.enabled = !o.enabled
  }
  function remove(id: string) {
    offers.value = offers.value.filter((o) => o.id !== id)
  }

  const totalRevenue = computed(() => offers.value.reduce((s, o) => s + o.revenue, 0))
  const totalViews = computed(() => offers.value.reduce((s, o) => s + o.views, 0))
  const totalConversions = computed(() => offers.value.reduce((s, o) => s + o.conversions, 0))
  const avgConversion = computed(() =>
    totalViews.value ? Math.round((totalConversions.value / totalViews.value) * 1000) / 10 : 0,
  )

  return {
    products, collections, offers, productById, discountedPrice, byKind, addOffer, toggle, remove,
    totalRevenue, totalViews, totalConversions, avgConversion,
  }
})
