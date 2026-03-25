<template>
  <div>
    <div class="flex items-center justify-center">
      <Icon name="svg-spinners:270-ring" :class="[sizeClass, colorClass, 'shrink-0']" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: { type: String, default: 'md' }, // sm | md | lg
  color: { type: String, default: 'white' }, // white | indigo | orange | gray
});

const sizeMap: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const colorMap: Record<string, string> = {
  white: 'text-white',
  indigo: 'text-indigo-400',
  orange: 'text-orange-400',
  gray: 'text-gray-400',
};

const sizeClass = computed(() => sizeMap[props.size] ?? 'w-5 h-5');
const colorClass = computed(() => colorMap[props.color] ?? 'text-white');
</script>