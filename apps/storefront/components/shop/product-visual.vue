<template>
  <div
    :class="['relative flex items-center justify-center overflow-hidden bg-gradient-to-br', toneClass(tone), ratio]"
    role="img"
    :aria-label="label"
  >
    <div class="absolute -top-8 -end-8 w-32 h-32 rounded-full bg-bg-base/30 blur-2xl" aria-hidden="true" />
    <Icon :name="icon" :class="['text-tx-primary/70 transition-transform duration-300 group-hover:scale-105', iconSize]" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  tone?: number
  icon?: string
  label?: string
  ratio?: string
  iconSize?: string
}>(), {
  tone: 0,
  icon: 'lucide:image',
  label: '',
  ratio: 'aspect-[4/5]',
  iconSize: 'w-14 h-14',
})
</script>
