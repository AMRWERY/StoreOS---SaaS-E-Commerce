<template>
  <div>
    <!-- Stats Overview Grid -->
    <stats-grid />

    <!-- Main Section: Recent Orders & Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
      <!-- Recent Orders Table -->
      <div class="lg:col-span-8 h-full">
        <recent-orders />
      </div>

      <!-- Revenue & Top Products column -->
      <div class="lg:col-span-4 flex flex-col gap-3 h-full">
        <revenue-chart class="flex-1" />

        <top-products class="flex-1" />
      </div>
    </div>

    <!-- Footer Section: Low Stock -->
    <low-stock-alerts />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'dashboard' })
useSeoMeta({ title: 'Dashboard', robots: 'noindex, nofollow' })
</script>

<style scoped>
@media (max-width: 1024px) {
  main {
    height: 100vh;
  }
}
</style>