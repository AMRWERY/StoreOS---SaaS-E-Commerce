<template>
  <div>
    <div class="min-h-screen text-tx-primary space-y-12 selection:bg-indigo-500/30">
      <staff-header />

      <staff-active-members />

      <staff-role-matrix />

      <staff-system-stats />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Settings - Staff and Permissions',
});
</script>