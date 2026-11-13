import type { GiftCard } from '@/types/operations'

export const useGiftCardsStore = defineStore('giftCards', () => {
  const giftCards = ref<GiftCard[]>([
    { code: 'GC-7F3K-92QD', recipient: 'Sara Mostafa', initial: 500, balance: 500, status: 'active', expiresAt: '2027-11-01' },
    { code: 'GC-1A8X-55LM', recipient: 'Omar Hassan', initial: 1000, balance: 340, status: 'active', expiresAt: '2027-06-15' },
    { code: 'GC-9B2N-07ZT', recipient: 'Nour Adel', initial: 250, balance: 0, status: 'redeemed', expiresAt: '2027-01-20' },
    { code: 'GC-4C6P-31WR', recipient: 'Karim Fathy', initial: 750, balance: 750, status: 'expired', expiresAt: '2026-10-01' },
  ])

  function issue(card: Pick<GiftCard, 'recipient' | 'initial' | 'expiresAt'>) {
    const rand = () => Math.random().toString(36).slice(2, 6).toUpperCase()
    giftCards.value.unshift({
      code: `GC-${rand()}-${rand()}`,
      balance: card.initial,
      status: 'active',
      ...card,
    })
  }
  function disable(code: string) {
    const c = giftCards.value.find((x) => x.code === code)
    if (c) c.status = 'disabled'
  }

  return { giftCards, issue, disable }
})
