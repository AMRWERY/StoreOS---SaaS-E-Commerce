<template>
  <Teleport to="body">
    <div v-if="templatePickerOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog"
      aria-modal="true">
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" @click="templatePickerOpen = false" />
      <div class="relative w-full max-w-lg rounded-2xl border border-border-subtle bg-bg-primary p-6 shadow-2xl">
        <h2 class="text-lg font-bold tracking-wide text-tx-primary">
          Apply template
        </h2>
        <p class="mt-2 text-sm text-tx-secondary">
          Replace the current page structure with a curated layout. You can undo from history afterward.
        </p>
        <ul class="mt-5 space-y-2">
          <li v-for="tpl in templates" :key="tpl.id"
            class="flex cursor-pointer items-center justify-between rounded-lg border border-border-subtle bg-bg-elevated/50 px-4 py-3 transition-colors hover:border-brand/40 hover:bg-bg-elevated"
            @click="templatePickerOpen = false">
            <div>
              <p class="text-[13px] font-semibold text-tx-primary">{{ tpl.name }}</p>
              <p class="text-[11px] text-tx-muted">{{ tpl.desc }}</p>
            </div>
            <Icon name="ph:caret-right-bold" class="text-tx-muted" />
          </li>
        </ul>
        <button type="button"
          class="mt-6 w-full rounded-lg border border-border-subtle py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
          @click="templatePickerOpen = false">
          Close
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { templatePickerOpen } = useBuilderModals()

const templates = [
  { id: '1', name: 'Minimal boutique', desc: 'Hero, grid, testimonials' },
  { id: '2', name: 'Editorial lookbook', desc: 'Full-bleed imagery, story blocks' },
  { id: '3', name: 'High-conversion', desc: 'Urgency bar, featured SKU, FAQ' },
]
</script>