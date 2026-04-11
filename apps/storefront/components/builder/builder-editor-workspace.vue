<template>
  <div
    class="flex min-h-0 w-full flex-1 flex-col gap-6 xl:flex-row xl:items-stretch xl:gap-0"
  >
    <BuilderPreviewViewport class="min-h-[480px] min-w-0 flex-1 xl:h-full xl:min-h-0" />
    <div
      class="flex w-full shrink-0 flex-col border-border-subtle transition-[width] duration-300 ease-out max-xl:border-t xl:overflow-hidden xl:border-s"
      :class="
        settingsPanelOpen
          ? 'xl:w-[min(100%,380px)] xl:max-w-[380px] xl:ps-6 xl:pe-1 xl:py-6'
          : 'xl:w-[52px] xl:min-w-[52px] xl:px-1 xl:py-6'
      "
    >
      <!-- Full panel: always on &lt;xl; on xl only when open -->
      <div
        class="w-full min-w-0 max-xl:block"
        :class="settingsPanelOpen ? 'xl:block' : 'xl:hidden'"
      >
        <BuilderSectionSettingsPanel @collapse="settingsPanelOpen = false" />
      </div>

      <!-- Collapsed rail (xl+) -->
      <div
        class="hidden min-h-[200px] flex-col items-center gap-4 border-border-subtle bg-bg-primary pt-3 xl:rounded-lg xl:border xl:border-border-subtle"
        :class="settingsPanelOpen ? 'xl:!hidden' : 'xl:!flex'"
      >
        <component
          :is="UiButton"
          variant="none"
          type="button"
          class-name="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-tx-secondary transition-colors hover:border-brand/40 hover:text-brand"
          title="Expand section settings"
          aria-expanded="false"
          @click="settingsPanelOpen = true"
        >
          <Icon name="ph:sidebar-simple-bold" class="text-xl rtl:rotate-180" />
        </component>
        <span
          class="select-none text-[9px] font-black uppercase tracking-[0.2em] text-tx-muted [writing-mode:vertical-rl] rotate-180"
          aria-hidden="true"
        >
          Settings
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BuilderEditorHero } from '@/composables/useBuilderEditorHero'
import { builderEditorHeroKey } from '@/composables/useBuilderEditorHero'

const UiButton = resolveComponent('VButton')

const settingsPanelOpen = ref(true)

const hero = reactive<BuilderEditorHero>({
  headline: 'Redefining Minimalist Design.',
  subheadline:
    'Discover a curated collection of artisanal furniture designed for the modern sanctuary.',
  buttonText: 'Shop Collection',
})

provide(builderEditorHeroKey, hero)
</script>
