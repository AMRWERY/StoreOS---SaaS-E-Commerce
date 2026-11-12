import type { PaymentLink, PaymentLinkAmountMode } from '@/types/checkoutExtras'

export const useChkLinksStore = defineStore('chkLinks', () => {
  const links = ref<PaymentLink[]>([
    {
      id: 'pl-1', name: 'Ramadan gift box', amountMode: 'fixed', amount: 1250, product: 'Gift Box Large',
      url: 'https://pay.storeos.app/l/rmdn-gift', uses: 64, oneTime: false, expiresAt: '2027-03-30', note: '', status: 'active',
    },
    {
      id: 'pl-2', name: 'Custom order deposit', amountMode: 'open', amount: 0, product: '',
      url: 'https://pay.storeos.app/l/dep-8f2k', uses: 12, oneTime: false, expiresAt: '2027-01-15', note: 'Deposit for custom furniture', status: 'active',
    },
    {
      id: 'pl-3', name: 'Invoice 2041 - Nour Trading', amountMode: 'fixed', amount: 18400, product: '',
      url: 'https://pay.storeos.app/l/inv-2041', uses: 1, oneTime: true, expiresAt: '2026-10-01', note: '', status: 'expired',
    },
    {
      id: 'pl-4', name: 'Oud oil quick buy', amountMode: 'fixed', amount: 475, product: 'Oud Perfume Oil 12ml',
      url: 'https://pay.storeos.app/l/oud-12ml', uses: 208, oneTime: false, expiresAt: '2027-06-01', note: '', status: 'disabled',
    },
  ])

  const lastCreated = ref<PaymentLink | null>(null)

  function createLink(draft: {
    name: string
    amountMode: PaymentLinkAmountMode
    amount: number
    product: string
    expiresAt: string
    oneTime: boolean
    note: string
  }) {
    const slug = Math.random().toString(36).slice(2, 8)
    const link: PaymentLink = {
      ...draft,
      id: `pl-${Date.now()}`,
      url: `https://pay.storeos.app/l/${slug}`,
      uses: 0,
      status: 'active',
    }
    links.value.unshift(link)
    lastCreated.value = link
    return link
  }
  function toggleStatus(id: string) {
    const l = links.value.find((x) => x.id === id)
    if (!l || l.status === 'expired') return
    l.status = l.status === 'active' ? 'disabled' : 'active'
  }
  function clearLast() {
    lastCreated.value = null
  }

  return { links, lastCreated, createLink, toggleStatus, clearLast }
})
