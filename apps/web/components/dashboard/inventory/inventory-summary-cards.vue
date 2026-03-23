<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VStatCard label="Total SKUs" value="1,240" icon-name="ph:cube-bold" sub="Active in catalog"
        icon-color="text-gray-600" />
      <VStatCard label="Out of Stock" :value="outOfStockCount" icon-name="ph:warning-octagon-bold" sub="Requires action"
        icon-color="text-red-500" value-color="text-red-500" />
      <VStatCard label="Low Stock" :value="lowStockCount" icon-name="ph:info-bold" sub="Below threshold"
        icon-color="text-amber-500" value-color="text-amber-500" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  outOfStockCount: number
  lowStockCount: number
}>()
</script>