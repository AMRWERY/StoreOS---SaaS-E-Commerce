<template>
  <div>
    <div class="grid grid-cols-3 gap-6">
      <div
        class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
        <h3 class="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Total SKUs</h3>
        <p class="text-4xl font-bold mb-2">1,240</p>
        <div class="flex items-center gap-2">
          <icon name="ph:cube-bold" class="text-gray-600" />
          <span class="text-[11px] font-bold text-gray-500">Active in catalog</span>
        </div>
        <div class="absolute -end-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
          <icon name="ph:cube-bold" class="text-8xl" />
        </div>
      </div>
      <div
        class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/30 transition-colors">
        <h3 class="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Out of Stock</h3>
        <p class="text-4xl font-bold mb-2 text-red-500">{{ outOfStockCount }}</p>
        <div class="flex items-center gap-2">
          <icon name="ph:warning-octagon-bold" class="text-red-500" />
          <span class="text-[11px] font-bold text-red-500/80">Requires action</span>
        </div>
        <div
          class="absolute -end-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-red-500">
          <icon name="ph:warning-octagon-bold" class="text-8xl" />
        </div>
      </div>
      <div
        class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
        <h3 class="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Low Stock</h3>
        <p class="text-4xl font-bold mb-2 text-amber-500">{{ lowStockCount }}</p>
        <div class="flex items-center gap-2">
          <icon name="ph:info-bold" class="text-amber-500" />
          <span class="text-[11px] font-bold text-amber-500/80">Below threshold</span>
        </div>
        <div
          class="absolute -end-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-amber-500">
          <icon name="ph:chart-line-down-bold" class="text-8xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  outOfStockCount: number
  lowStockCount: number
}>()
</script>