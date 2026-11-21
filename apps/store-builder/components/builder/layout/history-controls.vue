<template>
  <div
    class="flex shrink-0 items-center rounded-md border border-border-subtle bg-bg-primary p-0.5"
  >
    <button
      type="button"
      class="flex size-7 items-center justify-center rounded text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
      title="Undo (Ctrl+Z)"
      aria-label="Undo"
      :disabled="!store.canUndo"
      @click="store.undo()"
    >
      <Icon
        name="ph:arrow-counter-clockwise-bold"
        class="text-sm rtl:-scale-x-100"
      />
    </button>
    <button
      type="button"
      class="flex size-7 items-center justify-center rounded text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
      title="Redo (Ctrl+Shift+Z)"
      aria-label="Redo"
      :disabled="!store.canRedo"
      @click="store.redo()"
    >
      <Icon name="ph:arrow-clockwise-bold" class="text-sm rtl:-scale-x-100" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore();
</script>