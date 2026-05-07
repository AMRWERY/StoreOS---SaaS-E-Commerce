<template>
  <div
    class="flex w-full shrink-0 flex-col border-border-subtle transition-[width] duration-300 ease-out max-xl:border-t xl:overflow-hidden xl:border-s"
    :class="settingsPanelOpen
      ? 'xl:w-[min(100%,380px)] xl:max-w-[380px] xl:ps-6 xl:pe-1 xl:py-6'
      : 'xl:w-[52px] xl:min-w-[52px] xl:px-1 xl:py-6'
      ">
    <div class="w-full min-w-0 max-xl:block" :class="settingsPanelOpen ? 'xl:block' : 'xl:hidden'">
      <theme-settings-panel v-if="store.panelMode === 'theme-settings'" @collapse="settingsPanelOpen = false" />

      <navbar-settings-panel v-else-if="store.panelMode === 'navbar-settings'" @collapse="settingsPanelOpen = false" />

      <footer-settings-panel v-else-if="store.panelMode === 'footer-settings'" @collapse="settingsPanelOpen = false" />

      <page-settings-panel v-else-if="store.panelMode === 'page-settings'" @collapse="settingsPanelOpen = false" />

      <section-settings-panel v-else @collapse="settingsPanelOpen = false" />
    </div>

    <div
      class="hidden min-h-[200px] flex-col items-center gap-4 border-border-subtle bg-bg-primary pt-3 xl:rounded-lg xl:border xl:border-border-subtle"
      :class="settingsPanelOpen ? 'xl:!hidden' : 'xl:!flex'">
      <component :is="UiButton" variant="none" type="button"
        class-name="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-tx-secondary transition-colors hover:border-brand/40 hover:text-brand"
        title="Expand settings" aria-expanded="false" @click="settingsPanelOpen = true">
        <Icon name="ph:sidebar-simple-bold" class="text-xl rtl:rotate-180" />
      </component>
      <span
        class="select-none text-[9px] font-black tracking-[0.2em] text-tx-muted [writing-mode:vertical-rl] rotate-180"
        aria-hidden="true">
        Settings
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const UiButton = resolveComponent('VButton')
const store = useBuilderStore()

const settingsPanelOpen = ref(true)
</script>