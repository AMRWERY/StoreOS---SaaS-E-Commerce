import type { BlockedContact, CodConfirmation, CodConfirmationStatus, CodRemittance } from '@/types/operations'

export const useCodStore = defineStore('cod', () => {
  const confirmations = ref<CodConfirmation[]>([
    { orderId: 'ORD-8860', customer: 'Ahmed Gamal', phone: '+20 100 555 0141', governorate: 'Cairo', amount: 1450, attempts: 0, channel: 'whatsapp', status: 'pending', risk: 'low' },
    { orderId: 'ORD-8859', customer: 'Hana Youssef', phone: '+20 111 555 0178', governorate: 'Giza', amount: 620, attempts: 2, channel: 'call', status: 'no_answer', risk: 'medium' },
    { orderId: 'ORD-8857', customer: 'Tarek Salah', phone: '+20 122 555 0102', governorate: 'Alexandria', amount: 3200, attempts: 1, channel: 'sms', status: 'pending', risk: 'high' },
    { orderId: 'ORD-8852', customer: 'Dina Ashraf', phone: '+20 105 555 0190', governorate: 'Mansoura', amount: 880, attempts: 1, channel: 'call', status: 'confirmed', risk: 'low' },
    { orderId: 'ORD-8849', customer: 'Ali Reda', phone: '+20 109 555 0133', governorate: 'Cairo', amount: 410, attempts: 3, channel: 'call', status: 'refused', risk: 'high' },
  ])

  const remittances = ref<CodRemittance[]>([
    { id: 'REM-221', courier: 'Bosta', orders: 48, collected: 61250, fees: 2400, status: 'pending', date: '2026-11-11' },
    { id: 'REM-220', courier: 'Bosta', orders: 52, collected: 70480, fees: 2600, status: 'settled', date: '2026-11-04' },
    { id: 'REM-219', courier: 'Aramex', orders: 17, collected: 22900, fees: 1020, status: 'disputed', date: '2026-10-28' },
  ])

  const blocklist = ref<BlockedContact[]>([
    { id: 'BL-1', phone: '+20 100 555 0999', reason: 'refused_parcels', refusals: 4, addedAt: '2026-11-02' },
    { id: 'BL-2', phone: '+20 112 555 0777', reason: 'fake_orders', refusals: 2, addedAt: '2026-10-21' },
  ])

  function setConfirmation(orderId: string, status: CodConfirmationStatus) {
    const c = confirmations.value.find((x) => x.orderId === orderId)
    if (c) {
      c.status = status
      if (status === 'no_answer') c.attempts++
    }
  }
  function block(phone: string, reason: BlockedContact['reason']) {
    blocklist.value.unshift({ id: `BL-${Date.now()}`, phone, reason, refusals: 0, addedAt: new Date().toISOString().slice(0, 10) })
  }
  function unblock(id: string) {
    blocklist.value = blocklist.value.filter((b) => b.id !== id)
  }

  return { confirmations, remittances, blocklist, setConfirmation, block, unblock }
})
