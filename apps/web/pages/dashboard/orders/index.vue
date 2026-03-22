<template>
  <div>
    <div class="flex flex-col h-full overflow-hidden -mt-5">
      <!-- Top Header Bar -->
      <orders-header />

      <div v-if="orders.length > 0" class="flex flex-1 overflow-hidden">
        <!-- Left Content: List & Filters -->
        <div class="flex-1 flex flex-col overflow-y-auto p-4 hide-scrollbar">
          <!-- Tabs & Filters -->
          <orders-filter-bar v-model:activeTab="activeTab" :tabs="tabs" />

          <!-- Orders Table -->
          <orders-table :orders="orders" :selected-ids="selectedOrders" :is-all-selected="isAllSelected"
            @select-order="selectedOrder = $event" @toggle-selection="toggleSelection" @select-all="toggleSelectAll" />
        </div>

        <!-- Right Panel: Order Details Inspector -->
        <order-details-sidebar v-if="selectedOrder" :order="selectedOrder" @close="selectedOrder = null" />
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div class="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center mb-8 relative">
          <icon name="ph:shopping-cart-light" class="text-8xl text-gray-700" />
          <div class="absolute -top-2 -end-2 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl"></div>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">No orders yet</h2>
        <p class="text-gray-500 max-w-sm mb-8">
          Share your store link with your customers to start getting orders and growing your business.
        </p>
        <div class="flex items-center gap-3 bg-[#0c0c0e] border border-white/5 p-2 pe-2 ps-4 rounded-2xl">
          <span class="text-xs text-gray-500">storeos.io/my-awesome-shop</span>
          <VButton @click="copyLink"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all">
            Copy Link
          </VButton>
        </div>
      </div>

      <!-- Floating Batch Action Bar -->
      <orders-batch-actions v-if="selectedOrders.length > 0 && orders.length > 0"
        :selectedCount="selectedOrders.length" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Local State
const activeTab = ref('New')
const selectedOrders = ref<number[]>([])
const selectedOrder = ref<any>(null)

const tabs = [
  { name: 'All', count: null },
  { name: 'New', count: 12 },
  { name: 'Confirmed', count: null },
  { name: 'Processing', count: null },
  { name: 'Shipped', count: null },
  { name: 'Delivered', count: null },
  { name: 'Cancelled', count: null },
  { name: 'Refunded', count: null },
]

const orders = ref([
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
  }
])

const copyLink = () => {
  // Mock copy to clipboard
  console.log('Link copied!')
}

const isAllSelected = computed(() => {
  return orders.value.length > 0 && selectedOrders.value.length === orders.value.length
})

const toggleSelection = (id: number) => {
  const index = selectedOrders.value.indexOf(id)
  if (index === -1) {
    selectedOrders.value.push(id)
  } else {
    selectedOrders.value.splice(index, 1)
  }
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedOrders.value = []
  } else {
    selectedOrders.value = orders.value.map(o => o.id)
  }
}

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Orders',
});
</script>