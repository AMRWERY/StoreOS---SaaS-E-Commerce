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

const cssVars = computed(() => ({
  '--builder-left-bg': 'var(--bg-base)',
  '--builder-right-bg': 'var(--bg-primary)',
  '--builder-topbar-bg': 'var(--bg-base)',
  '--builder-preview-bg': 'var(--bg-overlay)',
  '--builder-select-color': 'var(--brand)',
  '--builder-select-dim': 'rgba(var(--brand-rgb)/0.08)',
  '--builder-hover-color': 'rgba(var(--brand-rgb)/0.4)',
  '--builder-drag-bg': 'rgba(var(--brand-rgb)/0.06)',
  '--builder-handle-color': 'var(--border-default)',
  '--builder-section-hover': 'rgba(var(--brand-rgb)/0.04)',
  '--section-badge-bg': 'var(--bg-elevated)',
  '--plan-gate-bg': 'rgba(var(--accent-rgb)/0.06)',
  '--plan-gate-border': 'rgba(var(--accent-rgb)/0.2)',
}))
</script>
