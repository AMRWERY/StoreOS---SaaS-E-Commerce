<template>
  <button type="button"
    class="group w-full rounded-xl border border-border-subtle bg-bg-elevated/40 text-start transition-all hover:border-brand/40 hover:bg-bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    @click="$emit('select')">
    <div class="relative aspect-[4/3] overflow-hidden rounded-t-xl rounded-b-none bg-bg-base">
      <span v-if="popular"
        class="absolute end-2 top-2 z-10 rounded-md bg-[#f97316] px-2 py-0.5 text-[8px] font-black tracking-wider text-white">
        Popular
      </span>

      <div v-if="variant === 'blank'"
        class="flex h-full items-center justify-center border-2 border-dashed border-border-default bg-bg-primary/80">
        <Icon name="ph:plus-bold" class="size-12 text-tx-muted transition-colors group-hover:text-brand" />
      </div>

      <div v-else-if="variant === 'split'" class="flex h-full">
        <div class="flex w-[45%] flex-col justify-center gap-2 bg-bg-overlay px-3 py-4">
          <div class="h-2 w-3/4 rounded bg-white/20" />
          <div class="h-1.5 w-full rounded bg-white/10" />
          <div class="mt-2 h-5 w-16 rounded bg-brand/60" />
        </div>
        <div class="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-950" />
      </div>

      <div v-else-if="variant === 'grid'" class="grid h-full grid-cols-3 gap-1.5 bg-bg-primary p-3">
        <div v-for="i in 3" :key="i"
          class="rounded-md bg-gradient-to-b from-bg-overlay to-bg-elevated ring-1 ring-border-subtle" />
      </div>

      <div v-else-if="variant === 'text'"
        class="flex h-full items-center justify-center bg-gradient-to-b from-neutral-900 to-bg-base px-6">
        <div class="w-full space-y-2 text-center">
          <div class="mx-auto h-2 w-2/3 rounded bg-white/25" />
          <div class="mx-auto h-1.5 w-full max-w-[80%] rounded bg-white/10" />
          <div class="mx-auto h-1.5 w-4/5 rounded bg-white/10" />
        </div>
      </div>

      <div v-else-if="variant === 'metrics'"
        class="flex h-full flex-col justify-end gap-2 bg-gradient-to-b from-[#1a1510] to-bg-base p-4">
        <div class="flex h-16 items-end justify-between gap-2">
          <div class="w-3 rounded-t bg-orange-500/80" style="height: 40%" />
          <div class="w-3 rounded-t bg-orange-500/60" style="height: 70%" />
          <div class="w-3 rounded-t bg-orange-500/90" style="height: 55%" />
          <div class="w-3 rounded-t bg-orange-500/50" style="height: 85%" />
          <div class="w-3 rounded-t bg-orange-500/70" style="height: 45%" />
        </div>
      </div>

      <div v-else-if="variant === 'form'" class="flex h-full flex-col justify-center gap-2 bg-bg-primary p-4">
        <div class="h-6 w-full rounded border border-border-subtle bg-bg-elevated/50" />
        <div class="h-6 w-full rounded border border-border-subtle bg-bg-elevated/50" />
        <div class="h-16 w-full rounded border border-border-subtle bg-bg-elevated/50" />
        <div class="mt-1 h-7 w-24 rounded bg-brand/70" />
      </div>

      <div v-else-if="variant === 'logos'"
        class="flex h-full flex-wrap items-center justify-center gap-3 bg-bg-primary p-4">
        <div v-for="i in 6" :key="i" class="size-8 rounded-md bg-white/10 ring-1 ring-white/5" />
      </div>
    </div>

    <div class="border-t border-border-subtle px-4 py-3">
      <h3 class="text-[11px] font-bold tracking-wide text-tx-primary">
        {{ title }}
      </h3>
      <p class="mt-1 text-[11px] leading-snug text-tx-secondary">
        {{ description }}
      </p>
    </div>
  </button>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { SectionTemplateThumb } from '@/types/builder'

defineProps<{
  title: string
  description: string
  popular?: boolean
  variant: SectionTemplateThumb
}>()

defineEmits<{
  select: []
}>()
</script>