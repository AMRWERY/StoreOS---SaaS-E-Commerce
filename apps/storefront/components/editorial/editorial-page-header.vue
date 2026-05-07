<template>
  <header class="pb-12 px-6 lg:px-12 border-b border-border-subtle">
    <div class="max-w-[1400px] mx-auto space-y-6">
      <VBreadcrumb
        :items="breadcrumbItems"
        class="[&_nav]:text-[10px] [&_nav]:text-tx-muted [&_nav]:mb-0 [&_a]:hover:text-brand"
      />

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="space-y-2">
          <h1 class="text-5xl lg:text-7xl font-bold tracking-tighter">
            {{ t("storefront.editorial.journal") }}
          </h1>
          <p
            class="text-[14px] text-tx-muted font-bold tracking-widest flex items-center gap-3"
          >
            {{ t("storefront.editorial.editorialIndex") }}
            <span class="w-12 h-px bg-border-subtle" />
            <span class="text-brand">{{
              t("storefront.editorial.protocol")
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { BreadcrumbItem } from "../../../../layers/ui/types/v-breadcrumb";

defineProps<{ breadcrumbItems: BreadcrumbItem[] }>();
</script>