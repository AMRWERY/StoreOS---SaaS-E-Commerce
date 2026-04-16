<template>
  <Teleport to="body">
    <div v-if="publishOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog"
      aria-modal="true">
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" @click="publishOpen = false" />
      <div class="relative w-full max-w-md rounded-2xl border border-border-subtle bg-bg-primary p-6 shadow-2xl">
        <h2 class="text-lg font-bold tracking-wide text-tx-primary">
          Publish store
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-tx-secondary">
          Push the latest changes live. Visitors will see the updated theme and pages.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <button type="button"
            class="rounded-lg bg-brand px-5 py-2.5 text-[11px] font-black tracking-wider text-white shadow-lg shadow-brand/25"
            @click="publishOpen = false">
            Publish now
          </button>
          <button type="button"
            class="rounded-lg border border-border-subtle px-5 py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
            @click="publishOpen = false">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { publishOpen } = useBuilderModals()
</script>