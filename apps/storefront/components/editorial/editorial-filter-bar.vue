<template>
  <section
    class="sticky top-0 z-40 bg-bg-base/90 backdrop-blur-xl border-b border-border-subtle px-6 lg:px-12 py-4"
  >
    <div
      class="max-w-[1400px] mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="w-full min-w-0">
        <LazyVTabs v-model="activeFilter" :tabs="filters" />
      </div>

      <div
        class="hidden lg:flex items-center gap-3 text-[10px] font-black text-[#262640] tracking-[0.2em] shrink-0"
      >
        <span>{{ t("storefront.editorial.sortedBy") }}</span>
        <Icon name="ph:arrows-down-up" class="w-4 h-4" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n();
defineProps<{ filters: string[] }>();

const activeFilter = defineModel<string>("activeFilter", { required: true });
</script>