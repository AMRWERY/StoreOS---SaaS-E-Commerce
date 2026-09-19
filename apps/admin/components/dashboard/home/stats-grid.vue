<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <LazyVStatCard
        v-for="(stat, index) in stats"
        :key="stat.label"
        v-bind="stat"
        class="animate-fade-up"
        :style="{ animationDelay: `${index * 50}ms` }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { stats } = storeToRefs(useDashboardStore());
</script>