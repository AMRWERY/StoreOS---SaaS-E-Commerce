import type { FlashSale, ReadinessItem } from '@/types/checkoutExtras'

export const useChkFlashSaleStore = defineStore('chkFlashSale', () => {
  const waitingRoom = ref(true)
  const capacity = ref('250')
  const messageEn = ref('You are in line. We will let you in shortly - please keep this page open.')
  const messageAr = ref('أنت في قائمة الانتظار. سندخلك قريباً، من فضلك أبقِ هذه الصفحة مفتوحة.')
  const countdownStart = ref<Date | null>(new Date('2026-11-27T00:00:00'))
  const countdownEnd = ref<Date | null>(new Date('2026-11-27T23:59:00'))

  const queueSize = ref(1842)
  const avgWaitSeconds = ref(94)

  const sales = ref<FlashSale[]>([
    { id: 'fs-1', name: 'Black Friday 2026', start: '2026-11-27 00:00', end: '2026-11-27 23:59', discountPercent: 40, status: 'scheduled' },
    { id: 'fs-2', name: 'Singles Day 11.11', start: '2026-11-11 00:00', end: '2026-11-11 23:59', discountPercent: 25, status: 'ended' },
    { id: 'fs-3', name: 'Midnight electronics drop', start: '2026-11-12 22:00', end: '2026-11-13 02:00', discountPercent: 30, status: 'live' },
    { id: 'fs-4', name: 'Eid al-Fitr kickoff', start: '2027-03-30 09:00', end: '2027-03-31 09:00', discountPercent: 20, status: 'scheduled' },
  ])

  const readiness = ref<ReadinessItem[]>([
    { id: 'cdn', done: true },
    { id: 'inventory', done: true },
    { id: 'gateway', done: true },
    { id: 'loadTest', done: false },
    { id: 'alerts', done: false },
    { id: 'support', done: false },
  ])

  function toggleReadiness(id: string) {
    const r = readiness.value.find((x) => x.id === id)
    if (r) r.done = !r.done
  }
  function removeSale(id: string) {
    sales.value = sales.value.filter((s) => s.id !== id)
  }

  const readyCount = computed(() => readiness.value.filter((r) => r.done).length)

  return {
    waitingRoom, capacity, messageEn, messageAr, countdownStart, countdownEnd, queueSize, avgWaitSeconds,
    sales, readiness, readyCount, toggleReadiness, removeSale,
  }
})
