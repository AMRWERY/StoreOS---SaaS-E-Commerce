<template>
  <div>
    <div class="min-h-screen text-tx-primary space-y-8">
      <!-- Header Section -->
      <customer-header :totalCustomers="'1,240'" @export="handleExport" @add="handleAdd" />

      <!-- Saved views -->
      <ops-saved-views
        v-model="activeViewId"
        :views="views"
        class="mb-4"
        @save="(name: string) => savedViews.saveCurrent('customers', name, { filter: activeFilter })"
        @apply="(view: OpsSavedView) => (activeFilter = view.filters.filter ?? 'All')"
        @delete="(id: string) => savedViews.remove('customers', id)"
      />

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
import type { OpsSavedView } from '@/types/platformTools'

const savedViews = useSavedViewsStore()
const views = computed(() => savedViews.viewsFor('customers'))
const activeViewId = computed({
  get: () => savedViews.activeByPage['customers'] ?? '',
  set: (id: string) => (savedViews.activeByPage['customers'] = id),
})

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
