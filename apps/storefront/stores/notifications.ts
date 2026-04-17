import type { StorefrontNotification } from '@/types/notifications'

export const useStorefrontNotificationsStore = defineStore('storefront-notifications', () => {
  const activeTab = ref('all')

  const tabs = ref([
    { id: 'all', label: 'All' },
    { id: 'orders', label: 'Orders' },
    { id: 'security', label: 'Security' },
  ])

  const notifications = ref<StorefrontNotification[]>([
    {
      id: 1,
      category: 'Shopping',
      title: 'Order has been shipped',
      message: 'Your order #ORD-0889 has been picked up by the courier and is on its way.',
      time: '2m ago',
      icon: 'ph:package-bold',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      read: false,
      type: 'orders',
    },
    {
      id: 2,
      category: 'Security',
      title: 'Profile updated',
      message: 'Your account profile was successfully modified from a new device.',
      time: '45m ago',
      icon: 'ph:shield-check-bold',
      iconColor: 'text-brand',
      bgColor: 'bg-indigo-50',
      read: false,
      type: 'security',
    },
    {
      id: 3,
      category: 'Shopping',
      title: 'Payment confirmed',
      message: 'We have received payment for your latest order. Thank you for shopping!',
      time: '2h ago',
      icon: 'ph:check-circle-bold',
      iconColor: 'text-brand',
      bgColor: 'bg-indigo-50',
      read: true,
      type: 'orders',
    },
    {
      id: 4,
      category: 'Shopping',
      title: 'New arrival alert',
      message: 'The Spectra Prime Lens you bookmarked is back in stock. Grab it before it sells out.',
      time: '5h ago',
      icon: 'ph:bell-bold',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      read: true,
      type: 'orders',
    },
    {
      id: 5,
      category: 'Security',
      title: 'New login detected',
      message: 'A new sign-in was detected from Cairo, Egypt. If this was not you, please secure your account.',
      time: '1d ago',
      icon: 'ph:warning-bold',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      read: true,
      type: 'security',
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

  return { activeTab, tabs, notifications, unreadCount, filteredNotifications, markAllAsRead }
})
