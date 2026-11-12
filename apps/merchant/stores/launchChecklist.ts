import type { ChecklistTask } from '@/types/operations'

export const useLaunchChecklistStore = defineStore('launchChecklist', () => {
  const tasks = ref<ChecklistTask[]>([
    { id: 'storeInfo', group: 'store', done: true, to: '/dashboard/settings/store-info' },
    { id: 'firstProduct', group: 'store', done: true, to: '/dashboard/products' },
    { id: 'theme', group: 'store', done: false, to: '/dashboard/builder' },
    { id: 'policies', group: 'store', done: false, to: '/dashboard/settings/store-info' },
    { id: 'cod', group: 'payments', done: true, to: '/dashboard/settings/payment-gateways' },
    { id: 'onlinePayment', group: 'payments', done: false, to: '/dashboard/settings/payment-gateways' },
    { id: 'shippingZones', group: 'shipping', done: false, to: '/dashboard/settings/shipping-logistics' },
    { id: 'carrier', group: 'shipping', done: false, to: '/dashboard/settings/shipping-logistics' },
    { id: 'domain', group: 'launch', done: false, to: '/dashboard/settings/store-info' },
    { id: 'testOrder', group: 'launch', done: false, to: '/dashboard/orders' },
  ])

  const doneCount = computed(() => tasks.value.filter((t) => t.done).length)
  const progress = computed(() => Math.round((doneCount.value / tasks.value.length) * 100))

  function toggle(id: string) {
    const t = tasks.value.find((x) => x.id === id)
    if (t) t.done = !t.done
  }

  return { tasks, doneCount, progress, toggle }
})
