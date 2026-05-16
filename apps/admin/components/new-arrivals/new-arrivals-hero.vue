<template>
  <header class="relative pb-16 px-6 lg:px-12 border-b border-border-subtle">
    <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span
            class="text-[10px] font-bold text-brand bg-brand/10 px-2 py-1 rounded border border-brand/20 tracking-widest">
            Batch: 04-X
          </span>
          <span class="text-[10px] font-bold text-tx-muted tracking-widest">
            Last Sync: 10.04.2024
          </span>
        </div>
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight">
          {{ t("storefront.newArrivals.title") }}
        </h1>
        <p class="text-[15px] text-tx-secondary max-w-xl leading-relaxed">
          {{ t("storefront.newArrivals.subtitle") }}
        </p>
      </div>

      <div class="flex items-center gap-4 bg-bg-primary border border-border-subtle p-1.5 rounded-[10px]">
        <LazyVButton variant="none" type="button" :className="[
          'p-2 rounded-[6px] transition-all',
          viewMode === 'grid'
            ? 'bg-bg-elevated text-brand shadow-lg shadow-black/40'
            : 'text-tx-muted hover:text-tx-secondary',
        ].join(' ')
          " @click="viewMode = 'grid'">
          <Icon name="ph:squares-four-fill" class="w-5 h-5" />
        </LazyVButton>
        <LazyVButton variant="none" type="button" :className="[
          'p-2 rounded-[6px] transition-all',
          viewMode === 'list'
            ? 'bg-bg-elevated text-brand shadow-lg shadow-black/40'
            : 'text-tx-muted hover:text-tx-secondary',
        ].join(' ')
          " @click="viewMode = 'list'">
          <Icon name="ph:list-bold" class="w-5 h-5" />
        </LazyVButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const viewMode = defineModel<"grid" | "list">("viewMode", { required: true });
</script>