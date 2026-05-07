<template>
  <header class="pb-12 px-6 lg:px-12 border-b border-border-subtle">
    <div class="max-w-[1400px] mx-auto space-y-6">
      <VBreadcrumb
        :items="breadcrumbItems"
        class="[&_nav]:text-[10px] [&_nav]:text-tx-muted [&_nav]:mb-0 [&_a]:hover:text-brand"
      />

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="space-y-2">
          <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">
            {{ t("storefront.collections.title") }}
          </h1>
          <p
            class="text-[15px] text-tx-muted font-bold tracking-widest flex items-center gap-3"
          >
            {{ t("storefront.collections.catalogDirectory") }}
            <span class="w-8 h-px bg-border-subtle" />
            <span class="text-brand"
              >{{ sectorCount }}
              {{ t("storefront.collections.activeSectors") }}</span
            >
          </p>
        </div>

        <div class="flex gap-4">
          <component
            :is="VButton"
            variant="none"
            type="button"
            className="bg-bg-primary border border-border-subtle px-5 py-3 rounded-[10px] text-[11px] font-bold tracking-widest text-tx-secondary hover:text-tx-primary hover:border-brand transition-all flex items-center gap-2"
          >
            <Icon name="ph:arrows-down-up" class="w-4 h-4" />
            {{ t("storefront.collections.sortDefault") }}
          </component>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { BreadcrumbItem } from "../../../../layers/ui/types/v-breadcrumb";

defineProps<{
  breadcrumbItems: BreadcrumbItem[];
  sectorCount: number;
}>();

const VButton = resolveComponent("VButton");
</script>