<template>
  <div>
    <VBreadcrumb />
    
    <header class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <h1 class="text-3xl font-bold tracking-tight">Analytics</h1>
      <div class="flex flex-wrap items-center gap-4">
        <!-- Timeframe Tabs -->
        <VTabs :tabs="['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom']" :model-value="activeTimeframe"
          @update:model-value="$emit('update:activeTimeframe', $event)" class="border-none" />

        <div class="flex items-center gap-4 border-s border-border-default ps-4">
          <VSwitchButton label="Compare" :model-value="compareEnabled"
            @update:model-value="$emit('update:compareEnabled', $event)" />
         
            <div class="flex items-center gap-3">
            <VButton variant="secondary" label="Export Report" icon="ph:export-bold" size="sm"
              @click="$emit('export')" />
          
              <VButton label="Create New" icon="ph:plus-bold" size="sm"
              class="flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-hover text-tx-primary rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand/20" />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  activeTimeframe: string
  compareEnabled: boolean
}>()

defineEmits(['update:activeTimeframe', 'update:compareEnabled', 'export'])
</script>