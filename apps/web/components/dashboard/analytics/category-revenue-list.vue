<template>
  <div>
    <div class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
    <h3 class="font-bold text-lg mb-10">Revenue by Category</h3>
    <div class="space-y-8">
      <div v-for="cat in categories" :key="cat.name" class="space-y-2">
        <div class="flex justify-between text-[10px] font-black tracking-widest">
          <span class="text-gray-500">{{ cat.name }}</span>
          <span class="text-white">{{ cat.amount }}</span>
        </div>
        <VProgressBar :progress="cat.percentage" color="indigo" shadow />
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import type { CategoryRevenue } from '@/types/analytics';

defineProps<{
  categories: CategoryRevenue[]
}>()
</script>
