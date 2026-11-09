<template>
  <div>
    <div class="min-h-screen text-tx-primary space-y-8">
      <!-- Header Section -->
      <customer-header :totalCustomers="'1,240'" @export="handleExport" @add="handleAdd" />

      <!-- Filters -->
      <customer-filters v-model:activeFilter="activeFilter" :filters="filters" />

      <!-- Customers Table Card -->
      <customer-table :customers="customers" v-model:currentPage="currentPage" />

      <!-- Bottom Stats Grid -->
      <customer-stats :stats="stats" />

      <!-- SIDE PANEL: ADD CUSTOMER -->
      <lazy-customer-create-panel
        :isOpen="isAddPanelOpen"
        @close="isAddPanelOpen = false"
        @create="isAddPanelOpen = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const customersStore = useCustomersStore()
const { activeFilter, filters, currentPage, customers, stats } = storeToRefs(customersStore)
const isAddPanelOpen = ref(false)

const handleExport = () => {
  console.log('Exporting customers...')
}

const handleAdd = () => {
  isAddPanelOpen.value = true
}

definePageMeta({
  layout: 'dashboard'
});

useSeoPage({
  titleTemplate: () => 'Customers',
});
</script>
