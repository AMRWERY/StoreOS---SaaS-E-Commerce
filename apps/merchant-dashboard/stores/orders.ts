import type { Order } from '@/types/orders'

export const useOrdersStore = defineStore('orders', () => {
  const activeTab = ref('New')
  const selectedOrders = ref<number[]>([])
  const selectedOrder = ref<Order | null>(null)
  const currentPage = ref(1)
  const perPage = ref(2)

  const tabs = ref([
    { name: 'All', count: null },
    { name: 'New', count: 12 },
    { name: 'Confirmed', count: null },
    { name: 'Processing', count: null },
    { name: 'Shipped', count: null },
    { name: 'Delivered', count: null },
    { name: 'Cancelled', count: null },
    { name: 'Refunded', count: null },
  ])

  const orders = ref<Order[]>([
    {
      id: 9825,
      customer: 'Ethan Laurent',
      phone: '+1 (555) 012-9842',
      initials: 'EL',
      avatarBg: 'bg-indigo-500/20 text-indigo-400',
      itemsCount: 3,
      total: '1,250.00',
      paymentStatus: 'PAID',
      orderStatus: 'NEW',
      time: '2m ago',
      active: true
    },
    {
      id: 9824,
      customer: 'Marcus Kane',
      phone: '+44 20 7946 0122',
      initials: 'MK',
      avatarBg: 'bg-emerald-500/20 text-emerald-400',
      itemsCount: 1,
      total: '429.00',
      paymentStatus: 'PAID',
      orderStatus: 'SHIPPED',
      time: '14m ago',
      active: false
    },
    {
      id: 9823,
      customer: 'Sarah Chen',
      phone: '+81 90-1234-5678',
      initials: 'SC',
      avatarBg: 'bg-orange-500/20 text-orange-400',
      itemsCount: 2,
      total: '2,190.40',
      paymentStatus: 'UNPAID',
      orderStatus: 'CONFIRMED',
      time: '42m ago',
      active: false
    },
    {
      id: 9822,
      customer: 'Jordan Hayes',
      phone: '+44 20 7946 0199',
      initials: 'JH',
      avatarBg: 'bg-gray-500/20 text-tx-secondary',
      itemsCount: 4,
      total: '3,812.00',
      paymentStatus: 'PAID',
      orderStatus: 'PROCESSING',
      time: '1h ago',
      active: false
    },
    {
      id: 9821,
      customer: 'Elena Rodriguez',
      phone: '+1 (555) 304-7821',
      initials: 'ER',
      avatarBg: 'bg-purple-500/20 text-purple-400',
      itemsCount: 2,
      total: '840.50',
      paymentStatus: 'PAID',
      orderStatus: 'DELIVERED',
      time: '3h ago',
      active: false
    },
    {
      id: 9820,
      customer: 'Alex Rivera',
      phone: '+20 102 345 6789',
      initials: 'AR',
      avatarBg: 'bg-orange-500/20 text-orange-500',
      itemsCount: 1,
      total: '189.00',
      paymentStatus: 'UNPAID',
      orderStatus: 'CANCELLED',
      time: '5h ago',
      active: false
    },
  ])

  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return orders.value.slice(start, start + perPage.value)
  })

  const isAllSelected = computed(() =>
    orders.value.length > 0 && selectedOrders.value.length === orders.value.length
  )

  function toggleSelection(id: number) {
    const index = selectedOrders.value.indexOf(id)
    if (index === -1) {
      selectedOrders.value.push(id)
    } else {
      selectedOrders.value.splice(index, 1)
    }
  }

  function toggleSelectAll() {
    if (isAllSelected.value) {
      selectedOrders.value = []
    } else {
      selectedOrders.value = orders.value.map(o => o.id)
    }
  }

  return {
    activeTab, selectedOrders, selectedOrder, currentPage, perPage,
    tabs, orders, paginatedOrders, isAllSelected,
    toggleSelection, toggleSelectAll
  }
})
