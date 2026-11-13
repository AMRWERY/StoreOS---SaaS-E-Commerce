import type { Customer, CustomerDetail, CustomerOrder, CustomerNote, CustomerActivity } from '@/types/customers'

export const useCustomersStore = defineStore('customers', () => {
  const activeFilter = ref('All')
  const filters = ['All', 'Active', 'New', 'VIP']
  const currentPage = ref(1)

  const customers = ref<Customer[]>([
    {
      id: 1,
      name: 'Alex Rivera',
      phone: '+1 555-012-3456',
      email: 'alex.rivera@example.com',
      location: 'San Francisco, CA',
      orders: 42,
      totalSpent: '14,208.50',
      lastActive: '2 days ago',
      initials: 'AR',
      avatarBg: 'bg-orange-500/20 text-orange-500',
      tags: [{ text: 'VIP', color: 'bg-indigo-500/20 text-indigo-400' }, { text: 'EARLY ADOPTER', color: 'bg-orange-500/10 text-orange-400' }]
    },
    {
      id: 2,
      name: 'Sarah Miller',
      phone: '+1 555-891-2044',
      email: 's.miller@designstack.io',
      location: 'Austin, TX',
      orders: 18,
      totalSpent: '5,432.10',
      lastActive: '5 hours ago',
      initials: 'SM',
      avatarBg: 'bg-indigo-500/20 text-indigo-400',
      tags: [{ text: 'REGULAR', color: 'bg-gray-500/10 text-tx-secondary' }]
    },
    {
      id: 3,
      name: 'Jordan Hayes',
      phone: '+44 20 7946 0122',
      email: 'j.hayes@merchantmail.com',
      location: 'London, UK',
      orders: 124,
      totalSpent: '32,110.00',
      lastActive: 'Just now',
      initials: 'JH',
      avatarBg: 'bg-gray-500/20 text-tx-secondary',
      tags: [{ text: 'WHOLESALE', color: 'bg-indigo-500/20 text-indigo-400' }, { text: 'HIGH VALUE', color: 'bg-red-500/10 text-red-400' }]
    },
    {
      id: 4,
      name: 'Elena Kuznetsova',
      phone: '+1 555-403-9921',
      email: 'elena.k@service.com',
      location: 'Seattle, WA',
      orders: 3,
      totalSpent: '890.45',
      lastActive: '1 month ago',
      initials: 'EK',
      avatarBg: 'bg-orange-800/20 text-orange-300',
      tags: [{ text: 'NEW', color: 'bg-gray-500/10 text-tx-secondary' }]
    },
    {
      id: 5,
      name: 'Marcus Chen',
      phone: '+1 555-720-8834',
      email: 'm.chen@goldtier.com',
      location: 'New York, NY',
      orders: 28,
      totalSpent: '8,244.00',
      lastActive: '3 days ago',
      initials: 'MC',
      avatarBg: 'bg-yellow-500/20 text-yellow-400',
      tags: [{ text: 'VIP', color: 'bg-indigo-500/20 text-indigo-400' }]
    },
    {
      id: 6,
      name: 'Priya Nair',
      phone: '+91 98765 43210',
      email: 'p.nair@techcorp.in',
      location: 'Mumbai, India',
      orders: 7,
      totalSpent: '2,104.80',
      lastActive: '1 week ago',
      initials: 'PN',
      avatarBg: 'bg-emerald-500/20 text-emerald-400',
      tags: [{ text: 'REGULAR', color: 'bg-gray-500/10 text-tx-secondary' }]
    },
  ])

  const stats = ref([
    { label: 'AVG LTV', value: '$1,240.80', trend: '+12.4% from last quarter', iconName: 'ph:chart-line-up-bold', trendColor: 'text-emerald-500' },
    { label: 'CHURN RISK', value: '4.2%', trend: '-0.8% decrease in retention', iconName: 'ph:warning-bold', trendColor: 'text-orange-500', iconColor: 'text-orange-500' },
    { label: 'ACTIVE NOW', value: '84', sub: 'Browsing admin right now', iconName: 'fluent-emoji-flat:sparkles', iconColor: 'text-orange-400' }
  ])

  // Customer detail (for [id].vue)
  const customerDetail = ref<CustomerDetail>({
    name: 'Alex Rivera',
    initials: 'AR',
    phone: '+20 102 345 6789',
    email: 'alex.rivera@kinetic-ops.io',
    memberSince: 'Oct 2023',
    riskScore: '0.04',
    lastVerified: 'Feb 24, 09:12',
    tags: ['VIP_TIER_1', 'EARLY_ADOPTER', 'TECH_SECTOR']
  })

  const customerDetailAddresses = ref([
    { label: 'Main Office', value: '42 Tech Plaza, Smart Village, Giza', icon: 'ph:buildings-bold' },
    { label: 'Home Address', value: 'Bldg 12, Maadi Degla, Cairo', icon: 'ph:house-bold' }
  ])

  const customerDetailOrders = ref<CustomerOrder[]>([
    { id: '#ORD-9921', status: 'DELIVERED', date: 'Feb 24, 2026', total: '1,240.00', color: 'text-emerald-500 bg-emerald-500/10' },
    { id: '#ORD-9844', status: 'IN TRANSIT', date: 'Feb 18, 2026', total: '450.50', color: 'text-blue-400 bg-blue-400/10' },
    { id: '#ORD-9710', status: 'DELIVERED', date: 'Feb 02, 2026', total: '2,100.00', color: 'text-emerald-500 bg-emerald-500/10' },
    { id: '#ORD-9655', status: 'CANCELLED', date: 'Jan 28, 2026', total: '0.00', color: 'text-red-500 bg-red-500/10' },
  ])

  const customerDetailNotes = ref<CustomerNote[]>([
    { id: 1, date: 'Feb 22, 14:30', author: 'Sarah J.', text: 'Customer requested a customized quote for the next bulk order. Needs follow-up by Friday.' },
    { id: 2, date: 'Jan 15, 10:15', author: 'Mike T.', text: 'High potential for upgrade to Enterprise Tier. Extremely satisfied with current logistics.' }
  ])

  const customerDetailActivities = ref<CustomerActivity[]>([
    { id: 1, date: 'Feb 24, 09:12', user: 'System', action: 'verified risk status for', target: 'Alex Rivera', icon: 'ph:shield-check-fill', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 2, date: 'Feb 24, 08:45', user: 'Alex Rivera', action: 'placed new order', target: '#ORD-9921', icon: 'ph:shopping-cart-fill', color: 'text-brand', bg: 'bg-brand-dim' },
    { id: 3, date: 'Feb 22, 14:32', user: 'Sarah J.', action: 'added a new internal note', target: '', icon: 'ph:note-fill', color: 'text-amber-500', bg: 'bg-amber-500/10' }
  ])

  const customerDetailStats = ref([
    { label: 'Total Orders', value: '42', prefix: '' },
    { label: 'Total Spent', value: '14,208.5', prefix: '$' },
    { label: 'Avg Order Value', value: '338.29', prefix: '$' },
    { label: 'Last Order', value: 'Feb 24, 2026', prefix: '' },
  ])

  function addNote(text: string) {
    customerDetailNotes.value.unshift({
      id: Date.now(),
      date: 'Just now',
      author: 'Current User',
      text
    })
  }

  function updateContact(phone: string, email: string) {
    customerDetail.value.phone = phone
    customerDetail.value.email = email
  }

  return {
    activeFilter, filters, currentPage,
    customers, stats,
    customerDetail, customerDetailAddresses, customerDetailOrders,
    customerDetailNotes, customerDetailActivities, customerDetailStats,
    addNote, updateContact
  }
})
