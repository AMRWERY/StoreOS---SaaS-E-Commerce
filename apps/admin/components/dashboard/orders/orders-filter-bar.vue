<template>
  <div class="mb-8">
    <LazyVTabs
      :tabs="formattedTabs"
      :modelValue="activeTab"
      @update:modelValue="$emit('update:activeTab', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  activeTab: string;
  tabs: Array<{ name: string; count: number | null }>;
}>();

defineEmits(["update:activeTab"]);

const formattedTabs = computed(() => {
  return props.tabs.map((tab) => ({
    name: tab.name,
    count: tab.count !== null ? tab.count : undefined,
    badgeClass:
      tab.name === "New" ? "bg-orange-600 text-tx-primary" : undefined,
  }));
});
</script>