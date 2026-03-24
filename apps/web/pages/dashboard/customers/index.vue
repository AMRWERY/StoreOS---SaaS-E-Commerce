<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] space-y-8">
      <!-- Header Section -->
      <customer-header :totalCustomers="'1,240'" @export="handleExport" @add="handleAdd" />

      <!-- Filters -->
      <customer-filters v-model:activeFilter="activeFilter" :filters="filters" />

      <!-- Customers Table Card -->
      <customer-table :customers="customers" v-model:currentPage="currentPage" />

      <!-- Bottom Stats Grid -->
      <customer-stats :stats="stats" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Customer } from '@/types/customers'

const activeFilter = ref('All')
const filters = ['All', 'Active', 'New', 'VIP']
const currentPage = ref(1)

const handleExport = () => {
  console.log('Exporting customers...')
}

const handleAdd = () => {
  console.log('Adding customer...')
}

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
    tags: [{ text: 'REGULAR', color: 'bg-gray-500/10 text-gray-400' }]
  },
  {
    id: 3,
    name: 'Jordan Hayes',
    phone: '+44 20 7946 0122',
    email: 'j.hayes@webmail.com',
    location: 'London, UK',
    orders: 124,
    totalSpent: '32,110.00',
    lastActive: 'Just now',
    initials: 'JH',
    avatarBg: 'bg-gray-500/20 text-gray-400',
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
    tags: [{ text: 'NEW', color: 'bg-gray-500/10 text-gray-400' }]
  }
])

const stats = [
  { label: 'AVG LTV', value: '$1,240.80', trend: '+12.4% from last quarter', iconName: 'ph:chart-line-up-bold', trendColor: 'text-emerald-500' },
  { label: 'CHURN RISK', value: '4.2%', trend: '-0.8% decrease in retention', iconName: 'ph:warning-bold', trendColor: 'text-orange-500', iconColor: 'text-orange-500' },
  { label: 'ACTIVE NOW', value: '84', sub: 'Browsing storefront right now', iconName: 'fluent-emoji-flat:sparkles', iconColor: 'text-orange-400' }
]

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Customers',
});
</script>