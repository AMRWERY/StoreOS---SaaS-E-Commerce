import type { KPI, CategoryRevenue, StatusItem, Product, Customer } from '@/types/analytics'

export const useAnalyticsStore = defineStore('analytics', () => {
  const activeTimeframe = ref('Last 7 days')
  const compareEnabled = ref(true)

  const kpis = ref<KPI[]>([
    { label: 'Revenue', value: '$42,340.50', trend: '+12.5%', up: true },
    { label: 'Orders', value: '1,240', trend: '+8.2%', up: true },
    { label: 'Avg Order Value', value: '$33.20', trend: '-2.1%', up: false },
    { label: 'New Customers', value: '342', trend: '+4.8%', up: true },
    { label: 'Returning Customers', value: '890', trend: '+0.4%', up: true },
  ])

  const categories = ref<CategoryRevenue[]>([
    { name: 'Fashion', amount: '$12,285.20', percentage: 75 },
    { name: 'Food & Beverage', amount: '$11,104.54', percentage: 60 },
    { name: 'Electronics', amount: '$9,401.30', percentage: 45 },
    { name: 'Beauty', amount: '$5,201.20', percentage: 25 },
  ])

  const topProducts = ref<Product[]>([
    { name: 'Chronos V1 Watch', category: 'Accessories', sales: 432, revenue: '$53,584.00' },
    { name: 'SpeedRunner Pro', category: 'Footwear', sales: 312, revenue: '$38,750.20' },
    { name: 'Sonic Pure M2', category: 'Electronics', sales: 284, revenue: '$14,212.50' },
    { name: 'Studio One Headphones', category: 'Electronics', sales: 198, revenue: '$9,802.20' },
    { name: 'Carbon Night Edition', category: 'Fashion', sales: 145, revenue: '$66,410.00' },
  ])

  const topCustomers = ref<Customer[]>([
    { name: 'Sarah Jenkins', type: 'Platinum Tier', orders: 42, spent: '$3,420.50' },
    { name: 'Marcus Chen', type: 'Gold Tier', orders: 28, spent: '$2,110.40' },
    { name: 'Elena Rodriguez', type: 'Gold Tier', orders: 15, spent: '$1,840.00' },
    { name: 'Jordan Hayes', type: 'Wholesale', orders: 124, spent: '$32,110.00' },
    { name: 'Alex Rivera', type: 'Platinum Tier', orders: 42, spent: '$14,208.50' },
  ])

  const statusBreakdown = ref<StatusItem[]>([
    { name: 'Delivered', count: '912 units', color: 'bg-indigo-500', stroke: '#6366f1', offset: 0, dash: 70 },
    { name: 'Shipped', count: '184 units', color: 'bg-indigo-300', stroke: '#818cf8', offset: 70, dash: 15 },
    { name: 'Processing', count: '121 units', color: 'bg-orange-500', stroke: '#f97316', offset: 85, dash: 10 },
    { name: 'Cancelled', count: '23 units', color: 'bg-red-500', stroke: '#ef4444', offset: 95, dash: 5 },
  ])

  function handleExport() {
    console.log('Exporting report for', activeTimeframe.value)
  }

  return {
    activeTimeframe, compareEnabled,
    kpis, categories, topProducts, topCustomers, statusBreakdown,
    handleExport
  }
})
