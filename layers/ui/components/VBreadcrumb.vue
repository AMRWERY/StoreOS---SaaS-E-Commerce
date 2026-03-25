<template>
  <div>
    <nav class="flex items-center gap-2 text-[11px] font-black text-gray-600 tracking-[0.3em] mb-4"
      aria-label="Breadcrumb">
      <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <component :is="item.to ? 'NuxtLinkLocale' : 'span'" :to="item.to" :class="[
          'whitespace-nowrap',
          item.active
            ? 'text-indigo-400'
            : 'text-gray-600 hover:text-gray-300',
        ]">
          {{ item.label }}
        </component>

        <icon v-if="Number(index) < items.length - 1" name="ph:caret-right-bold" class="text-[11px] rtl:rotate-180" />
      </template>
      <slot />
    </nav>
  </div>
</template>

<script lang="ts" setup>
export interface BreadcrumbItem {
  label: string;
  to?: string;
  active?: boolean;
}

withDefaults(
  defineProps<{
    items?: BreadcrumbItem[];
  }>(),
  {
    items: () => [
      { label: "System", to: "/dashboard/settings" },
      { label: "Configuration", to: "/dashboard/settings" },
      { label: "Payments", active: true },
    ],
  }
);
</script>