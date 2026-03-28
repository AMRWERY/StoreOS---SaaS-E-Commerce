<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VStatCard label="Total SKUs" value="1,240" icon-name="ph:cube-bold" sub="Active in catalog"
        icon-color="text-tx-muted" />
      <VStatCard label="Out of Stock" :value="outOfStockCount" icon-name="ph:warning-octagon-bold" sub="Requires action"
        icon-color="text-danger" value-color="text-danger" />
      <VStatCard label="Low Stock" :value="lowStockCount" icon-name="ph:info-bold" sub="Below threshold"
        icon-color="text-accent" value-color="text-accent" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  outOfStockCount: number
  lowStockCount: number
}>()
</script>