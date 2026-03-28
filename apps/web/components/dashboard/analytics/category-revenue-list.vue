<template>
  <div>
    <div class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5">
    <h3 class="font-bold text-lg mb-6">Revenue by Category</h3>
    <div class="space-y-8">
      <div v-for="cat in categories" :key="cat.name" class="space-y-2">
        <div class="flex justify-between text-[10px] font-black tracking-widest">
          <span class="text-tx-secondary">{{ cat.name }}</span>
          <span class="text-tx-primary">{{ cat.amount }}</span>
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
