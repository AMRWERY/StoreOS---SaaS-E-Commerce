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
          <orders-table :orders="paginatedOrders" :selected-ids="selectedOrders" :is-all-selected="isAllSelected"
            @select-order="selectedOrder = $event" @toggle-selection="toggleSelection" @select-all="toggleSelectAll" />

          <!-- Pagination -->
          <VPagination :total="orders.length" :per-page="perPage" :current-page="currentPage"
            @update:current-page="currentPage = $event" />
        </div>

        <!-- Right Panel: Order Details Inspector -->
        <order-details-sidebar v-if="selectedOrder" :order="selectedOrder" @close="selectedOrder = null" />
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center px-4 py-3.5 text-center">
        <div class="w-64 h-64 bg-bg-elevated rounded-full flex items-center justify-center mb-6 relative">
          <Icon name="ph:shopping-cart-light" class="text-8xl text-tx-muted" />
          <div class="absolute -top-2 -end-2 w-16 h-16 bg-brand-dim rounded-full blur-xl"></div>
        </div>
        <h2 class="text-xl font-bold text-tx-primary mb-2">{{ $t('dashboard.orders.noOrdersYet') }}</h2>
        <p class="text-tx-secondary max-w-sm mb-6">
          {{ $t('dashboard.orders.noOrdersDesc') }}
        </p>
        <div class="flex items-center gap-3 bg-bg-primary border border-border-subtle p-2 pe-2 ps-4 rounded-2xl">
          <span class="text-xs text-tx-secondary">storeos.io/my-awesome-shop</span>
          <VButton @click="copyLink"
            className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all">
            {{ $t('dashboard.orders.copyLink') }}
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
const ordersStore = useOrdersStore()
const { activeTab, selectedOrders, selectedOrder, currentPage, perPage, tabs, orders, paginatedOrders, isAllSelected } = storeToRefs(ordersStore)
const { toggleSelection, toggleSelectAll } = ordersStore

const copyLink = () => {
  console.log('Link copied!')
}

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Orders',
});
</script>
