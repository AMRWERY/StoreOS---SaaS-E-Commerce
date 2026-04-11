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

    <div class="border-b border-border-subtle bg-bg-base/30 p-4">
      <div class="group relative">
        <select
          class="w-full appearance-none rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 text-[11px] font-bold text-tx-primary transition-colors focus:border-brand focus:outline-none">
          <option v-for="opt in pageOptions" :key="opt">{{ opt }}</option>
        </select>
        <Icon name="ph:caret-down-bold"
          class="pointer-events-none absolute end-2 top-1/2 size-4 -translate-y-1/2 text-tx-muted" />
      </div>
    </div>

    <div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
      <div>
        <p class="mb-3 px-2 text-[9px] font-black uppercase tracking-[0.2em] text-tx-muted">
          Active Sections
        </p>
        <div class="space-y-1">
          <component :is="UiButton" v-for="section in sections" :key="section.id" variant="none" type="button"
            :class-name="sectionRowClass(section)">
            <Icon name="ph:dots-six-vertical-bold"
              class="text-tx-muted opacity-0 transition-opacity group-hover:opacity-100" />
            <span class="min-w-0 flex-1 truncate text-[12px] font-medium">{{ section.name }}</span>
            <Icon v-if="section.hidden" name="ph:eye-slash-bold" class="text-tx-muted" />
            <Icon v-else name="ph:eye-bold" class="text-brand opacity-0 transition-opacity group-hover:opacity-100" />
          </component>
        </div>
      </div>
    </div>

    <div class="mt-auto border-t border-border-subtle bg-bg-base/30 p-3">
      <component :is="UiButton" variant="none" type="button"
        class-name="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border-subtle py-3 text-[10px] font-black uppercase tracking-[0.2em] text-tx-secondary transition-all hover:border-brand hover:bg-bg-elevated hover:text-brand">
        <Icon name="ph:plus-bold" />
        Add Section
      </component>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { BuilderSidebarSection } from '@/types/builder'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const UiButton = resolveComponent('VButton')

const panelTabs = [
  { id: 'Sections', label: 'Sections', icon: 'ph:stack-bold' },
  { id: 'Theme', label: 'Theme', icon: 'ph:palette-bold' },
] as const

const pageOptions = ['Home', 'Collection List', 'Product Page'] as const

const activeTab = ref<(typeof panelTabs)[number]['id']>('Sections')

const sections: BuilderSidebarSection[] = [
  { id: 1, name: 'Header', active: false, hidden: false },
  { id: 2, name: 'Hero', active: true, hidden: false },
  { id: 3, name: 'Featured Products', active: false, hidden: true },
  { id: 4, name: 'Footer', active: false, hidden: false },
]

function sidebarTabClass(id: string) {
  const base
    = 'group flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-[10px] font-black uppercase tracking-widest transition-all '
  return (
    base
    + (activeTab.value === id
      ? 'bg-bg-elevated text-tx-primary'
      : 'text-tx-muted hover:text-tx-secondary')
  )
}

function sectionRowClass(section: BuilderSidebarSection) {
  const base
    = 'group flex w-full cursor-pointer items-center gap-3 rounded-md border border-transparent px-2 py-2.5 text-start transition-all justify-start '
  return (
    base
    + (section.active
      ? 'border-border-subtle bg-bg-elevated text-tx-primary'
      : 'text-tx-secondary hover:bg-bg-elevated/50')
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