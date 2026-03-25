<template>
  <div>
    <VBreadcrumb :items="[
      { label: 'System', to: '/dashboard/settings' },
      { label: 'Configuration' },
      { label: 'Shipping Logistics', active: true }
    ]" />

    <header class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
      <div>
        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Operational Config</span>
        <h1 class="text-4xl font-bold tracking-tight text-white mt-2">Shipping Logistics</h1>
        <p class="text-sm text-gray-500 mt-3 max-w-xl leading-relaxed">
          Manage global distribution channels, regional pricing structures, and carrier service level agreements.
        </p>
      </div>
      <VButton class="shrink-0" icon="ph:plus-circle-bold" iconPosition="left">
        Add Shipping Zone
      </VButton>
    </header>
  </div>
</template>

<script lang="ts" setup>

</script>