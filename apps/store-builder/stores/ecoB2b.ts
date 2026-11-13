import type { EcoCompany, EcoPriceList, EcoQuote } from '@/types/ecosystem'

export const useEcoB2bStore = defineStore('ecoB2b', () => {
  const companies = ref<EcoCompany[]>([
    { id: 'c1', name: 'شركة النيل للتجارة', locations: 3, buyers: 5, terms: 'net30', creditLimit: 150000, status: 'active' },
    { id: 'c2', name: 'Delta Retail Group', locations: 8, buyers: 12, terms: 'net30', creditLimit: 400000, status: 'active' },
    { id: 'c3', name: 'مكتبة الأهرام', locations: 1, buyers: 2, terms: 'prepaid', creditLimit: 0, status: 'pending' },
    { id: 'c4', name: 'Alex Distribution', locations: 2, buyers: 3, terms: 'prepaid', creditLimit: 20000, status: 'suspended' },
  ])
  const priceLists = ref<EcoPriceList[]>([
    {
      id: 'pl1', name: 'Wholesale A', product: 'Leather Bag', minOrder: 10, maxOrder: 500,
      tiers: [{ minQty: 10, price: 850 }, { minQty: 50, price: 790 }, { minQty: 100, price: 720 }],
      companies: ['شركة النيل للتجارة', 'Delta Retail Group'],
    },
    {
      id: 'pl2', name: 'Stationery Bulk', product: 'Notebook A5', minOrder: 20, maxOrder: 2000,
      tiers: [{ minQty: 20, price: 45 }, { minQty: 200, price: 38 }],
      companies: ['مكتبة الأهرام'],
    },
  ])
  const quotes = ref<EcoQuote[]>([
    {
      id: 'Q-2041', company: 'Delta Retail Group', contact: 'Hany Samir', date: '2026-11-11', status: 'requested', discountPct: 0,
      lines: [{ name: 'Leather Bag', qty: 120, unitPrice: 720 }, { name: 'Wallet', qty: 200, unitPrice: 180 }],
    },
    {
      id: 'Q-2038', company: 'شركة النيل للتجارة', contact: 'Mona Ibrahim', date: '2026-11-08', status: 'sent', discountPct: 5,
      lines: [{ name: 'Leather Bag', qty: 60, unitPrice: 790 }],
    },
    {
      id: 'Q-2030', company: 'Alex Distribution', contact: 'Tarek Nabil', date: '2026-10-28', status: 'expired', discountPct: 0,
      lines: [{ name: 'Wallet', qty: 100, unitPrice: 190 }],
    },
  ])

  function addCompany(c: Omit<EcoCompany, 'id' | 'status'>) {
    companies.value.unshift({ id: `c${Date.now()}`, status: 'pending', ...c })
  }
  function assignCompany(listId: string, company: string) {
    const l = priceLists.value.find((x) => x.id === listId)
    if (l && !l.companies.includes(company)) l.companies.push(company)
  }
  function sendQuote(id: string, discountPct: number) {
    const q = quotes.value.find((x) => x.id === id)
    if (!q) return
    q.discountPct = discountPct
    q.status = 'sent'
  }

  return { companies, priceLists, quotes, addCompany, assignCompany, sendQuote }
})
