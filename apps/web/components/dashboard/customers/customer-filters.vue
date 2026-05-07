<template>
  <div>
    <LazyVTabs
      :tabs="filters"
      :model-value="activeFilter"
      @update:model-value="$emit('update:activeFilter', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  filters: string[];
  activeFilter: string;
}>();

defineEmits(["update:activeFilter"]);
</script>