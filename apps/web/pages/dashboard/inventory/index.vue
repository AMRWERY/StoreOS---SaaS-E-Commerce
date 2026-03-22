<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] font-sans flex flex-col overflow-hidden pb-10 -mt-10">
      <div class="flex-1 overflow-y-auto space-y-8 p-6 lg:p-8">
        <inventory-header :totalProducts="1240" @adjust="openAdjustmentModal()" />

        <!-- Alert Banner -->
        <VAlertBanner v-if="lowStockCount > 0" variant="warning" icon="ph:warning-bold">
          <p class="text-sm font-medium"><span class="font-bold">⚠ {{ lowStockCount }} products are low on stock</span> — Review now
            <icon name="ph:arrow-right-bold" class="inline ms-1" />
          </p>
        </VAlertBanner>

        <!-- Componented Layout -->
        <inventory-summary-cards :outOfStockCount="outOfStockCount" :lowStockCount="lowStockCount" />

        <inventory-table :items="stockList" @adjust="openAdjustmentModal" @quick-adjust="handleQuickAdjust" />

        <inventory-movement-history class="mt-8" :historyLogs="historyList" />
      </div>
    </div>

    <!-- Modal Component -->
    <inventory-adjustment-modal v-model="isAdjustmentModalOpen" :selectedItem="selectedItem" @save="saveAdjustment" />
  </div>
</template>

<script lang="ts" setup>
const isAdjustmentModalOpen = ref(false)
const selectedItem = ref<any>(null)

const openAdjustmentModal = (item?: any) => {
  selectedItem.value = item || stockList.value[0]
  isAdjustmentModalOpen.value = true
}

const handleQuickAdjust = (item: any, change: number) => {
  item.current = Math.max(0, item.current + change)
}

const saveAdjustment = (payload: any) => {
  const prevStock = payload.item.current
  const qty = payload.qty

  // Adjust stock logic
  if (payload.type === 'Add') {
    payload.item.current += qty
  } else if (payload.type === 'Remove') {
    payload.item.current = Math.max(0, payload.item.current - qty)
  } else if (payload.type === 'Set') {
    payload.item.current = qty
  }

  // Add to history
  historyList.value.unshift({
    id: Date.now(),
    date: 'Just now',
    product: payload.item.name,
    type: payload.type,
    change: payload.type === 'Add' ? qty : payload.type === 'Remove' ? -qty : (qty - prevStock),
    newStock: payload.item.current,
    reason: payload.reason,
    staff: 'Current User'
  })

  isAdjustmentModalOpen.value = false
}

const stockList = ref([
  {
    id: 1,
    name: 'Pro-X Wireless Headset',
    sku: 'PX-7702-BLK',
    category: 'ELECTRONICS',
    current: 0,
    incoming: 24,
    threshold: 10,
    lastUpdated: '2h ago',
    image: '/img/product-02.png'
  },
  {
    id: 2,
    name: 'Mechanical Deck V3',
    sku: 'MD-V3-SILV',
    category: 'PERIPHERALS',
    current: 3,
    incoming: 0,
    threshold: 15,
    lastUpdated: '5h ago',
    image: '/img/product-03.png'
  },
  {
    id: 3,
    name: 'Flow Ergo Mouse',
    sku: 'FE-MSE-GRY',
    category: 'PERIPHERALS',
    current: 82,
    incoming: 12,
    threshold: 20,
    lastUpdated: '1d ago',
    image: '/img/product-04.png'
  },
  {
    id: 4,
    name: 'Horizon Smart Display',
    sku: 'HZ-SD-24',
    category: 'DISPLAYS',
    current: 4,
    incoming: 0,
    threshold: 5,
    lastUpdated: '3h ago',
    image: '/img/product-05.png'
  },
  {
    id: 5,
    name: 'Vector Ergonomic Chair',
    sku: 'VC-ERGO-BL',
    category: 'FURNITURE',
    current: 12,
    incoming: 0,
    threshold: 5,
    lastUpdated: '2d ago',
    image: '/img/product-07.png'
  }
])

const lowStockCount = computed(() => stockList.value.filter(s => s.current > 0 && s.current <= s.threshold).length)
const outOfStockCount = computed(() => stockList.value.filter(s => s.current === 0).length)

const historyList = ref([
  { id: 101, date: 'Mar 22, 14:30', product: 'Pro-X Wireless Headset', type: 'Remove', change: -2, newStock: 0, reason: 'Sale', staff: 'Sarah J.' },
  { id: 102, date: 'Mar 22, 10:15', product: 'Mechanical Deck V3', type: 'Set', change: -1, newStock: 3, reason: 'Inventory Audit', staff: 'Mike T.' },
  { id: 103, date: 'Mar 21, 16:45', product: 'Flow Ergo Mouse', type: 'Add', change: 20, newStock: 82, reason: 'Purchase', staff: 'Alice W.' },
  { id: 104, date: 'Mar 20, 09:20', product: 'Horizon Smart Display', type: 'Remove', change: -1, newStock: 4, reason: 'Sale', staff: 'Ethan L.' }
])

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Inventory',
});
</script>