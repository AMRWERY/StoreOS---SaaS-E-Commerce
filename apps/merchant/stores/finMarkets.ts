import type { Market, MarketCode, PriceListProduct } from '@/types/insights'

export const MARKET_DEFAULTS: Record<MarketCode, { currency: string; rate: number; language: 'ar' | 'en' }> = {
  EG: { currency: 'EGP', rate: 1, language: 'ar' },
  SA: { currency: 'SAR', rate: 0.076, language: 'ar' },
  AE: { currency: 'AED', rate: 0.074, language: 'en' },
  KW: { currency: 'KWD', rate: 0.0062, language: 'ar' },
  QA: { currency: 'QAR', rate: 0.073, language: 'ar' },
  JO: { currency: 'JOD', rate: 0.0143, language: 'ar' },
}

export const useFinMarketsStore = defineStore('finMarkets', () => {
  const markets = ref<Market[]>([
    { code: 'EG', primary: true, currency: 'EGP', language: 'ar', ratePolicy: 'manual', rate: 1, rounding: 'whole', domainStrategy: 'domain', domain: 'store.eg', shipping: ['bosta', 'aramex', 'pickup'], payment: ['cod', 'card', 'fawry', 'wallet'] },
    { code: 'SA', primary: false, currency: 'SAR', language: 'ar', ratePolicy: 'auto', rate: 0.076, rounding: 'ninetyNine', domainStrategy: 'subfolder', domain: 'store.eg/sa', shipping: ['aramex', 'dhl'], payment: ['card', 'mada', 'applePay'] },
    { code: 'AE', primary: false, currency: 'AED', language: 'en', ratePolicy: 'manual', rate: 0.074, rounding: 'five', domainStrategy: 'subfolder', domain: 'store.eg/ae', shipping: ['aramex', 'dhl'], payment: ['card', 'applePay', 'cod'] },
  ])
  const products = ref<PriceListProduct[]>([
    { id: 'P-1', name: 'Cotton Oversized Hoodie', base: 650 },
    { id: 'P-2', name: 'Canvas Sneakers', base: 890 },
    { id: 'P-3', name: 'Leather Crossbody Bag', base: 1450 },
    { id: 'P-4', name: 'Linen Summer Shirt', base: 520 },
  ])

  function addMarket(m: Omit<Market, 'primary' | 'shipping' | 'payment' | 'domain'>) {
    markets.value.push({
      ...m,
      primary: false,
      domain: m.domainStrategy === 'subfolder' ? `store.eg/${m.code.toLowerCase()}` : `${m.code.toLowerCase()}.store.eg`,
      shipping: ['aramex'],
      payment: ['card'],
    })
  }
  function toggleMethod(code: MarketCode, kind: 'shipping' | 'payment', value: string) {
    const m = markets.value.find((x) => x.code === code)
    if (!m) return
    const list = m[kind] as string[]
    const idx = list.indexOf(value)
    if (idx >= 0) list.splice(idx, 1)
    else list.push(value)
  }

  return { markets, products, addMarket, toggleMethod }
})
