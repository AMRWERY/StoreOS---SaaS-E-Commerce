<template>
  <div>
    <nav
      class="flex items-center gap-2 text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4"
      aria-label="Breadcrumb"
    >
      <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <component
          :is="item.to ? 'NuxtLink' : 'span'"
          :to="item.to"
          :class="[
            'whitespace-nowrap',
            item.active
              ? 'text-indigo-400'
              : 'text-gray-600 hover:text-gray-300',
          ]"
        >
          {{ item.label }}
        </component>

        <icon
          v-if="index < items.length - 1"
          name="ph:caret-right-bold"
          class="text-[7px]"
        />
      </template>
      <slot />
    </nav>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array as PropType<
      Array<{ label: string; to?: string; active?: boolean }>
    >,
    default: () => [
      { label: "System", to: "/dashboard/settings" },
      { label: "Configuration", to: "/dashboard/settings" },
      { label: "Payments", active: true },
    ],
  },
});
</script>