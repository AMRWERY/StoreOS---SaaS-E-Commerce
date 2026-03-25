<template>
  <div>
    <VBreadcrumb :items="[
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Audience' },
      { label: 'Customers', active: true }
    ]" />
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold tracking-tight">Customers</h1>
        <span
          class="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black text-gray-600 tracking-widest mt-1">{{
            totalCustomers }}
          total</span>
      </div>
      <div class="flex items-center gap-3">
        <VButton variant="secondary" label="Export" icon="ph:export-bold" @click="$emit('export')" />
        <VButton variant="primary" label="Add Customer" icon="ph:plus-bold" @click="$emit('add')" />
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  totalCustomers: string | number
}>()

defineEmits(['export', 'add'])
</script>