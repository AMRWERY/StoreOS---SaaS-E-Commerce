<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] pb-32">
      <VBreadcrumb :items="[
        { label: 'System', to: '/dashboard/settings' },
        { label: 'Configuration' },
        { label: 'Notification Center', active: true }
      ]" />

      <header class="flex items-center justify-between mb-16">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Notification Center</h1>
        </div>
      </header>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Settings - Notification Center',
});
</script>