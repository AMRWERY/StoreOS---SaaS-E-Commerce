<template>
  <div class="mb-6">
    <LazyVTabs
      :tabs="filters"
      :modelValue="activeFilter"
      @update:modelValue="$emit('update:activeFilter', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  filters: string[];
  activeFilter: string;
}>();

defineEmits<{
  (e: "update:activeFilter", value: string): void;
}>();
</script>