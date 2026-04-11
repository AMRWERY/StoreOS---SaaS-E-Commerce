<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Section settings"
  >
    <div class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-bold uppercase tracking-wide text-tx-primary">
          Section Settings
        </h2>
        <p class="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-tx-muted">
          Editing: Hero section
        </p>
      </div>
      <component
        :is="UiButton"
        variant="none"
        type="button"
        class-name="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel"
        aria-expanded="true"
        @click="$emit('collapse')"
      >
        <Icon name="ph:caret-double-right-bold" class="text-lg rtl:rotate-180" />
      </component>
    </div>

    <div class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]">
      <VInput
        v-model="hero.headline"
        label="Headline"
        :input-class="'text-[13px] font-medium'"
      />

      <div class="space-y-2">
        <label class="text-[10px] font-bold uppercase tracking-wider text-tx-secondary">Subheadline</label>
        <textarea
          v-model="hero.subheadline"
          rows="4"
          class="w-full resize-y rounded-md border border-border-subtle bg-bg-elevated px-3 py-2.5 text-[12px] leading-relaxed text-tx-primary outline-none transition-all duration-200 placeholder:text-tx-muted focus:border-brand focus:ring-2 focus:ring-brand-dim hover:border-border-default"
        />
      </div>

      <VInput
        v-model="hero.buttonText"
        label="Button text"
        :input-class="'text-[13px] font-medium'"
      />

      <div class="space-y-2">
        <label class="text-[10px] font-bold uppercase tracking-wider text-tx-secondary">Background image</label>
        <button
          type="button"
          class="group relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-border-default bg-bg-elevated transition-colors hover:border-brand/50 hover:bg-bg-overlay"
        >
          <div
            class="absolute inset-0 bg-cover bg-center opacity-40 transition group-hover:opacity-30"
            style="background-image: url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80')"
          />
          <div
            class="relative z-[1] flex flex-col items-center gap-2 rounded-md bg-bg-base/80 px-4 py-3 backdrop-blur-sm"
          >
            <Icon name="ph:upload-simple-bold" class="text-xl text-brand" />
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-tx-primary">Replace image</span>
          </div>
        </button>
      </div>
    </div>

    <div class="border-t border-border-subtle p-4">
      <component
        :is="UiButton"
        variant="none"
        type="button"
        class-name="flex w-full items-center justify-center gap-2 rounded-lg bg-bg-elevated py-3 text-[10px] font-black uppercase tracking-[0.2em] text-tx-primary ring-1 ring-border-subtle transition-colors hover:bg-bg-overlay hover:ring-border-default"
      >
        <Icon name="ph:gear-six-bold" class="text-lg text-tx-secondary" />
        Advanced settings
      </component>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useBuilderEditorHero } from '@/composables/useBuilderEditorHero'

defineEmits<{
  collapse: []
}>()

const hero = useBuilderEditorHero()
const UiButton = resolveComponent('VButton')
</script>
