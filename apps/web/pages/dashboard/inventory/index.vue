<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] flex flex-col overflow-hidden pb-10 -mt-10">
      <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5 lg:px-4 lg:py-3.5">
        <inventory-header :totalProducts="1240" v-model:search="searchQuery" v-model:category="selectedCategory"
          v-model:status="selectedStatus" @adjust="openAdjustmentModal()" />

        <!-- Alert Banner -->
        <VAlertBanner v-if="lowStockCount > 0" variant="warning" icon="ph:warning-bold">
          <p class="text-sm font-medium"><span class="font-bold">⚠ {{ lowStockCount }} products are low on stock</span>
            — Review now
            <Icon name="ph:arrow-right-bold" class="inline ms-1" />
          </p>
        </VAlertBanner>

        <!-- Componented Layout -->
        <inventory-summary-cards :outOfStockCount="outOfStockCount" :lowStockCount="lowStockCount" />

        <inventory-table :items="filteredStockList" v-model:currentPage="currentPage" @adjust="openAdjustmentModal"
          @quick-adjust="handleQuickAdjust" @view-history="handleViewHistory" />

        <inventory-movement-history id="history-section" class="mt-8" :historyLogs="historyList" />
      </div>
    </div>

    <!-- Modal Component -->
    <inventory-adjustment-modal v-model="isAdjustmentModalOpen" :selectedItem="selectedItem" @save="saveAdjustment" />
  </div>
</template>

<script lang="ts" setup>
const inventoryStore = useInventoryStore()
const {
  isAdjustmentModalOpen, selectedItem, currentPage,
  searchQuery, selectedCategory, selectedStatus,
  historyList, filteredStockList, lowStockCount, outOfStockCount
} = storeToRefs(inventoryStore)
const { openAdjustmentModal, handleQuickAdjust, saveAdjustment } = inventoryStore

const handleViewHistory = (_item: StockItem) => {
  const el = document.getElementById('history-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Inventory',
});
</script>
