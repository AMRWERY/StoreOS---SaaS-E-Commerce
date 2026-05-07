<template>
  <Transition name="sb-fade">
    <div v-if="isOpen" class="fixed inset-0 z-40 bg-bg-overlay backdrop-blur-sm lg:hidden" aria-hidden="true"
      @click="$emit('close')" />
  </Transition>

  <aside
    class="flex min-h-0 w-[220px] shrink-0 flex-col border-e border-border-subtle bg-bg-primary transition-all duration-300 lg:z-40"
    :class="[
      'fixed inset-y-0 start-0 z-50 h-screen max-h-[100dvh] lg:relative lg:h-full lg:max-h-none',
      isOpen
        ? 'translate-x-0'
        : 'ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0',
    ]">
    <div class="flex items-center gap-1 border-b border-border-subtle bg-bg-base p-1">
      <div class="flex min-w-0 flex-1 gap-0.5">
        <component :is="UiButton" v-for="tab in panelTabs" :key="tab.id" variant="none" type="button"
          :class-name="sidebarTabClass(tab.id)" @click="activeTab = tab.id">
          <Icon :name="tab.icon" class="text-[15px]" />
          <span class="hidden min-[360px]:inline">{{ tab.label }}</span>
        </component>
      </div>
      <component :is="UiButton" variant="none" type="button"
        class-name="shrink-0 p-1.5 text-tx-secondary hover:text-tx-primary lg:hidden" title="Close menu"
        @click="$emit('close')">
        <Icon name="ph:x-bold" class="text-xl" />
      </component>
    </div>

    <pages-list />

    <div v-if="activeTab === 'Sections'" class="flex min-h-0 flex-1 flex-col">
      <section-list />

      <add-section-button />
    </div>
    <div v-else class="flex min-h-0 flex-1 flex-col">
      <theme-panel />
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const UiButton = resolveComponent('VButton')
const store = useBuilderStore()

const panelTabs = [
  { id: 'Sections', label: 'Sections', icon: 'ph:stack-bold' },
  { id: 'Theme', label: 'Theme', icon: 'ph:palette-bold' },
] as const

const activeTab = ref<(typeof panelTabs)[number]['id']>('Sections')

watch(
  () => [activeTab.value, store.selectedId] as const,
  () => {
    if (activeTab.value === 'Theme')
      store.setPanelMode('theme-settings')
    else
      store.setPanelMode(store.selectedId ? 'section-settings' : 'empty')
  },
  { immediate: true },
)

function sidebarTabClass(id: string) {
  const base
    = 'group flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-[10px] font-black tracking-widest transition-all '
  return (
    base
    + (activeTab.value === id
      ? 'bg-bg-elevated text-tx-primary'
      : 'text-tx-muted hover:text-tx-secondary')
  )
}
</script>

<style scoped>
.sb-fade-enter-active,
.sb-fade-leave-active {
  transition: opacity 0.3s ease;
}

.sb-fade-enter-from,
.sb-fade-leave-to {
  opacity: 0;
}
</style>