<template>
  <div class="flex items-end justify-between gap-4 mb-8 sm:mb-10">
    <div class="space-y-2">
      <p v-if="eyebrow" class="text-xs font-semibold tracking-widest uppercase text-brand">{{ eyebrow }}</p>
      <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-tx-primary">{{ title }}</h2>
      <p v-if="subtitle" class="text-sm text-tx-secondary max-w-xl">{{ subtitle }}</p>
    </div>
    <nuxt-link-locale v-if="to && linkLabel" :to="to" class="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-tx-secondary hover:text-brand transition-colors duration-200">
      {{ linkLabel }}
      <Icon name="lucide:arrow-right" class="w-4 h-4 rtl:rotate-180" />
    </nuxt-link-locale>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; eyebrow?: string; subtitle?: string; to?: string; linkLabel?: string }>()
</script>
