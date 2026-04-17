export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref([
    { label: 'ORDERS TODAY', value: '142', trend: '+12.5% from yesterday', iconName: 'ph:chart-line-up-bold', iconColor: 'text-brand' },
    { label: 'REVENUE TODAY', value: '$12,840.00', trend: '+5.2% from yesterday', iconName: 'ph:wallet-bold', iconColor: 'text-info' },
    { label: 'PENDING ORDERS', value: '28', trend: 'Requires immediate fulfillment', iconName: 'ph:clock-bold', iconColor: 'text-accent' },
    { label: 'INVENTORY ALERTS', value: '09', trend: 'Items below safety threshold', iconName: 'ph:warning-circle-bold', iconColor: 'text-danger' },
  ])

  const recentOrders = ref([
    { id: '#SO-9821', customer: 'Marcus Holloway', items: '03', total: '$420.00', status: 'NEW', time: '2m ago' },
    { id: '#SO-9819', customer: 'Sarah Jenkins', items: '01', total: '$89.00', status: 'CONFIRMED', time: '14m ago' },
    { id: '#SO-9815', customer: 'Elena Rodriguez', items: '05', total: '$1,250.00', status: 'PROCESSING', time: '28m ago' },
    { id: '#SO-9812', customer: 'David Chen', items: '02', total: '$315.50', status: 'SHIPPED', time: '1h ago' },
    { id: '#SO-9089', customer: 'Lisa Ray', items: '01', total: '$45.00', status: 'DELIVERED', time: '2h ago' },
    { id: '#SO-9805', customer: 'Tom Baker', items: '01', total: '$210.00', status: 'CANCELLED', time: '3h ago' },
    { id: '#SO-9801', customer: 'Anna Schmidt', items: '04', total: '$890.00', status: 'SHIPPED', time: '5h ago' },
    { id: '#SO-9798', customer: 'James Miller', items: '02', total: '$150.25', status: 'DELIVERED', time: '8h ago' },
  ])

  const topProducts = ref([
    { name: 'HyperGlide Sneakers', soldToday: 32, image: 'https://picsum.photos/100/100?sig=20' },
    { name: 'Zenith Watch Pro', soldToday: 28, image: 'https://picsum.photos/100/100?sig=21' },
    { name: 'AeroFlow Headphones', soldToday: 24, image: 'https://picsum.photos/100/100?sig=22' },
  ])

  const lowStockAlerts = ref([
    { name: 'X-Optics 50mm Lens', left: 4, img: '/img/product-010.avif' },
    { name: 'InstaSnap Mini 11', left: 2, img: '/img/product-09.avif' },
    { name: 'Aviator Gold Pro', left: 8, img: '/img/product-01.avif' },
    { name: 'Carbon Night Edition', left: 3, img: '/img/product-08.avif' },
  ])

  return { stats, recentOrders, topProducts, lowStockAlerts }
})
