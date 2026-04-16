<template>
  <div
    class="flex h-screen max-h-screen flex-col overflow-hidden bg-bg-base text-tx-primary"
    :style="cssVars"
  >
    <BuilderTopbar @toggle-sidebar="isSidebarOpen = true" />

    <div class="flex min-h-0 flex-1 overflow-hidden">
      <BuilderLeftPanel :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <div class="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => { isSidebarOpen.value = false },
)

const cssVars = {
  '--builder-left-bg': '#0A0A16',
  '--builder-right-bg': '#0D0D1A',
  '--builder-topbar-bg': '#0A0A14',
  '--builder-preview-bg': '#1A1A2A',
  '--builder-select-color': '#6366F1',
  '--builder-select-dim': 'rgba(99,102,241,0.08)',
  '--builder-hover-color': 'rgba(99,102,241,0.4)',
  '--builder-drag-bg': 'rgba(99,102,241,0.06)',
  '--builder-handle-color': '#3A3A55',
  '--builder-section-hover': 'rgba(99,102,241,0.04)',
  '--section-badge-bg': '#1E1E35',
  '--plan-gate-bg': 'rgba(249,115,22,0.06)',
  '--plan-gate-border': 'rgba(249,115,22,0.2)',
}
</script>
