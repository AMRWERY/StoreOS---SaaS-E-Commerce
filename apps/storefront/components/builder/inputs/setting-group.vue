<template>
  <details class="group rounded-lg border border-border-subtle bg-bg-elevated/30" :open="defaultOpen">
    <summary
      class="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-[10px] font-black tracking-[0.15em] text-tx-secondary marker:content-none [&::-webkit-details-marker]:hidden">
      {{ title }}
      <Icon name="ph:caret-down-bold"
        class="size-4 shrink-0 text-tx-muted transition-transform group-open:rotate-180" />
    </summary>
    <div class="space-y-4 border-t border-border-subtle px-4 py-4">
      <slot />
    </div>
  </details>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    defaultOpen?: boolean
  }>(),
  { defaultOpen: false },
)
</script>