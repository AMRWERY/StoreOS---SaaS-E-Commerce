<template>
  <span class="inline-flex items-center gap-0.5" :aria-label="`${rating} / 5`">
    <Icon
      v-for="n in 5"
      :key="n"
      name="ph:star-fill"
      :class="n <= rating ? 'text-warning' : 'text-border-default'"
      :style="{ fontSize: `${size}px` }"
    />
  </span>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ rating: number; size?: number }>(), { size: 14 })
</script>
