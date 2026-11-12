import type { CatxCreditBalance, CatxCreditLedgerRow } from '@/types/catalogDepth'

export const useCatxStoreCreditStore = defineStore('catxStoreCredit', () => {
  const balances = ref<CatxCreditBalance[]>([
    { id: 'CR-01', customer: 'منى عبد الله', balance: 350, lastActivity: '2026-11-10' },
    { id: 'CR-02', customer: 'كريم السيد', balance: 1200, lastActivity: '2026-11-08' },
    { id: 'CR-03', customer: 'هالة إبراهيم', balance: 80, lastActivity: '2026-10-29' },
    { id: 'CR-04', customer: 'أحمد حسن', balance: 640, lastActivity: '2026-11-02' },
  ])

  const ledger = ref<CatxCreditLedgerRow[]>([
    { id: 'LG-01', date: '2026-11-10', customer: 'منى عبد الله', type: 'add', amount: 150, balanceAfter: 350, actor: 'Amr' },
    { id: 'LG-02', date: '2026-11-08', customer: 'كريم السيد', type: 'add', amount: 500, balanceAfter: 1200, actor: 'Salma' },
    { id: 'LG-03', date: '2026-11-02', customer: 'أحمد حسن', type: 'deduct', amount: 200, balanceAfter: 640, actor: 'Amr' },
    { id: 'LG-04', date: '2026-10-29', customer: 'هالة إبراهيم', type: 'add', amount: 80, balanceAfter: 80, actor: 'Salma' },
  ])

  const outstanding = computed(() => balances.value.reduce((s, b) => s + b.balance, 0))
  const issuedThisMonth = computed(() =>
    ledger.value.filter((l) => l.type === 'add' && l.date.startsWith('2026-11')).reduce((s, l) => s + l.amount, 0),
  )

  function adjust(customerId: string, type: 'add' | 'deduct', amount: number) {
    const b = balances.value.find((x) => x.id === customerId)
    if (!b || amount <= 0) return
    b.balance = Math.max(0, b.balance + (type === 'add' ? amount : -amount))
    b.lastActivity = '2026-11-12'
    ledger.value.unshift({
      id: `LG-${String(ledger.value.length + 1).padStart(2, '0')}`,
      date: '2026-11-12',
      customer: b.customer,
      type,
      amount,
      balanceAfter: b.balance,
      actor: 'Amr',
    })
  }

  return { balances, ledger, outstanding, issuedThisMonth, adjust }
})
