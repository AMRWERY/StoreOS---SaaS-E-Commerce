<template>
  <div class="flex flex-col items-center text-center py-16 px-6 rounded-3xl border border-dashed border-border-default bg-bg-primary">
    <div class="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center mb-5">
      <Icon :name="icon" class="w-7 h-7 text-tx-muted" />
    </div>
    <h2 class="text-lg font-semibold text-tx-primary">{{ title }}</h2>
    <p v-if="description" class="mt-2 text-sm text-tx-secondary max-w-sm">{{ description }}</p>
    <div v-if="$slots.default" class="mt-6"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ title: string; description?: string; icon?: string }>(), { icon: 'lucide:package-open' })
</script>
