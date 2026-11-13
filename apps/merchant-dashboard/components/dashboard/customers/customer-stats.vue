<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <LazyVStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  stats: any[];
}>();
</script>