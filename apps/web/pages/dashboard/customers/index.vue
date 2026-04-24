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
    </div>
  </div>
</template>

<script lang="ts" setup>
const customersStore = useCustomersStore()
const { activeFilter, filters, currentPage, customers, stats } = storeToRefs(customersStore)

const handleExport = () => {
  console.log('Exporting customers...')
}

const handleAdd = () => {
  console.log('Adding customer...')
}

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Customers',
});
</script>
