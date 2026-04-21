<template>
  <div>
    <VBreadcrumb />

    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold tracking-tight">{{ $t('dashboard.customers.title') }}</h1>
        <span class="bg-bg-elevated px-2 py-0.5 rounded text-[10px] font-black text-tx-muted tracking-widest mt-1">{{
          totalCustomers }}
          {{ $t('dashboard.customers.total') }}</span>
      </div>
      <div class="flex items-center gap-3">
        <VButton variant="secondary" :label="$t('common.export')" icon="ph:export-bold" @click="$emit('export')" />
        <VButton variant="primary" :label="$t('dashboard.customers.addCustomer')" icon="ph:plus-bold" @click="$emit('add')" />
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