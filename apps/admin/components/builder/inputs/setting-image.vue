<template>
  <div class="space-y-2">
    <label class="block text-[10px] font-bold tracking-wider text-tx-secondary">{{ label }}</label>
    <button type="button"
      class="group relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-border-default bg-bg-elevated transition-colors hover:border-brand/50 hover:bg-bg-overlay">
      <div v-if="previewUrl" class="absolute inset-0 bg-cover bg-center opacity-50 transition group-hover:opacity-40"
        :style="{ backgroundImage: `url('${previewUrl}')` }" />
      <div class="relative z-[1] flex flex-col items-center gap-2 rounded-md bg-bg-base/85 px-4 py-3 backdrop-blur-sm">
        <Icon name="ph:upload-simple-bold" class="text-xl text-brand" />
        <span class="text-[10px] font-black tracking-[0.2em] text-tx-primary">{{ hint }}</span>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
withDefaults(
  defineProps<{
    label: string
    previewUrl?: string | null
    hint?: string
  }>(),
  { hint: 'Upload or replace', previewUrl: null },
)
</script>