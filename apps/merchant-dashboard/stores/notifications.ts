import type { Notification } from '@/types/notifications'

export const useNotificationsStore = defineStore('notifications', () => {
  const isOpen = ref(false)
  const activeTab = ref('all')

  const tabs = ref([
    { id: 'all', label: 'All' },
    { id: 'orders', label: 'Orders' },
    { id: 'security', label: 'Security' }
  ])

  const notifications = ref<Notification[]>([
    {
      id: 1,
      category: 'Orders',
      title: 'New order received',
      message: '#ORD-0889 from Ethan Laurent for $189.00 is awaiting confirmation.',
      time: '2m ago',
      icon: 'ph:shopping-cart-bold',
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      read: false,
      type: 'orders'
    },
    {
      id: 2,
      category: 'Security',
      title: 'New login attempt',
      message: 'A successful login was detected from a new device in London, UK.',
      time: '45m ago',
      icon: 'ph:shield-check-bold',
      iconColor: 'text-brand',
      bgColor: 'bg-brand-dim',
      read: false,
      type: 'security'
    },
    {
      id: 3,
      category: 'Orders',
      title: 'Payment processed',
      message: 'Payment for order #ORD-0887 was successfully processed.',
      time: '2h ago',
      icon: 'ph:check-circle-bold',
      iconColor: 'text-brand',
      bgColor: 'bg-brand-dim',
      read: true,
      type: 'orders'
    },
    {
      id: 4,
      category: 'System',
      title: 'Version Update',
      message: 'StoreOS has been updated to v4.4.2. Check out the new dashboard features.',
      time: '5h ago',
      icon: 'ph:rocket-launch-bold',
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      read: true,
      type: 'system'
    },
    {
      id: 5,
      category: 'Orders',
      title: 'Order shipped',
      message: 'Order #ORD-9824 for Marcus Kane has been shipped via FedEx.',
      time: '1d ago',
      icon: 'ph:truck-bold',
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      read: true,
      type: 'orders'
    },
    {
      id: 6,
      category: 'Security',
      title: 'Password changed',
      message: 'Your account password was successfully updated.',
      time: '2d ago',
      icon: 'ph:lock-key-bold',
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      read: true,
      type: 'security'
    },
  ])

  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  const filteredNotifications = computed(() => {
    if (activeTab.value === 'all') return notifications.value
    return notifications.value.filter(n => n.type === activeTab.value)
  })

  function markAllAsRead() {
    notifications.value.forEach(n => (n.read = true))
  }

  function markAsRead(id: number) {
    const n = notifications.value.find(n => n.id === id)
    if (n) n.read = true
  }

  return {
    isOpen, activeTab, tabs, notifications,
    unreadCount, filteredNotifications,
    markAllAsRead, markAsRead
  }
})
