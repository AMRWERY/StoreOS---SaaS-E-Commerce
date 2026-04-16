<template>
  <div class="mt-auto border-t border-border-subtle bg-bg-base/30 p-3">
    <component :is="UiButton" variant="none" type="button"
      class-name="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border-subtle py-3 text-[10px] font-black tracking-[0.2em] text-tx-secondary transition-all hover:border-brand hover:bg-bg-elevated hover:text-brand"
      @click="addSectionOpen = true">
      <Icon name="ph:plus-bold" />
      Add section
    </component>
  </div>
</template>

<script lang="ts" setup>
const UiButton = resolveComponent('VButton')
const { addSectionOpen } = useBuilderModals()
</script>